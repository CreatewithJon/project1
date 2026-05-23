"use client";

import { useState, useEffect, useRef, useCallback, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import type { DbVehicle } from "@/lib/db/vehicles";

interface DealershipLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  lead_type?: string;
  vehicle_interested_in?: string;
  vehicle_slug?: string;
  budget?: string;
  message?: string;
  source_page?: string;
  created_at: string;
}

const LEAD_TYPE_LABELS: Record<string, { label: string; color: string }> = {
  inventory_inquiry: { label: "Vehicle Inquiry", color: "#C9A84C" },
  general_inquiry:   { label: "General",         color: "#60a5fa" },
  financing:         { label: "Financing",        color: "#34d399" },
  sell_trade:        { label: "Sell / Trade",     color: "#f97316" },
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
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
  featured: false,
};

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function formatMiles(n: number) {
  return new Intl.NumberFormat("en-US").format(n) + " mi";
}

export default function DealershipAdminPage() {
  const [tab, setTab] = useState<"leads" | "inventory">("leads");

  // ── Leads ───────────────────────────────────────────────────────────────────
  const [leads, setLeads] = useState<DealershipLead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [leadsError, setLeadsError] = useState<string | null>(null);
  const [expandedLead, setExpandedLead] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLeadsLoading(true);
    setLeadsError(null);
    try {
      const res = await fetch("/api/dealership-leads");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load leads");
      setLeads(data.leads ?? []);
    } catch (err) {
      setLeadsError(err instanceof Error ? err.message : "Failed to load leads");
    } finally {
      setLeadsLoading(false);
    }
  }, []);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  // ── Inventory ───────────────────────────────────────────────────────────────
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

  // Seed
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState<string | null>(null);

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

  async function handleSeed() {
    setSeeding(true);
    setSeedMsg(null);
    try {
      const res = await fetch("/api/vehicles/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Seed failed");
      setSeedMsg(data.message);
      if (data.seeded > 0) fetchVehicles();
    } catch (err) {
      setSeedMsg(err instanceof Error ? err.message : "Seed failed");
    } finally {
      setSeeding(false);
    }
  }

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
          featured: newForm.featured,
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
      featured: v.featured ?? false,
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

  const todayLeads = leads.filter((l) => {
    const d = new Date(l.created_at);
    const now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
  });

  return (
    <div className="min-h-screen" style={{ background: "#080808", color: "white", fontFamily: "sans-serif" }}>

      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)" }}
        className="sticky top-0 z-40 px-6 py-3 flex items-center justify-between gap-4">
        <div>
          <p className="font-black text-lg tracking-tight">SHAFIK N SONS</p>
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: "#C9A84C" }}>Business Dashboard</p>
        </div>
        {/* Tabs */}
        <div className="flex gap-1 rounded-xl p-1" style={{ background: "rgba(255,255,255,0.05)" }}>
          {([
            { key: "leads",     label: "Leads",     count: leads.length },
            { key: "inventory", label: "Inventory", count: stats.total },
          ] as const).map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className="flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-lg transition-all"
              style={{
                background: tab === t.key ? "rgba(201,168,76,0.15)" : "transparent",
                color: tab === t.key ? "#C9A84C" : "rgba(255,255,255,0.4)",
              }}>
              {t.label}
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: tab === t.key ? "rgba(201,168,76,0.25)" : "rgba(255,255,255,0.08)" }}>
                {t.count}
              </span>
            </button>
          ))}
        </div>
        <a href="/dealership-demo" target="_blank"
          className="text-xs px-4 py-2 rounded-full transition-colors hidden sm:block"
          style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
          View Site →
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* Stats */}
        {(() => {
          const items = tab === "leads" ? [
            { label: "Total Leads",  value: leads.length },
            { label: "New Today",    value: todayLeads.length },
            { label: "Inquiries",    value: leads.filter(l => l.lead_type === "inventory_inquiry").length },
            { label: "Financing",    value: leads.filter(l => l.lead_type === "financing").length },
          ] : [
            { label: "Total Vehicles",  value: stats.total },
            { label: "Available",       value: stats.available },
            { label: "Sold",            value: stats.sold },
            { label: "Inventory Value", value: formatPrice(stats.value) },
          ];
          return (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {items.map((s) => (
                <div key={s.label} className="rounded-2xl p-5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-2xl font-black" style={{ color: "#C9A84C" }}>{s.value}</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
                </div>
              ))}
            </div>
          );
        })()}

        {/* ── LEADS TAB ──────────────────────────────────────────────────────── */}
        {tab === "leads" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
                Submitted Leads
              </p>
              <button onClick={fetchLeads} className="text-xs px-3 py-1.5 rounded-lg"
                style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>
                Refresh
              </button>
            </div>

            {leadsLoading && (
              <div className="text-center py-16 text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>Loading leads...</div>
            )}

            {leadsError && (
              <div className="rounded-2xl p-6 text-center" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <p className="text-sm font-semibold mb-1" style={{ color: "#f87171" }}>Could not load leads</p>
                <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>{leadsError}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Make sure the <code className="px-1 rounded" style={{ background: "rgba(255,255,255,0.07)" }}>dealership_leads</code> table exists in Supabase (see setup below).
                </p>
              </div>
            )}

            {!leadsLoading && !leadsError && leads.length === 0 && (
              <div className="text-center py-16 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>No leads yet. They'll appear here when customers submit the inquiry form.</p>
              </div>
            )}

            {leads.map((lead) => {
              const type = LEAD_TYPE_LABELS[lead.lead_type ?? ""] ?? { label: lead.lead_type ?? "Lead", color: "rgba(255,255,255,0.4)" };
              const isExpanded = expandedLead === lead.id;
              return (
                <div key={lead.id} className="rounded-2xl overflow-hidden transition-all"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  {/* Row */}
                  <button className="w-full text-left px-5 py-4 flex items-start gap-4"
                    onClick={() => setExpandedLead(isExpanded ? null : lead.id)}>
                    {/* Type badge */}
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mt-0.5"
                      style={{ background: type.color + "18", color: type.color, border: `1px solid ${type.color}30` }}>
                      {type.label}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <p className="font-bold text-sm">{lead.name}</p>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{lead.email}</p>
                        {lead.phone && <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{lead.phone}</p>}
                      </div>
                      {lead.vehicle_interested_in && (
                        <p className="text-xs mt-1" style={{ color: "#C9A84C" }}>
                          Interested in: {lead.vehicle_interested_in}
                        </p>
                      )}
                      {lead.message && !isExpanded && (
                        <p className="text-xs mt-1 truncate" style={{ color: "rgba(255,255,255,0.35)" }}>
                          {lead.message}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{timeAgo(lead.created_at)}</p>
                      <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                        {isExpanded ? "▲" : "▼"}
                      </p>
                    </div>
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 grid sm:grid-cols-2 gap-3 border-t"
                      style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      {[
                        { label: "Email",    value: lead.email },
                        { label: "Phone",    value: lead.phone },
                        { label: "Vehicle",  value: lead.vehicle_interested_in },
                        { label: "Budget",   value: lead.budget },
                        { label: "Source",   value: lead.source_page },
                        { label: "Date",     value: new Date(lead.created_at).toLocaleString() },
                      ].filter(f => f.value).map((f) => (
                        <div key={f.label}>
                          <p className="text-[10px] uppercase tracking-[0.12em] font-semibold mb-0.5"
                            style={{ color: "rgba(255,255,255,0.25)" }}>{f.label}</p>
                          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{f.value}</p>
                        </div>
                      ))}
                      {lead.message && (
                        <div className="sm:col-span-2">
                          <p className="text-[10px] uppercase tracking-[0.12em] font-semibold mb-0.5"
                            style={{ color: "rgba(255,255,255,0.25)" }}>Message</p>
                          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{lead.message}</p>
                        </div>
                      )}
                      <div className="sm:col-span-2 flex gap-2 pt-1">
                        <a href={`mailto:${lead.email}`}
                          className="text-xs font-bold px-4 py-2 rounded-lg transition-all"
                          style={{ background: "rgba(201,168,76,0.12)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.2)" }}>
                          Email {lead.name.split(" ")[0]} →
                        </a>
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`}
                            className="text-xs font-bold px-4 py-2 rounded-lg"
                            style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
                            Call →
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── INVENTORY TAB ──────────────────────────────────────────────────── */}
        {tab === "inventory" && (<>

        {/* Import existing inventory */}
        {vehicles.length === 0 && !loading && !fetchError && (
          <div className="rounded-2xl p-5 flex items-center justify-between gap-4"
            style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.15)" }}>
            <div>
              <p className="text-sm font-bold" style={{ color: "#C9A84C" }}>Import Existing Inventory</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                One-time import of the 6 vehicles currently shown on the dealership website.
              </p>
            </div>
            <button onClick={handleSeed} disabled={seeding}
              className="shrink-0 text-sm font-bold px-5 py-2.5 rounded-xl transition-all disabled:opacity-40"
              style={{ background: "#C9A84C", color: "black" }}>
              {seeding ? "Importing..." : "Import Now"}
            </button>
          </div>
        )}

        {seedMsg && (
          <div className="rounded-xl px-4 py-3 text-xs font-semibold"
            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "#6ee7b7" }}>
            {seedMsg}
          </div>
        )}

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
  features text[],
  specs jsonb,
  image_url text,
  gradient text,
  accent_color text,
  featured boolean not null default false,
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
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Then in Storage → Create bucket <code style={{ background: "rgba(255,255,255,0.08)", padding: "0 4px", borderRadius: 4 }}>Vehicle-images</code> → Public bucket → add anon INSERT policy. Also run this SQL for leads:</p>
            <pre className="text-xs rounded-xl p-4 overflow-x-auto mt-2" style={{ background: "rgba(0,0,0,0.4)", color: "rgba(255,255,255,0.6)", lineHeight: "1.6" }}>{`create table dealership_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  lead_type text,
  vehicle_slug text,
  vehicle_interested_in text,
  budget text,
  message text,
  source_page text,
  created_at timestamptz not null default now()
);
alter table dealership_leads enable row level security;
create policy "anon_insert" on dealership_leads for insert with check (true);
create policy "anon_select" on dealership_leads for select using (true);`}</pre>
          </div>
        </details>

        </>) /* end inventory tab */}

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
  type StringKey = { [K in keyof typeof emptyForm]: (typeof emptyForm)[K] extends string ? K : never }[keyof typeof emptyForm];
  const field = (key: StringKey, label: string, placeholder: string, type = "text") => (
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
      <div className="col-span-2">
        <button
          type="button"
          onClick={() => onChange({ ...form, featured: !form.featured })}
          className="flex items-center gap-3 text-sm font-semibold transition-all"
          style={{ color: form.featured ? "#C9A84C" : "rgba(255,255,255,0.35)" }}
        >
          <span className="w-10 h-5 rounded-full relative transition-all"
            style={{ background: form.featured ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.08)", border: `1px solid ${form.featured ? "rgba(201,168,76,0.6)" : "rgba(255,255,255,0.12)"}` }}>
            <span className="absolute top-0.5 w-4 h-4 rounded-full transition-all"
              style={{ background: form.featured ? "#C9A84C" : "rgba(255,255,255,0.3)", left: form.featured ? "calc(100% - 1.1rem)" : "2px" }} />
          </span>
          Show on homepage (Featured)
        </button>
        <p className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
          Featured vehicles appear in the homepage highlights section
        </p>
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
