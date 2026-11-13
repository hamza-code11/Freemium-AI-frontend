import { useState, useEffect, useCallback } from 'react';
import {
  adminUsageService,
  UsageRecordItem,
  UsageDateRange,
  UsageFeature,
} from '@/services/admin-usage.service';

interface Args {
  search: string;
  sort: 'latest' | 'oldest';
  dateRange: UsageDateRange;
  feature: UsageFeature | 'all';
  pageSize: number;
  customFrom?: string;
  customTo?: string;
}

export const useAdminUsage = (args: Args) => {
  const { search, sort, dateRange, feature, pageSize, customFrom, customTo } = args;
  const [records, setRecords] = useState<UsageRecordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sort, dateRange, feature, customFrom, customTo]);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminUsageService.list({
        page: currentPage,
        pageSize,
        search,
        sort,
        dateRange,
        feature,
        customFrom,
        customTo,
      });
      setRecords(res.items);
      setTotal(res.total);
      setTotalPages(res.total_pages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, search, sort, dateRange, feature, customFrom, customTo]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { records, loading, total, totalPages, currentPage, setCurrentPage, refresh: fetch };
};