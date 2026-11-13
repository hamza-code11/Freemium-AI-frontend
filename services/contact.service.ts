import api from '@/lib/axios';

export interface ContactSubmitPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSubmitResponse {
  success: boolean;
  message: string;
  id: number;
}

export const contactService = {
  async submit(payload: ContactSubmitPayload): Promise<ContactSubmitResponse> {
    const { data } = await api.post<ContactSubmitResponse>('/contact', payload);
    return data;
  },
};

