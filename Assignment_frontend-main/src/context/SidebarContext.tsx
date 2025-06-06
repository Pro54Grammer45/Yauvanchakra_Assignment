'use client'

import { createContext, useState, useContext, useRef, useEffect, ReactNode, Dispatch, SetStateAction, MutableRefObject, useCallback, useMemo } from 'react' // Import useCallback and useMemo
import LanguageServices from "@/services/LanguageServices";
import SettingServices from "@/services/SettingServices";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import "@/i18n";

interface Language {
  iso_code: string;
  name: string;
  flag: string;
  [key: string]: any;
}

interface SidebarContextType {
  source: any;
  method: string;
  setMethod: Dispatch<SetStateAction<string>>;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  closeBulkDrawer: () => void;
  isBulkDrawerOpen: boolean;
  toggleBulkDrawer: () => void;
  isModalOpen: boolean;
  toggleModal: () => void;
  closeModal: () => void;
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  lang: string;
  setLang: Dispatch<SetStateAction<string>>;
  currLang: Language | null;
  handleLanguageChange: (value: Language) => void;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  handleChangePage: (p: number) => void;
  searchText: string | null;
  setSearchText: Dispatch<SetStateAction<string | null>>;
  category: any;
  setCategory: Dispatch<SetStateAction<any>>;
  searchRef: MutableRefObject<HTMLInputElement | null>;
  handleSubmitForAll: (e: React.FormEvent<HTMLFormElement>) => void;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  zone: string;
  setZone: Dispatch<SetStateAction<string>>;
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
  sortedField: string;
  setSortedField: Dispatch<SetStateAction<string>>;
  resultsPerPage: number;
  limitData: number;
  setLimitData: Dispatch<SetStateAction<number>>;
  windowDimension: number;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  invoice: string | null;
  setInvoice: Dispatch<SetStateAction<string | null>>;
  invoiceRef: MutableRefObject<HTMLInputElement | null>;
  setNavBar: Dispatch<SetStateAction<boolean>>;
  navBar: boolean;
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const resultsPerPage = 20;
  const searchRef = useRef<HTMLInputElement | null>(null);
  const invoiceRef = useRef<HTMLInputElement | null>(null);

