import { LifecycleStage } from '@/components/ProjectLifecycleTimeline';

export interface WeeklyCommitStat {
  week: string;
  commits: number;
  locAdded: number;
}

export interface ProjectStats {
  linesOfCode: number;
  totalCommits: number;
  durationWeeks: number;
  pullRequests?: number;
  testCoverage?: string;
  weeklyCommits: WeeklyCommitStat[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'fullstack' | 'vanilla' | 'react' | 'uiux' | 'agency' | string;
  categoryLabel: string;
  image: string;
  description: string;
  techs: string[];
  githubUrl: string;
  demoUrl: string;
  demoLabel: string;
  stages: LifecycleStage[];
  featured?: boolean;
  stats?: ProjectStats;
}

export interface DigitalProduct {
  id: string;
  title: string;
  price: string;
  badge?: string;
  category: 'Web Apps' | 'Source Code' | 'UI Kits' | 'Templates' | string;
  description: string;
  demoUrl: string;
  purchaseUrl: string;
  features: string[];
  image?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  startingPrice: string;
  deliveryTime: string;
  icon: string;
  badge: string;
  description: string;
  deliverables: string[];
  tech: string[];
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  school: string;
  website?: string;
  desc: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  link?: string;
  desc: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  skills: string;
  verificationLink: string;
}

export interface RadarProficiency {
  id: string;
  axis: string;
  score: number;
  fullMark: number;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface ProfileData {
  name: string;
  firstName: string;
  lastName: string;
  headline: string;
  tagline: string;
  subtitles: string[];
  bio: string;
  aboutSummary: string;
  availability: string;
  address: string;
  email: string;
  linkedin: string;
  fiverrPro: string;
  patreon: string;
  github: string;
  discord: string;
  resumeUrl: string;
  avatarUrl: string;
  stats: {
    experienceYears: string;
    completedProjects: string;
    happyClients: string;
    hoursCoded: string;
  };
}

export const defaultProfile: ProfileData = {
  name: 'Muhammad Hasil',
  firstName: 'Muhammad',
  lastName: 'Hasil',
  headline: 'Sales Engineer | Lead Generation and Data Mining | Hindi Translator | Discord Mod Expert | Skilled in Discord.js and Custom Integrations | Full-Stack Developer | Freelancer | AI Vibe Coding',
  tagline: 'Full Stack Developer & UI/UX Designer',
  subtitles: [
    'Full Stack Developer & UI/UX Designer',
    'Sales Engineer & B2B Lead Generation',
    'MERN & Next.js Production Engineer',
    'Discord.js Bot Architect & Mod Expert',
    'MongoDB & Database Systems Specialist',
    'Lunar Client Official Hindi Translator',
  ],
  bio: 'Specializing in high-performance web applications, modern responsive UI/UX, MongoDB database architecture, and production Next.js engineering.',
  aboutSummary: `I am a Front End & Full Stack Web Developer with over 5 years of experience building fast, responsive, and user-focused web applications. I work with HTML5, CSS3, Bootstrap, JavaScript, jQuery, and React Redux to deliver clean, scalable, and high-performing interfaces.

I bring full-stack experience with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Next.js, supporting projects from conception and frontend UI design to backend database architecture and cloud deployment. WordPress is also a key part of my experience, having built and managed 500+ custom themes, plugins, and performance-optimized websites for businesses and agencies.

Alongside development, I possess extensive experience in B2B and B2C sales, LinkedIn lead generation, email automation, and data mining. I identify ideal client prospects, generate high-converting qualified leads, and align technical software solutions with business and revenue goals.

Additionally, I specialize in Discord.js bot development and quick.db integrations for server automation, moderation, and community engagement. I also work with Lunar Client as an official Hindi Translator, expanding community accessibility across global gaming networks.`,
  availability: 'Available for freelance client work & full-stack contract roles',
  address: 'Lahore, Pakistan',
  email: 'm.hasil123@gmail.com',
  linkedin: 'https://www.linkedin.com/in/muhammad-hasil/',
  fiverrPro: 'https://pro.fiverr.com/users/venomdesigne613/',
  patreon: 'https://www.patreon.com/MrVenomYT',
  github: 'https://github.com/MrVenomYT',
  discord: 'MrVenomYT',
  resumeUrl: '#',
  avatarUrl: '/img/profile.jpg',
  stats: {
    experienceYears: '6+ Years',
    completedProjects: '270+',
    happyClients: '256+',
    hoursCoded: '3,400+',
  },
};

export const defaultRadarSkills: RadarProficiency[] = [
  { id: 'react', axis: 'React.js (94%)', score: 94, fullMark: 100 },
  { id: 'next', axis: 'Next.js (91%)', score: 91, fullMark: 100 },
  { id: 'tailwind', axis: 'Tailwind CSS (96%)', score: 96, fullMark: 100 },
  { id: 'mongodb', axis: 'MongoDB & Mongoose (92%)', score: 92, fullMark: 100 },
  { id: 'node', axis: 'Node.js & Express (90%)', score: 90, fullMark: 100 },
  { id: 'discord', axis: 'Discord.js & Bots (95%)', score: 95, fullMark: 100 },
  { id: 'minecraft', axis: 'Minecraft Dev (90%)', score: 90, fullMark: 100 },
  { id: 'sales', axis: 'B2B Lead Gen & Sales (88%)', score: 88, fullMark: 100 },
];

export const defaultExperiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    period: '2024 - Present',
    role: 'Full Stack Developer',
    company: 'Freelance & Client Systems',
    link: 'https://pro.fiverr.com/users/venomdesigne613/',
    desc: 'Built responsive web apps, full-stack portfolio systems, interactive dashboards, custom APIs, Discord bots, Minecraft/Roblox integrations, and high-performance UI flows.',
  },
  {
    id: 'exp-2',
    period: '2024 - Present',
    role: 'Sales Engineer / B2B Lead Generation',
    company: 'Esp Inspire',
    desc: 'Working as Sales Engineer, handling B2B lead generation, email automation pipelines, and technical data mining.',
  },
  {
    id: 'exp-3',
    period: '2019 - 2021',
    role: 'Customer Support / Data Miner / Backend Manager',
    company: 'Quantum LHE',
    desc: 'Managed daily Shopify store operations including product listings, inventory tracking, orders, and maintenance. Provided customer support, resolved inquiries, and coordinated order fulfillment.',
  },
  {
    id: 'exp-4',
    period: '2016 - 2018',
    role: 'WordPress Developer',
    company: 'Freelance',
    desc: 'Completed 500+ private client projects building custom themes, plugins, and responsive sites.',
  },
  {
    id: 'exp-5',
    period: '3 Months',
    role: 'Computer Operator - Inventory & Warehouse Management',
    company: 'Kamal Limited',
    desc: 'Managed warehouse inventory records, stock updates, data entry, and daily inventory documentation.',
  },
];

