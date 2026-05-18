"use client";

import Link from "next/link";
import { Vehicle, formatPrice, formatMileage } from "@/lib/data/vehicles";

interface Props {
  vehicle: Vehicle;
  compact?: boolean;
}

export default function VehicleCard({ vehicle, compact = false }: Props) {
  return (
    <div className="group bg-[#0F0F0F] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden">
        <div
          className={`w-full bg-gradient-to-br ${vehicle.gradient} ${compact ? "aspect-video" : "aspect-[16/9]"} relative transition-transform duration-500 group-hover:scale-[1.03]`}
        >
          {vehicle.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={vehicle.imageUrl}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-70" />
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border"
              style={{
                color: vehicle.accentColor,
                borderColor: vehicle.accentColor + "40",
                backgroundColor: vehicle.accentColor + "15",
              }}
            >
              {vehicle.categoryLabel}
            </span>
          </div>
          {/* Year badge */}
          <div className="absolute top-4 right-4">
            <span className="text-[11px] font-bold text-white/50 bg-black/40 border border-white/[0.08] px-2.5 py-1 rounded-full">
              {vehicle.year}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="mb-4">
          <p className="text-white/40 text-xs tracking-wider uppercase mb-1">{vehicle.make}</p>
          <h3 className="text-white font-black text-xl tracking-tight leading-tight">
            {vehicle.model}
          </h3>
          <p className="text-white/50 text-sm mt-0.5">{vehicle.trim}</p>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/[0.06]">
          <div>
            <p className="text-white/30 text-[11px] uppercase tracking-wider">Mileage</p>
            <p className="text-white font-semibold text-sm mt-0.5">{formatMileage(vehicle.mileage)}</p>
          </div>
          <div className="w-px h-8 bg-white/[0.06]" />
          <div>
            <p className="text-white/30 text-[11px] uppercase tracking-wider">Color</p>
            <p className="text-white font-semibold text-sm mt-0.5 truncate max-w-[120px]">{vehicle.color}</p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between mb-5 flex-1">
          <div>
            <p className="text-white/30 text-[11px] uppercase tracking-wider mb-1">Price</p>
            <p className="text-white font-black text-2xl tracking-tight">{formatPrice(vehicle.price)}</p>
            <p className="text-white/40 text-xs mt-0.5">Est. {formatPrice(vehicle.monthlyPayment)}/mo</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2.5">
          <Link
            href={`/dealership-demo/inventory/${vehicle.slug}`}
            className="flex-1 text-center text-sm font-bold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] hover:border-white/20 px-4 py-3 rounded-xl transition-all duration-200"
          >
            View Details
          </Link>
          <Link
            href={`/dealership-demo/inventory/${vehicle.slug}#availability`}
            className="flex-1 text-center text-sm font-bold text-black bg-[#C9A84C] hover:bg-[#FDBA74] px-4 py-3 rounded-xl transition-all duration-200 hover:shadow-[0_4px_20px_rgba(201,168,76,0.35)]"
          >
            Check Availability
          </Link>
        </div>
      </div>
    </div>
  );
}
