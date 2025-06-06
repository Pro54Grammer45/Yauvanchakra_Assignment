"use client";

import {
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  WindmillContext,
} from "@windmill/react-ui";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import React, { useContext, useEffect, useState, useCallback } from "react"; // Import useCallback
import { useTranslation } from "react-i18next";
import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from "react-icons/fi";
import { ImCreditCard, ImStack } from "react-icons/im";

// internal import
import useAsync from "@/hooks/useAsync";
import useFilter from "@/hooks/useFilter";
import LineChart from "@/components/chart/LineChart/LineChart";
import PieChart from "@/components/chart/Pie/PieChart";
import CardItem from "@/components/dashboard/CardItem";
import CardItemTwo from "@/components/dashboard/CardItemTwo";
import ChartCard from "@/components/chart/ChartCard";
import OrderTable from "@/components/dashboard/OrderTable";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import OrderServices from "@/services/OrderServices";
import AnimatedContent from "@/components/common/AnimatedContent";

// Type definitions
interface Order {
  updatedAt: string;
  total: number;
  paymentMethod: string;
}

interface DashboardOrderAmount {
  ordersData: Order[];
  thisMonthlyOrderAmount?: number;
  lastMonthOrderAmount?: number;
  totalAmount?: number;
}

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { mode } = useContext(WindmillContext);
  dayjs.extend(isBetween);
  dayjs.extend(isToday);
  dayjs.extend(isYesterday);

  const { currentPage, handleChangePage } = useContext(SidebarContext);

  // react hook
  const [todayOrderAmount, setTodayOrderAmount] = useState<number>(0);
  const [yesterdayOrderAmount, setYesterdayOrderAmount] = useState<number>(0);
  const [salesReport, setSalesReport] = useState<any[]>([]);
  const [todayCashPayment, setTodayCashPayment] = useState<number>(0);
  const [todayCardPayment, setTodayCardPayment] = useState<number>(0);
  const [todayCreditPayment, setTodayCreditPayment] = useState<number>(0);
  const [yesterdayCashPayment, setYesterdayCashPayment] = useState<number>(0);
  const [yesterdayCardPayment, setYesterdayCardPayment] = useState<number>(0);
  const [yesterdayCreditPayment, setYesterdayCreditPayment] = useState<number>(0);

  // --- FIX APPLIED HERE ---
  const fetchRecentOrders = useCallback(async () => {
    return OrderServices.getDashboardRecentOrder({ page: currentPage, limit: 8 });
  }, [currentPage]); // Only re-create if currentPage changes

  const { data: dashboardRecentOrder, loading: loadingRecentOrder, error } = useAsync(fetchRecentOrders);
  // --- END FIX ---


  const { data: bestSellerProductChart, loading: loadingBestSellerProduct } = useAsync(
    OrderServices.getBestSellerProductChart
  );

  const { data: dashboardOrderCount, loading: loadingOrderCount } = useAsync(
    OrderServices.getDashboardCount
  );

  const { data: dashboardOrderAmount, loading: loadingOrderAmount } = useAsync(
    OrderServices.getDashboardAmount
  );

  const { dataTable, serviceData } = useFilter(dashboardRecentOrder?.orders || []);

  useEffect(() => {
    if (!dashboardOrderAmount?.ordersData) return;
    // today orders show
    const todayOrder = dashboardOrderAmount.ordersData.filter((order: Order) =>
      dayjs(order.updatedAt).isToday()
    );
    const todayReport = todayOrder.reduce((pre, acc) => pre + acc.total, 0);
    setTodayOrderAmount(todayReport);

    // yesterday orders
    const yesterdayOrder = dashboardOrderAmount.ordersData.filter((order: Order) =>
      dayjs(order.updatedAt).subtract(1, "day").isYesterday()
    );
    const yesterdayReport = yesterdayOrder.reduce((pre, acc) => pre + acc.total, 0);
    setYesterdayOrderAmount(yesterdayReport);

    // sales orders chart data
    const salesOrderChartData = dashboardOrderAmount.ordersData.filter((order: Order) =>
      dayjs(order.updatedAt).isBetween(
        dayjs().subtract(7, "day"),
        dayjs(),
        null,
        "[]"
      )
    );

    const salesReportArr: any[] = [];
    salesOrderChartData.reduce((res: any, value: Order) => {
      let onlyDate = value.updatedAt.split("T")[0];
      if (!res[onlyDate]) {
        res[onlyDate] = { date: onlyDate, total: 0, order: 0 };
        salesReportArr.push(res[onlyDate]);
      }
      res[onlyDate].total += value.total;
      res[onlyDate].order += 1;
      return res;
    }, {});
    setSalesReport(salesReportArr);

    const todayPaymentMethodData: { paymentMethod: string; total: number }[] = [];
    const yesterDayPaymentMethodData: { paymentMethod: string; total: number }[] = [];

    // today order payment method
    dashboardOrderAmount.ordersData.forEach((item: Order) => {
      if (dayjs(item.updatedAt).isToday()) {
        todayPaymentMethodData.push({ paymentMethod: item.paymentMethod, total: item.total });
      }
    });
    // yesterday order payment method
    dashboardOrderAmount.ordersData.forEach((item: Order) => {
      if (dayjs(item.updatedAt).subtract(1, "day").isYesterday()) {
        yesterDayPaymentMethodData.push({ paymentMethod: item.paymentMethod, total: item.total });
      }
    });

    const todayCsCdCit = Object.values(
      todayPaymentMethodData.reduce((r, { paymentMethod, total }) => {
        if (!r[paymentMethod]) {
          r[paymentMethod] = { paymentMethod, total: 0 };
        }
        r[paymentMethod].total += total;
        return r;
      }, {} as Record<string, { paymentMethod: string; total: number }>)
    );
    setTodayCashPayment(todayCsCdCit.find((el: any) => el.paymentMethod === "Cash")?.total || 0);
    setTodayCardPayment(todayCsCdCit.find((el: any) => el.paymentMethod === "Card")?.total || 0);
    setTodayCreditPayment(todayCsCdCit.find((el: any) => el.paymentMethod === "Credit")?.total || 0);

    const yesterDayCsCdCit = Object.values(
      yesterDayPaymentMethodData.reduce((r, { paymentMethod, total }) => {
        if (!r[paymentMethod]) {
          r[paymentMethod] = { paymentMethod, total: 0 };
        }
        r[paymentMethod].total += total;
        return r;
      }, {} as Record<string, { paymentMethod: string; total: number }>)
    );
    setYesterdayCashPayment(yesterDayCsCdCit.find((el: any) => el.paymentMethod === "Cash")?.total || 0);
    setYesterdayCardPayment(yesterDayCsCdCit.find((el: any) => el.paymentMethod === "Card")?.total || 0);
    setYesterdayCreditPayment(yesterDayCsCdCit.find((el: any) => el.paymentMethod === "Credit")?.total || 0);
  }, [dashboardOrderAmount]);

  return (
    <>
      <PageTitle>{t("DashboardOverview")}</PageTitle>
      <AnimatedContent>
        <div className="grid gap-2 mb-8 xl:grid-cols-5 md:grid-cols-2">
          <CardItemTwo
            mode={mode}
            title="Today Order"
            title2="TodayOrder"
            Icon={() => <ImStack />}
            cash={todayCashPayment || 0}
            card={todayCardPayment || 0}
            credit={todayCreditPayment || 0}
            price={todayOrderAmount || 0}
            className="text-white dark:text-emerald-100 bg-teal-600"
            loading={loadingOrderAmount}
          />
          <CardItemTwo
            mode={mode}
            title="Yesterday Order"
            title2="YesterdayOrder"
            Icon={() => <ImStack />}
            cash={yesterdayCashPayment || 0}
            card={yesterdayCardPayment || 0}
            credit={yesterdayCreditPayment || 0}
            price={yesterdayOrderAmount || 0}
            className="text-white dark:text-orange-100 bg-orange-400"
            loading={loadingOrderAmount}
          />
          <CardItemTwo
            mode={mode}
            title="This Month"
            title2="ThisMonth"
            Icon={() => <FiShoppingCart />}
            price={dashboardOrderAmount?.thisMonthlyOrderAmount || 0}
            className="text-white dark:text-emerald-100 bg-blue-500"
            loading={loadingOrderAmount}
          />
          <CardItemTwo
            mode={mode}
            title="Last Month"
            title2="LastMonth"
            Icon={() => <ImCreditCard />}
            loading={loadingOrderAmount}
            price={dashboardOrderAmount?.lastMonthOrderAmount || 0}
            className="text-white dark:text-teal-100 bg-cyan-600"
          />
          <CardItemTwo
            mode={mode}
            title="All Time Sales"
            title2="AllTimeSales"
            Icon={() => <ImCreditCard />}
            price={dashboardOrderAmount?.totalAmount || 0}
            className="text-white dark:text-emerald-100 bg-emerald-600"
            loading={loadingOrderAmount}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <CardItem
            title="Total Order"
            Icon={() => <FiShoppingCart />}
            loading={loadingOrderCount}
            quantity={dashboardOrderCount?.totalOrder || 0}
            className="text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
          />
          <CardItem
            title={t("OrderPending")}
            Icon={() => <FiRefreshCw />}
            loading={loadingOrderCount}
            quantity={dashboardOrderCount?.totalPendingOrder?.count || 0}
            amount={dashboardOrderCount?.totalPendingOrder?.total || 0}
            className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
          />
          <CardItem
            title={t("OrderProcessing")}
            Icon={() => <FiTruck />}
            loading={loadingOrderCount}
            quantity={dashboardOrderCount?.totalProcessingOrder || 0}
            className="text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500"
          />
          <CardItem
            title={t("OrderDelivered")}
            Icon={() => <FiCheck />}
            loading={loadingOrderCount}
            quantity={dashboardOrderCount?.totalDeliveredOrder || 0}
            className="text-emerald-600 dark:text-emerald-100 bg-emerald-100 dark:bg-emerald-500"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 my-8">
          <ChartCard
            mode={mode}
            loading={loadingOrderAmount}
            title={t("WeeklySales")}
          >
            <LineChart salesReport={salesReport} />
          </ChartCard>
          <ChartCard
            mode={mode}
            loading={loadingBestSellerProduct}
            title={t("BestSellingProducts")}
          >
            <PieChart data={bestSellerProductChart} />
          </ChartCard>
        </div>
      </AnimatedContent>
      <PageTitle>{t("RecentOrder")}</PageTitle>
      {loadingRecentOrder ? (
        <TableLoading row={5} col={4} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{t("InvoiceNo")}</TableCell>
                <TableCell>{t("TimeTbl")}</TableCell>
                <TableCell>{t("CustomerName")} </TableCell>
                <TableCell> {t("MethodTbl")} </TableCell>
                <TableCell> {t("AmountTbl")} </TableCell>
                <TableCell>{t("OderStatusTbl")}</TableCell>
                <TableCell>{t("ActionTbl")}</TableCell>
                <TableCell className="text-right">{t("InvoiceTbl")}</TableCell>
              </tr>
            </TableHeader>
            <OrderTable orders={dataTable} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={dashboardRecentOrder?.totalOrder}
              resultsPerPage={8}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no orders right now." />
      )}
    </>
  );
};

export default Dashboard;