import { useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import  useDebounce from './useDebounce';

const useLogsFilter = (logs, inputValue) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedSearch = useDebounce(inputValue, 500);

  // URLパラメータを更新する内部関数
  const updateParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === 'all') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams, { replace: true });
  };

  useEffect(() => {
    updateParams('search', debouncedSearch);
  }, [debouncedSearch]);

  // フィルタリングとソート
  const filteredLogs = useMemo(() => {
    const search = searchParams.get('search') || "";
    const category = searchParams.get('category') || 'all';
    const sort = searchParams.get('sort') || 'newest';

    let result = logs.filter(log => {
      const matchSearch = log.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'all' || log.category === category;
      return matchSearch && matchCategory;
    });

    result.sort((a, b) => {
      if (sort === 'newest') return new Date(b.date) - new Date(a.date);
      if (sort === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sort === 'longest') return b.minutes - a.minutes;
      return 0;
    });

    return result;
  }, [logs, searchParams]);

  return { filteredLogs, updateParams, searchParams };
};

export default useLogsFilter;