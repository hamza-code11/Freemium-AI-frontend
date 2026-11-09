// services/support.service.ts
import axiosInstance from '@/lib/axios';

export interface SupportTicket {
  id: number;
  ticket_number: string;
  name: string;
  email: string;
  subject: string;
  description: string;
  attachment: string | null;
  status: 'Pending' | 'In Progress' | 'Resolved';
  created_at: string;
}

export interface SupportTicketListResponse {
  items: SupportTicket[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface CreateTicketPayload {
  name: string;
  email: string;
  subject: string;
  description: string;
  attachment?: File | null;
}

export const supportService = {
  createTicket: async (data: CreateTicketPayload): Promise<SupportTicket> => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('subject', data.subject);
    formData.append('description', data.description);
    if (data.attachment) {
      formData.append('attachment', data.attachment);
    }

    const res = await axiosInstance.post<SupportTicket>('/support/tickets', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  getTickets: async (page: number = 1, pageSize: number = 5): Promise<SupportTicketListResponse> => {
    const res = await axiosInstance.get<SupportTicketListResponse>(
      `/support/tickets?page=${page}&page_size=${pageSize}`
    );
    return res.data;
  },
};
