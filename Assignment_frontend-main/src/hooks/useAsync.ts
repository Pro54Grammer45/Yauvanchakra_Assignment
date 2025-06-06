'use client';

import axios from "axios";
// import Cookies from 'js-cookie';
import { Dispatch, SetStateAction, useContext, useEffect, useState, useCallback } from "react";
import { SidebarContext } from "@/context/SidebarContext";

interface UseAsyncResult<T> {
  data: T | undefined;
  error: string;
  loading: boolean;
}

interface SidebarContextDependencies {
  invoice: any; // Use appropriate types based on your context structure
  status: any;
  zone: any;
  time: any;
  // source: any; // Review this. If it's an axios.CancelToken.source from context, it's problematic.
  limitData: any;
  startDate: any;
  endDate: any;
  method: any;
  isUpdate: boolean; // Flag to trigger update
  setIsUpdate: Dispatch<SetStateAction<boolean>>; // Setter for the flag
  currentPage: number;
  category: any;
  searchText: string;
  sortedField: any;
}

const useAsync = <T = any>(asyncFunction: (args: any) => Promise<T>): UseAsyncResult<T> => {
  const [data, setData] = useState<T>([] as any);
  const [error, setError] = useState<string>("");
  // const [errCode, setErrCode] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const {
    invoice,
    status,
    zone,
    time,
    // source,
    limitData,
    startDate,
    endDate,
    method,
    isUpdate,
    setIsUpdate,
    currentPage,
    category,
    searchText,
    sortedField,
  } = useContext<SidebarContextDependencies>(SidebarContext as any);

  const stableAsyncFunction = useCallback(asyncFunction, [asyncFunction]);

  useEffect(() => {
    let unmounted = false;
    const axiosCancelSource = axios.CancelToken.source(); 
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await stableAsyncFunction({ cancelToken: axiosCancelSource.token });
        if (!unmounted) {
          setData(res);
          setError("");
        }
      } catch (err: any) {
        if (!unmounted) {
          if (axios.isCancel(err)) {
            setError("Request cancelled"); // More specific error message for cancellation
          } else {
            setError(err.message || "An unknown error occurred");
          }
          setData(undefined); // Clear data on error
        }
      } finally {
        if (!unmounted) {
          setLoading(false); // Set loading to false after fetch (success or error)

          // !!! CRUCIAL FIX FOR INFINITE RE-RENDER LOOP !!!
          // If `isUpdate` was true, reset it to false *after* the fetch completes.
          // This ensures that setting `isUpdate` back to false doesn't immediately
          // trigger the effect again unless another dependency has also changed.
          if (isUpdate) {
            setIsUpdate(false);
          }
        }
      }
    };

    fetchData();


    return () => {
      unmounted = true;
      axiosCancelSource.cancel("Cancelled in cleanup");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    stableAsyncFunction,
    invoice,
    status,
    zone,
    time,
    method,
    // source,
    limitData,
    startDate,
    endDate,
    isUpdate,
    currentPage,
    category,
    searchText,
    sortedField,
  ]);

  return {
    data,
    error,
    loading,
  };
};

export default useAsync;
