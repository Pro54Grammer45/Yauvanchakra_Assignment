'use client';

import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";

//internal import
import { AdminContext } from "@/context/AdminContext";
import AdminServices from "@/services/AdminServices";
import { notifyError, notifySuccess } from "@/utils/toast";

const useLoginSubmit = (): any => {
  const [loading, setLoading] = useState<boolean>(false);
  const { dispatch } = useContext(AdminContext);
  const router = useRouter();
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = async ({ name, email, verifyEmail, password, role }: any): Promise<void> => {
    setLoading(true);
    const cookieTimeOut = 1;

    try {
      if (pathname === "/login") {
        console.log("Attempting login with email:", email); // ADD THIS
        console.log("Frontend debug: Password value before AdminServices.loginAdmin:", password);
        const res = await AdminServices.loginAdmin({ email, password });
        console.log("Response from AdminServices.loginAdmin:", res); // ADD THIS - CRITICAL!

        if (res) {
          // Check if 'res' contains a token property
          if (!res.token) {
            console.error("Login response 'res' does not contain a 'token' property:", res); // ADD THIS
            notifyError("Login failed: No token received."); // ADD THIS
            setLoading(false); // Make sure to reset loading
            return; // Stop execution if no token
          }

          // Set full access for all users
          const adminData = {
            ...res,
            role: "Super Admin",
            accessList: ["dashboard", "products", "orders", "customers", "settings", "staff", "reports", "store-settings"]
          };

          notifySuccess("Login Success!");
          dispatch({ type: "USER_LOGIN", payload: adminData });

          console.log("Attempting to set adminInfo cookie with data:", adminData); // ADD THIS

          Cookies.set("adminInfo", JSON.stringify(adminData), {
            expires: cookieTimeOut,
            sameSite: "None",
            // secure: true,
            // TODO: When deploying to production, set secure to true
          });
          console.log("adminInfo cookie set call completed."); // ADD THIS
          router.replace("/dashboard");
        } else {
          console.error("Login API call returned a falsy response (res is undefined/null)."); // ADD THIS
          notifyError("Login failed: Empty response."); // ADD THIS
        }
      }

      if (pathname === "/signup") {
        const res = await AdminServices.registerAdmin({
          name,
          email,
          password,
          role: "Super Admin", // Force Super Admin role
        });

        if (res) {
          // Set full access for all users
          const adminData = {
            ...res,
            role: "Super Admin",
            accessList: ["dashboard", "products", "orders", "customers", "settings", "staff", "reports", "store-settings"]
          };

          notifySuccess("Register Success!");
          dispatch({ type: "USER_LOGIN", payload: adminData });
          Cookies.set("adminInfo", JSON.stringify(adminData), {
            expires: cookieTimeOut,
            sameSite: "None",
            // secure: true,
            //TODO: When deploying to production, set secure to true
          });
          router.replace("/");
        }
      }

      if (pathname === "/forgot-password") {
        const res = await AdminServices.forgetPassword({ verifyEmail });
        notifySuccess(res.message);
      }
    } catch (err) {
      console.error("Login submission error:", err); // ADD THIS
      notifyError(err?.response?.data?.message || err?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loading,
  };
};

export default useLoginSubmit;
