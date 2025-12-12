"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // trigger animazione on mount
    setMounted(true);
  }, []);

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
    <div
      className={`w-full bg-white border-t shadow-md
        transform transition-all duration-300 ease-out
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
      `}
    >
      <form
        onSubmit={handleSearchSubmit}
        className="max-w-4xl mx-auto px-4 py-4"
      >
        <div className="relative flex items-center">
          {/* Icona search */}
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
            autoFocus
          />

          {/* Clear */}
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-4 text-gray-400 hover:text-orange-500 transition"
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
