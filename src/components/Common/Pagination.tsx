"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export type MetaT = {
  total: number;
  page: number;
  hasNextPage: boolean;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
};

type PaginationProps = {
  meta: MetaT;
};

const Pagination: React.FC<PaginationProps> = ({ meta }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { page, totalPages, hasPreviousPage, hasNextPage } = meta;

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages;
  };
  const onPageChange = (page: number) => {
    if (page < 1 || page > meta.totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex justify-center mt-15">
      <div className="bg-white shadow-1 rounded-md p-2">
        <ul className="flex items-center space-x-1">
          <li>
            <button
              aria-label="Previous Page"
              onClick={() => onPageChange(page - 1)}
              disabled={!hasPreviousPage}
              className={`flex items-center justify-center w-8 h-9 duration-200 rounded-[3px] ${
                !hasPreviousPage
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:text-white hover:bg-blue"
              }`}
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M12.1782 16.1156C12.0095 16.1156 11.8407 16.0594 11.7282 15.9187L5.37197 9.45C5.11885 9.19687 5.11885 8.80312 5.37197 8.55L11.7282 2.08125C11.9813 1.82812 12.3751 1.82812 12.6282 2.08125C12.8813 2.33437 12.8813 2.72812 12.6282 2.98125L6.72197 9L12.6563 15.0187C12.9095 15.2719 12.9095 15.6656 12.6563 15.9187C12.4876 16.0312 12.347 16.1156 12.1782 16.1156Z" />
              </svg>
            </button>
          </li>

          {generatePageNumbers().map((item, idx) => (
            <li key={idx}>
              {item === "..." ? (
                <span className="px-2">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(item as number)}
                  className={`flex py-1.5 px-3.5 duration-200 rounded-[3px] ${
                    item === page
                      ? "bg-blue text-white"
                      : "hover:text-white hover:bg-blue"
                  }`}
                >
                  {item}
                </button>
              )}
            </li>
          ))}

          <li>
            <button
              aria-label="Next Page"
              onClick={() => onPageChange(page + 1)}
              disabled={!hasNextPage}
              className={`flex items-center justify-center w-8 h-9 duration-200 rounded-[3px] ${
                !hasNextPage
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:text-white hover:bg-blue"
              }`}
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M5.82197 16.1156C5.65322 16.1156 5.5126 16.0594 5.37197 15.9469C5.11885 15.6937 5.11885 15.3 5.37197 15.0469L11.2782 9L5.37197 2.98125C5.11885 2.72812 5.11885 2.33437 5.37197 2.08125C5.6251 1.82812 6.01885 1.82812 6.27197 2.08125L12.6282 8.55C12.8813 8.80312 12.8813 9.19687 12.6282 9.45L6.27197 15.9187C6.15947 16.0312 5.99072 16.1156 5.82197 16.1156Z" />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
