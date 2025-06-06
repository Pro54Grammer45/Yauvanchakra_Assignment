'use client';

import Ajv from "ajv";
import csvToJson from "csvtojson";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isToday from "dayjs/plugin/isToday";
import { useContext, useEffect, useMemo, useRef, useState, useCallback } from "react"; // Added useCallback
import { usePathname } from "next/navigation";

//internal import
import useUtilsFunction from "./useUtilsFunction";
import useDisableForDemo from "./useDisableForDemo";
import { SidebarContext } from "@/context/SidebarContext";
import AttributeServices from "@/services/AttributeServices";
import CategoryServices from "@/services/CategoryServices";
import CouponServices from "@/services/CouponServices";
import CurrencyServices from "@/services/CurrencyServices";
import CustomerServices from "@/services/CustomerServices";
import LanguageServices from "@/services/LanguageServices";
import ProductServices from "@/services/ProductServices";
import { notifyError, notifySuccess } from "@/utils/toast";

const categorySchema = {
  type: "object",
  properties: {
    _id: { type: "string" },
    name: { type: "object" },
    description: { type: "object" },
    icon: { type: "string" },
    status: { type: "string" },
  },
  required: ["name"],
};
const attributeSchema = {
  type: "object",
  properties: {
    status: { type: "string" },
    title: { type: "object" },
    name: { type: "object" },
    variants: { type: "array" },
    option: { type: "string" },
    type: { type: "string" },
  },
  required: ["name", "title"],
};
const couponSchema = {
  type: "object",
  properties: {
    title: { type: "object" },
    couponCode: { type: "string" },
    endTime: { type: "string" },
    discountPercentage: { type: "number" },
    minimumAmount: { type: "number" },
    productType: { type: "string" },
    logo: { type: "string" },
    discountType: { type: "object" },
    status: { type: "string" },
  },
  required: ["title", "couponCode", "endTime", "status"],
};
const customerSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string" },
  },
  required: ["name", "email"],
};

