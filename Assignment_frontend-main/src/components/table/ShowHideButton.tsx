'use client';

import { useContext } from "react";
import Switch from "react-switch";
import { usePathname } from "next/navigation";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import AttributeServices from "@/services/AttributeServices";
import CategoryServices from "@/services/CategoryServices";
import CouponServices from "@/services/CouponServices";
import CurrencyServices from "@/services/CurrencyServices";
import LanguageServices from "@/services/LanguageServices";
import ProductServices from "@/services/ProductServices";
import { notifyError, notifySuccess } from "@/utils/toast";

interface ShowHideButtonProps {
  id: string | number;
  status: string | boolean;
  category: any;
  currencyStatusName?: string;
}

const ShowHideButton: React.FC<ShowHideButtonProps> = ({ id, status, category, currencyStatusName }) => {
  const pathname = usePathname();
  const { setIsUpdate } = useContext(SidebarContext);

  const handleChangeStatus = async (id: string | number) => {
    // return notifyError("This option disabled for this option!");
    try {
      let newStatus;
      if (status === "show") {
        newStatus = "hide";
      } else {
        newStatus = "show";
      }

      if (pathname === "/categories" || category) {
        const res = await CategoryServices.updateStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess(res.message);
      }

      if (pathname === "/products") {
        const res = await ProductServices.updateStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess(res.message);
      }

      if (pathname === "/languages") {
        const res = await LanguageServices.updateStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess(res.message);
      }
      if (pathname === "/currencies") {
        if (currencyStatusName === "status") {
          const res = await CurrencyServices.updateEnabledStatus(id, {
            status: newStatus,
          });
          setIsUpdate(true);
          notifySuccess(res.message);
        } else {
          const res = await CurrencyServices.updateLiveExchangeRateStatus(id, {
            live_exchange_rates: newStatus,
          });
          setIsUpdate(true);
          notifySuccess(res.message);
        }
      }

      if (pathname === "/attributes") {
        const res = await AttributeServices.updateStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess(res.message);
      }

      if (
        pathname === `/attributes/${pathname.split("/")[2]}`
      ) {
        const res = await AttributeServices.updateChildStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess(res.message);
      }

      if (pathname === "/coupons") {
        // console.log('coupns',id)
        const res = await CouponServices.updateStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess(res.message);
      }

      if (pathname === "/our-staff") {
        // console.log('coupns',id)
        const res = await CouponServices.updateStatus(id, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess(res.message);
      }
    } catch (err: any) {
      notifyError(err ? err?.response?.data?.message : err?.message);
    }
  };

  return (
    <Switch
      onChange={() => handleChangeStatus(id)}
      checked={status === "show" ? true : false}
      className="react-switch md:ml-0"
      uncheckedIcon={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: 120,
            fontSize: 14,
            color: "white",
            paddingRight: 22,
            paddingTop: 1,
          }}
        ></div>
      }
      width={30}
      height={15}
      handleDiameter={13}
      offColor="#E53E3E"
      onColor={"#2F855A"}
      checkedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 73,
            height: "100%",
            fontSize: 14,
            color: "white",
            paddingLeft: 20,
            paddingTop: 1,
          }}
        ></div>
      }
    />
  );
};

export default ShowHideButton;
