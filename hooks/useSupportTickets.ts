// hooks/useSupportTickets.ts
import { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { supportService, SupportTicket, CreateTicketPayload } from '@/services/support.service';

export const useSupportTickets = (initialPage = 1, pageSize = 5) => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const fetchTickets = useCallback(async (page: number = currentPage) => {
    setLoading(true);
    try {
      const res = await supportService.getTickets(page, pageSize);
      setTickets(res.items);
      setTotal(res.total);
      setTotalPages(res.total_pages);
      setCurrentPage(res.page);
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchTickets(currentPage);
  }, [currentPage, fetchTickets]);

  const submitTicket = async (data: CreateTicketPayload): Promise<boolean> => {
    setSubmitting(true);
    try {
      await supportService.createTicket(data);
      toast.success('Ticket submitted successfully!');
      await fetchTickets(1);
      setCurrentPage(1);
      return true;
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Failed to submit ticket');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    tickets,
    loading,
    submitting,
    total,
    totalPages,
    currentPage,
    setCurrentPage,
    submitTicket,
    refresh: () => fetchTickets(currentPage),
  };
};
