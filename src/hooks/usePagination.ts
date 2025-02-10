
import { useState } from 'react';

export const usePagination = (itemsPerPage: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const from = (currentPage - 1) * itemsPerPage;
  const to = from + itemsPerPage;

  return {
    currentPage,
    setCurrentPage,
    totalItems,
    setTotalItems,
    totalPages,
    from,
    to,
    itemsPerPage
  };
};
