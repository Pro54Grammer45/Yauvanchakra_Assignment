'use client';

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

const useQuery = (): ReturnType<typeof useSearchParams> => {
  const searchParams = useSearchParams();
  return useMemo(() => searchParams, [searchParams]);
};

export default useQuery;
