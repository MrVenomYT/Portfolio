'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Star, Send, ShieldCheck, Sparkles, Loader2, Clock } from 'lucide-react';

interface Entry {
  id: string;
  authorName: string;
  authorRole: string;
  comment: string;
  rating: number;
  badge: string;
  createdAt: string;
}

export default function GuestbookSection() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [badge, setBadge] = useState('Developer');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/guestbook');
      const data = await res.json();
      if (data.success && Array.isArray(data.entries)) {
        setEntries(data.entries);
      }
    } catch (e) {
      console.error('Failed to load guestbook:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSignGuestbook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName,
          authorRole,
          comment,
          rating,
          badge,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setAuthorName('');
        setAuthorRole('');
        setComment('');
        fetchEntries();
        setTimeout(() => setSubmitted(false), 4000);
      }
    } catch (e) {
      console.error('Error posting entry:', e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#141414] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-skin/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-skin text-xs font-bold font-poppins uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Community & Client Feedback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white">
            Visitor Guestbook & Endorsements
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1">
            Leave a note, peer review, or endorsement for Muhammad Hasil's engineering work.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sign form */}
        <div className="lg:col-span-5 bg-[#1a1a1a] p-6 sm:p-7 rounded-2xl border border-zinc-800">
          <h3 className="text-lg font-bold font-poppins text-white uppercase mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-skin" />
            Sign the Guestbook
          </h3>

          {submitted && (
            <div className="mb-4 p-3.5 rounded-xl bg-skin/10 border border-skin/40 text-skin text-xs font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Thank you! Your endorsement has been saved.</span>
            </div>
          )}

          <form onSubmit={handleSignGuestbook} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-poppins mb-1.5">
                Your Name / Handle <span className="text-skin">*</span>
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. David Ross"
                className="w-full px-4 py-2.5 rounded-xl bg-[#222] border border-zinc-700/60 focus:border-skin focus:outline-none text-xs sm:text-sm text-white transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-poppins mb-1.5">
                  Your Role / Company
                </label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder="e.g. React Developer"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#222] border border-zinc-700/60 focus:border-skin focus:outline-none text-xs sm:text-sm text-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-poppins mb-1.5">
                  Category
                </label>
                <select
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#222] border border-zinc-700/60 focus:border-skin focus:outline-none text-xs sm:text-sm text-white transition-colors"
                >
                  <option value="Developer">Developer</option>
                  <option value="Client">Client</option>
                  <option value="Recruiter">Recruiter</option>
                  <option value="Peer">Tech Peer</option>
                  <option value="Visitor">Visitor</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-poppins mb-1.5">
                Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-zinc-600 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs text-zinc-400 ml-2 font-mono">{rating}/5 Stars</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-poppins mb-1.5">
                Your Endorsement / Note <span className="text-skin">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your feedback on Muhammad's work or collaboration..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#222] border border-zinc-700/60 focus:border-skin focus:outline-none text-xs sm:text-sm text-white transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-skin text-white font-bold font-poppins uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Post Endorsement
                </>
              )}
            </button>
          </form>
        </div>

        {/* Entries list */}
        <div className="lg:col-span-7 flex flex-col space-y-4 max-h-[520px] overflow-y-auto pr-2 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-zinc-500 gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-skin" />
              <span className="text-xs font-mono">Loading endorsements...</span>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12 bg-[#1a1a1a] rounded-2xl border border-zinc-800 text-zinc-400 text-xs">
              No endorsements yet. Be the first to sign the guestbook!
            </div>
          ) : (
            entries.map((item) => (
              <div
                key={item.id}
                className="bg-[#181818] p-5 rounded-2xl border border-zinc-800/90 hover:border-skin/40 transition-colors flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-skin font-bold text-sm">
                      {item.authorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold font-poppins text-white">
                          {item.authorName}
                        </span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-skin/10 text-skin border border-skin/20">
                          {item.badge || 'Visitor'}
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-400 block">{item.authorRole}</span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-sans bg-[#131313] p-3 rounded-xl border border-zinc-800/60">
                  "{item.comment}"
                </p>

                <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(item.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