  // State variables
  const [limitData, setLimitData] = useState(20);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBulkDrawerOpen, setIsBulkDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [lang, setLang] = useState("en");
  const [currLang, setCurrLang] = useState<Language | null>({ // Added type assertion
    iso_code: "en",
    name: "English",
    flag: "US",
  });
  const [time, setTime] = useState("");
  const [sortedField, setSortedField] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState<string | null>(null); // Added type assertion
  const [invoice, setInvoice] = useState<string | null>(null); // Added type assertion
  const [zone, setZone] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState<any>(null); // Added type assertion
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [method, setMethod] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [windowDimension, setWindowDimension] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [loading, setLoading] = useState(false);
  const [navBar, setNavBar] = useState(true);
  const { i18n } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);

  // Tanstack Queries (these are stable functions, but their data changes)
  const { data: globalSetting } = useQuery({
    queryKey: ["globalSetting"],
    queryFn: async () => await SettingServices.getGlobalSetting(),
    staleTime: 20 * 60 * 1000,
    gcTime: 25 * 60 * 1000,
  });

  const { data: languages } = useQuery({
    queryKey: ["languages"],
    queryFn: async () => await LanguageServices.getShowingLanguage(),
    staleTime: 20 * 60 * 1000,
    gcTime: 25 * 60 * 1000,
  });

  // Memoized functions using useCallback
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []); // Empty dependency array because setIsSidebarOpen is stable

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setIsDrawerOpen((prev) => !prev), []);

  const closeBulkDrawer = useCallback(() => setIsBulkDrawerOpen(false), []);
  const toggleBulkDrawer = useCallback(() => setIsBulkDrawerOpen((prev) => !prev), []);

  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const toggleModal = useCallback(() => setIsModalOpen((prev) => !prev), []);

  const handleLanguageChange = useCallback((value: Language) => { // Added type for value
    Cookies.set("i18next", value?.iso_code, {
      sameSite: "None",
      secure: true,
    });
    i18n.changeLanguage(value?.iso_code);
    setLang(value?.iso_code);
    Cookies.set("_currLang", JSON.stringify(value), {
      sameSite: "None",
      secure: true,
    });
    setCurrLang(value);
  }, [i18n, setLang, setCurrLang]); // Dependencies: i18n (stable), setLang, setCurrLang (setters are stable)

  const handleChangePage = useCallback((p: number) => { // Added type for p
    setCurrentPage(p);
  }, [setCurrentPage]); // Dependency: setCurrentPage (stable)

  const handleSubmitForAll = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchRef?.current?.value) return setSearchText(null);
    setSearchText(searchRef.current.value);
    setCategory(null);
  }, [setSearchText, setCategory]); // Dependencies: setSearchText, setCategory (setters are stable)

  // console.log("globalSetting", globalSetting, "languages", languages);

  // useEffect for language settings
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pathname = window.location.pathname === "/login";

    const defaultLang = globalSetting?.default_language || "en";
    const cookieLang = Cookies.get("i18next");
    const currLangCookie = Cookies.get("_currLang"); // Renamed to avoid conflict with state `currLang`

    const removeRegion = (langCode: string | undefined) => langCode?.split("-")[0]; // Added type for langCode

    let selectedLang = removeRegion(cookieLang || defaultLang);

    // Ensure language consistency with global settings
    if (globalSetting?.default_language) {
      selectedLang = removeRegion(globalSetting.default_language);
    }

    // Update state with selected language
    setLang(selectedLang || 'en'); // Ensure a default value

    // Set i18next language & update cookies **only when needed**
    if (!cookieLang || cookieLang !== selectedLang) {
      Cookies.set("i18next", selectedLang, {
        sameSite: "None",
        secure: true,
      });
    }

    // Change i18n language **only if it differs**
    if (i18n.language !== selectedLang && !currLangCookie) {
      i18n.changeLanguage(selectedLang);
    }

    // Find the corresponding language object
    if (languages?.length && !pathname && !currLangCookie) {
      const result = languages?.find((lang) => lang?.iso_code === selectedLang);
      setCurrLang(result || null); // Ensure a default value
    }
  }, [globalSetting?.default_language, languages, i18n, setLang, setCurrLang]); // Added all dependencies

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Memoize the entire context value object
  const contextValue = useMemo(() => {
    return {
      source: null, // Placeholder for axios cancel token'',
      method, setMethod,
      isSidebarOpen, toggleSidebar, closeSidebar,
      isDrawerOpen, toggleDrawer, closeDrawer, setIsDrawerOpen,
      closeBulkDrawer, isBulkDrawerOpen, toggleBulkDrawer,
      isModalOpen, toggleModal, closeModal,
      isUpdate, setIsUpdate,
      lang, setLang,
      currLang, handleLanguageChange,
      currentPage, setCurrentPage, handleChangePage,
      searchText, setSearchText,
      category, setCategory,
      searchRef, handleSubmitForAll,
      status, setStatus,
      zone, setZone,
      time, setTime,
      sortedField, setSortedField,
      resultsPerPage, // resultsPerPage is a constant, so no setter needed
      limitData, setLimitData,
      windowDimension, // windowDimension has no setter, updated by useEffect
      modalOpen, setModalOpen,
      startDate, setStartDate,
      endDate, setEndDate,
      loading, setLoading,
      invoice, setInvoice,
      invoiceRef,
      setNavBar, navBar,
      tabIndex, setTabIndex,
    };
  }, [
    // State variables (include all that are part of the value)
    method, isSidebarOpen, isDrawerOpen, isBulkDrawerOpen, isModalOpen, isUpdate,
    lang, currLang, currentPage, searchText, category, status, zone, time,
    sortedField, limitData, windowDimension, modalOpen, startDate, endDate,
    loading, invoice, navBar, tabIndex,

    // All the setter functions (they are stable)
    setMethod, setIsSidebarOpen, setIsDrawerOpen, setIsBulkDrawerOpen, setIsModalOpen,
    setIsUpdate, setLang, setCurrLang, setCurrentPage, setSearchText, setCategory,
    setStatus, setZone, setTime, setSortedField, setLimitData, setModalOpen,
    setStartDate, setEndDate, setLoading, setInvoice, setNavBar, setTabIndex,

    // All the memoized functions (they are stable)
    toggleSidebar, closeSidebar, toggleDrawer, closeDrawer, closeBulkDrawer, toggleBulkDrawer,
    toggleModal, closeModal, handleLanguageChange, handleChangePage, handleSubmitForAll,
  ]);

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}