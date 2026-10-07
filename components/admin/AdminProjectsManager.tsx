'use client';

import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Search,
  ExternalLink,
  Github,
  Trash2,
  Edit3,
  Copy,
  Star,
  Eye,
  Check,
  X,
  Code2,
  Sliders,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { ProjectItem } from '@/lib/portfolioData';
import { LifecycleStage } from '@/components/ProjectLifecycleTimeline';

interface AdminProjectsManagerProps {
  projects: ProjectItem[];
  onSaveProject: (project: ProjectItem) => Promise<void>;
  onDeleteProject: (id: string) => Promise<void>;
}

export default function AdminProjectsManager({
  projects,
  onSaveProject,
  onDeleteProject,
}: AdminProjectsManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [activeStageTab, setActiveStageTab] = useState<number>(0);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formId, setFormId] = useState('');
  const [formCategory, setFormCategory] = useState('fullstack');
  const [formCategoryLabel, setFormCategoryLabel] = useState('Fullstack React / Web App');
  const [formImage, setFormImage] = useState('/img/projects/project-1.jpg');
  const [formDescription, setFormDescription] = useState('');
  const [formTechs, setFormTechs] = useState('React, Next.js, Node.js');
  const [formGithubUrl, setFormGithubUrl] = useState('https://github.com/MrVenomYT');
  const [formDemoUrl, setFormDemoUrl] = useState('https://muhammad-hasil.vercel.app/');
  const [formDemoLabel, setFormDemoLabel] = useState('Live Demo');
  const [formFeatured, setFormFeatured] = useState(true);
  const [formStages, setFormStages] = useState<LifecycleStage[]>([]);

  const handleOpenAdd = () => {
    const newId = `project-${Date.now()}`;
    setFormId(newId);
    setFormTitle('');
    setFormCategory('fullstack');
    setFormCategoryLabel('Fullstack React / Web App');
    setFormImage('/img/projects/project-1.jpg');
    setFormDescription('');
    setFormTechs('React, Next.js, Node.js, Tailwind CSS');
    setFormGithubUrl('https://github.com/MrVenomYT');
    setFormDemoUrl('https://muhammad-hasil.vercel.app/');
    setFormDemoLabel('Live Demo');
    setFormFeatured(true);
    setFormStages([
      {
        step: 1,
        name: 'Requirement Scoping & Wireframes',
        phase: 'Concept',
        duration: '1 Week',
        summary: 'Scoping user persona requirements and UX flows.',
        deliverables: ['Figma Wireframes', 'System Spec'],
        tools: ['Figma', 'Miro'],
        status: 'Completed',
      },
      {
        step: 2,
        name: 'Full-Stack Implementation',
        phase: 'Development',
        duration: '2 Weeks',
        summary: 'Constructed responsive interfaces and database schemas.',
        deliverables: ['Production Next.js App', 'REST Endpoints'],
        tools: ['React', 'Next.js', 'Tailwind'],
        status: 'Completed',
      },
      {
        step: 3,
        name: 'Cloud Production Deployment',
        phase: 'Deployment',
        duration: 'Live',
        summary: 'Global CDN edge deployment with SSL certification.',
        deliverables: ['Production URL'],
        tools: ['Vercel'],
        status: 'In-Production',
      },
    ]);
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject(project);
    setFormId(project.id);
    setFormTitle(project.title);
    setFormCategory(project.category);
    setFormCategoryLabel(project.categoryLabel);
    setFormImage(project.image);
    setFormDescription(project.description);
    setFormTechs(project.techs?.join(', ') || '');
    setFormGithubUrl(project.githubUrl);
    setFormDemoUrl(project.demoUrl);
    setFormDemoLabel(project.demoLabel || 'Live Demo');
    setFormFeatured(project.featured ?? true);
    setFormStages(project.stages || []);
    setIsModalOpen(true);
  };

  const handleDuplicate = async (project: ProjectItem) => {
    const duplicated: ProjectItem = {
      ...project,
      id: `${project.id}-copy-${Date.now().toString().slice(-4)}`,
      title: `${project.title} (Copy)`,
    };
    await onSaveProject(duplicated);
  };

  const handleToggleFeatured = async (project: ProjectItem) => {
    const updated: ProjectItem = {
      ...project,
      featured: !project.featured,
    };
    await onSaveProject(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const projectData: ProjectItem = {
      id: formId || `project-${Date.now()}`,
      title: formTitle.trim(),
      category: formCategory,
      categoryLabel: formCategoryLabel,
      image: formImage.trim() || '/img/projects/project-1.jpg',
      description: formDescription.trim(),
      techs: formTechs.split(',').map((t) => t.trim()).filter(Boolean),
      githubUrl: formGithubUrl.trim(),
      demoUrl: formDemoUrl.trim(),
      demoLabel: formDemoLabel.trim() || 'Live Demo',
      featured: formFeatured,
      stages: formStages,
    };

    await onSaveProject(projectData);
    setIsModalOpen(false);
  };

  const handleAddStage = () => {
    const newStep = formStages.length + 1;
    const newStage: LifecycleStage = {
      step: newStep,
      name: `Phase ${newStep}: Milestone Title`,
      phase: 'Development',
      duration: '1 Week',
      summary: 'Summary of phase deliverables and milestones.',
      deliverables: ['Deliverable 1', 'Deliverable 2'],
      tools: ['React', 'Next.js'],
      status: 'In-Progress',
    };
    setFormStages([...formStages, newStage]);
  };

  const handleRemoveStage = (index: number) => {
    const updated = formStages.filter((_, i) => i !== index).map((s, idx) => ({ ...s, step: idx + 1 }));
    setFormStages(updated);
  };

  const handleStageFieldChange = (index: number, field: keyof LifecycleStage, value: any) => {
    const updated = [...formStages];
    updated[index] = { ...updated[index], [field]: value };
    setFormStages(updated);
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.techs?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filterCategory === 'all') return matchesSearch;
    if (filterCategory === 'featured') return matchesSearch && p.featured;
    return matchesSearch && p.category === filterCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181818] p-5 rounded-3xl border border-zinc-800 shadow-xl">
        <div>
          <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider mb-0.5">
            Full-Stack Showcase
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-poppins text-white uppercase flex items-center gap-2">
            <span>Project Showcase Manager</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-skin/10 text-skin font-mono border border-skin/20">
              {projects.length} Total Builds
            </span>
          </h2>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-skin hover:opacity-90 text-white font-bold font-poppins text-xs tracking-wider uppercase shadow-lg shadow-skin/30 transition-all cursor-pointer hover:scale-102"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Search & Filter Matrix */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by title, tech stack, description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#181818] border border-zinc-800 rounded-2xl text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-skin/60 font-poppins"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {[
            { id: 'all', label: `All (${projects.length})` },
            { id: 'featured', label: '⭐ Featured' },
            { id: 'fullstack', label: 'Fullstack' },
            { id: 'react', label: 'React/MERN' },
            { id: 'uiux', label: 'UI/UX' },
            { id: 'vanilla', label: 'Vanilla' },
            { id: 'agency', label: 'Agency' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold font-poppins shrink-0 transition-colors cursor-pointer ${
                filterCategory === cat.id
                  ? 'bg-skin text-white shadow-md'
                  : 'bg-[#181818] text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-[#181818] border border-zinc-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-skin/50 transition-all group"
          >
            <div>
              {/* Card Image */}
              <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden">
                <img
                  src={project.image || '/img/projects/project-1.jpg'}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375" viewBox="0 0 600 375"><rect fill="%23222222" width="600" height="375"/><text fill="%23ffb400" font-family="sans-serif" font-size="18" font-weight="bold" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Muhammad Hasil Project</text></svg>';
                  }}
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-poppins uppercase tracking-wider bg-black/75 backdrop-blur-md border border-white/10 text-skin">
                    {project.categoryLabel || project.category}
                  </span>
                </div>

                <button
                  onClick={() => handleToggleFeatured(project)}
                  className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                    project.featured
                      ? 'bg-skin/90 text-white border-skin'
                      : 'bg-black/60 text-zinc-400 border-white/10 hover:text-amber-300'
                  }`}
                  title={project.featured ? 'Featured on Homepage' : 'Mark as Featured'}
                >
                  <Star className={`w-3.5 h-3.5 ${project.featured ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <h3 className="text-base font-bold font-poppins text-white mb-1.5 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-400 font-sans line-clamp-2 mb-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.techs?.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-300 font-mono border border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techs && project.techs.length > 4 && (
                    <span className="text-[10px] px-1.5 py-0.5 text-zinc-500 font-mono">
                      +{project.techs.length - 4}
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-zinc-500 font-poppins flex items-center justify-between pt-3 border-t border-zinc-800/80">
                  <span>{project.stages?.length || 0} Lifecycle Milestones</span>
                  <span className="font-mono text-skin">{project.id}</span>
                </div>
              </div>
            </div>

            {/* Card Action Controls */}
            <div className="p-4 bg-[#141414] border-t border-zinc-800/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-skin hover:text-white text-zinc-300 transition-colors"
                  title="Open Live Preview"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                  title="Open GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleDuplicate(project)}
                  className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                  title="Duplicate Project"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleOpenEdit(project)}
                  className="p-2 rounded-xl bg-skin/20 hover:bg-skin text-skin hover:text-white transition-colors cursor-pointer"
                  title="Edit Project"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete project "${project.title}"?`)) {
                      onDeleteProject(project.id);
                    }
                  }}
                  className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors cursor-pointer"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#181818] border border-zinc-700 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
              <div>
                <div className="text-xs font-bold font-poppins text-skin uppercase tracking-wider">
                  Project Showcase Editor
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-poppins text-white uppercase">
                  {editingProject ? `Edit: ${editingProject.title}` : 'Add New Project'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Basic Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold font-poppins text-zinc-300 uppercase mb-1.5">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. OmniTravels"
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:border-skin focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold font-poppins text-zinc-300 uppercase mb-1.5">
                    Project ID / Slug
                  </label>
                  <input
                    type="text"
                    value={formId}
                    onChange={(e) => setFormId(e.target.value)}
                    placeholder="e.g. omnitravels"
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:border-skin focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold font-poppins text-zinc-300 uppercase mb-1.5">
                    Category Type
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => {
                      setFormCategory(e.target.value);
                      const labels: Record<string, string> = {
                        fullstack: 'Fullstack React / Web App',
                        react: 'React / MERN Stack',
                        vanilla: 'Vanilla / Web Design',
                        uiux: 'Web Design & UI Kit',
                        agency: 'Digital Agency Showcase',
                        bot: 'Discord Bot & Automation',
                      };
                      if (labels[e.target.value]) {
                        setFormCategoryLabel(labels[e.target.value]);
                      }
                    }}
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:border-skin focus:outline-none"
                  >
                    <option value="fullstack">Fullstack React / Web App</option>
                    <option value="react">React / MERN Stack</option>
                    <option value="vanilla">Vanilla / Web Design</option>
                    <option value="uiux">Web Design & UI Kit</option>
                    <option value="agency">Digital Agency Showcase</option>
                    <option value="bot">Discord Bot & Automation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold font-poppins text-zinc-300 uppercase mb-1.5">
                    Category Display Badge
                  </label>
                  <input
                    type="text"
                    value={formCategoryLabel}
                    onChange={(e) => setFormCategoryLabel(e.target.value)}
                    placeholder="e.g. Fullstack React / Luxury Rental"
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:border-skin focus:outline-none"
                  />
                </div>
              </div>

              {/* Media and Description */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold font-poppins text-zinc-300 uppercase mb-1.5">
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="e.g. /img/projects/project-1.jpg or raw GitHub image URL"
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:border-skin focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold font-poppins text-zinc-300 uppercase mb-1.5">
                    Project Description
                  </label>
                  <textarea
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Detailed project summary, value proposition, and architecture overview..."
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:border-skin focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold font-poppins text-zinc-300 uppercase mb-1.5">
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formTechs}
                    onChange={(e) => setFormTechs(e.target.value)}
                    placeholder="React, Next.js, Node.js, MongoDB, Tailwind CSS"
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:border-skin focus:outline-none"
                  />
                </div>
              </div>

              {/* Links & Featured Toggle */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold font-poppins text-zinc-300 uppercase mb-1.5">
                    GitHub Repository
                  </label>
                  <input
                    type="text"
                    value={formGithubUrl}
                    onChange={(e) => setFormGithubUrl(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:border-skin focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold font-poppins text-zinc-300 uppercase mb-1.5">
                    Live Demo URL
                  </label>
                  <input
                    type="text"
                    value={formDemoUrl}
                    onChange={(e) => setFormDemoUrl(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:border-skin focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold font-poppins text-zinc-300 uppercase mb-1.5">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={formDemoLabel}
                    onChange={(e) => setFormDemoLabel(e.target.value)}
                    placeholder="Live Demo"
                    className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:border-skin focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                <input
                  type="checkbox"
                  id="formFeatured"
                  checked={formFeatured}
                  onChange={(e) => setFormFeatured(e.target.checked)}
                  className="w-4 h-4 text-skin rounded focus:ring-0 cursor-pointer"
                />
                <label htmlFor="formFeatured" className="text-xs font-bold font-poppins text-white cursor-pointer">
                  Featured on Homepage Showcase
                </label>
              </div>

              {/* Lifecycle Stages Section */}
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold font-poppins text-white uppercase">
                      Project Lifecycle Milestones ({formStages.length})
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Document every phase from Concept to Testing & Deployment
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddStage}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold font-poppins text-skin flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Stage</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formStages.map((stage, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-skin/20 text-skin flex items-center justify-center text-xs font-bold font-mono">
                            {stage.step}
                          </span>
                          <input
                            type="text"
                            value={stage.name}
                            onChange={(e) => handleStageFieldChange(idx, 'name', e.target.value)}
                            className="bg-transparent font-bold font-poppins text-xs text-white border-b border-zinc-700 focus:border-skin focus:outline-none px-1"
                            placeholder="Stage Name"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={stage.phase}
                            onChange={(e) => handleStageFieldChange(idx, 'phase', e.target.value)}
                            className="px-2 py-1 bg-zinc-800 rounded-lg text-[10px] font-bold text-skin uppercase border border-zinc-700 focus:outline-none"
                          >
                            <option value="Concept">Concept</option>
                            <option value="Architecture">Architecture</option>
                            <option value="Development">Development</option>
                            <option value="Testing">Testing</option>
                            <option value="Deployment">Deployment</option>
                          </select>

                          <select
                            value={stage.status}
                            onChange={(e) => handleStageFieldChange(idx, 'status', e.target.value)}
                            className="px-2 py-1 bg-zinc-800 rounded-lg text-[10px] font-bold text-zinc-300 uppercase border border-zinc-700 focus:outline-none"
                          >
                            <option value="Completed">Completed</option>
                            <option value="In-Progress">In-Progress</option>
                            <option value="In-Production">In-Production</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => handleRemoveStage(idx)}
                            className="p-1 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={stage.summary}
                          onChange={(e) => handleStageFieldChange(idx, 'summary', e.target.value)}
                          placeholder="Summary of milestone actions..."
                          className="px-3 py-1.5 bg-black/40 border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={stage.duration}
                          onChange={(e) => handleStageFieldChange(idx, 'duration', e.target.value)}
                          placeholder="Duration (e.g. 1.5 Weeks)"
                          className="px-3 py-1.5 bg-black/40 border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold font-poppins text-zinc-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-xl bg-skin hover:opacity-90 text-xs font-bold font-poppins text-white uppercase shadow-lg shadow-skin/30 transition-all cursor-pointer"
                >
                  Save Project & Sync
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
