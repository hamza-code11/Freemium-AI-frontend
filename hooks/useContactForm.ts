import { useState } from 'react';
import toast from 'react-hot-toast';
import { contactService, ContactSubmitPayload } from '@/services/contact.service';

export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async (payload: ContactSubmitPayload) => {
    setLoading(true);
    try {
      const res = await contactService.submit(payload);
      toast.success(res.message);
      setSuccess(true);
      return true;
    } catch (err: any) {
      const msg = err?.response?.data?.detail;
      toast.error(typeof msg === 'string' ? msg : 'Failed to send message. Try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, success, reset: () => setSuccess(false) };
};

