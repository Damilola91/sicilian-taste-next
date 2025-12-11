"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      router.push("/"); // rimuove la ricerca
      return;
    }

    router.push(`/?search=${encodeURIComponent(query)}`);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    router.push("/");
  };

  return (
    <div className="search-input-container">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search product..."
          className="search-input"
        />

        <button
          type="button"
          onClick={handleClearSearch}
          className="clear-button"
        >
          ✕
        </button>
      </form>
    </div>
  );
}
