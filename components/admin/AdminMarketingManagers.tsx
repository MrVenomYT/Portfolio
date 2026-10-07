'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Star, HelpCircle, Mail, BookOpen, Check, MessageSquare, Sliders } from 'lucide-react';
import { TestimonialItem, FAQItem, RadarProficiency } from '@/lib/portfolioData';

// ==========================================
// 1. TESTIMONIALS MANAGER
// ==========================================
export function AdminTestimonialsManager({
  testimonials,
  onSaveTestimonial,
  onDeleteTestimonial,
}: {
  testimonials: TestimonialItem[];
  onSaveTestimonial: (t: TestimonialItem) => Promise<void>;
  onDeleteTestimonial: (id: string) => Promise<void>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleOpenAdd = () => {
    setEditingItem(null);
    setName('');
    setRole('Verified Client');
    setRating(5);
    setComment('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: TestimonialItem) => {
    setEditingItem(t);
    setName(t.name);
    setRole(t.role);
    setRating(t.rating);
    setComment(t.comment);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await onSaveTestimonial({
      id: editingItem?.id || `test-${Date.now()}`,
      name: name.trim(),
      role: role.trim(),
      rating,
      comment: comment.trim(),
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-[#181818] p-5 rounded-3xl border border-zinc-800 shadow-xl">
        <div>
          <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider mb-0.5">Endorsements</div>
          <h2 className="text-xl sm:text-2xl font-black font-poppins text-white uppercase">Client Reviews ({testimonials.length})</h2>
        </div>
        <button onClick={handleOpenAdd} className="px-5 py-2.5 rounded-2xl bg-skin text-white font-bold font-poppins text-xs uppercase cursor-pointer">
          <Plus className="w-4 h-4 inline mr-1" /> Add Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-[#181818] border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-skin mb-2">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-skin text-skin" />
                ))}
              </div>
              <p className="text-xs text-zinc-300 italic mb-3">"{t.comment}"</p>
            </div>
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">{t.name}</div>
                <div className="text-[10px] text-zinc-400">{t.role}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleOpenEdit(t)} className="p-1.5 rounded-lg bg-zinc-800 hover:bg-skin hover:text-white text-zinc-300 cursor-pointer">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => confirm('Delete?') && onDeleteTestimonial(t.id)} className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white cursor-pointer">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-zinc-700 rounded-3xl max-w-lg w-full p-6">
            <h3 className="text-lg font-bold text-white mb-4">{editingItem ? 'Edit Review' : 'Add Review'}</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <input type="text" required placeholder="Client Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white" />
              <input type="text" placeholder="Role / Company" value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white" />
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white">
                <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                <option value={3}>3 Stars ⭐⭐⭐</option>
              </select>
              <textarea rows={3} placeholder="Review Text" value={comment} onChange={(e) => setComment(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white" />
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-zinc-800 text-xs text-zinc-300">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-skin text-xs text-white font-bold">Save Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. FAQS MANAGER
// ==========================================
export function AdminFAQsManager({
  faqs,
  onSaveFAQ,
  onDeleteFAQ,
}: {
  faqs: FAQItem[];
  onSaveFAQ: (faq: FAQItem, index?: number) => Promise<void>;
  onDeleteFAQ: (index: number) => Promise<void>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [q, setQ] = useState('');
  const [a, setA] = useState('');

  const handleOpenAdd = () => {
    setEditIndex(null);
    setQ('');
    setA('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq: FAQItem, idx: number) => {
    setEditIndex(idx);
    setQ(faq.q);
    setA(faq.a);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    await onSaveFAQ({ q: q.trim(), a: a.trim() }, editIndex ?? undefined);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-[#181818] p-5 rounded-3xl border border-zinc-800 shadow-xl">
        <div>
          <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider mb-0.5">Knowledge Base</div>
          <h2 className="text-xl sm:text-2xl font-black font-poppins text-white uppercase">Frequently Asked Questions ({faqs.length})</h2>
        </div>
        <button onClick={handleOpenAdd} className="px-5 py-2.5 rounded-2xl bg-skin text-white font-bold font-poppins text-xs uppercase cursor-pointer">
          <Plus className="w-4 h-4 inline mr-1" /> Add FAQ
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-[#181818] border border-zinc-800 rounded-2xl p-5 flex items-start justify-between">
            <div className="pr-4">
              <h3 className="text-sm font-bold text-white mb-1.5">{faq.q}</h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">{faq.a}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => handleOpenEdit(faq, idx)} className="p-1.5 rounded-lg bg-zinc-800 hover:bg-skin hover:text-white text-zinc-300 cursor-pointer">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => confirm('Delete FAQ?') && onDeleteFAQ(idx)} className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white cursor-pointer">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-zinc-700 rounded-3xl max-w-lg w-full p-6">
            <h3 className="text-lg font-bold text-white mb-4">{editIndex !== null ? 'Edit FAQ' : 'Add FAQ'}</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <input type="text" required placeholder="Question Title" value={q} onChange={(e) => setQ(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white" />
              <textarea rows={4} placeholder="Answer Explanation" value={a} onChange={(e) => setA(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white" />
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-zinc-800 text-xs text-zinc-300">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-skin text-xs text-white font-bold">Save FAQ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. RADAR SKILLS MANAGER
// ==========================================
export function AdminSkillsManager({
  skills,
  onUpdateSkills,
}: {
  skills: RadarProficiency[];
  onUpdateSkills: (skills: RadarProficiency[]) => Promise<void>;
}) {
  const [list, setList] = useState(skills);
  const [saved, setSaved] = useState(false);

  const handleScoreChange = (idx: number, score: number) => {
    const updated = [...list];
    updated[idx] = { ...updated[idx], score };
    setList(updated);
  };

  const handleAxisChange = (idx: number, axis: string) => {
    const updated = [...list];
    updated[idx] = { ...updated[idx], axis };
    setList(updated);
  };

  const handleSave = async () => {
    await onUpdateSkills(list);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div>
          <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider">Evaluation Chart</div>
          <h2 className="text-xl sm:text-2xl font-black font-poppins text-white uppercase">Technical Proficiency Radar</h2>
        </div>
        {saved && (
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            Saved!
          </span>
        )}
      </div>

      <div className="space-y-4">
        {list.map((item, idx) => (
          <div key={item.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <input
              type="text"
              value={item.axis}
              onChange={(e) => handleAxisChange(idx, e.target.value)}
              className="bg-transparent text-sm font-bold text-white border-b border-zinc-700 focus:border-skin focus:outline-none px-1"
            />
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0}
                max={100}
                value={item.score}
                onChange={(e) => handleScoreChange(idx, Number(e.target.value))}
                className="w-48 accent-amber-500 cursor-pointer"
              />
              <span className="w-12 text-right font-mono font-bold text-skin text-sm">{item.score}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <button onClick={handleSave} className="px-8 py-3 rounded-2xl bg-skin text-white font-bold font-poppins text-xs uppercase cursor-pointer">
          Update Radar Skills
        </button>
      </div>
    </div>
  );
}
