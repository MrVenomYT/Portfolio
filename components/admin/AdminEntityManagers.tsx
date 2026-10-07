'use client';

import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  ShoppingBag,
  Server,
  Briefcase,
  GraduationCap,
  Award,
  Star,
  HelpCircle,
  Mail,
  User,
  Check,
  X,
  Sparkles,
  Sliders,
} from 'lucide-react';
import {
  DigitalProduct,
  ServiceItem,
  ExperienceItem,
  EducationItem,
  CertificationItem,
  TestimonialItem,
  FAQItem,
  ProfileData,
  RadarProficiency,
} from '@/lib/portfolioData';

// ==========================================
// 1. DIGITAL PRODUCTS MANAGER
// ==========================================
export function AdminProductsManager({
  products,
  onSaveProduct,
  onDeleteProduct,
}: {
  products: DigitalProduct[];
  onSaveProduct: (prod: DigitalProduct) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProd, setEditingProd] = useState<DigitalProduct | null>(null);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('$29');
  const [badge, setBadge] = useState('Best Seller');
  const [category, setCategory] = useState('Web Apps');
  const [description, setDescription] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [purchaseUrl, setPurchaseUrl] = useState('https://pro.fiverr.com/users/venomdesigne613/');
  const [features, setFeatures] = useState('');

  const handleOpenAdd = () => {
    setEditingProd(null);
    setTitle('');
    setPrice('$29');
    setBadge('Popular');
    setCategory('Web Apps');
    setDescription('');
    setDemoUrl('https://muhammad-hasil.vercel.app/');
    setPurchaseUrl('https://pro.fiverr.com/users/venomdesigne613/');
    setFeatures('Next.js Pages Router, Clean Architecture, Dark Mode UI');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod: DigitalProduct) => {
    setEditingProd(prod);
    setTitle(prod.title);
    setPrice(prod.price);
    setBadge(prod.badge || '');
    setCategory(prod.category);
    setDescription(prod.description);
    setDemoUrl(prod.demoUrl);
    setPurchaseUrl(prod.purchaseUrl);
    setFeatures(prod.features?.join(', ') || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProd: DigitalProduct = {
      id: editingProd?.id || `prod-${Date.now()}`,
      title: title.trim(),
      price: price.trim(),
      badge: badge.trim() || undefined,
      category: category.trim(),
      description: description.trim(),
      demoUrl: demoUrl.trim(),
      purchaseUrl: purchaseUrl.trim(),
      features: features.split(',').map((f) => f.trim()).filter(Boolean),
    };

    await onSaveProduct(newProd);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-[#181818] p-5 rounded-3xl border border-zinc-800 shadow-xl">
        <div>
          <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider mb-0.5">
            Store & Source Code
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-poppins text-white uppercase flex items-center gap-2">
            <span>Digital Products Store</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-skin/10 text-skin font-mono border border-skin/20">
              {products.length} Products
            </span>
          </h2>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-skin hover:opacity-90 text-white font-bold font-poppins text-xs tracking-wider uppercase shadow-lg shadow-skin/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-[#181818] border border-zinc-800 rounded-3xl p-5 shadow-xl flex flex-col justify-between hover:border-skin/60 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-xl bg-skin text-white font-black font-poppins text-xs">
                  {p.price}
                </span>
                {p.badge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-skin/10 text-skin text-[10px] font-bold font-poppins border border-skin/20">
                    {p.badge}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold font-poppins text-white mb-1.5">{p.title}</h3>
              <p className="text-xs text-zinc-400 font-sans line-clamp-2 mb-3">{p.description}</p>
              <div className="space-y-1 mb-4 text-[11px] text-zinc-300">
                {p.features?.slice(0, 3).map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-skin shrink-0" />
                    <span className="truncate">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
              <a
                href={p.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-zinc-400 hover:text-skin flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Demo</span>
              </a>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(p)}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-skin hover:text-white text-zinc-300 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete product "${p.title}"?`)) onDeleteProduct(p.id);
                  }}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-zinc-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingProd ? 'Edit Digital Product' : 'Add Digital Product'}
            </h3>
            <form onSubmit={handleSave} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Product Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Price (e.g. $29)"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Badge (e.g. Best Seller)"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
                />
              </div>
              <textarea
                rows={2}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
              />
              <input
                type="text"
                placeholder="Demo URL"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
              />
              <input
                type="text"
                placeholder="Features (comma separated)"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
              />
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-xs text-zinc-300"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-skin text-xs text-white font-bold">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. SERVICES MANAGER
// ==========================================
export function AdminServicesManager({
  services,
  onSaveService,
  onDeleteService,
}: {
  services: ServiceItem[];
  onSaveService: (srv: ServiceItem) => Promise<void>;
  onDeleteService: (id: string) => Promise<void>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSrv, setEditingSrv] = useState<ServiceItem | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Engineering');
  const [startingPrice, setStartingPrice] = useState('$800');
  const [deliveryTime, setDeliveryTime] = useState('5-14 Days');
  const [badge, setBadge] = useState('Core Specialty');
  const [description, setDescription] = useState('');
  const [deliverables, setDeliverables] = useState('');

  const handleOpenAdd = () => {
    setEditingSrv(null);
    setTitle('');
    setCategory('Engineering');
    setStartingPrice('$500');
    setDeliveryTime('3-7 Days');
    setBadge('High ROI');
    setDescription('');
    setDeliverables('Responsive Web Design, REST API, Database Models, CI/CD Pipeline');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv: ServiceItem) => {
    setEditingSrv(srv);
    setTitle(srv.title);
    setCategory(srv.category);
    setStartingPrice(srv.startingPrice);
    setDeliveryTime(srv.deliveryTime);
    setBadge(srv.badge);
    setDescription(srv.description);
    setDeliverables(srv.deliverables?.join(', ') || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const srvData: ServiceItem = {
      id: editingSrv?.id || `srv-${Date.now()}`,
      title: title.trim(),
      category: category.trim(),
      startingPrice: startingPrice.trim(),
      deliveryTime: deliveryTime.trim(),
      icon: 'Code2',
      badge: badge.trim(),
      description: description.trim(),
      deliverables: deliverables.split(',').map((d) => d.trim()).filter(Boolean),
      tech: ['React', 'Next.js', 'Node.js', 'Tailwind CSS'],
    };

    await onSaveService(srvData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-[#181818] p-5 rounded-3xl border border-zinc-800 shadow-xl">
        <div>
          <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider mb-0.5">
            Offerings & Plans
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-poppins text-white uppercase flex items-center gap-2">
            <span>Services & Solutions</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-skin/10 text-skin font-mono border border-skin/20">
              {services.length} Services
            </span>
          </h2>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-skin hover:opacity-90 text-white font-bold font-poppins text-xs tracking-wider uppercase shadow-lg shadow-skin/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s) => (
          <div
            key={s.id}
            className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-skin/60 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-skin font-bold">Starts {s.startingPrice}</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-skin/10 text-skin font-bold font-poppins border border-skin/20">
                  {s.deliveryTime}
                </span>
              </div>
              <h3 className="text-base font-bold font-poppins text-white mb-2">{s.title}</h3>
              <p className="text-xs text-zinc-400 font-sans mb-4">{s.description}</p>
              <div className="space-y-1 mb-4 text-[11px] text-zinc-300">
                {s.deliverables?.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-skin shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(s)}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-skin hover:text-white text-zinc-300 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete service "${s.title}"?`)) onDeleteService(s.id);
                }}
                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-zinc-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingSrv ? 'Edit Service' : 'Add Service'}
            </h3>
            <form onSubmit={handleSave} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Service Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Starting Price (e.g. $800)"
                  value={startingPrice}
                  onChange={(e) => setStartingPrice(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Delivery Time (e.g. 5-14 Days)"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
                />
              </div>
              <textarea
                rows={3}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
              />
              <textarea
                rows={2}
                placeholder="Deliverables (comma separated)"
                value={deliverables}
                onChange={(e) => setDeliverables(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
              />
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-xs text-zinc-300"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-skin text-xs text-white font-bold">
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. PROFILE & BIO EDITOR
// ==========================================
export function AdminProfileManager({
  profile,
  onUpdateProfile,
}: {
  profile: ProfileData;
  onUpdateProfile: (p: ProfileData) => Promise<void>;
}) {
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
        <div>
          <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider">
            General Configuration
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-poppins text-white uppercase">
            Profile, Bio & Social Coordinates
          </h2>
        </div>
        {saved && (
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold font-poppins border border-emerald-500/30 flex items-center gap-1.5 animate-pulse">
            <Check className="w-3.5 h-3.5" /> Saved & Synced!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Tagline</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Headline</label>
            <input
              type="text"
              value={form.headline}
              onChange={(e) => setForm({ ...form, headline: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Short Hero Bio</label>
          <textarea
            rows={2}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Full About Summary</label>
          <textarea
            rows={5}
            value={form.aboutSummary}
            onChange={(e) => setForm({ ...form, aboutSummary: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white font-sans leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-zinc-800">
          <div>
            <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Experience</label>
            <input
              type="text"
              value={form.stats.experienceYears}
              onChange={(e) =>
                setForm({ ...form, stats: { ...form.stats, experienceYears: e.target.value } })
              }
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-skin font-bold"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Completed</label>
            <input
              type="text"
              value={form.stats.completedProjects}
              onChange={(e) =>
                setForm({ ...form, stats: { ...form.stats, completedProjects: e.target.value } })
              }
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-skin font-bold"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Happy Clients</label>
            <input
              type="text"
              value={form.stats.happyClients}
              onChange={(e) =>
                setForm({ ...form, stats: { ...form.stats, happyClients: e.target.value } })
              }
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-skin font-bold"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Hours Coded</label>
            <input
              type="text"
              value={form.stats.hoursCoded}
              onChange={(e) =>
                setForm({ ...form, stats: { ...form.stats, hoursCoded: e.target.value } })
              }
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-skin font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-zinc-800">
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Fiverr Pro URL</label>
            <input
              type="text"
              value={form.fiverrPro}
              onChange={(e) => setForm({ ...form, fiverrPro: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">LinkedIn URL</label>
            <input
              type="text"
              value={form.linkedin}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">GitHub URL</label>
            <input
              type="text"
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-3 rounded-2xl bg-skin hover:opacity-90 text-white font-bold font-poppins text-xs tracking-wider uppercase shadow-lg shadow-skin/30 transition-all cursor-pointer"
          >
            Save Profile & Sync Firestore
          </button>
        </div>
      </form>
    </div>
  );
}