const useFilter = (data: any[]): any => {
  const ajv = new Ajv({ allErrors: true });

  const [filter, setFilter] = useState<string>("");
  const [sortedField, setSortedField] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [searchUser, setSearchUser] = useState<string>("");
  const [searchCoupon, setSearchCoupon] = useState<string>("");
  const [searchOrder, setSearchOrder] = useState<string>("");
  const [categoryType, setCategoryType] = useState<string>("");
  const [attributeTitle, setAttributeTitle] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [zone, setZone] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [pending, setPending] = useState<any[]>([]);
  const [processing, setProcessing] = useState<any[]>([]);
  const [delivered, setDelivered] = useState<any[]>([]);
  const [status, setStatus] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [time, setTime] = useState<any>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataTable, setDataTable] = useState<any[]>([]); //tableTable for showing on table according to filtering
  const [todayOrder, setTodayOrder] = useState<any>("");
  const [monthlyOrder, setMonthlyOrder] = useState<any>("");
  const [totalOrder, setTotalOrder] = useState<any>("");
  const [selectedFile, setSelectedFile] = useState<any[]>([]);
  const [filename, setFileName] = useState<string>("");
  const [isDisabled, setIsDisable] = useState<boolean>(false);
  const [shipping, setShipping] = useState<string>("");
  const [newProducts] = useState<any[]>([]); // This is a const, so newProducts won't trigger re-renders if its content changes, only if the array reference itself changes which is rare for const.
  const currencyRef = useRef<string>("");
  const searchRef = useRef<string>("");
  const userRef = useRef<string>("");
  const couponRef = useRef<string>("");
  const orderRef = useRef<string>("");
  const categoryRef = useRef<string>("");
  const attributeRef = useRef<string>("");
  const countryRef = useRef<string>("");
  const languageRef = useRef<string>("");
  const taxRef = useRef<string>("");
  const shippingRef = useRef<string>("");

  dayjs.extend(isBetween);
  dayjs.extend(isToday);
  const pathname = usePathname();
  const { lang, setIsUpdate, setLoading } = useContext(SidebarContext);
  const { globalSetting } = useUtilsFunction();

  const { handleDisableForDemo } = useDisableForDemo();

  // serviceData filtering: Now this useMemo only computes the filtered services,
  // it doesn't set any state derived from these computations directly.
  const filteredServices = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - time);
    let services = data?.map((el) => {
      const newDate = new Date(el?.updatedAt).toLocaleString("en-US", {
        timeZone: globalSetting?.default_time_zone,
      });
      const newObj = {
        ...el,
        updatedDate: newDate === "Invalid Date" ? "" : newDate,
      };
      return newObj;
    });

    // Products filtering (these are filters that modify `services` in place for return)
    if (filter) {
      services = services.filter((item) => item.parent === filter);
    }
    if (sortedField === "Low") {
      services = services.sort((a, b) => a.price < b.price && -1);
    }
    if (sortedField === "High") {
      services = services.sort((a, b) => a.price > b.price && -1);
    }
    if (searchText) {
      services = services.filter((search) =>
        search?.title?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (attributeTitle) {
      services = services.filter(
        (search) =>
          search?.title[lang]
            ?.toLowerCase()
            ?.includes(attributeTitle?.toLowerCase()) ||
          search?.attribute
            ?.toLowerCase()
            .includes(attributeTitle?.toLowerCase())
      );
    }

    if (categoryType) {
      services = services.filter(
        (search) =>
          search?.name[lang]
            ?.toLowerCase()
            ?.includes(categoryType?.toLowerCase()) ||
          search?.category?.toLowerCase().includes(categoryType?.toLowerCase())
      );
    }

    //admin Filtering
    if (role) {
      services = services.filter((staff) => staff.role === role);
    }
    //User and Admin filtering
    if (searchUser) {
      services = services.filter(
        (search) =>
          search?.name[lang]
            ?.toLowerCase()
            .includes(searchUser.toLowerCase()) ||
          search?.phone?.toLowerCase().includes(searchUser.toLowerCase()) ||
          search?.email?.toLowerCase().includes(searchUser.toLowerCase())
      );
    }
    //Coupon filtering
    if (searchCoupon) {
      services = services?.filter(
        (search) =>
          search?.title[lang]
            ?.toLowerCase()
            ?.includes(searchCoupon?.toLowerCase()) ||
          search?.couponCode
            ?.toLowerCase()
            .includes(searchCoupon?.toLowerCase())
      );
    }
    // order filtering
    if (status) {
      services = services.filter((order) => order.status === status);
    }
    if (searchOrder) {
      services = services.filter((search) =>
        search.contact.toLowerCase().includes(searchOrder.toLowerCase())
      );
    }
    if (time) {
      services = services.filter((order) =>
        dayjs(order.createdAt).isBetween(date, new Date())
      );
    }
    if (country) {
      services = services.filter(
        (search) =>
          search?.name[lang]
            ?.toLowerCase()
            ?.includes(country?.toLowerCase()) ||
          search?.country?.toLowerCase().includes(country?.toLowerCase())
      );
    }
    if (zone) {
      services = services.filter(
        (search) =>
          search?.name[lang]
            ?.toLowerCase()
            ?.includes(zone?.toLowerCase()) ||
          search?.zone?.toLowerCase().includes(zone?.toLowerCase())
      );
    }
    if (language) {
      services = services.filter(
        (search) =>
          search?.name[lang]
            ?.toLowerCase()
            ?.includes(language?.toLowerCase()) ||
          search?.language?.toLowerCase().includes(language?.toLowerCase())
      );
    }
    if (currency) {
      services = services.filter(
        (search) =>
          search?.name[lang]
            ?.toLowerCase()
            ?.includes(currency?.toLowerCase()) ||
          search?.currency?.toLowerCase().includes(currency?.toLowerCase())
      );
    }
    if (shipping) {
      services = services.filter(
        (search) =>
          search?.name[lang]
            ?.toLowerCase()
            ?.includes(shipping?.toLowerCase()) ||
          search?.shipping?.toLowerCase().includes(shipping?.toLowerCase())
      );
    }
    return services;
  }, [
    data,
    filter,
    sortedField,
    searchText,
    searchUser,
    searchCoupon,
    searchOrder,
    categoryType,
    attributeTitle,
    country,
    zone,
    language,
    currency,
    status,
    role,
    time,
    shipping,
    lang,
    globalSetting?.default_time_zone,
  ]);

  // NEW useEffect for dashboard-specific state updates
  useEffect(() => {
    if (pathname === "/dashboard" && filteredServices) { // Only run for dashboard and if services exist
      const orderPending = filteredServices.filter((statusP) => statusP.status === "Pending");
      setPending(orderPending);

      const orderProcessing = filteredServices.filter((statusO) => statusO.status === "Processing");
      setProcessing(orderProcessing);

      const orderDelivered = filteredServices.filter((statusD) => statusD.status === "Delivered");
      setDelivered(orderDelivered);

      const todayServices = filteredServices.filter((order) => dayjs(order.createdAt).isToday());
      const todayOrderValue = todayServices.reduce((preValue, currentValue) => preValue + currentValue.total, 0);
      setTodayOrder(todayOrderValue);

      const monthlyServices = filteredServices.filter((order) =>
        dayjs(order.createdAt).isBetween(new Date().setDate(new Date().getDate() - 30), new Date())
      );
      const monthlyOrderValue = monthlyServices.reduce((preValue, currentValue) => preValue + currentValue.total, 0);
      setMonthlyOrder(monthlyOrderValue);

      const totalOrderValue = filteredServices.reduce((preValue, currentValue) => preValue + currentValue.total, 0);
      setTotalOrder(totalOrderValue);
    }
  }, [pathname, filteredServices, setPending, setProcessing, setDelivered, setTodayOrder, setMonthlyOrder, setTotalOrder]);


  //pagination functionality start
  const resultsPerPage = 20;
  const totalResults = filteredServices?.length; // Use filteredServices here

  // Memoize handleChangePage
  const handleChangePage = useCallback((p: number) => {
    setCurrentPage(p);
  }, [setCurrentPage]);

  useEffect(() => {
    setDataTable(
      filteredServices?.slice( // Use filteredServices here
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
      )
    );
  }, [filteredServices, currentPage, resultsPerPage]); // Depend on filteredServices


  //table form submit function for search start
  // All handleSubmit functions need to be useCallback
  const handleSubmitForAll = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchText(searchRef.current.valueOf); // Note: .valueOf might not be what you want for input value. Usually it's .value
  }, [setSearchText]);

  const handleSubmitUser = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchUser(userRef.current.valueOf);
  }, [setSearchUser]);

  const handleSubmitCoupon = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchCoupon(couponRef.current.valueOf);
  }, [setSearchCoupon]);

  const handleSubmitOrder = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchOrder(orderRef.current.valueOf);
  }, [setSearchOrder]);

  const handleSubmitCategory = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCategoryType(categoryRef.current.valueOf);
  }, [setCategoryType]);

  const handleSubmitAttribute = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttributeTitle(attributeRef.current.valueOf);
  }, [setAttributeTitle]);

  const handleSubmitCountry = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCountry(countryRef.current.valueOf);
  }, [setCountry]);

  const handleSubmitShipping = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShipping(shippingRef.current.valueOf);
  }, [setShipping]);

  const handleSubmitLanguage = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLanguage(languageRef.current.valueOf);
  }, [setLanguage]);

  const handleSubmitCurrency = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrency(currencyRef.current.valueOf);
  }, [setCurrency]);


  // handle submit multiple product data with csv format
  const handleOnDrop = useCallback((data: any[]) => { // Added type
    for (let i = 0; i < data.length; i++) {
      newProducts.push(data[i].data);
    }
  }, [newProducts]); // newProducts is a const, so this dependency is stable

  const handleUploadProducts = useCallback(() => {
    if (newProducts.length < 1) {
      notifyError("Please upload/select csv file first!");
    } else {
      if (handleDisableForDemo()) {
        return;
      }
      ProductServices.addAllProducts(newProducts)
        .then((res) => {
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
    }
  }, [newProducts, handleDisableForDemo]);

  const handleSelectFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (handleDisableForDemo()) {
      return;
    }

    const fileReader = new FileReader();
    const file = e.target?.files?.[0]; // Use optional chaining

    if (!file) return; // Handle no file selected

    if (file.type === "application/json") {
      setFileName(file.name);
      setIsDisable(true);
      console.log("if");

      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = (e) => {
        try {
          let text = JSON.parse(e.target?.result?.toString() || ""); // Use optional chaining and default
          let data: any[] = []; // Explicitly type data

          if (pathname === "/categories") {
            data = text.map((value: any) => ({ // Type value
              _id: value._id, id: value.id, status: value.status, name: value.name,
              description: value.description, parentName: value.parentName,
              parentId: value.parentId, icon: value.icon,
            }));
          }
          if (pathname === "/attributes") {
            data = text.map((value: any) => ({
              _id: value._id, status: value.status, title: value.title,
              name: value.name, variants: value.variants, option: value.option, type: value.type,
            }));
          }
          if (pathname === "/coupons") {
            data = text.map((value: any) => ({
              title: value.title, couponCode: value.couponCode, endTime: value.endTime,
              discountPercentage: value.discountPercentage, minimumAmount: value.minimumAmount,
              productType: value.productType, logo: value.logo, discountType: value.discountType,
              status: value.status,
            }));
          }
          if (pathname === "/customers") {
            data = text.map((value: any) => ({
              name: value.name, email: value.email, password: value.password, phone: value.phone,
            }));
          }
          setSelectedFile(data);
        } catch (error) {
          notifyError("Error parsing JSON file!");
          console.error("JSON parsing error:", error);
          setFileName("");
          setIsDisable(false);
        }
      };
    } else if (file.type === "text/csv") {
      setFileName(file.name);
      setIsDisable(true);

      console.log("else if");

      fileReader.onload = async (event) => {
        try {
          const text = event.target?.result?.toString() || "";
          const json = await csvToJson().fromString(text);
          let data: any[] = [];

          if (pathname === "/categories") {
            data = json.map((value: any) => ({
              _id: value._id, id: value.id, status: value.status,
              name: JSON.parse(value.name), description: JSON.parse(value.description),
              parentName: value.parentName, parentId: value.parentId, icon: value.icon,
            }));
          }
          if (pathname === "/attributes") {
            data = json.map((value: any) => ({
              status: value.status, title: JSON.parse(value.title), name: JSON.parse(value.name),
              variants: JSON.parse(value.variants), option: value.option, type: value.type,
            }));
          }

          if (pathname === "/coupons") {
            data = json.map((value: any) => ({
              title: JSON.parse(value.title), couponCode: value.couponCode, endTime: value.endTime,
              discountPercentage: value.discountPercentage ? JSON.parse(value.discountPercentage) : 0,
              minimumAmount: value.minimumAmount ? JSON.parse(value.minimumAmount) : 0,
              productType: value.productType, logo: value.logo, status: value.status,
            }));
          }
          if (pathname === "/customers") {
            data = json.map((value: any) => ({
              name: value.name, email: value.email, password: value.password, phone: value.phone,
            }));
          }
          setSelectedFile(data);
        } catch (error) {
          notifyError("Error parsing CSV file!");
          console.error("CSV parsing error:", error);
          setFileName("");
          setIsDisable(false);
        }
      };
      fileReader.readAsText(file);
    } else {
      setFileName(file.name);
      setIsDisable(true);
      notifyError("Unsupported file type! Please select a valid .JSON/.CSV file."); // Changed message
    }
  }, [handleDisableForDemo, pathname, setSelectedFile, setFileName, setIsDisable]); // Added dependencies

  const handleUploadMultiple = useCallback((files: File[]) => {
    if (handleDisableForDemo()) {
      return;
    }
    setSelectedFile(files);

    if (selectedFile.length > 0) { // Changed condition to > 0 as files argument is already the selected files.
      setLoading(true); // Moved setLoading outside specific paths for consistent behavior

      let validationResult = true; // Assume valid initially
      let schemaToValidate = null;

      if (pathname === "/categories") {
        schemaToValidate = categorySchema;
      } else if (pathname === "/customers") {
        schemaToValidate = customerSchema;
      } else if (pathname === "/coupons") {
        schemaToValidate = couponSchema;
      } else if (pathname === "/attributes") {
        schemaToValidate = attributeSchema;
      }

      if (schemaToValidate) {
        validationResult = selectedFile.every(value => ajv.validate(schemaToValidate, value));
      }

      if (validationResult) {
        let servicePromise;
        if (pathname === "/categories") {
          servicePromise = CategoryServices.addAllCategory(selectedFile);
        } else if (pathname === "/customers") {
          servicePromise = CustomerServices.addAllCustomers(selectedFile);
        } else if (pathname === "/coupons") {
          servicePromise = CouponServices.addAllCoupon(selectedFile);
        } else if (pathname === "/attributes") {
          servicePromise = AttributeServices.addAllAttributes(selectedFile);
        } else if (pathname === "/languages") {
          servicePromise = LanguageServices.addAllLanguage(selectedFile);
        } else if (pathname === "/currencies") {
          servicePromise = CurrencyServices.addAllCurrency(selectedFile);
        }

        if (servicePromise) {
          servicePromise
            .then((res) => {
              setLoading(false);
              setIsUpdate(true);
              notifySuccess(res.message);
            })
            .catch((err) => {
              setLoading(false);
              notifyError(err.response?.data?.message || err.message);
            });
        } else {
          setLoading(false);
          notifyError("No service found for this pathname.");
        }

      } else {
        setLoading(false); // Stop loading if validation fails
        notifyError("Please enter valid data!");
      }
    } else {
      notifyError("Please select a valid .JSON/.CSV file first!");
    }
  }, [handleDisableForDemo, pathname, selectedFile, ajv, setLoading, setIsUpdate]);


  const handleRemoveSelectFile = useCallback((file: File) => {
    setFileName("");
    setSelectedFile(prev => prev.filter(f => f !== file));
    setTimeout(() => setIsDisable(false), 1000);
  }, [setSelectedFile, setFileName, setIsDisable]);

  return {
    userRef,
    searchRef,
    couponRef,
    orderRef,
    categoryRef,
    attributeRef,
    pending,
    processing,
    delivered,
    todayOrder,
    monthlyOrder,
    totalOrder,
    setFilter,
    setSortedField,
    setStatus,
    setRole,
    time,
    zone,
    setTime,
    taxRef,
    setZone,
    filename,
    countryRef,
    dataTable,
    serviceData: filteredServices, // Renamed for clarity
    country,
    setSearchText,
    setCountry,
    isDisabled,
    languageRef,
    currencyRef,
    shippingRef,
    setSearchUser,
    setDataTable,
    setCategoryType,
    handleChangePage,
    totalResults,
    resultsPerPage,
    handleOnDrop,
    setSearchCoupon,
    setAttributeTitle,
    handleSelectFile,
    handleSubmitUser,
    handleSubmitForAll,
    handleSubmitCoupon,
    handleSubmitOrder,
    handleSubmitCategory,
    handleSubmitAttribute,
    handleUploadProducts,
    handleSubmitCountry,
    handleSubmitCurrency,
    handleSubmitShipping,
    handleSubmitLanguage,
    handleUploadMultiple,
    handleRemoveSelectFile,
  };
};

export default useFilter;