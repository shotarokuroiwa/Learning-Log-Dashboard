import { useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "./useDebounce";

const useLogsFilter = (logs, inputValue) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedSearch = useDebounce(inputValue, 500);

  const updateParams = useCallback(
    (key, value) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (!value || value === "all") {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
      }}, { replace: true });
    },[setSearchParams]);

  useEffect(() => {
    updateParams("search", debouncedSearch);
  }, [debouncedSearch, updateParams]);

  // フィルタリングとソート
  const filteredLogs = useMemo(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "all";
    const status = searchParams.get("status") || "all";
    const sort = searchParams.get("sort") || "newest";

    let result = logs.filter((log) => {
      const matchSearch = log.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchCategory = category === "all" || log.category === category;
      const matchStatus = status === "all" || log.status === status;
      return matchSearch && matchCategory && matchStatus;
    });

    result.sort((a, b) => {
      if (sort === "newest") return new Date(b.date) - new Date(a.date);
      if (sort === "oldest") return new Date(a.date) - new Date(b.date);
      if (sort === "longest") return b.minutes - a.minutes;
      return 0;
    });

    return result;
  }, [logs, searchParams]);

  return { filteredLogs, updateParams, searchParams };
};

export default useLogsFilter;
