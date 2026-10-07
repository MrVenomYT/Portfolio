'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Award, GraduationCap, Briefcase, Star, HelpCircle, Mail, BookOpen, Check, ExternalLink } from 'lucide-react';
import { ExperienceItem, EducationItem, CertificationItem, TestimonialItem, FAQItem } from '@/lib/portfolioData';

// ==========================================
// 1. WORK EXPERIENCE MANAGER
// ==========================================
export function AdminExperienceManager({
  experiences,
  onSaveExperience,
  onDeleteExperience,
}: {
  experiences: ExperienceItem[];
  onSaveExperience: (item: ExperienceItem) => Promise<void>;
  onDeleteExperience: (id: string) => Promise<void>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ExperienceItem | null>(null);
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [period, setPeriod] = useState('2024 - Present');
  const [link, setLink] = useState('');
  const [desc, setDesc] = useState('');

  const handleOpenAdd = () => {
    setEditingItem(null);
    setRole('');
    setCompany('');
    setPeriod('2024 - Present');
    setLink('');
    setDesc('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ExperienceItem) => {
    setEditingItem(item);
    setRole(item.role);
    setCompany(item.company);
    setPeriod(item.period);
    setLink(item.link || '');
    setDesc(item.desc);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim()) return;
    await onSaveExperience({
      id: editingItem?.id || `exp-${Date.now()}`,
      role: role.trim(),
      company: company.trim(),
      period: period.trim(),
      link: link.trim() || undefined,
      desc: desc.trim(),
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-[#181818] p-5 rounded-3xl border border-zinc-800 shadow-xl">
        <div>
          <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider mb-0.5">Career Milestones</div>
          <h2 className="text-xl sm:text-2xl font-black font-poppins text-white uppercase">Work Experience ({experiences.length})</h2>
        </div>
        <button onClick={handleOpenAdd} className="px-5 py-2.5 rounded-2xl bg-skin text-white font-bold font-poppins text-xs uppercase cursor-pointer">
          <Plus className="w-4 h-4 inline mr-1" /> Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-[#181818] border border-zinc-800 rounded-2xl p-5 flex items-start justify-between">
            <div>
              <span className="text-xs font-mono text-skin font-bold">{exp.period}</span>
              <h3 className="text-base font-bold text-white mt-1">{exp.role}</h3>
              <p className="text-xs text-zinc-300 font-semibold">{exp.company}</p>
              <p className="text-xs text-zinc-400 mt-2 max-w-2xl">{exp.desc}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => handleOpenEdit(exp)} className="p-2 rounded-xl bg-zinc-800 hover:bg-skin text-zinc-300 hover:text-white cursor-pointer">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => confirm('Delete?') && onDeleteExperience(exp.id)} className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white cursor-pointer">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-zinc-700 rounded-3xl max-w-lg w-full p-6">
            <h3 className="text-lg font-bold text-white mb-4">{editingItem ? 'Edit Experience' : 'Add Experience'}</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <input type="text" required placeholder="Role Title" value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white" />
              <input type="text" placeholder="Company / Platform" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white" />
              <input type="text" placeholder="Period (e.g. 2024 - Present)" value={period} onChange={(e) => setPeriod(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white" />
              <textarea rows={3} placeholder="Key Responsibilities & Highlights" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white" />
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-zinc-800 text-xs text-zinc-300">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-skin text-xs text-white font-bold">Save Experience</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. EDUCATION MANAGER
// ==========================================
export function AdminEducationManager({
  education,
  onSaveEducation,
  onDeleteEducation,
}: {
  education: EducationItem[];
  onSaveEducation: (item: EducationItem) => Promise<void>;
  onDeleteEducation: (id: string) => Promise<void>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EducationItem | null>(null);
  const [degree, setDegree] = useState('');
  const [school, setSchool] = useState('');
  const [period, setPeriod] = useState('2025 - Present');
  const [desc, setDesc] = useState('');

  const handleOpenAdd = () => {
    setEditingItem(null);
    setDegree('');
    setSchool('');
    setPeriod('2025 - Present');
    setDesc('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: EducationItem) => {
    setEditingItem(item);
    setDegree(item.degree);
    setSchool(item.school);
    setPeriod(item.period);
    setDesc(item.desc);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!degree.trim()) return;
    await onSaveEducation({
      id: editingItem?.id || `edu-${Date.now()}`,
      degree: degree.trim(),
      school: school.trim(),
      period: period.trim(),
      desc: desc.trim(),
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-[#181818] p-5 rounded-3xl border border-zinc-800 shadow-xl">
        <div>
          <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider mb-0.5">Academic Background</div>
          <h2 className="text-xl sm:text-2xl font-black font-poppins text-white uppercase">Education & Degrees ({education.length})</h2>
        </div>
        <button onClick={handleOpenAdd} className="px-5 py-2.5 rounded-2xl bg-skin text-white font-bold font-poppins text-xs uppercase cursor-pointer">
          <Plus className="w-4 h-4 inline mr-1" /> Add Degree
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="bg-[#181818] border border-zinc-800 rounded-2xl p-5 flex items-start justify-between">
            <div>
              <span className="text-xs font-mono text-skin font-bold">{edu.period}</span>
              <h3 className="text-base font-bold text-white mt-1">{edu.degree}</h3>
              <p className="text-xs text-zinc-300 font-semibold">{edu.school}</p>
              <p className="text-xs text-zinc-400 mt-2 max-w-2xl">{edu.desc}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => handleOpenEdit(edu)} className="p-2 rounded-xl bg-zinc-800 hover:bg-skin text-zinc-300 hover:text-white cursor-pointer">
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => confirm('Delete?') && onDeleteEducation(edu.id)} className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white cursor-pointer">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-zinc-700 rounded-3xl max-w-lg w-full p-6">
            <h3 className="text-lg font-bold text-white mb-4">{editingItem ? 'Edit Degree' : 'Add Degree'}</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <input type="text" required placeholder="Degree Name" value={degree} onChange={(e) => setDegree(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white" />
              <input type="text" placeholder="Institution / University" value={school} onChange={(e) => setSchool(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white" />
              <input type="text" placeholder="Period (e.g. 2025 - Present)" value={period} onChange={(e) => setPeriod(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white" />
              <textarea rows={3} placeholder="Specialization & Curriculum Details" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white" />
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-zinc-800 text-xs text-zinc-300">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-skin text-xs text-white font-bold">Save Education</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. CERTIFICATIONS MANAGER
// ==========================================
export function AdminCertificationsManager({
  certifications,
  onSaveCertification,
  onDeleteCertification,
}: {
  certifications: CertificationItem[];
  onSaveCertification: (item: CertificationItem) => Promise<void>;
  onDeleteCertification: (id: string) => Promise<void>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CertificationItem | null>(null);
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [date, setDate] = useState('2025');
  const [skills, setSkills] = useState('');
  const [verificationLink, setVerificationLink] = useState('');

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle('');
    setIssuer('LinkedIn Learning');
    setDate('2025');
    setSkills('');
    setVerificationLink('https://www.linkedin.com/learning/certificates/');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: CertificationItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setIssuer(item.issuer);
    setDate(item.date);
    setSkills(item.skills);
    setVerificationLink(item.verificationLink);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onSaveCertification({
      id: editingItem?.id || `cert-${Date.now()}`,
      title: title.trim(),
      issuer: issuer.trim(),
      date: date.trim(),
      skills: skills.trim(),
      verificationLink: verificationLink.trim(),
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-[#181818] p-5 rounded-3xl border border-zinc-800 shadow-xl">
        <div>
          <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider mb-0.5">Verified Credentials</div>
          <h2 className="text-xl sm:text-2xl font-black font-poppins text-white uppercase">Licenses & Certifications ({certifications.length})</h2>
        </div>
        <button onClick={handleOpenAdd} className="px-5 py-2.5 rounded-2xl bg-skin text-white font-bold font-poppins text-xs uppercase cursor-pointer">
          <Plus className="w-4 h-4 inline mr-1" /> Add Certificate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-[#181818] border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono text-skin font-bold">{cert.date}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-400 font-mono border border-zinc-800">{cert.issuer}</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-2">{cert.title}</h3>
              <p className="text-xs text-zinc-400 font-sans mb-3">{cert.skills}</p>
            </div>
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
              <a href={cert.verificationLink} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-skin hover:underline flex items-center gap-1">
                <ExternalLink className="w-3.5 h-3.5" /> Verify Link
              </a>
              <div className="flex items-center gap-2">
                <button onClick={() => handleOpenEdit(cert)} className="p-1.5 rounded-lg bg-zinc-800 hover:bg-skin hover:text-white text-zinc-300 cursor-pointer">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => confirm('Delete?') && onDeleteCertification(cert.id)} className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white cursor-pointer">
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
            <h3 className="text-lg font-bold text-white mb-4">{editingItem ? 'Edit Certificate' : 'Add Certificate'}</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <input type="text" required placeholder="Certification Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white" />
              <input type="text" placeholder="Issuer (e.g. John Care / LinkedIn Learning)" value={issuer} onChange={(e) => setIssuer(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white" />
              <input type="text" placeholder="Year (e.g. 2025)" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white" />
              <input type="text" placeholder="Skills Covered" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white" />
              <input type="text" placeholder="Verification URL" value={verificationLink} onChange={(e) => setVerificationLink(e.target.value)} className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white" />
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-zinc-800 text-xs text-zinc-300">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-skin text-xs text-white font-bold">Save Certificate</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
