export interface MultiItemApiResponse<T> {
  result: {
    totalCount: number;
    items: T[];
  },
  success: boolean
}
