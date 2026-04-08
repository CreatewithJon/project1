"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ALL_CATEGORIES, ALL_LOCATIONS } from "@/lib/data/companies";

export default function FilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") ?? "";
  const currentLocation = searchParams.get("location") ?? "";
  const currentSearch = searchParams.get("search") ?? "";

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/directory?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1.5">
          Search
        </label>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const val = (e.currentTarget.elements.namedItem("search") as HTMLInputElement).value;
            updateParam("search", val);
          }}
          className="flex gap-2"
        >
          <input
            name="search"
            type="text"
            defaultValue={currentSearch}
            placeholder="Company, service, tag..."
            className="flex-1 border border-zinc-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1.5">
          Category
        </label>
        <select
          value={currentCategory}
          onChange={(e) => updateParam("category", e.target.value)}
          className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {ALL_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1.5">
          Location
        </label>
        <select
          value={currentLocation}
          onChange={(e) => updateParam("location", e.target.value)}
          className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Areas</option>
          {ALL_LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {(currentSearch || currentCategory || currentLocation) && (
        <button
          onClick={() => router.push("/directory")}
          className="text-sm text-zinc-400 hover:text-zinc-600 text-left"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
