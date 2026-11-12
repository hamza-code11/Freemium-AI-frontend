// hooks/useAdminUsers.ts
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { adminUserService, AdminUser } from '@/services/admin-user.service';
import { UserFilters } from '@/components/admin/users/UsersFilter';

export const useAdminUsers = (
  filters: UserFilters,
  onUserStatusChange?: () => void // 🔥 Callback for parent
) => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  const PAGE_SIZE = 10;

  // 🔥 Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(filters.search), 400);
    return () => clearTimeout(timer);
  }, [filters.search]);

  // 🔥 Fetch Users
  const fetchUsers = useCallback(
    async (page: number, showSkeleton = true) => {
      if (showSkeleton) setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append('page', String(page));
        params.append('page_size', String(PAGE_SIZE));
        if (debouncedSearch) params.append('search', debouncedSearch);
        if (filters.status !== 'all') params.append('status', filters.status);
        if (filters.sort) params.append('sort', filters.sort);
        if (filters.date_range !== 'all') params.append('date_range', filters.date_range);
        if (filters.date_range === 'custom') {
          if (filters.custom_from) params.append('custom_from', filters.custom_from);
          if (filters.custom_to) params.append('custom_to', filters.custom_to);
        }

        const res = await adminUserService.getUsers(params.toString());
        setUsers(res.items);
        setTotal(res.total);
        setTotalPages(res.total_pages);
      } catch (err: any) {
        toast.error(err.response?.data?.detail || 'Failed to load users');
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [
      debouncedSearch,
      filters.status,
      filters.sort,
      filters.date_range,
      filters.custom_from,
      filters.custom_to,
    ]
  );

  // 🔥 Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedSearch,
    filters.status,
    filters.sort,
    filters.date_range,
    filters.custom_from,
    filters.custom_to,
  ]);

  // 🔥 Fetch on page change
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, fetchUsers]);

  // 🔥 OPTIMISTIC TOGGLE
  const toggleSuspension = async (userId: number) => {
    // Optimistic update
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, is_suspended: !u.is_suspended } : u
      )
    );

    try {
      const res = await adminUserService.toggleSuspension(userId);
      toast.success(res.message);

      // 🔥 Notify parent (Stats refresh hoga)
      if (onUserStatusChange) {
        onUserStatusChange();
      }
    } catch (err: any) {
      // Revert on error
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, is_suspended: !u.is_suspended } : u
        )
      );
      toast.error(err.response?.data?.detail || 'Failed to update user');
    }
  };

  return {
    users,
    loading,
    initialLoading,
    total,
    totalPages,
    currentPage,
    setCurrentPage,
    toggleSuspension,
    refresh: () => fetchUsers(currentPage),
  };
};