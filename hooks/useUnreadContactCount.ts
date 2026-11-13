import { useEffect, useState, useCallback } from 'react';
import { adminContactService } from '@/services/admin-contact.service';

const EVENT_NAME = 'contact-unread-changed';

// Global cache for unread count
let cachedUnread: number | null = null;

export const useUnreadContactCount = (pollMs: number = 60000) => {
  const [count, setCount] = useState(cachedUnread || 0);

  const fetchCount = useCallback(async () => {
    try {
      const res = await adminContactService.list({ page: 1, pageSize: 1 });
      setCount(res.unread);
      cachedUnread = res.unread; // update cache
    } catch { /* silent */ }
  }, []);

  useEffect(() => {
    if (cachedUnread === null) {
       fetchCount();
    }
    
    const id = setInterval(fetchCount, pollMs);
    const onChanged = () => {
       cachedUnread = null; // Force refresh
       fetchCount();
    };
    window.addEventListener(EVENT_NAME, onChanged);

    return () => {
      clearInterval(id);
      window.removeEventListener(EVENT_NAME, onChanged);
    };
  }, [pollMs, fetchCount]);

  return { count, refresh: fetchCount };
};

export const notifyContactUnreadChanged = () => {
  window.dispatchEvent(new Event(EVENT_NAME));
};

