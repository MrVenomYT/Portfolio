'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  Mail,
  KeyRound,
  Shield,
  Loader2,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  Menu,
  X,
  Trash2,
} from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { usePortfolio } from '@/lib/portfolioContext';

import AdminSidebar, { AdminTab } from '@/components/admin/AdminSidebar';
import AdminProjectsManager from '@/components/admin/AdminProjectsManager';
import {
  AdminProductsManager,
  AdminServicesManager,
  AdminProfileManager,
} from '@/components/admin/AdminEntityManagers';
import {
  AdminExperienceManager,
  AdminEducationManager,
  AdminCertificationsManager,
} from '@/components/admin/AdminResumeManagers';
import {
  AdminTestimonialsManager,
  AdminFAQsManager,
  AdminSkillsManager,
} from '@/components/admin/AdminMarketingManagers';
import AdminOverview from '@/components/admin/AdminOverview';

export default function AdminPage() {
  const {
    profile,
    projects,
    products,
    services,
    education,
    experiences,
    certifications,
    radarSkills,
    testimonials,
    faqs,
    saveProject,
    deleteProject,
    saveProduct,
    deleteProduct,
    saveService,
    deleteService,
    saveEducation,
    deleteEducation,
    saveExperience,
    deleteExperience,
    saveCertification,
    deleteCertification,
    saveTestimonial,
    deleteTestimonial,
    saveFAQ,
    deleteFAQ,
    updateProfile,
    updateRadarSkills,
    seedAllToDatabase,
    isSeeding,
  } = usePortfolio();

  // Auth State
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Sider & Navigation State
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Inquiries and Guestbook lists
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [guestbookItems, setGuestbookItems] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      if (user) {
        fetchInquiriesAndGuestbook();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchInquiriesAndGuestbook = async () => {
    setLoadingMessages(true);
    try {
      // Inquiries
      const inqQ = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
      const inqSnap = await getDocs(inqQ);
      setInquiries(inqSnap.docs.map((d) => ({ id: d.id, ...d.data() })));

      // Guestbook
      const gbQ = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
      const gbSnap = await getDocs(gbQ);
      setGuestbookItems(gbSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('Error fetching admin messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setLoginError('Invalid email or password. Please check your credentials.');
      } else if (err.code === 'auth/user-not-found') {
        setLoginError('No administrator account found with this email.');
      } else if (err.code === 'auth/too-many-requests') {
        setLoginError('Too many failed attempts. Access has been temporarily restricted.');
      } else {
        setLoginError(err.message || 'Authentication failed. Please verify credentials.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'inquiries', id));
      setInquiries((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
    }
  };

  const handleDeleteGuestbook = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'guestbook', id));
      setGuestbookItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error('Failed to delete guestbook item:', err);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center text-white space-y-4">
        <Loader2 className="w-8 h-8 text-skin animate-spin" />
        <p className="text-xs font-mono text-zinc-400">Verifying security credentials...</p>
      </div>
    );
  }

  // If unauthenticated: Render login gate
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-skin/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-md w-full bg-[#181818] border border-zinc-800 rounded-3xl p-6 sm:p-8 relative z-10 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-skin/10 text-skin border border-skin/20 flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black font-poppins text-white uppercase tracking-tight">
              Muhammad Hasil <span className="text-skin">Studio</span>
            </h1>
            <p className="text-xs text-zinc-400 font-sans mt-1">
              Authorized Administrator Access Portal
            </p>
          </div>

          {loginError && (
            <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold font-poppins text-zinc-300 uppercase mb-1.5">
                Owner Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="esp.hasil.insight@gmail.com"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-skin/60 font-poppins"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold font-poppins text-zinc-300 uppercase mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-skin/60 font-poppins"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-xl bg-skin hover:opacity-90 text-white font-bold font-poppins text-xs tracking-wider uppercase shadow-lg shadow-skin/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authenticate Session</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
            <Link
              href="/"
              className="text-xs text-zinc-400 hover:text-skin font-poppins transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Return to Public Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Counts payload for sidebar badges
  const sidebarCounts = {
    projects: projects.length,
    products: products.length,
    services: services.length,
    experience: experiences.length,
    education: education.length,
    certifications: certifications.length,
    testimonials: testimonials.length,
    faqs: faqs.length,
    inquiries: inquiries.length,
    guestbook: guestbookItems.length,
  };

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col md:flex-row text-white">
      {/* Desktop Sider */}
      <div className="hidden md:block">
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={sidebarCounts}
          onSignOut={handleSignOut}
          onSeedDatabase={seedAllToDatabase}
          isSeeding={isSeeding}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
      </div>

      {/* Mobile Top Header */}
      <div className="md:hidden p-4 bg-[#141414] border-b border-zinc-800 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-skin to-amber-500 flex items-center justify-center text-white font-black text-sm">
            MH
          </div>
          <div>
            <div className="text-xs font-bold font-poppins text-white">Admin Studio</div>
            <div className="text-[10px] text-skin font-mono capitalize">{activeTab}</div>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-zinc-800 text-zinc-300"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/90 p-4 overflow-y-auto">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-zinc-800 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <AdminSidebar
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setMobileMenuOpen(false);
            }}
            counts={sidebarCounts}
            onSignOut={handleSignOut}
            onSeedDatabase={seedAllToDatabase}
            isSeeding={isSeeding}
            collapsed={false}
            setCollapsed={() => {}}
          />
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {activeTab === 'overview' && (
          <AdminOverview
            profile={profile}
            projects={projects}
            productsCount={products.length}
            servicesCount={services.length}
            testimonialsCount={testimonials.length}
            inquiriesCount={inquiries.length}
            guestbookCount={guestbookItems.length}
            onNavigate={(tab) => setActiveTab(tab)}
            onSeedDatabase={seedAllToDatabase}
            isSeeding={isSeeding}
          />
        )}

        {activeTab === 'projects' && (
          <AdminProjectsManager
            projects={projects}
            onSaveProject={saveProject}
            onDeleteProject={deleteProject}
          />
        )}

        {activeTab === 'products' && (
          <AdminProductsManager
            products={products}
            onSaveProduct={saveProduct}
            onDeleteProduct={deleteProduct}
          />
        )}

        {activeTab === 'services' && (
          <AdminServicesManager
            services={services}
            onSaveService={saveService}
            onDeleteService={deleteService}
          />
        )}

        {activeTab === 'profile' && (
          <AdminProfileManager profile={profile} onUpdateProfile={updateProfile} />
        )}

        {activeTab === 'experience' && (
          <AdminExperienceManager
            experiences={experiences}
            onSaveExperience={saveExperience}
            onDeleteExperience={deleteExperience}
          />
        )}

        {activeTab === 'education' && (
          <AdminEducationManager
            education={education}
            onSaveEducation={saveEducation}
            onDeleteEducation={deleteEducation}
          />
        )}

        {activeTab === 'certifications' && (
          <AdminCertificationsManager
            certifications={certifications}
            onSaveCertification={saveCertification}
            onDeleteCertification={deleteCertification}
          />
        )}

        {activeTab === 'testimonials' && (
          <AdminTestimonialsManager
            testimonials={testimonials}
            onSaveTestimonial={saveTestimonial}
            onDeleteTestimonial={deleteTestimonial}
          />
        )}

        {activeTab === 'faqs' && (
          <AdminFAQsManager faqs={faqs} onSaveFAQ={saveFAQ} onDeleteFAQ={deleteFAQ} />
        )}

        {activeTab === 'skills' && (
          <AdminSkillsManager skills={radarSkills} onUpdateSkills={updateRadarSkills} />
        )}

        {/* Contact Inquiries View */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="bg-[#181818] p-5 rounded-3xl border border-zinc-800 shadow-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider">
                  Visitor Inbox
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-poppins text-white uppercase">
                  Contact Form Inquiries ({inquiries.length})
                </h2>
              </div>
              <button
                onClick={fetchInquiriesAndGuestbook}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-bold font-poppins text-zinc-300 hover:text-white"
              >
                Refresh
              </button>
            </div>

            <div className="space-y-4">
              {inquiries.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 bg-[#181818] rounded-3xl border border-zinc-800 text-xs">
                  No contact submissions received yet.
                </div>
              ) : (
                inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-5 bg-[#181818] border border-zinc-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-white">{inq.name}</span>
                        <span className="text-xs text-skin font-mono">({inq.email})</span>
                      </div>
                      <div className="text-xs font-semibold text-zinc-300 mb-1.5">
                        Subject: {inq.subject || 'Portfolio Inquiry'}
                      </div>
                      <p className="text-xs text-zinc-400 font-sans max-w-2xl">{inq.message}</p>
                    </div>
                    <button
                      onClick={() => confirm('Delete inquiry?') && handleDeleteInquiry(inq.id)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors self-end md:self-auto cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Guestbook View */}
        {activeTab === 'guestbook' && (
          <div className="space-y-6">
            <div className="bg-[#181818] p-5 rounded-3xl border border-zinc-800 shadow-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider">
                  Community Wall
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-poppins text-white uppercase">
                  Guestbook Signatures ({guestbookItems.length})
                </h2>
              </div>
              <button
                onClick={fetchInquiriesAndGuestbook}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-bold font-poppins text-zinc-300 hover:text-white"
              >
                Refresh
              </button>
            </div>

            <div className="space-y-4">
              {guestbookItems.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 bg-[#181818] rounded-3xl border border-zinc-800 text-xs">
                  No guestbook entries found.
                </div>
              ) : (
                guestbookItems.map((gb) => (
                  <div
                    key={gb.id}
                    className="p-5 bg-[#181818] border border-zinc-800 rounded-2xl flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-white">{gb.author || gb.name}</span>
                        {gb.avatar && <span className="text-sm">{gb.avatar}</span>}
                      </div>
                      <p className="text-xs text-zinc-300 font-sans">{gb.message || gb.content}</p>
                    </div>
                    <button
                      onClick={() => confirm('Delete entry?') && handleDeleteGuestbook(gb.id)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
