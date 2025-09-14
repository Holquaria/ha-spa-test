import { renderHook } from '@testing-library/react';
import { useGetData } from './useGetData';
import { mockData } from '@/data/mockData';

describe('useGetData', () => {
  it('returns mock data immediately', () => {
    const { result } = renderHook(() => useGetData());
    expect(result.current.data).toEqual(mockData);
  });
});