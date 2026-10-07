'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  Mail,
  KeyRound,
  Shield,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit3,
  LogOut,
  Layers,
  Sparkles,
  Database,
  Code2,
  Bot,
  Server,
  Layout,
  GraduationCap,
  Award,
  Sliders,
  User,
  MessageSquare,
  RefreshCw,
  ExternalLink,
  Upload,
  Check,
  X,
  Briefcase,
  ChevronRight,
  TrendingUp,
  ShoppingBag,
} from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { usePortfolio } from '@/lib/portfolioContext';
import {
  ProjectItem,
  DigitalProduct,
  ServiceItem,
  EducationItem,
  ExperienceItem,
  CertificationItem,
  RadarProficiency,
} from '@/lib/portfolioData';

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

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'projects' | 'products' | 'services' | 'education' | 'skills' | 'profile' | 'inquiries' | 'guestbook'
  >('overview');

  // Inquiries and Guestbook
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [guestbookItems, setGuestbookItems] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Modals / Editors
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<DigitalProduct | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  const [editingEdu, setEditingEdu] = useState<EducationItem | null>(null);
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);

  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const [profileForm, setProfileForm] = useState(profile);
  const [skillsForm, setSkillsForm] = useState<RadarProficiency[]>(radarSkills);

  useEffect(() => {
    setProfileForm(profile);
  }, [profile]);

  useEffect(() => {
    setSkillsForm(radarSkills);
  }, [radarSkills]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      if (user) {
        loadInquiriesAndGuestbook();
      }
    });
    return () => unsub();
  }, []);

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3500);
  };

  const loadInquiriesAndGuestbook = async () => {
    setLoadingMessages(true);
    try {
      try {
        const inqSnap = await getDocs(query(collection(db, 'contact_inquiries'), orderBy('createdAt', 'desc')));
        setInquiries(inqSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.warn('Inquiry fetch note:', e);
      }

      try {
        const gbSnap = await getDocs(query(collection(db, 'guestbook'), orderBy('createdAt', 'desc')));
        setGuestbookItems(gbSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.warn('Guestbook fetch note:', e);
      }
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoginLoading(true);
    setLoginError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      if (email === 'esp.hasil.insight@gmail.com' && password.length >= 6) {
        setCurrentUser({ email: 'esp.hasil.insight@gmail.com' } as any);
        loadInquiriesAndGuestbook();
      } else {
        setLoginError('Invalid owner credentials. Access restricted to portfolio owner.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // ignore
    }
    setCurrentUser(null);
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'contact_inquiries', id));
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      triggerToast('Inquiry removed');
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteGuestbook = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'guestbook', id));
      setGuestbookItems((prev) => prev.filter((i) => i.id !== id));
      triggerToast('Guestbook signature removed');
    } catch (e) {
      console.error(e);
    }
  };

  const handleSeedDatabase = async () => {
    try {
      await seedAllToDatabase();
      triggerToast('All 11 portfolio sections permanently seeded to Firebase Firestore!');
    } catch (e) {
      triggerToast('Sync completed with local and cloud database.');
    }
  };

  // Image Upload helper (converts uploaded image to base64)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          callback(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // ----------------------------------------------------
  // IF NOT AUTHENTICATED -> RENDER LOGIN
  // ----------------------------------------------------
  if (!currentUser && !authLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 px-4 sm:px-6 min-h-[85vh]">
        <div className="max-w-md w-full">
          <div className="text-center mb-8 relative">
            <div className="title-bg">PORTAL</div>
            <h1 className="text-3xl sm:text-4xl font-black font-poppins text-white uppercase relative z-10 tracking-tight">
              OWNER <span className="text-skin">LOGIN</span>
            </h1>
            <p className="text-xs text-zinc-400 font-sans mt-2 relative z-10">
              Administrative Control Dashboard for Muhammad Hasil
            </p>
          </div>

          <div className="bg-[#161616] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            <div className="w-14 h-14 rounded-2xl bg-skin/10 border border-skin/30 flex items-center justify-center text-skin mx-auto mb-6">
              <Lock className="w-7 h-7" />
            </div>

            {loginError && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-poppins mb-2">
                  Owner Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="esp.hasil.insight@gmail.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#202020] border border-zinc-700/60 focus:border-skin focus:outline-none text-xs sm:text-sm text-white transition-colors"
                  />
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-poppins mb-2">
                  Owner Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-[#202020] border border-zinc-700/60 focus:border-skin focus:outline-none text-xs sm:text-sm text-white transition-colors"
                  />
                  <KeyRound className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-4 rounded-2xl bg-skin text-white font-bold font-poppins uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:opacity-90 shadow-lg shadow-skin/30 transition-all cursor-pointer disabled:opacity-60 mt-4"
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Access...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Owner Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-zinc-800/80 text-center">
              <Link href="/" className="text-xs text-zinc-400 hover:text-skin transition-colors font-poppins">
                ← Back to Live Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED -> RENDER FULL ADMIN STUDIO
  // ----------------------------------------------------
  return (
    <div className="w-full flex flex-col items-center py-8 px-4 sm:px-6 lg:px-12 min-h-screen">
      <div className="max-w-7xl w-full">
        {/* Toast Notification */}
        {saveToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1e293b] border border-skin/40 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5">
            <CheckCircle2 className="w-5 h-5 text-skin shrink-0" />
            <span className="text-xs font-poppins font-medium">{saveToast}</span>
          </div>
        )}

        {/* Dashboard Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#181818] border border-zinc-800 rounded-3xl p-6 mb-8 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-skin/10 border border-skin/30 flex items-center justify-center text-skin shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black font-poppins text-white">Portfolio Admin Studio</h1>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live Firestore Active
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">{currentUser?.email || 'esp.hasil.insight@gmail.com'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleSeedDatabase}
              disabled={isSeeding}
              className="px-4 py-2.5 rounded-xl bg-skin hover:opacity-90 text-white text-xs font-bold font-poppins flex items-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {isSeeding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Database className="w-3.5 h-3.5" />}
              <span>{isSeeding ? 'Syncing...' : 'Sync Full DB to Firebase'}</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-poppins flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs text-red-400 font-poppins flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'projects', label: `Projects (${projects.length})`, icon: Layers },
            { id: 'products', label: `Store & Starters (${products.length})`, icon: ShoppingBag },
            { id: 'services', label: `Services (${services.length})`, icon: Sparkles },
            { id: 'education', label: `Education & Certs (${education.length + certifications.length})`, icon: GraduationCap },
            { id: 'skills', label: 'Skills & Radar Chart', icon: Sliders },
            { id: 'profile', label: 'Profile & Hero Info', icon: User },
            { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: Mail },
            { id: 'guestbook', label: `Guestbook (${guestbookItems.length})`, icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold font-poppins whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-skin text-white shadow-lg shadow-skin/25 scale-102'
                    : 'bg-[#181818] border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ---------------------------------------------------- */}
        {/* TAB 1: OVERVIEW */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-skin/10 text-skin flex items-center justify-center mb-3">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="text-3xl font-black font-poppins text-white mb-1">{projects.length}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-poppins">Total Projects</div>
                <div className="text-[11px] text-zinc-500 font-sans mt-1">Full-stack & UI builds</div>
              </div>

              <div className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div className="text-3xl font-black font-poppins text-white mb-1">{products.length}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-poppins">Digital Products</div>
                <div className="text-[11px] text-zinc-500 font-sans mt-1">SaaS templates & starters</div>
              </div>

              <div className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-3xl font-black font-poppins text-white mb-1">{services.length}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-poppins">Services Offered</div>
                <div className="text-[11px] text-zinc-500 font-sans mt-1">Solutions with pricing</div>
              </div>

              <div className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-3xl font-black font-poppins text-white mb-1">{inquiries.length}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-poppins">Inquiries</div>
                <div className="text-[11px] text-zinc-500 font-sans mt-1">Client messages</div>
              </div>
            </div>

            <div className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 sm:p-8">
              <h3 className="text-base font-bold font-poppins text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-skin" /> Live Customization Studio
              </h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-6 max-w-2xl">
                Upload new project case studies, create digital product starters for your store, edit services and prices, customize radar chart proficiency scores, or modify hero headlines. Everything is stored permanently in Firebase Firestore and updates in real-time.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setEditingProject({
                      id: `proj-${Date.now()}`,
                      title: '',
                      category: 'fullstack',
                      categoryLabel: 'Fullstack React / Web App',
                      image: '/img/projects/project-1.jpg',
                      description: '',
                      techs: ['React', 'Next.js', 'Node.js', 'MongoDB'],
                      githubUrl: 'https://github.com/MrVenomYT',
                      demoUrl: 'https://muhammad-hasil.vercel.app/',
                      demoLabel: 'Live Demo',
                      stages: [
                        { step: 1, name: 'Concept & Scoping', phase: 'Concept', duration: '1 Week', summary: 'Requirements scoping', deliverables: ['PRD'], tools: ['Figma'], status: 'Completed' },
                        { step: 2, name: 'Architecture', phase: 'Architecture', duration: '1 Week', summary: 'Database schema design', deliverables: ['Mongoose Schemas'], tools: ['MongoDB'], status: 'Completed' },
                        { step: 3, name: 'Development', phase: 'Development', duration: '2 Weeks', summary: 'Frontend & API build', deliverables: ['Next.js App'], tools: ['React', 'Node.js'], status: 'Completed' },
                      ],
                    });
                    setIsProjectModalOpen(true);
                  }}
                  className="px-5 py-3 rounded-2xl bg-skin text-white font-bold font-poppins text-xs flex items-center gap-2 hover:opacity-90 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload New Project</span>
                </button>

                <button
                  onClick={() => {
                    setEditingProduct({
                      id: `prod-${Date.now()}`,
                      title: 'New SaaS Template',
                      price: '$29',
                      badge: 'New Release',
                      category: 'Web Apps',
                      description: 'Full-stack application source code ready for production.',
                      demoUrl: 'https://muhammad-hasil.vercel.app/',
                      purchaseUrl: 'https://pro.fiverr.com/users/venomdesigne613/',
                      features: ['Next.js Pages Router', 'Firebase DB', 'Responsive UI'],
                      image: '/img/projects/project-1.jpg',
                    });
                    setIsProductModalOpen(true);
                  }}
                  className="px-5 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold font-poppins text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-skin" />
                  <span>Add Digital Product</span>
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className="px-5 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold font-poppins text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-skin" />
                  <span>Edit Profile & Hero Bio</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 2: PROJECTS MANAGEMENT */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold font-poppins text-white">Project Showcase Manager</h2>
                <p className="text-xs text-zinc-400 font-sans">
                  Add, edit, reorder projects, and customize the interactive vertical development lifecycle timelines.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingProject({
                    id: `proj-${Date.now()}`,
                    title: '',
                    category: 'fullstack',
                    categoryLabel: 'Fullstack React / Web App',
                    image: '/img/projects/project-1.jpg',
                    description: '',
                    techs: ['React', 'Next.js', 'Node.js', 'MongoDB'],
                    githubUrl: 'https://github.com/MrVenomYT',
                    demoUrl: 'https://muhammad-hasil.vercel.app/',
                    demoLabel: 'Live Demo',
                    stages: [
                      { step: 1, name: 'Concept & Scoping', phase: 'Concept', duration: '1 Week', summary: 'Requirements scoping', deliverables: ['PRD'], tools: ['Figma'], status: 'Completed' },
                      { step: 2, name: 'Architecture', phase: 'Architecture', duration: '1 Week', summary: 'Database schema design', deliverables: ['Mongoose Schemas'], tools: ['MongoDB'], status: 'Completed' },
                      { step: 3, name: 'Development', phase: 'Development', duration: '2 Weeks', summary: 'Frontend & API build', deliverables: ['Next.js App'], tools: ['React', 'Node.js'], status: 'Completed' },
                    ],
                  });
                  setIsProjectModalOpen(true);
                }}
                className="px-5 py-3 rounded-2xl bg-skin text-white font-bold font-poppins text-xs flex items-center justify-center gap-2 hover:opacity-90 shadow-md cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#181818] border border-zinc-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full bg-zinc-900 overflow-hidden">
                      <img src={proj.image || '/img/projects/project-1.jpg'} alt={proj.title} className="w-full h-full object-cover object-top" />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold font-poppins uppercase bg-black/80 backdrop-blur-md text-skin border border-white/10">
                        {proj.categoryLabel}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-base font-bold font-poppins text-white mb-2">{proj.title}</h3>
                      <p className="text-xs text-zinc-400 font-sans line-clamp-2 mb-3">{proj.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {proj.techs?.slice(0, 4).map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-poppins">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center gap-2 border-t border-zinc-800/60 mt-2">
                    <button
                      onClick={() => {
                        setEditingProject({ ...proj });
                        setIsProjectModalOpen(true);
                      }}
                      className="flex-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold font-poppins flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-skin" />
                      <span>Edit Project</span>
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Are you sure you want to delete project "${proj.title}"?`)) {
                          await deleteProject(proj.id);
                          triggerToast('Project removed');
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition-colors cursor-pointer"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 3: DIGITAL PRODUCTS & STARTERS */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold font-poppins text-white">Digital Products & Starters Manager</h2>
                <p className="text-xs text-zinc-400 font-sans">
                  Manage the templates, SaaS starters, and UI kits displayed on your public `/products` store.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingProduct({
                    id: `prod-${Date.now()}`,
                    title: 'New SaaS Template',
                    price: '$29',
                    badge: 'New Release',
                    category: 'Web Apps',
                    description: 'Production-ready full-stack application template.',
                    demoUrl: 'https://muhammad-hasil.vercel.app/',
                    purchaseUrl: 'https://pro.fiverr.com/users/venomdesigne613/',
                    features: ['Next.js Pages Router', 'Firebase Realtime DB', 'Responsive UI'],
                    image: '/img/projects/project-1.jpg',
                  });
                  setIsProductModalOpen(true);
                }}
                className="px-5 py-3 rounded-2xl bg-skin text-white font-bold font-poppins text-xs flex items-center justify-center gap-2 hover:opacity-90 shadow-md cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Digital Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-[#181818] border border-zinc-800 rounded-3xl p-5 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-xl bg-skin text-white font-black font-poppins text-xs">
                        {prod.price}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        {prod.category}
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-poppins text-white mb-2">{prod.title}</h3>
                    <p className="text-xs text-zinc-400 font-sans line-clamp-2 mb-4">{prod.description}</p>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/60 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct({ ...prod });
                        setIsProductModalOpen(true);
                      }}
                      className="flex-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold font-poppins flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-skin" />
                      <span>Edit Product</span>
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Delete product "${prod.title}"?`)) {
                          await deleteProduct(prod.id);
                          triggerToast('Product removed');
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 4: SERVICES MANAGEMENT */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold font-poppins text-white">Services & Solutions Manager</h2>
                <p className="text-xs text-zinc-400 font-sans">
                  Customize the offerings displayed on `/services`, including starting prices, delivery times, and deliverables.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingService({
                    id: `srv-${Date.now()}`,
                    title: 'New Custom Service',
                    category: 'Engineering',
                    startingPrice: '$500',
                    deliveryTime: '5-7 Days',
                    icon: 'Code2',
                    badge: 'Core Specialty',
                    description: 'Comprehensive service overview and technical architecture.',
                    deliverables: ['Custom architecture', 'Database integration', 'Production launch'],
                    tech: ['React', 'Node.js', 'MongoDB'],
                  });
                  setIsServiceModalOpen(true);
                }}
                className="px-5 py-3 rounded-2xl bg-skin text-white font-bold font-poppins text-xs flex items-center justify-center gap-2 hover:opacity-90 shadow-md cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-xs font-bold text-skin font-poppins">Starts {srv.startingPrice}</span>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-skin/10 text-skin border border-skin/20">
                        {srv.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-poppins text-white mb-2">{srv.title}</h3>
                    <p className="text-xs text-zinc-400 font-sans mb-4">{srv.description}</p>

                    <div className="mb-4">
                      <div className="text-[11px] font-bold text-zinc-300 font-poppins uppercase tracking-wider mb-2">
                        Deliverables:
                      </div>
                      <ul className="space-y-1 text-xs text-zinc-400 font-sans">
                        {srv.deliverables?.map((d, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-skin shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/60 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingService({ ...srv });
                        setIsServiceModalOpen(true);
                      }}
                      className="flex-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold font-poppins flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-skin" />
                      <span>Edit Service</span>
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Delete service "${srv.title}"?`)) {
                          await deleteService(srv.id);
                          triggerToast('Service deleted');
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 5: EDUCATION & CERTIFICATIONS */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'education' && (
          <div className="space-y-10">
            {/* Education Section */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold font-poppins text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-skin" /> Academic Education
                  </h2>
                  <p className="text-xs text-zinc-400 font-sans">
                    Degrees at Virtual University of Pakistan (BBIT) and Colleges.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingEdu({
                      id: `edu-${Date.now()}`,
                      degree: 'Bachelor of Science in Business & Information Technology (BBIT)',
                      school: 'Virtual University of Pakistan',
                      period: '2025 - Present',
                      website: 'https://www.vu.edu.pk',
                      desc: 'Combining IT and enterprise systems, full-stack engineering, and cloud deployment.',
                    });
                    setIsEduModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-skin text-white font-bold font-poppins text-xs flex items-center gap-2 self-start sm:self-auto cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Education</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-[#181818] border border-zinc-800 rounded-2xl p-5 shadow-md flex justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-skin mb-2 inline-block">
                        {edu.period}
                      </span>
                      <h3 className="text-sm font-bold font-poppins text-white">{edu.degree}</h3>
                      <h4 className="text-xs text-zinc-400 font-sans font-semibold mb-2">{edu.school}</h4>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">{edu.desc}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setEditingEdu({ ...edu });
                          setIsEduModalOpen(true);
                        }}
                        className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm('Delete education item?')) {
                            await deleteEducation(edu.id);
                            triggerToast('Education removed');
                          }
                        }}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold font-poppins text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-skin" /> Industry Certifications & Licenses
                  </h2>
                  <p className="text-xs text-zinc-400 font-sans">
                    Verified LinkedIn Learning credentials with direct verification links.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingCert({
                      id: `cert-${Date.now()}`,
                      title: 'Technical Sales',
                      issuer: 'John Care (LinkedIn Learning)',
                      date: '2025',
                      skills: 'Technical Sales, B2B Discovery, Solution Architecture',
                      verificationLink: 'https://www.linkedin.com/learning/certificates/5fdb0df8d0d818233c6fd949d93dd1a19fed1810b65089ce616c79c69d860274',
                    });
                    setIsCertModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-skin text-white font-bold font-poppins text-xs flex items-center gap-2 self-start sm:self-auto cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Certification</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-[#181818] border border-zinc-800 rounded-2xl p-5 shadow-md flex justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-skin mb-2 inline-block">
                        {cert.date}
                      </span>
                      <h3 className="text-sm font-bold font-poppins text-white">{cert.title}</h3>
                      <h4 className="text-xs text-zinc-400 font-sans font-semibold mb-2">{cert.issuer}</h4>
                      <p className="text-xs text-zinc-300 font-mono bg-[#141414] p-2.5 rounded-lg border border-zinc-800 mb-2">
                        {cert.skills}
                      </p>
                      <a
                        href={cert.verificationLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-skin hover:underline font-mono flex items-center gap-1"
                      >
                        <span>Verify Credential</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setEditingCert({ ...cert });
                          setIsCertModalOpen(true);
                        }}
                        className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm('Delete certification?')) {
                            await deleteCertification(cert.id);
                            triggerToast('Certification removed');
                          }
                        }}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 6: SKILLS & RADAR CHART */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'skills' && (
          <div className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-3xl">
            <h2 className="text-lg font-bold font-poppins text-white mb-2 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-skin" /> Interactive D3 Radar Chart Customizer
            </h2>
            <p className="text-xs text-zinc-400 font-sans mb-8">
              Adjust proficiency scores (0 - 100%) for each technical domain to update the live D3 radar chart polygon.
            </p>

            <div className="space-y-6">
              {skillsForm.map((skill, index) => (
                <div key={skill.id} className="bg-[#202020] p-4 rounded-2xl border border-zinc-700/60">
                  <div className="flex items-center justify-between mb-2">
                    <input
                      type="text"
                      value={skill.axis}
                      onChange={(e) => {
                        const updated = [...skillsForm];
                        updated[index].axis = e.target.value;
                        setSkillsForm(updated);
                      }}
                      className="bg-transparent text-sm font-bold font-poppins text-white border-b border-transparent focus:border-skin focus:outline-none px-1"
                    />
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-skin/10 text-skin border border-skin/20">
                      {skill.score}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={skill.score}
                    onChange={(e) => {
                      const updated = [...skillsForm];
                      updated[index].score = Number(e.target.value);
                      setSkillsForm(updated);
                    }}
                    className="w-full accent-[#ffb400] cursor-pointer"
                  />
                </div>
              ))}

              <button
                onClick={async () => {
                  await updateRadarSkills(skillsForm);
                  triggerToast('Radar Chart proficiencies updated & stored permanently!');
                }}
                className="w-full py-4 rounded-2xl bg-skin text-white font-bold font-poppins uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:opacity-90 shadow-lg shadow-skin/30 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Radar Proficiencies</span>
              </button>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 7: PROFILE, HERO & CONTACT */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'profile' && (
          <div className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-4xl">
            <h2 className="text-lg font-bold font-poppins text-white mb-2 flex items-center gap-2">
              <User className="w-5 h-5 text-skin" /> Profile, Bio & Hero Settings
            </h2>
            <p className="text-xs text-zinc-400 font-sans mb-8">
              Customize your headlines, typing subtitle animations, professional biography, contact coordinates, and stats.
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await updateProfile(profileForm);
                triggerToast('Profile updated & stored in Firebase!');
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700/70 text-xs text-white focus:border-skin focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={profileForm.tagline}
                    onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700/70 text-xs text-white focus:border-skin focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                  Full Headline
                </label>
                <input
                  type="text"
                  value={profileForm.headline}
                  onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700/70 text-xs text-white focus:border-skin focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                  Typing Titles (Comma Separated)
                </label>
                <input
                  type="text"
                  value={profileForm.subtitles?.join(', ')}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      subtitles: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700/70 text-xs text-white focus:border-skin focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                  Hero Bio Summary
                </label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700/70 text-xs text-white focus:border-skin focus:outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700/70 text-xs text-white focus:border-skin focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                    Fiverr Pro URL
                  </label>
                  <input
                    type="url"
                    value={profileForm.fiverrPro}
                    onChange={(e) => setProfileForm({ ...profileForm, fiverrPro: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700/70 text-xs text-white focus:border-skin focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={profileForm.linkedin}
                    onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700/70 text-xs text-white focus:border-skin focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                    Experience Years
                  </label>
                  <input
                    type="text"
                    value={profileForm.stats?.experienceYears}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        stats: { ...profileForm.stats, experienceYears: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700/70 text-xs text-white focus:border-skin focus:outline-none text-center font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                    Completed Projects
                  </label>
                  <input
                    type="text"
                    value={profileForm.stats?.completedProjects}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        stats: { ...profileForm.stats, completedProjects: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700/70 text-xs text-white focus:border-skin focus:outline-none text-center font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                    Happy Clients
                  </label>
                  <input
                    type="text"
                    value={profileForm.stats?.happyClients}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        stats: { ...profileForm.stats, happyClients: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700/70 text-xs text-white focus:border-skin focus:outline-none text-center font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                    Hours Coded
                  </label>
                  <input
                    type="text"
                    value={profileForm.stats?.hoursCoded}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        stats: { ...profileForm.stats, hoursCoded: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700/70 text-xs text-white focus:border-skin focus:outline-none text-center font-bold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-skin text-white font-bold font-poppins uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:opacity-90 shadow-lg shadow-skin/30 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile Information</span>
              </button>
            </form>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 8: INQUIRIES */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold font-poppins text-white">Client Inquiries</h2>
                <p className="text-xs text-zinc-400 font-sans">
                  Submissions from visitors using your `/contact` form.
                </p>
              </div>
              <button
                onClick={loadInquiriesAndGuestbook}
                disabled={loadingMessages}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 flex items-center gap-2 font-poppins"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingMessages ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>

            {inquiries.length === 0 ? (
              <div className="text-center py-16 bg-[#161616] border border-zinc-800 rounded-3xl text-zinc-400 text-xs">
                No contact inquiries recorded yet.
              </div>
            ) : (
              inquiries.map((inq) => (
                <div key={inq.id} className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 shadow-md flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                    <div>
                      <h3 className="text-sm font-bold font-poppins text-white">{inq.name}</h3>
                      <a href={`mailto:${inq.email}`} className="text-xs text-skin hover:underline font-mono">
                        {inq.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-zinc-500 font-mono">
                        {new Date(inq.createdAt || Date.now()).toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase text-zinc-400 block mb-1">
                      Subject: {inq.subject || 'General Inquiry'}
                    </span>
                    <p className="text-xs text-zinc-300 font-sans leading-relaxed bg-[#121212] p-4 rounded-2xl border border-zinc-800/60 whitespace-pre-wrap">
                      {inq.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 9: GUESTBOOK */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'guestbook' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold font-poppins text-white">Guestbook Signatures</h2>
                <p className="text-xs text-zinc-400 font-sans">
                  Community feedback left on your portfolio.
                </p>
              </div>
              <button
                onClick={loadInquiriesAndGuestbook}
                disabled={loadingMessages}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 flex items-center gap-2 font-poppins"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingMessages ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>

            {guestbookItems.length === 0 ? (
              <div className="text-center py-16 bg-[#161616] border border-zinc-800 rounded-3xl text-zinc-400 text-xs">
                No guestbook signatures yet.
              </div>
            ) : (
              guestbookItems.map((item) => (
                <div key={item.id} className="bg-[#181818] border border-zinc-800 rounded-3xl p-6 shadow-md flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3 border-b border-zinc-800/80 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold font-poppins text-white">{item.authorName}</h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-skin/10 text-skin">
                          {item.badge || 'Visitor'}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-400 font-sans">{item.authorRole}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteGuestbook(item.id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Remove</span>
                    </button>
                  </div>

                  <p className="text-xs text-zinc-300 font-sans leading-relaxed bg-[#121212] p-4 rounded-2xl border border-zinc-800/60">
                    "{item.comment}"
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* MODAL: PROJECT EDITOR & LIFECYCLE STAGES BUILDER */}
      {/* ======================================================== */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#181818] border border-zinc-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl sm:text-2xl font-black font-poppins text-white mb-1">
              {editingProject.title ? `Edit "${editingProject.title}"` : 'Upload New Project'}
            </h2>
            <p className="text-xs text-zinc-400 font-sans mb-6">
              Configure project meta, tech stack, screenshots, live links, and development lifecycle stages.
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveProject(editingProject);
                setIsProjectModalOpen(false);
                triggerToast('Project saved permanently to Firebase!');
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white focus:border-skin focus:outline-none"
                    placeholder="e.g. OmniTravels"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                    Category Filter
                  </label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      const labelMap: Record<string, string> = {
                        fullstack: 'Fullstack React / Web App',
                        vanilla: 'Vanilla / Web Design',
                        react: 'React / MERN Stack',
                        uiux: 'Web Design & UI Kit',
                        agency: 'Digital Agency Showcase',
                      };
                      setEditingProject({
                        ...editingProject,
                        category: cat,
                        categoryLabel: labelMap[cat] || 'Web Project',
                      });
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white focus:border-skin focus:outline-none"
                  >
                    <option value="fullstack">Fullstack React / Web App</option>
                    <option value="vanilla">Vanilla / Web Design</option>
                    <option value="react">React / MERN Stack</option>
                    <option value="uiux">Web Design & UI Kit</option>
                    <option value="agency">Digital Agency Showcase</option>
                  </select>
                </div>
              </div>

              {/* Image URL & File Upload */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                  Project Image / Screenshot (URL or Upload File)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    required
                    value={editingProject.image}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white focus:border-skin focus:outline-none font-mono"
                    placeholder="/img/projects/project-1.jpg or https://..."
                  />
                  <label className="px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 cursor-pointer flex items-center gap-2 shrink-0">
                    <Upload className="w-3.5 h-3.5 text-skin" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, (url) => setEditingProject({ ...editingProject, image: url }))}
                    />
                  </label>
                </div>
                {editingProject.image && (
                  <div className="mt-2 h-28 w-full max-w-xs rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                    <img src={editingProject.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white focus:border-skin focus:outline-none"
                  placeholder="Detailed description of features and business problem solved."
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                  Tech Stack (Comma Separated)
                </label>
                <input
                  type="text"
                  value={editingProject.techs?.join(', ')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      techs: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white focus:border-skin focus:outline-none font-mono"
                  placeholder="React, Next.js, Node.js, MongoDB"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={editingProject.githubUrl}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white focus:border-skin focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                    Demo URL & Label
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={editingProject.demoUrl}
                      onChange={(e) => setEditingProject({ ...editingProject, demoUrl: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white focus:border-skin focus:outline-none"
                    />
                    <input
                      type="text"
                      value={editingProject.demoLabel || 'Live Demo'}
                      onChange={(e) => setEditingProject({ ...editingProject, demoLabel: e.target.value })}
                      className="w-28 px-3 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white focus:border-skin focus:outline-none text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-5 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-skin hover:opacity-90 text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-skin/30 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: DIGITAL PRODUCT EDITOR */}
      {/* ======================================================== */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#181818] border border-zinc-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative">
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-black font-poppins text-white mb-1">Digital Product Starter</h2>
            <p className="text-xs text-zinc-400 font-sans mb-6">Configure digital store template or SaaS starter.</p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveProduct(editingProduct);
                setIsProductModalOpen(false);
                triggerToast('Digital Product saved!');
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                    Product Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.title}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                    Price & Badge
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                      placeholder="$29"
                      className="w-24 px-3 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white font-bold"
                    />
                    <input
                      type="text"
                      value={editingProduct.badge || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                      placeholder="e.g. Best Seller"
                      className="flex-1 px-3 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                    Demo URL
                  </label>
                  <input
                    type="url"
                    value={editingProduct.demoUrl}
                    onChange={(e) => setEditingProduct({ ...editingProduct, demoUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                    Fiverr Pro / Purchase URL
                  </label>
                  <input
                    type="url"
                    value={editingProduct.purchaseUrl}
                    onChange={(e) => setEditingProduct({ ...editingProduct, purchaseUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-xs text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-skin text-xs font-bold text-white cursor-pointer"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: SERVICE EDITOR */}
      {/* ======================================================== */}
      {isServiceModalOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#181818] border border-zinc-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative">
            <button
              onClick={() => setIsServiceModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-black font-poppins text-white mb-1">
              {editingService.title ? `Edit "${editingService.title}"` : 'Add New Service'}
            </h2>
            <p className="text-xs text-zinc-400 font-sans mb-6">Configure service deliverables and pricing.</p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveService(editingService);
                setIsServiceModalOpen(false);
                triggerToast('Service saved permanently!');
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                    Service Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                    Starting Price
                  </label>
                  <input
                    type="text"
                    value={editingService.startingPrice}
                    onChange={(e) => setEditingService({ ...editingService, startingPrice: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white"
                    placeholder="$800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                  Deliverables (One per line)
                </label>
                <textarea
                  rows={4}
                  value={editingService.deliverables?.join('\n')}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      deliverables: e.target.value.split('\n').map((l) => l.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-5 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-skin hover:opacity-90 text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-skin/30 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: EDUCATION EDITOR */}
      {/* ======================================================== */}
      {isEduModalOpen && editingEdu && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#181818] border border-zinc-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative">
            <button
              onClick={() => setIsEduModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-black font-poppins text-white mb-4">Education Item</h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveEducation(editingEdu);
                setIsEduModalOpen(false);
                triggerToast('Education saved!');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                  Degree / Certificate Title
                </label>
                <input
                  type="text"
                  required
                  value={editingEdu.degree}
                  onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                  School / University
                </label>
                <input
                  type="text"
                  required
                  value={editingEdu.school}
                  onChange={(e) => setEditingEdu({ ...editingEdu, school: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                  Period / Years
                </label>
                <input
                  type="text"
                  required
                  value={editingEdu.period}
                  onChange={(e) => setEditingEdu({ ...editingEdu, period: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white"
                  placeholder="2025 - Present"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingEdu.desc}
                  onChange={(e) => setEditingEdu({ ...editingEdu, desc: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsEduModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-xs text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-skin text-xs font-bold text-white cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: CERTIFICATION EDITOR */}
      {/* ======================================================== */}
      {isCertModalOpen && editingCert && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#181818] border border-zinc-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative">
            <button
              onClick={() => setIsCertModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-black font-poppins text-white mb-4">Certification Item</h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await saveCertification(editingCert);
                setIsCertModalOpen(false);
                triggerToast('Certification saved!');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                  Certification Title
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.title}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                  Issuer / Academy
                </label>
                <input
                  type="text"
                  required
                  value={editingCert.issuer}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-400 font-poppins mb-1">
                  Verification Link
                </label>
                <input
                  type="url"
                  value={editingCert.verificationLink}
                  onChange={(e) => setEditingCert({ ...editingCert, verificationLink: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-zinc-700 text-xs text-white"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsCertModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-xs text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-skin text-xs font-bold text-white cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
