// hooks/useHistory.ts
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  historyService,
  HistoryItem,
  HistoryStats,
  HistoryFilters,
} from '@/services/history.service';

export const useHistory = (initialFilters: HistoryFilters = {}) => {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [stats, setStats] = useState<HistoryStats | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<HistoryFilters>(initialFilters);

  // 🔥 initialFilters change hone par update karein
  useEffect(() => {
    setFilters(initialFilters);
  }, [JSON.stringify(initialFilters)]);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, historyRes] = await Promise.all([
        historyService.getStats(),
        historyService.getHistory(filters),
      ]);
      setStats(statsRes);
      setItems(historyRes.items);
      setTotal(historyRes.total);
      setTotalPages(historyRes.total_pages);
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Failed to load history');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    items,
    stats,
    loading,
    total,
    totalPages,
    filters,
  };
};