export const defaultEducation: EducationItem[] = [
  {
    id: 'edu-1',
    period: '2025 - Present',
    degree: 'Bachelor of Science in Business & Information Technology (BBIT)',
    school: 'Virtual University of Pakistan',
    website: 'https://www.vu.edu.pk',
    desc: 'Combining Information Technology and enterprise software systems. Focused on full-stack web engineering, database architecture, software development, and modern web application deployment.',
  },
  {
    id: 'edu-2',
    period: '2014 - 2016',
    degree: 'Intermediate (ICS - Computer Science)',
    school: 'CIMS (Central Group Of Colleges)',
    desc: 'Completed Intermediate studies in Computer Science.',
  },
  {
    id: 'edu-3',
    period: '2010 - 2012',
    degree: 'Matriculation (Computer Science)',
    school: 'Al-Qalam High School',
    desc: 'Completed Matric with a specialization in Computer Science.',
  },
];

export const defaultCertifications: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'Technical Sales',
    issuer: 'John Care (LinkedIn Learning)',
    date: '2025',
    skills: 'Technical Sales, B2B Discovery, Solution Architecture',
    verificationLink: 'https://www.linkedin.com/learning/certificates/5fdb0df8d0d818233c6fd949d93dd1a19fed1810b65089ce616c79c69d860274',
  },
  {
    id: 'cert-2',
    title: 'Salesforce: Sales Automation for Salespeople',
    issuer: 'Christine Volden (LinkedIn Learning)',
    date: '2025',
    skills: 'Salesforce CRM, Sales Automation, Pipeline Tracking',
    verificationLink: 'https://www.linkedin.com/learning/certificates/919a525db2af917e227508a1acf83d9a6a728fd792a707a5d3724f5f53da9f72',
  },
  {
    id: 'cert-3',
    title: 'Program Databases with Transact-SQL',
    issuer: 'Adam Wilbert (LinkedIn Learning)',
    date: '2025',
    skills: 'T-SQL, Relational Databases, Stored Procedures, Indexing',
    verificationLink: 'https://www.linkedin.com/learning/certificates/a7691b4007228f21ae4e4c0f6b0837d5a5e4707547eb1c905a974b8d3e3d5c09',
  },
  {
    id: 'cert-4',
    title: 'Project Management Foundations',
    issuer: 'Bonnie Biafore (LinkedIn Learning)',
    date: '2025',
    skills: 'Agile Lifecycles, Sprint Planning, Risk Management',
    verificationLink: 'https://www.linkedin.com/learning/certificates/169d2cf06c18bf265649f7da6a144ac9d7b544f575a8bc7a77aa946cf4712201',
  },
  {
    id: 'cert-5',
    title: 'Advanced Product Marketing',
    issuer: 'Jonathan Chang (LinkedIn Learning)',
    date: '2025',
    skills: 'Product Positioning, Go-To-Market Strategy, User Personas',
    verificationLink: 'https://www.linkedin.com/learning/certificates/f8e6621a64acbf7d9d9e5c80cb7f6a9cf3e35ad73d66f0b8363c52f69910b0d3',
  },
  {
    id: 'cert-6',
    title: 'PMI - Project Management Professional (PMP)®',
    issuer: 'Total Seminars (LinkedIn Learning)',
    date: '2025',
    skills: 'PMP Methodologies, Enterprise Governance, Scoping',
    verificationLink: 'https://www.linkedin.com/learning/certificates/cce119d92c617dac81812ed1797893fe59d984bd6153e9ed828a4167ae31610a',
  },
  {
    id: 'cert-7',
    title: 'Full-Stack Software Engineering & Modern Web Architecture',
    issuer: 'Samer Buna (LinkedIn Learning)',
    date: '2025',
    skills: 'React.js, Node.js, Express, Microservices, Cloud Architecture',
    verificationLink: 'https://www.linkedin.com/learning/certificates/5235036d3988c62e762dffdcf4a88084150c6c88f341761a5897c8ccdaa43a70',
  },
];

