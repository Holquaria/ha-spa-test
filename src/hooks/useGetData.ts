import { useState } from 'react';
import { mockData, type ContentItem } from '@/data/mockData';

export const useGetData = () => {
  const [data] = useState<ContentItem[]>(mockData);
  return { data };
};