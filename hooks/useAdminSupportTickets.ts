import { useState, useEffect, useCallback } from 'react';
import { adminSupportService, SupportTicket, TicketStatus } from '@/services/admin-support.service';
import toast from 'react-hot-toast';

export const useAdminSupportTickets = (search: string, statusFilter: string, pageSize: number) => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminSupportService.list({
        page: currentPage,
        pageSize,
        search,
        status: statusFilter,
      });
      setTickets(res.items);
      setTotal(res.total);
      setTotalPages(res.total_pages);
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, search, statusFilter]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const updateStatus = async (id: number, newStatus: TicketStatus) => {
    // Optimistic update
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    try {
      await adminSupportService.updateStatus(id, newStatus);
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update status');
      fetch(); // Revert on fail
    }
  };

  return { tickets, loading, total, totalPages, currentPage, setCurrentPage, updateStatus, refresh: fetch };
};
