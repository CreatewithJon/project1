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

  const inputClass = "w-full bg-[#0B0F1A] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-[#F9FAFB] placeholder:text-[#A1A1AA]/50 focus:outline-none focus:ring-1 focus:ring-blue-500/60 focus:border-blue-500/40 transition-colors";
  const labelClass = "block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wide mb-1.5";

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className={labelClass}>Search</label>
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
            className={inputClass}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-blue-500 transition-colors shrink-0"
          >
            Go
          </button>
        </form>
      </div>

      <div>
        <label className={labelClass}>Category</label>
        <select
          value={currentCategory}
          onChange={(e) => updateParam("category", e.target.value)}
          className={inputClass}
        >
          <option value="">All Categories</option>
          {ALL_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Location</label>
        <select
          value={currentLocation}
          onChange={(e) => updateParam("location", e.target.value)}
          className={inputClass}
        >
          <option value="">All Areas</option>
          {ALL_LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {(currentSearch || currentCategory || currentLocation) && (
        <button
          onClick={() => router.push("/directory")}
          className="text-sm text-[#A1A1AA]/60 hover:text-[#A1A1AA] text-left transition-colors"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
