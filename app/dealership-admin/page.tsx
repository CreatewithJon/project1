"use client";

import { useState, useEffect, useRef, useCallback, DragEvent, ChangeEvent } from "react";
import Image from "next/image";

interface DbVehicle {
  id: string;
  slug: string;
  year: number;
  make: string;
  model: string;
  trim: string | null;
  category: string;
  mileage: number | null;
  price: number;
  monthly_payment: number | null;
  color: string | null;
  description: string | null;
  image_url: string | null;
  sold: boolean;
  created_at: string;
}

const CATEGORIES = ["lowrider", "exotic", "luxury-suv", "mercedes", "truck", "sedan", "other"];

const emptyForm = {
  year: "",
  make: "",
  model: "",
  trim: "",
  category: "other",
  mileage: "",
  price: "",
  color: "",
  description: "",
};

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function formatMiles(n: number) {
  return new Intl.NumberFormat("en-US").format(n) + " mi";
}

export default function DealershipAdminPage() {
  const [vehicles, setVehicles] = useState<DbVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "available" | "sold">("all");

  // Upload / add new
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [pendingImageUrl, setPendingImageUrl] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newForm, setNewForm] = useState(emptyForm);
  const [addSaving, setAddSaving] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  // Edit
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [editImageUrl, setEditImageUrl] = useState<string | null>(null);
  const [editUploading, setEditUploading] = useState(false);
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  // Delete confirm
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch("/api/vehicles");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load vehicles");
      setVehicles(data.vehicles ?? []);
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : "Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchVehicles(); }, [fetchVehicles]);

  // ── Upload helpers ──────────────────────────────────────────────────────────

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/vehicles/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Upload failed");
    return data.url as string;
  }

  async function handleFileDrop(file: File, forEdit = false) {
    if (forEdit) {
      setEditUploading(true);
    } else {
      setUploading(true);
      setUploadError(null);
    }
    try {
      const url = await uploadFile(file);
      if (forEdit) {
        setEditImageUrl(url);
      } else {
        setPendingImageUrl(url);
        setShowAddForm(true);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      if (forEdit) {
        setEditError(msg);
      } else {
        setUploadError(msg);
      }
    } finally {
      if (forEdit) setEditUploading(false);
      else setUploading(false);
    }
  }

  // ── Drag/drop handlers ──────────────────────────────────────────────────────

  function onDragOver(e: DragEvent) { e.preventDefault(); setDragging(true); }
  function onDragLeave() { setDragging(false); }
  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileDrop(file);
  }
  function onFileInput(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFileDrop(file);
  }
  function onEditFileInput(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFileDrop(file, true);
  }

  // ── Add new vehicle ─────────────────────────────────────────────────────────

  async function handleAddVehicle() {
    setAddError(null);
    if (!newForm.year || !newForm.make || !newForm.model || !newForm.price) {
      setAddError("Year, make, model, and price are required.");
      return;
    }
    setAddSaving(true);
    try {
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newForm,
          year: Number(newForm.year),
          mileage: newForm.mileage ? Number(newForm.mileage) : null,
          price: Number(newForm.price),
          image_url: pendingImageUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save vehicle");
      setVehicles((prev) => [data.vehicle, ...prev]);
      setNewForm(emptyForm);
      setPendingImageUrl(null);
      setShowAddForm(false);
    } catch (err) {
      setAddError(err instanceof Error ? err.message : "Failed to save vehicle");
    } finally {
      setAddSaving(false);
    }
  }

  // ── Edit vehicle ────────────────────────────────────────────────────────────

  function startEdit(v: DbVehicle) {
    setEditingId(v.id);
    setEditImageUrl(v.image_url);
    setEditError(null);
    setEditForm({
      year: String(v.year),
      make: v.make,
      model: v.model,
      trim: v.trim ?? "",
      category: v.category,
      mileage: v.mileage != null ? String(v.mileage) : "",
      price: String(v.price),
      color: v.color ?? "",
      description: v.description ?? "",
    });
  }

  async function handleSaveEdit() {
    if (!editingId) return;
    setEditError(null);
    setEditSaving(true);
    try {
      const res = await fetch(`/api/vehicles/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year: Number(editForm.year),
          make: editForm.make,
          model: editForm.model,
          trim: editForm.trim || null,
          category: editForm.category,
          mileage: editForm.mileage ? Number(editForm.mileage) : null,
          price: Number(editForm.price),
          color: editForm.color || null,
          description: editForm.description || null,
          image_url: editImageUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to update vehicle");
      setVehicles((prev) => prev.map((v) => (v.id === editingId ? data.vehicle : v)));
      setEditingId(null);
    } catch (err) {
      setEditError(err instanceof Error ? err.message : "Failed to update vehicle");
    } finally {
      setEditSaving(false);
    }
  }

  // ── Toggle sold ─────────────────────────────────────────────────────────────

  async function toggleSold(v: DbVehicle) {
    const res = await fetch(`/api/vehicles/${v.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sold: !v.sold }),
    });
    const data = await res.json();
    if (res.ok) setVehicles((prev) => prev.map((x) => (x.id === v.id ? data.vehicle : x)));
  }

  // ── Delete ──────────────────────────────────────────────────────────────────

  async function handleDelete(id: string) {
    const res = await fetch(`/api/vehicles/${id}`, { method: "DELETE" });
    if (res.ok) {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
      setDeletingId(null);
    }
  }

  // ── Filtered list ───────────────────────────────────────────────────────────

  const filtered = vehicles.filter((v) => {
    if (filter === "available") return !v.sold;
    if (filter === "sold") return v.sold;
    return true;
  });

  const stats = {
    total: vehicles.length,
    available: vehicles.filter((v) => !v.sold).length,
    sold: vehicles.filter((v) => v.sold).length,
    value: vehicles.filter((v) => !v.sold).reduce((s, v) => s + v.price, 0),
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen" style={{ background: "#080808", color: "white", fontFamily: "sans-serif" }}>

      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)" }}
        className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="font-black text-lg tracking-tight">SHAFIK N SONS</p>
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: "#C9A84C" }}>Inventory Admin</p>
        </div>
        <a href="/dealership-demo" target="_blank"
          className="text-xs px-4 py-2 rounded-full transition-colors"
          style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
          View Site →
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Vehicles", value: stats.total },
            { label: "Available", value: stats.available },
            { label: "Sold", value: stats.sold },
            { label: "Inventory Value", value: formatPrice(stats.value) },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-2xl font-black" style={{ color: "#C9A84C" }}>{s.value}</p>
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Upload Zone */}
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
            Add Vehicle
          </p>

          {!showAddForm ? (
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className="rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all"
              style={{
                border: `2px dashed ${dragging ? "rgba(201,168,76,0.6)" : "rgba(255,255,255,0.1)"}`,
                background: dragging ? "rgba(201,168,76,0.04)" : "rgba(255,255,255,0.02)",
                minHeight: "180px",
                padding: "2rem",
              }}
            >
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileInput} />
              {uploading ? (
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Uploading...</p>
              ) : (
                <>
                  <div className="text-4xl" style={{ opacity: 0.3 }}>📸</div>
                  <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Drag & drop a car photo here, or click to browse
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
                    JPEG, PNG, WebP · Max 10 MB
                  </p>
                  {uploadError && <p className="text-xs mt-1" style={{ color: "#f87171" }}>{uploadError}</p>}
                </>
              )}
            </div>
          ) : (
            /* New Vehicle Form */
            <div className="rounded-2xl p-6 space-y-5"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)" }}>
              <div className="flex items-start gap-5">
                {/* Image preview */}
                <div className="shrink-0 w-36 h-28 rounded-xl overflow-hidden relative"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {pendingImageUrl ? (
                    <Image src={pendingImageUrl} alt="Preview" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl" style={{ opacity: 0.3 }}>🚗</div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm mb-1">New Vehicle</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Fill in the details below</p>
                </div>
                <button onClick={() => { setShowAddForm(false); setPendingImageUrl(null); setNewForm(emptyForm); }}
                  className="text-xs px-3 py-1.5 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>
                  Cancel
                </button>
              </div>

              <VehicleFormFields form={newForm} onChange={setNewForm} />

              {addError && <p className="text-xs" style={{ color: "#f87171" }}>{addError}</p>}

              <div className="flex gap-3">
                <button onClick={handleAddVehicle} disabled={addSaving}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40"
                  style={{ background: "#C9A84C", color: "black" }}>
                  {addSaving ? "Saving..." : "Add to Inventory"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Inventory */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
              Inventory
            </p>
            {/* Filter tabs */}
            <div className="flex gap-1 rounded-lg p-1" style={{ background: "rgba(255,255,255,0.04)" }}>
              {(["all", "available", "sold"] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className="text-xs px-3 py-1.5 rounded-md capitalize transition-all"
                  style={{
                    background: filter === f ? "rgba(201,168,76,0.15)" : "transparent",
                    color: filter === f ? "#C9A84C" : "rgba(255,255,255,0.35)",
                    fontWeight: filter === f ? "700" : "400",
                  }}>
                  {f} {f === "all" ? `(${stats.total})` : f === "available" ? `(${stats.available})` : `(${stats.sold})`}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="text-center py-20 text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>Loading inventory...</div>
          )}

          {fetchError && (
            <div className="rounded-2xl p-6 text-center" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <p className="text-sm font-semibold mb-1" style={{ color: "#f87171" }}>Could not load inventory</p>
              <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>{fetchError}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                Make sure the <code className="px-1 rounded" style={{ background: "rgba(255,255,255,0.07)" }}>vehicles</code> table exists in Supabase.
              </p>
              <button onClick={fetchVehicles} className="mt-4 text-xs px-4 py-2 rounded-lg"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                Retry
              </button>
            </div>
          )}

          {!loading && !fetchError && filtered.length === 0 && (
            <div className="text-center py-20 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                {filter === "all" ? "No vehicles yet. Upload a photo above to get started." : `No ${filter} vehicles.`}
              </p>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((v) => (
              <VehicleCard
                key={v.id}
                vehicle={v}
                isEditing={editingId === v.id}
                editForm={editForm}
                editImageUrl={editImageUrl}
                editUploading={editUploading}
                editSaving={editSaving}
                editError={editError}
                editFileInputRef={editFileInputRef}
                onEditFileInput={onEditFileInput}
                onStartEdit={() => startEdit(v)}
                onCancelEdit={() => setEditingId(null)}
                onSaveEdit={handleSaveEdit}
                onEditFormChange={setEditForm}
                onToggleSold={() => toggleSold(v)}
                isConfirmingDelete={deletingId === v.id}
                onDeleteClick={() => setDeletingId(v.id)}
                onDeleteConfirm={() => handleDelete(v.id)}
                onDeleteCancel={() => setDeletingId(null)}
              />
            ))}
          </div>
        </div>

        {/* Setup instructions */}
        <details className="rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <summary className="px-5 py-4 text-xs font-semibold cursor-pointer" style={{ color: "rgba(255,255,255,0.3)" }}>
            Supabase Setup (expand if first time)
          </summary>
          <div className="px-5 pb-5 space-y-3">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Run this SQL in your Supabase SQL Editor:</p>
            <pre className="text-xs rounded-xl p-4 overflow-x-auto" style={{ background: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.6)", lineHeight: "1.6" }}>{`create table vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  year integer not null,
  make text not null,
  model text not null,
  trim text,
  category text not null default 'other',
  category_label text,
  mileage integer,
  price integer not null,
  monthly_payment integer,
  color text,
  description text,
  image_url text,
  sold boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Allow public read + anon write (admin-only page, protected by password)
alter table vehicles enable row level security;
create policy "public_read" on vehicles for select using (true);
create policy "anon_insert" on vehicles for insert with check (true);
create policy "anon_update" on vehicles for update using (true);
create policy "anon_delete" on vehicles for delete using (true);`}</pre>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Then in Storage → Create bucket <code style={{ background: "rgba(255,255,255,0.08)", padding: "0 4px", borderRadius: 4 }}>vehicle-images</code> → Public bucket → Add insert policy for anon role.</p>
          </div>
        </details>

      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function VehicleFormFields({
  form,
  onChange,
}: {
  form: typeof emptyForm;
  onChange: (f: typeof emptyForm) => void;
}) {
  const field = (key: keyof typeof emptyForm, label: string, placeholder: string, type = "text") => (
    <div>
      <label className="block text-[10px] font-semibold uppercase tracking-[0.12em] mb-1.5"
        style={{ color: "rgba(255,255,255,0.3)" }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => onChange({ ...form, [key]: e.target.value })}
        className="w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
      />
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-3">
      {field("year", "Year", "2023", "number")}
      {field("make", "Make", "McLaren")}
      {field("model", "Model", "720S")}
      {field("trim", "Trim", "Performance (optional)")}
      {field("mileage", "Mileage", "4100", "number")}
      {field("price", "Price ($)", "320000", "number")}
      {field("color", "Color", "Papaya Spark / Onyx")}
      <div>
        <label className="block text-[10px] font-semibold uppercase tracking-[0.12em] mb-1.5"
          style={{ color: "rgba(255,255,255,0.3)" }}>
          Category
        </label>
        <select
          value={form.category}
          onChange={(e) => onChange({ ...form, category: e.target.value })}
          className="w-full rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c} style={{ background: "#111" }}>{c}</option>
          ))}
        </select>
      </div>
      <div className="col-span-2">
        <label className="block text-[10px] font-semibold uppercase tracking-[0.12em] mb-1.5"
          style={{ color: "rgba(255,255,255,0.3)" }}>
          Description
        </label>
        <textarea
          placeholder="Brief description of this vehicle..."
          value={form.description}
          onChange={(e) => onChange({ ...form, description: e.target.value })}
          rows={3}
          className="w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none resize-none"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        />
      </div>
    </div>
  );
}

function VehicleCard({
  vehicle: v,
  isEditing,
  editForm,
  editImageUrl,
  editUploading,
  editSaving,
  editError,
  editFileInputRef,
  onEditFileInput,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onEditFormChange,
  onToggleSold,
  isConfirmingDelete,
  onDeleteClick,
  onDeleteConfirm,
  onDeleteCancel,
}: {
  vehicle: DbVehicle;
  isEditing: boolean;
  editForm: typeof emptyForm;
  editImageUrl: string | null;
  editUploading: boolean;
  editSaving: boolean;
  editError: string | null;
  editFileInputRef: React.RefObject<HTMLInputElement | null>;
  onEditFileInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSaveEdit: () => void;
  onEditFormChange: (f: typeof emptyForm) => void;
  onToggleSold: () => void;
  isConfirmingDelete: boolean;
  onDeleteClick: () => void;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
}) {
  if (isEditing) {
    return (
      <div className="rounded-2xl p-5 col-span-full space-y-4"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)" }}>
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">Editing: {v.year} {v.make} {v.model}</p>
          <button onClick={onCancelEdit} className="text-xs px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>
            Cancel
          </button>
        </div>

        {/* Image swap */}
        <div className="flex items-center gap-4">
          <div className="w-28 h-20 rounded-xl overflow-hidden relative shrink-0"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {editImageUrl ? (
              <Image src={editImageUrl} alt="Vehicle" fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl" style={{ opacity: 0.2 }}>🚗</div>
            )}
          </div>
          <div>
            <input ref={editFileInputRef} type="file" accept="image/*" className="hidden" onChange={onEditFileInput} />
            <button onClick={() => editFileInputRef.current?.click()}
              className="text-xs px-3 py-2 rounded-lg block mb-1"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
              {editUploading ? "Uploading..." : "Change Photo"}
            </button>
            {editImageUrl && (
              <button onClick={() => onEditFormChange({ ...editForm })}
                className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                or paste URL below
              </button>
            )}
          </div>
        </div>

        <VehicleFormFields form={editForm} onChange={onEditFormChange} />

        {editError && <p className="text-xs" style={{ color: "#f87171" }}>{editError}</p>}

        <button onClick={onSaveEdit} disabled={editSaving}
          className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40"
          style={{ background: "#C9A84C", color: "black" }}>
          {editSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden flex flex-col transition-all"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${v.sold ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.07)"}`,
        opacity: v.sold ? 0.6 : 1,
      }}>
      {/* Image */}
      <div className="relative h-44 shrink-0" style={{ background: "rgba(255,255,255,0.04)" }}>
        {v.image_url ? (
          <Image src={v.image_url} alt={`${v.year} ${v.make} ${v.model}`} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl" style={{ opacity: 0.15 }}>🚗</div>
        )}
        {v.sold && (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.55)" }}>
            <span className="text-xs font-black tracking-[0.15em] uppercase px-3 py-1.5 rounded-full"
              style={{ background: "rgba(239,68,68,0.85)", color: "white" }}>
              SOLD
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div>
          <p className="font-bold text-sm leading-tight">{v.year} {v.make} {v.model}</p>
          {v.trim && <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{v.trim}</p>}
        </div>

        <div className="flex items-center justify-between">
          <p className="font-black text-base" style={{ color: "#C9A84C" }}>{formatPrice(v.price)}</p>
          {v.mileage != null && (
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{formatMiles(v.mileage)}</p>
          )}
        </div>

        {v.color && (
          <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>{v.color}</p>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-2">
          <button onClick={onStartEdit}
            className="flex-1 text-xs py-2 rounded-lg font-semibold transition-all"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
            Edit
          </button>
          <button onClick={onToggleSold}
            className="flex-1 text-xs py-2 rounded-lg font-semibold transition-all"
            style={{
              background: v.sold ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.1)",
              color: v.sold ? "#6ee7b7" : "#f87171",
              border: `1px solid ${v.sold ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
            }}>
            {v.sold ? "Mark Available" : "Mark Sold"}
          </button>

          {/* Delete */}
          {isConfirmingDelete ? (
            <div className="flex gap-1">
              <button onClick={onDeleteConfirm}
                className="text-xs px-2 py-2 rounded-lg font-bold"
                style={{ background: "rgba(239,68,68,0.8)", color: "white" }}>
                Yes
              </button>
              <button onClick={onDeleteCancel}
                className="text-xs px-2 py-2 rounded-lg"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>
                No
              </button>
            </div>
          ) : (
            <button onClick={onDeleteClick}
              className="text-xs px-2.5 py-2 rounded-lg transition-all"
              style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.06)" }}
              title="Delete">
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
