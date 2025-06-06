'use client';

import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import dayjs from "dayjs";
import { useEffect, useState, ChangeEvent } from "react";

//internal import
import useUtilsFunction from "@/hooks/useUtilsFunction";
import CheckBox from "@/components/form/others/CheckBox";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import MainDrawer from "@/components/drawer/MainDrawer";
import CouponDrawer from "@/components/drawer/CouponDrawer";
import ShowHideButton from "@/components/table/ShowHideButton";
import EditDeleteButton from "@/components/table/EditDeleteButton";

interface DiscountType {
  type: "percentage" | "fixed";
  value: number;
}

interface Coupon {
  _id: string;
  title: {
    en: string;
    // Add other language properties if needed
  };
  logo?: string;
  couponCode: string;
  discountType?: DiscountType;
  status: string;
  startTime: string | Date;
  endTime: string | Date;
  updatedAt: string;
  updatedDate?: string;
}

interface CouponTableProps {
  isCheck: string[];
  coupons: Coupon[];
  setIsCheck: (ids: string[]) => void;
}

const CouponTable = ({ isCheck, coupons, setIsCheck }: CouponTableProps) => {
  const [updatedCoupons, setUpdatedCoupons] = useState<Coupon[]>([]);

  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const { currency, showDateFormat, globalSetting, showingTranslateValue } =
    useUtilsFunction();

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    const result = coupons?.map((el) => {
      const newDate = new Date(el?.updatedAt).toLocaleString("en-US", {
        timeZone: globalSetting?.default_time_zone,
      });
      return {
        ...el,
        updatedDate: newDate,
      };
    });
    setUpdatedCoupons(result || []);
  }, [coupons, globalSetting?.default_time_zone]);

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck.length < 2 && (
        <MainDrawer>
          <CouponDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {updatedCoupons?.map((coupon, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name={coupon?.title?.en}
                id={coupon._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(coupon._id)}
              />
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                {coupon?.logo ? (
                  <Avatar
                    className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                    src={coupon?.logo}
                    alt="product"
                  />
                ) : (
                  <Avatar
                    src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`}
                    alt="product"
                  />
                )}
                <div>
                  <span className="text-sm">
                    {showingTranslateValue(coupon?.title)}
                  </span>{" "}
                </div>
              </div>{" "}
            </TableCell>

            <TableCell>
              {" "}
              <span className="text-sm"> {coupon.couponCode}</span>{" "}
            </TableCell>

            {coupon?.discountType?.type ? (
              <TableCell>
                {" "}
                <span className="text-sm font-semibold">
                  {" "}
                  {coupon?.discountType?.type === "percentage"
                    ? `${coupon?.discountType?.value}%`
                    : `${currency}${coupon?.discountType?.value}`}
                </span>{" "}
              </TableCell>
            ) : (
              <TableCell>
                {" "}
                <span className="text-sm font-semibold"> </span>{" "}
              </TableCell>
            )}

            <TableCell className="text-center">
              <ShowHideButton id={coupon._id} status={coupon.status} category={undefined} />
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {showDateFormat(coupon.startTime)}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {showDateFormat(coupon.endTime)}
              </span>
            </TableCell>

            <TableCell className="align-middle ">
              {dayjs().isAfter(dayjs(coupon.endTime)) ? (
                <Badge type="danger">Expired</Badge>
              ) : (
                <Badge type="success">Active</Badge>
              )}
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={coupon?._id}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(coupon?.title)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CouponTable;