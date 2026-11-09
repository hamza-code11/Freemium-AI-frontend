// context/CampaignContext.tsx
'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '@/lib/axios';

interface CampaignContextType {
  campaign: any | null;
  isGenerating: boolean;
  generateCampaign: (payload: any) => Promise<boolean>;
  regenerateCampaign: () => Promise<boolean>;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export function CampaignProvider({ children }: { children: React.ReactNode }) {
  const [campaign, setCampaign] = useState<any | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastPayload, setLastPayload] = useState<any | null>(null); // 🔥 Save last form data

  const generateCampaign = async (payload: any) => {
    setIsGenerating(true);
    try {
      // Save payload for future regeneration
      setLastPayload(payload);
      
      const res = await axiosInstance.post('/campaigns/generate', payload);
      setCampaign(res.data.campaign);
      
      toast.success("Campaign plan generated!");
      return true;
    } catch (error: any) {
      const msg = error.response?.data?.detail;
      toast.error(typeof msg === 'string' ? msg : 'Failed to generate campaign');
      return false;
    } finally {
      setIsGenerating(false);
    }
  };

  // 🔥 Regenerate using saved payload
  const regenerateCampaign = async () => {
    if (!lastPayload) {
      toast.error("No previous data found. Please fill the form first.");
      return false;
    }
    return generateCampaign(lastPayload);
  };

  return (
    <CampaignContext.Provider value={{ campaign, isGenerating, generateCampaign, regenerateCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign() {
  const context = useContext(CampaignContext);
  if (!context) throw new Error('useCampaign must be used within CampaignProvider');
  return context;
}