export const defaultServices: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Full-Stack Web App Development',
    category: 'Engineering',
    startingPrice: '$800',
    deliveryTime: '5-14 Days',
    icon: 'Code2',
    badge: 'Core Specialty',
    description: 'Custom web applications built from concept to deployment using modern React, Next.js, Node.js, Express, MongoDB, and Firebase.',
    deliverables: [
      'Production Next.js App with responsive App Router',
      'REST/GraphQL API endpoints with JWT session auth',
      'Database schemas & MongoDB Atlas migrations',
      'Deployment & CI/CD pipeline on Vercel or cloud VPS',
    ],
    tech: ['React.js', 'Next.js', 'Node.js', 'Express', 'MongoDB Atlas', 'Tailwind CSS'],
  },
  {
    id: 'srv-2',
    title: 'UI/UX Design & Frontend Engineering',
    category: 'Design & Code',
    startingPrice: '$500',
    deliveryTime: '3-7 Days',
    icon: 'Layout',
    badge: 'Modern Aesthetic',
    description: 'Bespoke dark-aesthetic, glassmorphism, responsive designs with fluid CSS micro-interactions and high-converting landing experiences.',
    deliverables: [
      'Responsive Web Design with 60fps animations',
      'Interactive Prototypes and Figma to Code workflow',
      'Tailwind CSS design token system',
      'Accessibility WCAG AA standard & 100 Lighthouse score',
    ],
    tech: ['Figma', 'Tailwind CSS', 'Framer Motion', 'React', 'HTML5 Canvas'],
  },
  {
    id: 'srv-3',
    title: 'Custom Admin Dashboards & CMS',
    category: 'Enterprise SaaS',
    startingPrice: '$650',
    deliveryTime: '4-10 Days',
    icon: 'Server',
    badge: 'High ROI',
    description: 'Feature-rich internal management dashboards with role-based auth, live analytics data grids, and CRUD content control.',
    deliverables: [
      'Secure Authentication with Role-Based Access Control (RBAC)',
      'Real-time Data Grids & Chart Analytics',
      'CRUD Management Panels for all business data',
      'CSV / Excel / PDF Data Export Engine',
    ],
    tech: ['Next.js', 'Firebase Auth', 'Firestore', 'Chart.js / D3.js', 'Tailwind'],
  },
  {
    id: 'srv-4',
    title: 'API Integration & Database Architecture',
    category: 'Backend Architecture',
    startingPrice: '$450',
    deliveryTime: '3-5 Days',
    icon: 'Database',
    badge: 'High Reliability',
    description: 'High-performance database modeling with MongoDB Mongoose schemas, Firebase real-time data sync, and third-party API webhooks.',
    deliverables: [
      'MongoDB Database Schemas & Indexing optimization',
      'Authentication & Session Handling',
      'Stripe / PayPal Payment Gates & Webhooks',
      'EmailJS & Discord API Webhooks Integration',
    ],
    tech: ['MongoDB Atlas', 'Mongoose', 'Firebase', 'Stripe API', 'Discord.js'],
  },
];

