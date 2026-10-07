'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import {
  ProfileData,
  ProjectItem,
  DigitalProduct,
  ServiceItem,
  EducationItem,
  ExperienceItem,
  CertificationItem,
  RadarProficiency,
  TestimonialItem,
  FAQItem,
  defaultProfile,
  defaultProjects,
  defaultDigitalProducts,
  defaultServices,
  defaultEducation,
  defaultExperiences,
  defaultCertifications,
  defaultRadarSkills,
  defaultTestimonials,
  defaultFAQs,
} from '@/lib/portfolioData';

interface PortfolioContextType {
  profile: ProfileData;
  projects: ProjectItem[];
  products: DigitalProduct[];
  services: ServiceItem[];
  education: EducationItem[];
  experiences: ExperienceItem[];
  certifications: CertificationItem[];
  radarSkills: RadarProficiency[];
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
  loading: boolean;
  isSeeding: boolean;
  saveProject: (project: ProjectItem) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  saveProduct: (product: DigitalProduct) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  saveService: (service: ServiceItem) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  saveEducation: (item: EducationItem) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;
  saveExperience: (item: ExperienceItem) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  saveCertification: (item: CertificationItem) => Promise<void>;
  deleteCertification: (id: string) => Promise<void>;
  saveTestimonial: (item: TestimonialItem) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  saveFAQ: (faq: FAQItem, index?: number) => Promise<void>;
  deleteFAQ: (index: number) => Promise<void>;
  updateProfile: (profile: Partial<ProfileData>) => Promise<void>;
  updateRadarSkills: (skills: RadarProficiency[]) => Promise<void>;
  seedAllToDatabase: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [projects, setProjects] = useState<ProjectItem[]>(defaultProjects);
  const [products, setProducts] = useState<DigitalProduct[]>(defaultDigitalProducts);
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);
  const [education, setEducation] = useState<EducationItem[]>(defaultEducation);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(defaultExperiences);
  const [certifications, setCertifications] = useState<CertificationItem[]>(defaultCertifications);
  const [radarSkills, setRadarSkills] = useState<RadarProficiency[]>(defaultRadarSkills);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(defaultTestimonials);
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFAQs);
  const [loading, setLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    let unsubs: (() => void)[] = [];

    const initListeners = () => {
      try {
        const handleErr = (colName: string) => (err: any) => {
          console.warn(`Firestore ${colName} listener notice:`, err?.message || err);
        };

        // 1. Profile listener
        const unsubProfile = onSnapshot(
          doc(db, 'portfolio_profile', 'main'),
          (docSnap) => {
            if (docSnap.exists()) {
              setProfile({ ...defaultProfile, ...(docSnap.data() as ProfileData) });
            }
          },
          handleErr('portfolio_profile')
        );
        unsubs.push(unsubProfile);

        // 2. Projects listener
        const unsubProjects = onSnapshot(
          collection(db, 'portfolio_projects'),
          (snap) => {
            if (!snap.empty) {
              const list: ProjectItem[] = [];
              snap.forEach((d) => list.push({ id: d.id, ...(d.data() as any) }));
              setProjects(list);
            }
          },
          handleErr('portfolio_projects')
        );
        unsubs.push(unsubProjects);

        // 3. Products listener
        const unsubProducts = onSnapshot(
          collection(db, 'portfolio_products'),
          (snap) => {
            if (!snap.empty) {
              const list: DigitalProduct[] = [];
              snap.forEach((d) => list.push({ id: d.id, ...(d.data() as any) }));
              setProducts(list);
            }
          },
          handleErr('portfolio_products')
        );
        unsubs.push(unsubProducts);

        // 4. Services listener
        const unsubServices = onSnapshot(
          collection(db, 'portfolio_services'),
          (snap) => {
            if (!snap.empty) {
              const list: ServiceItem[] = [];
              snap.forEach((d) => list.push({ id: d.id, ...(d.data() as any) }));
              setServices(list);
            }
          },
          handleErr('portfolio_services')
        );
        unsubs.push(unsubServices);

        // 5. Education listener
        const unsubEdu = onSnapshot(
          collection(db, 'portfolio_education'),
          (snap) => {
            if (!snap.empty) {
              const list: EducationItem[] = [];
              snap.forEach((d) => list.push({ id: d.id, ...(d.data() as any) }));
              setEducation(list);
            }
          },
          handleErr('portfolio_education')
        );
        unsubs.push(unsubEdu);

        // 6. Experience listener
        const unsubExp = onSnapshot(
          collection(db, 'portfolio_experiences'),
          (snap) => {
            if (!snap.empty) {
              const list: ExperienceItem[] = [];
              snap.forEach((d) => list.push({ id: d.id, ...(d.data() as any) }));
              setExperiences(list);
            }
          },
          handleErr('portfolio_experiences')
        );
        unsubs.push(unsubExp);

        // 7. Certifications listener
        const unsubCerts = onSnapshot(
          collection(db, 'portfolio_certifications'),
          (snap) => {
            if (!snap.empty) {
              const list: CertificationItem[] = [];
              snap.forEach((d) => list.push({ id: d.id, ...(d.data() as any) }));
              setCertifications(list);
            }
          },
          handleErr('portfolio_certifications')
        );
        unsubs.push(unsubCerts);

        // 8. Radar Skills listener
        const unsubSkills = onSnapshot(
          doc(db, 'portfolio_skills', 'radar'),
          (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              if (data?.items && Array.isArray(data.items)) {
                setRadarSkills(data.items);
              }
            }
          },
          handleErr('portfolio_skills')
        );
        unsubs.push(unsubSkills);

        // 9. Testimonials listener
        const unsubTest = onSnapshot(
          collection(db, 'portfolio_testimonials'),
          (snap) => {
            if (!snap.empty) {
              const list: TestimonialItem[] = [];
              snap.forEach((d) => list.push({ id: d.id, ...(d.data() as any) }));
              setTestimonials(list);
            }
          },
          handleErr('portfolio_testimonials')
        );
        unsubs.push(unsubTest);

        // 10. FAQs listener
        const unsubFaqs = onSnapshot(
          doc(db, 'portfolio_faqs', 'main'),
          (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              if (data?.items && Array.isArray(data.items)) {
                setFaqs(data.items);
              }
            }
          },
          handleErr('portfolio_faqs')
        );
        unsubs.push(unsubFaqs);
      } catch (err) {
        console.error('Firestore real-time listeners initialization notice:', err);
      } finally {
        setLoading(false);
      }
    };

    initListeners();

    return () => {
      unsubs.forEach((u) => u());
    };
  }, []);

  // CRUD Actions
  const saveProject = async (project: ProjectItem) => {
    const id = project.id || `proj-${Date.now()}`;
    const cleanProject = { ...project, id };
    await setDoc(doc(db, 'portfolio_projects', id), cleanProject, { merge: true });
    setProjects((prev) => {
      const exists = prev.some((p) => p.id === id);
      if (exists) return prev.map((p) => (p.id === id ? cleanProject : p));
      return [cleanProject, ...prev];
    });
  };

  const deleteProject = async (id: string) => {
    await deleteDoc(doc(db, 'portfolio_projects', id));
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const saveProduct = async (product: DigitalProduct) => {
    const id = product.id || `prod-${Date.now()}`;
    const cleanProduct = { ...product, id };
    await setDoc(doc(db, 'portfolio_products', id), cleanProduct, { merge: true });
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === id);
      if (exists) return prev.map((p) => (p.id === id ? cleanProduct : p));
      return [cleanProduct, ...prev];
    });
  };

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, 'portfolio_products', id));
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const saveService = async (service: ServiceItem) => {
    const id = service.id || `srv-${Date.now()}`;
    const cleanService = { ...service, id };
    await setDoc(doc(db, 'portfolio_services', id), cleanService, { merge: true });
    setServices((prev) => {
      const exists = prev.some((s) => s.id === id);
      if (exists) return prev.map((s) => (s.id === id ? cleanService : s));
      return [...prev, cleanService];
    });
  };

  const deleteService = async (id: string) => {
    await deleteDoc(doc(db, 'portfolio_services', id));
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const saveEducation = async (item: EducationItem) => {
    const id = item.id || `edu-${Date.now()}`;
    const cleanItem = { ...item, id };
    await setDoc(doc(db, 'portfolio_education', id), cleanItem, { merge: true });
    setEducation((prev) => {
      const exists = prev.some((e) => e.id === id);
      if (exists) return prev.map((e) => (e.id === id ? cleanItem : e));
      return [...prev, cleanItem];
    });
  };

  const deleteEducation = async (id: string) => {
    await deleteDoc(doc(db, 'portfolio_education', id));
    setEducation((prev) => prev.filter((e) => e.id !== id));
  };

  const saveExperience = async (item: ExperienceItem) => {
    const id = item.id || `exp-${Date.now()}`;
    const cleanItem = { ...item, id };
    await setDoc(doc(db, 'portfolio_experiences', id), cleanItem, { merge: true });
    setExperiences((prev) => {
      const exists = prev.some((e) => e.id === id);
      if (exists) return prev.map((e) => (e.id === id ? cleanItem : e));
      return [...prev, cleanItem];
    });
  };

  const deleteExperience = async (id: string) => {
    await deleteDoc(doc(db, 'portfolio_experiences', id));
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  };

  const saveCertification = async (item: CertificationItem) => {
    const id = item.id || `cert-${Date.now()}`;
    const cleanItem = { ...item, id };
    await setDoc(doc(db, 'portfolio_certifications', id), cleanItem, { merge: true });
    setCertifications((prev) => {
      const exists = prev.some((c) => c.id === id);
      if (exists) return prev.map((c) => (c.id === id ? cleanItem : c));
      return [...prev, cleanItem];
    });
  };

  const deleteCertification = async (id: string) => {
    await deleteDoc(doc(db, 'portfolio_certifications', id));
    setCertifications((prev) => prev.filter((c) => c.id !== id));
  };

  const saveTestimonial = async (item: TestimonialItem) => {
    const id = item.id || `test-${Date.now()}`;
    const cleanItem = { ...item, id };
    await setDoc(doc(db, 'portfolio_testimonials', id), cleanItem, { merge: true });
    setTestimonials((prev) => {
      const exists = prev.some((t) => t.id === id);
      if (exists) return prev.map((t) => (t.id === id ? cleanItem : t));
      return [...prev, cleanItem];
    });
  };

  const deleteTestimonial = async (id: string) => {
    await deleteDoc(doc(db, 'portfolio_testimonials', id));
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const saveFAQ = async (faq: FAQItem, index?: number) => {
    let updated: FAQItem[];
    if (index !== undefined && index >= 0 && index < faqs.length) {
      updated = faqs.map((f, i) => (i === index ? faq : f));
    } else {
      updated = [...faqs, faq];
    }
    await setDoc(doc(db, 'portfolio_faqs', 'main'), { items: updated }, { merge: true });
    setFaqs(updated);
  };

  const deleteFAQ = async (index: number) => {
    const updated = faqs.filter((_, i) => i !== index);
    await setDoc(doc(db, 'portfolio_faqs', 'main'), { items: updated }, { merge: true });
    setFaqs(updated);
  };

  const updateProfile = async (newProfile: Partial<ProfileData>) => {
    const merged = { ...profile, ...newProfile };
    await setDoc(doc(db, 'portfolio_profile', 'main'), merged, { merge: true });
    setProfile(merged);
  };

  const updateRadarSkills = async (skills: RadarProficiency[]) => {
    await setDoc(doc(db, 'portfolio_skills', 'radar'), { items: skills }, { merge: true });
    setRadarSkills(skills);
  };

  const seedAllToDatabase = async () => {
    setIsSeeding(true);
    try {
      // 1. Profile
      await setDoc(doc(db, 'portfolio_profile', 'main'), defaultProfile, { merge: true });

      // 2. Projects
      for (const p of defaultProjects) {
        await setDoc(doc(db, 'portfolio_projects', p.id), p, { merge: true });
      }

      // 3. Products
      for (const pr of defaultDigitalProducts) {
        await setDoc(doc(db, 'portfolio_products', pr.id), pr, { merge: true });
      }

      // 4. Services
      for (const s of defaultServices) {
        await setDoc(doc(db, 'portfolio_services', s.id), s, { merge: true });
      }

      // 5. Education
      for (const e of defaultEducation) {
        await setDoc(doc(db, 'portfolio_education', e.id), e, { merge: true });
      }

      // 6. Experiences
      for (const ex of defaultExperiences) {
        await setDoc(doc(db, 'portfolio_experiences', ex.id), ex, { merge: true });
      }

      // 7. Certifications
      for (const c of defaultCertifications) {
        await setDoc(doc(db, 'portfolio_certifications', c.id), c, { merge: true });
      }

      // 8. Radar Skills
      await setDoc(doc(db, 'portfolio_skills', 'radar'), { items: defaultRadarSkills }, { merge: true });

      // 9. Testimonials
      for (const t of defaultTestimonials) {
        await setDoc(doc(db, 'portfolio_testimonials', t.id), t, { merge: true });
      }

      // 10. FAQs
      await setDoc(doc(db, 'portfolio_faqs', 'main'), { items: defaultFAQs }, { merge: true });
    } catch (e) {
      console.error('Seeding error:', e);
      throw e;
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
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
        loading,
        isSeeding,
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
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return ctx;
}
