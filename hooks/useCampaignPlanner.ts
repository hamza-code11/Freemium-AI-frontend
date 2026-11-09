// hooks/useCampaignPlanner.ts
import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '@/lib/axios';

export const useCampaignPlanner = () => {
  const [campaign, setCampaign] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCampaign = async (payload?: any) => {
    if (!payload) {
      toast.error("Please fill and submit the form first.");
      return false;
    }

    setIsGenerating(true);
    try {
      const res = await axiosInstance.post('/campaigns/generate', payload);
   
      // YAHAN CHANGE: res.data.campaign use karein, res.data nahi
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

  return { campaign, isGenerating, generateCampaign };
};