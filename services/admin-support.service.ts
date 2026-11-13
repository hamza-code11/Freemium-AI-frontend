import api from '@/lib/axios';

export type TicketStatus = 'Pending' | 'In Progress' | 'Resolved';

export interface SupportTicket {
  id: number;
  ticket_number: string;
  name: string;
  email: string;
  subject: string;
  description: string;
  attachment: string | null;
  status: TicketStatus;
  created_at: string;
}

export interface SupportTicketListResponse {
  items: SupportTicket[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

interface ListParams {
  page: number;
  pageSize: number;
  search?: string;
  status?: string;
}

export const adminSupportService = {
  async list(params: ListParams): Promise<SupportTicketListResponse> {
    const p = new URLSearchParams();
    p.append('page', String(params.page));
    p.append('page_size', String(params.pageSize));
    if (params.search) p.append('search', params.search);
    if (params.status && params.status !== 'All') p.append('status', params.status);

    const { data } = await api.get<SupportTicketListResponse>(
      `/admin/support/tickets?${p.toString()}`
    );
    return data;
  },

  async updateStatus(id: number, status: TicketStatus): Promise<SupportTicket> {
    const { data } = await api.patch<SupportTicket>(
      `/admin/support/tickets/${id}/status`,
      { status }
    );
    return data;
  },
};