export const defaultProjects: ProjectItem[] = [
  {
    id: 'omnitravels',
    title: 'OmniTravels',
    category: 'fullstack',
    categoryLabel: 'Fullstack React / Web App',
    image: '/img/projects/project-1.jpg',
    description: 'A traveling web application featuring destination guides, itinerary discovery, and responsive UI.',
    techs: ['React', 'Next.js', 'Node.js'],
    githubUrl: 'https://github.com/MrVenomYT',
    demoUrl: 'https://omni-travels-teal.vercel.app/',
    demoLabel: 'Live Demo',
    featured: true,
    stages: [
      { step: 1, name: 'Discovery & Wireframes', phase: 'Concept', duration: '1 Week', summary: 'Scoping destination maps and booking flow.', deliverables: ['Figma Mockup'], tools: ['Figma'], status: 'Completed' },
      { step: 2, name: 'Frontend & Itinerary Engine', phase: 'Development', duration: '2 Weeks', summary: 'Built responsive card grids and travel filters.', deliverables: ['Next.js App'], tools: ['React', 'Next.js'], status: 'Completed' },
      { step: 3, name: 'Vercel Edge Launch', phase: 'Deployment', duration: 'Live', summary: 'Global CDN deployment.', deliverables: ['Live URL'], tools: ['Vercel'], status: 'In-Production' },
    ],
  },
  {
    id: 'adidas-eqt',
    title: 'Adidas EQT_GPR SHOES',
    category: 'vanilla',
    categoryLabel: 'Vanilla / Web Design',
    image: '/img/projects/project-6.jpg',
    description: 'Simple Apparel and footwear product showcase website with responsive layouts and interactive display.',
    techs: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/MrVenomYT',
    demoUrl: 'https://adidas-plum.vercel.app/',
    demoLabel: 'Live Storefront',
    featured: true,
    stages: [
      { step: 1, name: 'Lookbook Design', phase: 'Concept', duration: '4 Days', summary: 'Editorial footwear layout design.', deliverables: ['High-Res Wireframes'], tools: ['Figma'], status: 'Completed' },
      { step: 2, name: 'Interactive Showcase', phase: 'Development', duration: '1 Week', summary: 'Product 360 viewer & colorway swatches.', deliverables: ['Interactive UI'], tools: ['JavaScript ES6'], status: 'Completed' },
      { step: 3, name: 'Production Launch', phase: 'Deployment', duration: 'Live', summary: 'Deployed to Vercel CDN.', deliverables: ['Live Site'], tools: ['Vercel'], status: 'In-Production' },
    ],
  },
  {
    id: 'automotive-car-vault',
    title: 'Automotive Car Vault',
    category: 'fullstack',
    categoryLabel: 'Fullstack React / Web App',
    image: '/img/projects/project-3.jpg',
    description: 'Car vault platform for vehicle inventory listings, vehicle specs, and showcase.',
    techs: ['React', 'Next.js', 'Node.js'],
    githubUrl: 'https://github.com/MrVenomYT',
    demoUrl: 'https://auto-vault-mu.vercel.app/',
    demoLabel: 'Live Vault',
    featured: true,
    stages: [
      { step: 1, name: 'Inventory Data Modeling', phase: 'Concept', duration: '5 Days', summary: 'Structured automobile horsepower and pricing models.', deliverables: ['Data Spec'], tools: ['JSON Schema'], status: 'Completed' },
      { step: 2, name: 'Catalog UI & Search', phase: 'Development', duration: '1.5 Weeks', summary: 'Faceted filtering by make, model, and year.', deliverables: ['React Catalog'], tools: ['Next.js', 'Tailwind'], status: 'Completed' },
      { step: 3, name: 'Edge Hosting', phase: 'Deployment', duration: 'Live', summary: 'Fast edge-rendered automobile portal.', deliverables: ['Live App'], tools: ['Vercel'], status: 'In-Production' },
    ],
  },
  {
    id: 'drivenest',
    title: 'DriveNest',
    category: 'fullstack',
    categoryLabel: 'Fullstack React / Web App',
    image: 'https://github.com/MrVenomYT/drive-nest/raw/main/site.jpg',
    description: 'Modern car rental web application with booking reservation flows, vehicle search, and fleet management.',
    techs: ['React', 'Next.js', 'Node.js'],
    githubUrl: 'https://github.com/MrVenomYT/drive-nest',
    demoUrl: 'https://drive-nest-six.vercel.app/',
    demoLabel: 'Explore DriveNest',
    featured: true,
    stages: [
      { step: 1, name: 'Rental Reservation Scoping', phase: 'Concept', duration: '1 Week', summary: 'Pickup/dropoff date logic and insurance tiers.', deliverables: ['Reservation Flow'], tools: ['Miro'], status: 'Completed' },
      { step: 2, name: 'Interactive Fleet UI', phase: 'Development', duration: '2 Weeks', summary: 'Dynamic price calculator and calendar picker.', deliverables: ['Booking Engine'], tools: ['React', 'Next.js'], status: 'Completed' },
      { step: 3, name: 'Production Launch', phase: 'Deployment', duration: 'Live', summary: 'Live on Vercel with HTTPS.', deliverables: ['Production URL'], tools: ['Vercel'], status: 'In-Production' },
    ],
  },
  {
    id: 'proshop',
    title: 'Proshop',
    category: 'react',
    categoryLabel: 'React / MERN Stack',
    image: '/img/projects/project-1.jpg',
    description: 'A fully customizable e-commerce web store application with product catalog, cart management, and checkout.',
    techs: ['React', 'Next.js', 'Node.js'],
    githubUrl: 'https://github.com/MrVenomYT',
    demoUrl: 'https://proshop-beryl.vercel.app/',
    demoLabel: 'Live Proshop',
    featured: true,
    stages: [
      { step: 1, name: 'Cart State & Schema', phase: 'Architecture', duration: '1 Week', summary: 'Mongoose collection schemas and Redux cart.', deliverables: ['Store Schema'], tools: ['MongoDB', 'Redux'], status: 'Completed' },
      { step: 2, name: 'Storefront Build', phase: 'Development', duration: '2.5 Weeks', summary: 'Product detail pages, review ratings, checkout.', deliverables: ['E-Commerce App'], tools: ['React', 'Express'], status: 'Completed' },
      { step: 3, name: 'Cloud Deployment', phase: 'Deployment', duration: 'Live', summary: 'Deployed with Atlas cluster.', deliverables: ['Live Store'], tools: ['Vercel', 'Render'], status: 'In-Production' },
    ],
  },
  {
    id: 'eshop',
    title: 'Eshop',
    category: 'fullstack',
    categoryLabel: 'Fullstack React / Web App',
    image: '/img/projects/project-4.jpg',
    description: 'A full-stack webstore application featuring product collections, responsive navigation, and user cart flow.',
    techs: ['React', 'Next.js', 'Node.js'],
    githubUrl: 'https://github.com/MrVenomYT',
    demoUrl: 'https://eshop-pi-five.vercel.app/',
    demoLabel: 'Visit Eshop',
    featured: true,
    stages: [
      { step: 1, name: 'UX & Product Flows', phase: 'Concept', duration: '5 Days', summary: 'Customer journey from search to confirmation.', deliverables: ['UX Prototype'], tools: ['Figma'], status: 'Completed' },
      { step: 2, name: 'Full-Stack Integration', phase: 'Development', duration: '2 Weeks', summary: 'Built dynamic catalog with instant search.', deliverables: ['Webstore App'], tools: ['React', 'Node.js'], status: 'Completed' },
      { step: 3, name: 'Vercel Deployment', phase: 'Deployment', duration: 'Live', summary: 'Global CDN distribution.', deliverables: ['Live Webstore'], tools: ['Vercel'], status: 'In-Production' },
    ],
  },
  {
    id: 'veloce',
    title: 'Veloce',
    category: 'fullstack',
    categoryLabel: 'Fullstack React / Luxury Rental',
    image: 'https://raw.githubusercontent.com/MrVenomYT/Veloce./refs/heads/main/src/assets/veloce.jpg',
    description: 'Hand-delivered to private aviation tarmacs, five-star residences, and executive offices in under 60 minutes. Guaranteed exact model reservations with zero-deductible coverage.',
    techs: ['React', 'Next.js', 'Node.js'],
    githubUrl: 'https://github.com/MrVenomYT/Veloce.',
    demoUrl: 'https://veloce-five-murex.vercel.app/',
    demoLabel: 'Experience Veloce',
    featured: true,
    stages: [
      { step: 1, name: 'VIP Concierge UX', phase: 'Concept', duration: '1 Week', summary: 'Ultra-luxury dark aesthetics and airport delivery flows.', deliverables: ['Luxury Brand System'], tools: ['Figma'], status: 'Completed' },
      { step: 2, name: 'High-Touch Booking Interface', phase: 'Development', duration: '2 Weeks', summary: 'Exotic vehicle fleet showcase with zero-deductible booking.', deliverables: ['Veloce App'], tools: ['React', 'Tailwind CSS'], status: 'Completed' },
      { step: 3, name: 'Global Launch', phase: 'Deployment', duration: 'Live', summary: 'High-speed edge deployment.', deliverables: ['Production Portal'], tools: ['Vercel Edge'], status: 'In-Production' },
    ],
  },
  {
    id: 'apex-motors',
    title: 'Apex Motors',
    category: 'fullstack',
    categoryLabel: 'Fullstack React / Auto Marketplace',
    image: '/img/projects/project-7.jpg',
    description: 'Car buying, selling, and leasing platform with search filters, vehicle profiles, and responsive cards.',
    techs: ['React', 'Next.js', 'Node.js'],
    githubUrl: 'https://github.com/MrVenomYT',
    demoUrl: 'https://apex-motors-mu.vercel.app/',
    demoLabel: 'Launch Apex Motors',
    featured: true,
    stages: [
      { step: 1, name: 'Marketplace Architecture', phase: 'Architecture', duration: '1 Week', summary: 'Listings schema, VIN decoding, and lead gen.', deliverables: ['Marketplace Spec'], tools: ['Draw.io'], status: 'Completed' },
      { step: 2, name: 'Interactive Marketplace', phase: 'Development', duration: '2 Weeks', summary: 'Car card carousels and monthly payment estimator.', deliverables: ['Marketplace Portal'], tools: ['React', 'Next.js'], status: 'Completed' },
      { step: 3, name: 'Production Delivery', phase: 'Deployment', duration: 'Live', summary: 'Deployed with automated SSL.', deliverables: ['Live Portal'], tools: ['Vercel'], status: 'In-Production' },
    ],
  },
  {
    id: 'papers-bank',
    title: 'Papers Bank',
    category: 'fullstack',
    categoryLabel: 'Fullstack React / Educational Portal',
    image: '/img/projects/project-5.jpg',
    description: 'An exam and past paper repository web app designed to help students prepare for tests and academic assessments.',
    techs: ['React', 'Next.js', 'Node.js'],
    githubUrl: 'https://github.com/MrVenomYT',
    demoUrl: 'https://venom-papers.vercel.app/',
    demoLabel: 'Access Papers Bank',
    featured: true,
    stages: [
      { step: 1, name: 'Subject Taxonomy & Archiving', phase: 'Concept', duration: '1 Week', summary: 'Organized academic papers by semester and course.', deliverables: ['Academic Hierarchy'], tools: ['Notion'], status: 'Completed' },
      { step: 2, name: 'Instant PDF Search Engine', phase: 'Development', duration: '2 Weeks', summary: 'Fast search bar with categorized paper downloads.', deliverables: ['Educational Portal'], tools: ['React', 'Next.js'], status: 'Completed' },
      { step: 3, name: 'Student Community Launch', phase: 'Deployment', duration: 'Live', summary: 'Deployed for university students.', deliverables: ['Live Tool'], tools: ['Vercel'], status: 'In-Production' },
    ],
  },
  {
    id: 'takumi-sushi',
    title: 'Takumi Sushi',
    category: 'fullstack',
    categoryLabel: 'Fullstack React / Japanese Dining UI',
    image: '/img/projects/project-9.jpg',
    description: 'Authentic Japanese dining and sushi ordering web application featuring interactive menus, sleek dark aesthetic UI, and seamless food ordering experience.',
    techs: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/MrVenomYT',
    demoUrl: 'https://takumi-psi.vercel.app/',
    demoLabel: 'Explore Takumi',
    featured: true,
    stages: [
      { step: 1, name: 'Artisanal Culinary UI', phase: 'Concept', duration: '1 Week', summary: 'Japanese minimalism with golden accents.', deliverables: ['Culinary Figma System'], tools: ['Figma'], status: 'Completed' },
      { step: 2, name: 'Interactive Menu & Cart', phase: 'Development', duration: '1.5 Weeks', summary: 'Smooth menu transitions and instant ordering.', deliverables: ['Takumi Dining App'], tools: ['Next.js', 'Framer Motion'], status: 'Completed' },
      { step: 3, name: 'Production Launch', phase: 'Deployment', duration: 'Live', summary: 'High-speed Vercel delivery.', deliverables: ['Live Restaurant App'], tools: ['Vercel'], status: 'In-Production' },
    ],
  },
  {
    id: 'staypilot',
    title: 'StayPilot',
    category: 'fullstack',
    categoryLabel: 'Fullstack React / Hospitality SaaS',
    image: '/img/projects/project-2.jpg',
    description: 'All-in-one web platform for hospitality & property management, booking reservations, guest scheduling, and analytics.',
    techs: ['React', 'Next.js', 'Firebase', 'Node.js', 'Stripe'],
    githubUrl: 'https://github.com/MrVenomYT',
    demoUrl: 'https://stay-pilot-liard.vercel.app/',
    demoLabel: 'Launch StayPilot SaaS',
    featured: true,
    stages: [
      { step: 1, name: 'SaaS Property Architecture', phase: 'Architecture', duration: '1.5 Weeks', summary: 'Multi-property calendar booking and analytics metrics.', deliverables: ['SaaS Spec Document'], tools: ['Draw.io'], status: 'Completed' },
      { step: 2, name: 'Firebase Realtime Dashboard', phase: 'Development', duration: '3 Weeks', summary: 'Guest check-in sync, room availability, Stripe billing.', deliverables: ['Hospitality SaaS'], tools: ['Next.js', 'Firebase', 'Stripe'], status: 'Completed' },
      { step: 3, name: 'Commercial Release', phase: 'Deployment', duration: 'Live', summary: 'Published as flagship SaaS product.', deliverables: ['Live SaaS App'], tools: ['Vercel Edge'], status: 'In-Production' },
    ],
  },
  {
    id: 'vscheduler',
    title: 'VScheduler',
    category: 'fullstack',
    categoryLabel: 'Fullstack React / Workflow App',
    image: '/img/projects/project-8.jpg',
    description: 'Interactive appointment booking and automated scheduling system built for seamless workflow management.',
    techs: ['React', 'FullCalendar', 'EmailJS', 'Tailwind CSS'],
    githubUrl: 'https://github.com/MrVenomYT',
    demoUrl: 'https://vscheduler-five.vercel.app/',
    demoLabel: 'Try VScheduler',
    featured: true,
    stages: [
      { step: 1, name: 'Time Slot Matrix Scoping', phase: 'Concept', duration: '4 Days', summary: 'Timezone conversion and email confirmation workflows.', deliverables: ['Booking Matrix'], tools: ['Notion'], status: 'Completed' },
      { step: 2, name: 'Calendar Engine & EmailJS', phase: 'Development', duration: '1.5 Weeks', summary: 'Drag-and-drop calendar slots with instant alerts.', deliverables: ['Scheduler Component'], tools: ['React', 'FullCalendar', 'EmailJS'], status: 'Completed' },
      { step: 3, name: 'Deployment', phase: 'Deployment', duration: 'Live', summary: 'Production release on Vercel.', deliverables: ['Live Scheduler'], tools: ['Vercel'], status: 'In-Production' },
    ],
  },
  {
    id: 'sushiman',
    title: 'Sushiman',
    category: 'uiux',
    categoryLabel: 'Web Design & UI Kit',
    image: '/img/projects/project-9.jpg',
    description: 'High-converting culinary website with authentic Japanese aesthetics, smooth scroll animations, and food ordering UI.',
    techs: ['HTML5 Canvas', 'CSS3 Glassmorphism', 'Vanilla JS'],
    githubUrl: 'https://github.com/MrVenomYT',
    demoUrl: 'https://vanilla-food-website.vercel.app/',
    demoLabel: 'View Sushiman',
    featured: true,
    stages: [
      { step: 1, name: 'Authentic Aesthetics & Moodboard', phase: 'Concept', duration: '5 Days', summary: 'Traditional Japanese calligraphy fonts & dark glass.', deliverables: ['Figma Design'], tools: ['Figma'], status: 'Completed' },
      { step: 2, name: 'Smooth Scroll & Animations', phase: 'Development', duration: '1.5 Weeks', summary: 'Micro-interactions and mobile-first navigation.', deliverables: ['Sushiman Storefront'], tools: ['HTML5', 'CSS3', 'JS'], status: 'Completed' },
      { step: 3, name: 'Vercel Deployment', phase: 'Deployment', duration: 'Live', summary: 'Published on Vercel CDN.', deliverables: ['Live Website'], tools: ['Vercel'], status: 'In-Production' },
    ],
  },
  {
    id: 'coffee-theme',
    title: 'Coffee Theme',
    category: 'uiux',
    categoryLabel: 'Web Design / Artisanal Cafe Shop',
    image: '/img/projects/project-6.jpg',
    description: 'Rich dark-themed website featuring artisanal coffee menus, online ordering, smooth scrolling, and brand aesthetics.',
    techs: ['React', 'Responsive Design', 'Tailwind CSS'],
    githubUrl: 'https://github.com/MrVenomYT',
    demoUrl: 'https://coffee-theme.vercel.app/',
    demoLabel: 'Explore Cafe Theme',
    featured: false,
    stages: [
      { step: 1, name: 'Artisanal Cafe Branding', phase: 'Concept', duration: '3 Days', summary: 'Warm espresso tones and modern menu typography.', deliverables: ['Style Guide'], tools: ['Figma'], status: 'Completed' },
      { step: 2, name: 'Responsive Storefront', phase: 'Development', duration: '1 Week', summary: 'Interactive drink carousel and brewing notes.', deliverables: ['Cafe UI'], tools: ['React', 'Tailwind'], status: 'Completed' },
      { step: 3, name: 'Live Deployment', phase: 'Deployment', duration: 'Live', summary: 'High-speed edge loading.', deliverables: ['Live Storefront'], tools: ['Vercel'], status: 'In-Production' },
    ],
  },
  {
    id: 'study-hub',
    title: 'Study Hub',
    category: 'fullstack',
    categoryLabel: 'Fullstack React / Learning Portal',
    image: '/img/projects/project-4.jpg',
    description: 'Comprehensive educational application designed to help students organize study sessions, resources, and progress tracking.',
    techs: ['React', 'Next.js', 'MongoDB', 'Node.js'],
    githubUrl: 'https://github.com/MrVenomYT',
    demoUrl: 'https://study-app-steel.vercel.app/',
    demoLabel: 'Open Study Hub',
    featured: false,
    stages: [
      { step: 1, name: 'Study Tracker Scoping', phase: 'Concept', duration: '5 Days', summary: 'Pomodoro timer integration and flashcard decks.', deliverables: ['Feature Spec'], tools: ['Notion'], status: 'Completed' },
      { step: 2, name: 'MongoDB Sync & Task Boards', phase: 'Development', duration: '2 Weeks', summary: 'Real-time task synchronization and progress bars.', deliverables: ['Study App'], tools: ['React', 'MongoDB'], status: 'Completed' },
      { step: 3, name: 'Production Launch', phase: 'Deployment', duration: 'Live', summary: 'Fast global CDN hosting.', deliverables: ['Live App'], tools: ['Vercel'], status: 'In-Production' },
    ],
  },
  {
    id: 'venomous-studio',
    title: 'Venomous Studio',
    category: 'agency',
    categoryLabel: 'Digital Agency Showcase',
    image: '/img/projects/project-3.jpg',
    description: 'Cutting-edge portfolio showcase for creative digital agency services, featuring glassmorphism UI and fluid animations.',
    techs: ['React', 'Canvas 192-Frame Engine', 'CSS Glassmorphism'],
    githubUrl: 'https://github.com/MrVenomYT',
    demoUrl: 'https://venomous-studio.vercel.app/',
    demoLabel: 'Visit Venomous Studio',
    featured: true,
    stages: [
      { step: 1, name: '192-Frame Canvas Animation Scoping', phase: 'Concept', duration: '1 Week', summary: 'Pre-rendered sequence loading and smooth scroll scrubbing.', deliverables: ['Frame Engine Spec'], tools: ['Blender', 'Canvas'], status: 'Completed' },
      { step: 2, name: 'Agency Showcase Implementation', phase: 'Development', duration: '2.5 Weeks', summary: 'Client testimonials slider, service tier cards, contact API.', deliverables: ['Agency Portal'], tools: ['React', 'HTML5 Canvas'], status: 'Completed' },
      { step: 3, name: 'Production Launch', phase: 'Deployment', duration: 'Live', summary: 'High-speed Vercel Edge caching.', deliverables: ['Live Studio Site'], tools: ['Vercel Edge'], status: 'In-Production' },
    ],
  },
];

