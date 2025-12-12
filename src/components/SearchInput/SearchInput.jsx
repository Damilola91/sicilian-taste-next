"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search, X } from "lucide-react";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      router.push("/");
      return;
    }

    router.push(`/?search=${encodeURIComponent(query)}`);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    router.push("/");
  };

  return (
    <div className="w-full bg-white shadow-md border-t">
      <form
        onSubmit={handleSearchSubmit}
        className="max-w-4xl mx-auto px-4 py-4"
      >
        <div className="relative flex items-center">
          {/* Search icon */}
          <Search
            size={20}
            className="absolute left-4 text-gray-400 pointer-events-none"
          />

          {/* Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300
                       focus:ring-2 focus:ring-orange-400 focus:border-orange-400
                       outline-none transition text-sm md:text-base"
          />

          {/* Clear button */}
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-4 text-gray-400 hover:text-orange-500 transition"
              aria-label="Clear search"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
