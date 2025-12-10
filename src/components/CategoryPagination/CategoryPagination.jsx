"use client";

import Link from "next/link";

const CategoryPagination = ({ category, currentPage, totalPages }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-4 d-flex justify-content-center">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? "active" : ""}`}
          >
            <Link
              className="page-link"
              href={`/categories/${category}?page=${page}`}
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryPagination;