export const defaultDigitalProducts: DigitalProduct[] = [
  {
    id: 'prod-staypilot',
    title: 'StayPilot Pro SaaS Starter',
    price: '$49',
    badge: 'Best Seller',
    category: 'Web Apps',
    description: 'Production-ready full-stack hotel & property management SaaS template built with React, Next.js, Firebase Auth & Stripe.',
    demoUrl: 'https://stay-pilot-liard.vercel.app/',
    purchaseUrl: 'https://pro.fiverr.com/users/venomdesigne613/',
    features: ['Next.js Pages Router', 'Firebase Realtime DB', 'Stripe Billing Integration', 'Responsive Dark UI'],
    image: '/img/projects/project-2.jpg',
  },
  {
    id: 'prod-vscheduler',
    title: 'VScheduler Booking Engine',
    price: '$29',
    badge: 'Popular',
    category: 'Source Code',
    description: 'Interactive appointment scheduling component with calendar synchronization, drag-drop slots, and automated email reminders.',
    demoUrl: 'https://vscheduler-five.vercel.app/',
    purchaseUrl: 'https://pro.fiverr.com/users/venomdesigne613/',
    features: ['Calendar Sync', 'EmailJS Reminders', 'Clean React Code', 'Full Customizability'],
    image: '/img/projects/project-8.jpg',
  },
  {
    id: 'prod-sushiman',
    title: 'Sushiman Artisanal UI Kit',
    price: '$19',
    badge: 'New Release',
    category: 'UI Kits',
    description: 'High-converting Japanese restaurant UI template with glassmorphism design, smooth frame animations, and online menu ordering.',
    demoUrl: 'https://vanilla-food-website.vercel.app/',
    purchaseUrl: 'https://pro.fiverr.com/users/venomdesigne613/',
    features: ['HTML5 Canvas Animations', 'Dark Mode Palette', 'Mobile First Layout', '6 Prebuilt Pages'],
    image: '/img/projects/project-9.jpg',
  },
  {
    id: 'prod-venomous',
    title: 'Venomous Dark Studio Theme',
    price: '$39',
    badge: 'Featured',
    category: 'Templates',
    description: 'Sleek portfolio & agency showcase template featuring 192-frame background animation canvas, reviews slider, and contact forms.',
    demoUrl: 'https://venomous-studio.vercel.app/',
    purchaseUrl: 'https://pro.fiverr.com/users/venomdesigne613/',
    features: ['Frame Animation Engine', 'Firebase & MongoDB Ready', 'SEO Optimized', 'Tailored CSS System'],
    image: '/img/projects/project-3.jpg',
  },
  {
    id: 'prod-omnitravels',
    title: 'OmniTravels Production Template',
    price: '$29',
    category: 'Web Apps',
    description: 'Production-ready travel web application template with dynamic routing and responsive layouts.',
    demoUrl: 'https://omni-travels-teal.vercel.app/',
    purchaseUrl: 'https://pro.fiverr.com/users/venomdesigne613/',
    features: ['React', 'Next.js', 'Node.js', 'Responsive Grid'],
    image: '/img/projects/project-1.jpg',
  },
  {
    id: 'prod-adidas',
    title: 'Adidas EQT_GPR Apparel Theme',
    price: '$29',
    category: 'Templates',
    description: 'Minimalist and high-performance product and apparel template.',
    demoUrl: 'https://adidas-plum.vercel.app/',
    purchaseUrl: 'https://pro.fiverr.com/users/venomdesigne613/',
    features: ['HTML', 'CSS', 'JavaScript', 'Interactive 360 Viewer'],
    image: '/img/projects/project-6.jpg',
  },
  {
    id: 'prod-autovault',
    title: 'Automotive Car Vault Template',
    price: '$29',
    category: 'Web Apps',
    description: 'Auto catalog and showroom template for vehicle dealerships.',
    demoUrl: 'https://auto-vault-mu.vercel.app/',
    purchaseUrl: 'https://pro.fiverr.com/users/venomdesigne613/',
    features: ['React', 'Next.js', 'Node.js', 'Vehicle Filter Matrix'],
    image: '/img/projects/project-3.jpg',
  },
  {
    id: 'prod-drivenest',
    title: 'DriveNest Car Rental Starter',
    price: '$29',
    category: 'Web Apps',
    description: 'Full car rental booking platform source code with fleet showcase.',
    demoUrl: 'https://drive-nest-six.vercel.app/',
    purchaseUrl: 'https://pro.fiverr.com/users/venomdesigne613/',
    features: ['React', 'Next.js', 'Node.js', 'Rental Calendar Picker'],
    image: 'https://github.com/MrVenomYT/drive-nest/raw/main/site.jpg',
  },
  {
    id: 'prod-proshop',
    title: 'Proshop MERN Store Starter',
    price: '$29',
    category: 'Web Apps',
    description: 'Fully customizable e-commerce store with modern shopping flows.',
    demoUrl: 'https://proshop-beryl.vercel.app/',
    purchaseUrl: 'https://pro.fiverr.com/users/venomdesigne613/',
    features: ['React', 'Next.js', 'Node.js', 'Stripe Checkout'],
    image: '/img/projects/project-1.jpg',
  },
  {
    id: 'prod-eshop',
    title: 'Eshop Full-Stack Webstore',
    price: '$29',
    category: 'Web Apps',
    description: 'Complete full-stack web store template.',
    demoUrl: 'https://eshop-pi-five.vercel.app/',
    purchaseUrl: 'https://pro.fiverr.com/users/venomdesigne613/',
    features: ['React', 'Next.js', 'Node.js', 'Cart Sync Engine'],
    image: '/img/projects/project-4.jpg',
  },
  {
    id: 'prod-veloce',
    title: 'Veloce Luxury Rental Theme',
    price: '$29',
    category: 'Web Apps',
    description: 'Premium VIP concierge and luxury transport rental template.',
    demoUrl: 'https://veloce-five-murex.vercel.app/',
    purchaseUrl: 'https://pro.fiverr.com/users/venomdesigne613/',
    features: ['React', 'Next.js', 'Node.js', 'Luxury Dark Glass UI'],
    image: 'https://raw.githubusercontent.com/MrVenomYT/Veloce./refs/heads/main/src/assets/veloce.jpg',
  },
  {
    id: 'prod-apexmotors',
    title: 'Apex Motors Auto Portal',
    price: '$29',
    category: 'Web Apps',
    description: 'Auto marketplace and rental web application.',
    demoUrl: 'https://apex-motors-mu.vercel.app/',
    purchaseUrl: 'https://pro.fiverr.com/users/venomdesigne613/',
    features: ['React', 'Next.js', 'Node.js', 'Loan Payment Estimator'],
    image: '/img/projects/project-7.jpg',
  },
];

