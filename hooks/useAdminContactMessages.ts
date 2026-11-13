import { useState, useEffect, useCallback } from 'react';
import {
  adminContactService,
  ContactMessage,
} from '@/services/admin-contact.service';
import { notifyContactUnreadChanged } from '@/hooks/useUnreadContactCount';
import toast from 'react-hot-toast';

interface Args {
  search: string;
  unreadOnly: boolean;
  pageSize: number;
}

export const useAdminContactMessages = ({ search, unreadOnly, pageSize }: Args) => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [unread, setUnread] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, unreadOnly]);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminContactService.list({
        page: currentPage,
        pageSize,
        search,
        unreadOnly,
      });
      setMessages(res.items);
      setTotal(res.total);
      setTotalPages(res.total_pages);
      setUnread(res.unread);
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, search, unreadOnly]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const markRead = async (id: number, read: boolean) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, is_read: read } : m)),
    );
    setUnread((prev) => Math.max(0, prev + (read ? -1 : 1)));

    try {
      await adminContactService.markRead(id, read);
      notifyContactUnreadChanged();
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_read: !read } : m)),
      );
      setUnread((prev) => Math.max(0, prev + (read ? 1 : -1)));
      toast.error('Failed to update');
    }
  };

  const remove = async (id: number) => {
    const target = messages.find((m) => m.id === id);
    const wasUnread = target ? !target.is_read : false;

    setMessages((prev) => prev.filter((m) => m.id !== id));
    setTotal((prev) => Math.max(0, prev - 1));
    if (wasUnread) setUnread((prev) => Math.max(0, prev - 1));

    try {
      await adminContactService.remove(id);
      toast.success('Message deleted');
      notifyContactUnreadChanged();

      // If current page becomes empty after delete, go back one page
      if (messages.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err: any) {
      toast.error('Failed to delete');
      fetch();
    }
  };

  return {
    messages,
    loading,
    total,
    totalPages,
    unread,
    currentPage,
    setCurrentPage,
    markRead,
    remove,
    refresh: fetch,
  };
};