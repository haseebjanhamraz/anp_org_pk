// utils/paginate.ts

export interface PaginationResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

export function paginate<T>(
  items: T[],
  page: number = 1,
  pageSize: number = 10
): PaginationResult<T> {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const data = items.slice(start, end);

  return {
    data,
    currentPage,
    totalPages,
    pageSize,
    totalItems,
  };
}