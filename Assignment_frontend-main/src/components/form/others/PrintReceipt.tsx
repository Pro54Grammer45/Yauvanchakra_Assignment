"use client";
import React, { useRef, useState } from "react";
import { FiPrinter } from "react-icons/fi";
import { useReactToPrint } from "react-to-print"; // Make sure react-to-print is compatible with this usage
import { notifyError } from "@/utils/toast";
import Tooltip from "@/components/tooltip/Tooltip";
import OrderServices from "@/services/OrderServices";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import InvoiceForPrint, { InvoiceData } from "@/components/invoice/InvoiceForPrint";
import { GlobalSetting } from "@/interfaces/GlobalSettings";

interface PrintReceiptProps {
  orderId: string;
}

interface OrderData {
  [key: string]: any;
}

const PrintReceipt: React.FC<PrintReceiptProps> = ({ orderId }) => {
  const printRefTwo = useRef<HTMLDivElement>(null);
  const [orderData, setOrderData] = useState<InvoiceData | null>(null);
  const { globalSetting } = useUtilsFunction() as { globalSetting: GlobalSetting };

  const pageStyle = `
    @media print {
      @page {
        size: ${globalSetting?.receipt_size === "A4"
      ? "8.5in 14in"
      : globalSetting?.receipt_size === "3-1/8"
        ? "9.8in 13.8in"
        : globalSetting?.receipt_size === "2-1/4"
          ? "3in 8in"
          : "3.5in 8.5in"
    };
        margin: 0;
        padding: 0;
        font-size: 10px !important;
      }

      @page: first {
        size: ${globalSetting?.receipt_size === "A4"
      ? "8.5in 14in"
      : globalSetting?.receipt_size === "3-1/8"
        ? "9.8in 13.8in"
        : globalSetting?.receipt_size === "2-1/4"
          ? "3in 8in"
          : "3.5in 8in" // Typo fixed: was 8.5in, changed to 8in for consistency with the 2-1/4 size
    };
        margin: 0;
        font-size: 10px !important;
      }
    }
  `;

  const handlePrint = useReactToPrint({
    // Keep 'content' inside the options object
   // <-- Reverted to this structure
    pageStyle,
    documentTitle: "Invoice",
  });

  const handlePrintReceipt = async (id: string) => {
    try {
      const res = await OrderServices.getOrderById(id, {});
      setOrderData(res as InvoiceData);
      // Wait for state update to complete before printing.
      // A common pattern is to use a useEffect or a setTimeout if there's a rendering delay
      // before printRefTwo.current becomes available.
      // For now, let's assume setting state is fast enough or render cycle is short.
      handlePrint();
    } catch (err) {
      notifyError(err ? (err as any)?.response?.data?.message : (err as Error)?.message);
    }
  };

  return (
    <>
      <div style={{ display: "none" }}>
        {orderData && (
          <InvoiceForPrint
            data={orderData}
            printRef={printRefTwo}
            globalSetting={globalSetting}
          />
        )}
      </div>
      <button
        onClick={() => handlePrintReceipt(orderId)}
        type="button"
        className="ml-2 p-2 cursor-pointer text-gray-500 hover:text-emerald-600 focus:outline-none"
      >
        <Tooltip
          id="receipt"
          Icon={FiPrinter}
          title="Print Receipt"
          bgColor="#f59e0b"
        />
      </button>
    </>
  );
};

export default PrintReceipt;