export const defaultTestimonials: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'James Allen',
    role: 'Verified Client',
    rating: 5,
    comment:
      'Hasil is highly skilled, creative, and dedicated to delivering exceptional work. His attention to detail, technical expertise, and ability to turn ideas into effective solutions truly stand out. It was a pleasure working with him, and I would confidently recommend Hasil for any development project.',
  },
  {
    id: 'test-2',
    name: 'Sarah K.',
    role: 'Digital Marketing Director, Nexus Media',
    rating: 5,
    comment:
      'Muhammad delivered our Next.js & React web application faster than expected with incredible attention to detail, clean full-stack code, and smooth 192-frame canvas animations.',
  },
  {
    id: 'test-3',
    name: 'David M.',
    role: 'SaaS Founder, CloudSync Inc',
    rating: 5,
    comment:
      'The interactive admin dashboard and MongoDB database persistence he built transformed how our client operations work. Highly recommended for any serious web project!',
  },
  {
    id: 'test-4',
    name: 'Alex R.',
    role: 'E-Commerce Lead, Aura Collective',
    rating: 5,
    comment:
      'Outstanding full-stack engineering precision, Firebase authentication integration, and flawless responsiveness across all desktop and mobile devices. A true professional.',
  },
  {
    id: 'test-5',
    name: 'Elena V.',
    role: 'Creative Director, Studio Lumina',
    rating: 5,
    comment:
      'He transformed our brand UI with stunning dark glassmorphic design, smooth scroll physics, and fast Next.js Pages Router performance. Exceptional quality!',
  },
  {
    id: 'test-6',
    name: 'Marcus T.',
    role: 'CTO, TechFlow',
    rating: 5,
    comment:
      'Flawless real-time data sync with Firestore and clean RESTful API integration. His expertise in full-stack architecture saved us weeks of development time.',
  },
  {
    id: 'test-7',
    name: 'Brandon P.',
    role: 'Product Manager, Elevate Apps',
    rating: 5,
    comment:
      'The digital product store and payment workflows he engineered were rock-solid. 100% persistent data even across hard reloads!',
  },
];

