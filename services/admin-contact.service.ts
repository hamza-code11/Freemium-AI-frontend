import api from '@/lib/axios';

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ContactMessageListResponse {
  items: ContactMessage[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  unread: number;
}

interface ListParams {
  page: number;
  pageSize: number;
  search?: string;
  unreadOnly?: boolean;
}

export const adminContactService = {
  async list(params: ListParams): Promise<ContactMessageListResponse> {
    const p = new URLSearchParams();
    p.append('page', String(params.page));
    p.append('page_size', String(params.pageSize));
    if (params.search) p.append('search', params.search);
    if (params.unreadOnly) p.append('unread_only', 'true');

    const { data } = await api.get<ContactMessageListResponse>(
      `/admin/contact?${p.toString()}`,
    );
    return data;
  },

  async markRead(id: number, read: boolean = true): Promise<ContactMessage> {
    const { data } = await api.patch<ContactMessage>(
      `/admin/contact/${id}/read?read=${read}`,
    );
    return data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/admin/contact/${id}`);
  },
};