export const defaultFAQs: FAQItem[] = [
  {
    q: 'What core technologies do you specialize in?',
    a: 'I specialize in production-grade Full-Stack JavaScript & TypeScript development: React.js, Next.js, Node.js, Express, MongoDB Atlas, Firebase Firestore, and Tailwind CSS.',
  },
  {
    q: 'How do project pricing, milestones, and hiring work?',
    a: 'Projects are structured with clear deliverables, fixed prices, and milestones. You can hire me securely through Fiverr Pro or via custom contract agreements with initial milestone deposits.',
  },
  {
    q: 'Do I get full commercial rights and source code?',
    a: 'Yes! All client projects and purchased digital templates include 100% full source code ownership, documentation, and perpetual commercial rights with zero recurring licensing fees.',
  },
  {
    q: 'Can you deploy and configure the database for me?',
    a: 'Absolutely. Every production delivery includes full deployment on Vercel, AWS, Google Cloud, or DigitalOcean with custom SSL domains, environment variables, and MongoDB Atlas provisioning.',
  },
  {
    q: 'What is your typical project delivery timeline?',
    a: 'Landing pages and interactive UI kits typically deliver in 3–5 business days. Complex full-stack web applications with authentication, databases, and admin dashboards take 7–14 business days.',
  },
];
