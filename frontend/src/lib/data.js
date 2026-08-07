// Central content for 3CAPSTECH experience

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/#about" },
  { label: "Services", to: "/#services" },
  { label: "Learning", to: "/learning" },
  { label: "Internships", to: "/#internships" },
  { label: "Contact", to: "/#contact" },
];

export const HERO_WORDS = ["BUILD", "LEARN", "INNOVATE"];

export const STATS = [
  { value: 240, suffix: "+", label: "Projects Shipped" },
  { value: 18500, suffix: "+", label: "Active Learners" },
  { value: 65, suffix: "", label: "Expert Instructors" },
  { value: 23, suffix: "", label: "Countries Reached" },
];

export const SERVICES = [
  {
    id: "software",
    title: "Custom Software Development",
    desc: "Bespoke platforms engineered for scale, security and speed — from architecture to deployment.",
    icon: "Code2",
    tags: ["Architecture", "Delivery", "Scale"],
  },
  {
    id: "enterprise",
    title: "Enterprise Applications",
    desc: "Mission-critical systems that unify operations, data and teams across the organisation.",
    icon: "Building2",
    tags: ["ERP", "Workflow", "Integrations"],
  },
  {
    id: "web",
    title: "Web Development",
    desc: "Immersive, blazing-fast web experiences built with modern frameworks and pixel obsession.",
    icon: "Globe",
    tags: ["Responsive", "Performance", "SEO"],
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    desc: "Native-grade iOS & Android apps with fluid motion and offline-first reliability.",
    icon: "Smartphone",
    tags: ["iOS", "Android", "Cross-platform"],
  },
  {
    id: "ai",
    title: "AI Solutions",
    desc: "Intelligent agents, RAG systems and computer vision that turn data into decisions.",
    icon: "BrainCircuit",
    tags: ["Automation", "Insights", "Vision"],
  },
  {
    id: "cloud",
    title: "Cloud Solutions",
    desc: "Resilient, cost-efficient cloud infrastructure with automated scaling and observability.",
    icon: "CloudCog",
    tags: ["Scalable", "Secure", "Automated"],
  },
  {
    id: "uiux",
    title: "UI / UX Design",
    desc: "Research-driven design systems that feel effortless and convert relentlessly.",
    icon: "PenTool",
    tags: ["Systems", "Prototyping", "Research"],
  },
  {
    id: "consulting",
    title: "Digital Transformation",
    desc: "Strategy and execution that modernise legacy stacks into future-ready platforms.",
    icon: "Compass",
    tags: ["Strategy", "Audit", "Roadmap"],
  },
];

export const MISSION =
  "To engineer intelligent software that moves businesses forward — and to open the door for the next generation of technology talent.";

export const VISION =
  "A world where world-class engineering and world-class education live under one roof, each compounding the other.";

export const PILLARS = [
  { k: "Craftsmanship", v: "Every product is engineered end-to-end by senior specialists." },
  { k: "Education", v: "We grow talent through mentorship, real projects and guided tracks." },
  { k: "Partnership", v: "Long-term relationships built on measurable outcomes and trust." },
];

export const VALUES = [
  { title: "Craft", text: "Details are not details. They make the product.", icon: "Sparkles" },
  { title: "Trust", text: "We build long relationships, not one-off deliverables.", icon: "ShieldCheck" },
  { title: "Learning", text: "Curiosity compounds. We invest in people first.", icon: "GraduationCap" },
  { title: "Impact", text: "Ship things that matter and measurably move the needle.", icon: "Rocket" },
];

export const TECH = [
  "Innovation", "AI", "Cloud", "Security", "Automation", "Scale", "Design", "Data", "Delivery",
];

export const CATEGORIES = ["All", "Web", "AI & Data", "Cloud", "Mobile", "Design"];

export const COURSES = [
  {
    id: "adv-web",
    title: "Advanced Full-Stack Web Engineering",
    instructor: "Aarav Mehta",
    category: "Web",
    level: "Advanced",
    duration: "38h",
    rating: 4.9,
    students: 12400,
    price: "₹6,999",
    trending: true,
    thumb: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  },
  {
    id: "ai-python",
    title: "AI & Machine Learning with Python",
    instructor: "Dr. Neha Kapoor",
    category: "AI & Data",
    level: "Intermediate",
    duration: "42h",
    rating: 4.8,
    students: 15800,
    price: "₹7,499",
    trending: true,
    thumb: "https://images.unsplash.com/photo-1677442135136-760c813028c0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  },
  {
    id: "cloud-native",
    title: "Cloud-Native with Docker & Kubernetes",
    instructor: "Rohan Verma",
    category: "Cloud",
    level: "Advanced",
    duration: "29h",
    rating: 4.7,
    students: 8600,
    price: "₹6,499",
    trending: false,
    thumb: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  },
  {
    id: "react-mastery",
    title: "React & Framer Motion Mastery",
    instructor: "Ishita Rao",
    category: "Web",
    level: "Intermediate",
    duration: "24h",
    rating: 4.9,
    students: 20100,
    price: "₹5,499",
    trending: true,
    thumb: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  },
  {
    id: "llm-apps",
    title: "Building LLM Applications & RAG",
    instructor: "Kabir Shah",
    category: "AI & Data",
    level: "Advanced",
    duration: "31h",
    rating: 4.8,
    students: 9700,
    price: "₹8,999",
    trending: true,
    thumb: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  },
  {
    id: "mobile-flutter",
    title: "Cross-Platform Apps with Flutter",
    instructor: "Ananya Iyer",
    category: "Mobile",
    level: "Beginner",
    duration: "27h",
    rating: 4.6,
    students: 7300,
    price: "₹4,999",
    trending: false,
    thumb: "https://images.pexels.com/photos/3471423/pexels-photo-3471423.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1200",
  },
  {
    id: "design-systems",
    title: "Product Design Systems & UX",
    instructor: "Meera Nair",
    category: "Design",
    level: "Intermediate",
    duration: "22h",
    rating: 4.9,
    students: 11200,
    price: "₹5,999",
    trending: false,
    thumb: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  },
  {
    id: "backend-django",
    title: "Scalable Backends with Django",
    instructor: "Vikram Singh",
    category: "Web",
    level: "Intermediate",
    duration: "26h",
    rating: 4.7,
    students: 8900,
    price: "₹5,499",
    trending: false,
    thumb: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  },
  {
    id: "data-eng",
    title: "Data Engineering at Scale",
    instructor: "Sara DÃ­az",
    category: "AI & Data",
    level: "Advanced",
    duration: "34h",
    rating: 4.8,
    students: 6400,
    price: "₹7,999",
    trending: false,
    thumb: "https://images.unsplash.com/photo-1546146477-15a587cd3fcb?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  },
];

export const TRACKS = [
  { title: "Frontend Engineer", months: "5 months", courses: 6, color: "#4F8CFF" },
  { title: "AI / ML Engineer", months: "7 months", courses: 8, color: "#A78BFA" },
  { title: "Cloud & DevOps", months: "6 months", courses: 7, color: "#22D3EE" },
  { title: "Product Designer", months: "4 months", courses: 5, color: "#F472B6" },
];

export const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "CTO, FinEdge",
    text: "3CAPSTECH rebuilt our core platform in record time. The engineering quality and design polish are unmatched.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&cs=srgb&fm=jpg&q=85&w=300&h=300&fit=crop",
  },
  {
    name: "Marcus Lee",
    role: "VP Product, Northwind",
    text: "The learning platform upskilled our entire dev team. It genuinely feels like Netflix for engineers.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=faces&cs=srgb&fm=jpg&q=85&w=300&h=300&fit=crop",
  },
  {
    name: "Elena Rossi",
    role: "Founder, Lumen AI",
    text: "Their AI team delivered a production RAG system that our competitors still can't match. Extraordinary.",
    avatar: "https://images.pexels.com/photos/37148308/pexels-photo-37148308.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=300&h=300&fit=crop",
  },
  {
    name: "David Chen",
    role: "Alumni, AI Track",
    text: "I went from bootcamp to a senior AI role in 9 months. The mentorship changed my career trajectory.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=faces&cs=srgb&fm=jpg&q=85&w=300&h=300&fit=crop",
  },
];

export const INTERNSHIP_STEPS = [
  { step: "01", title: "Apply & Onboard", text: "Submit your profile and complete a guided skills assessment." },
  { step: "02", title: "Mentor Match", text: "Get paired with an industry mentor and a real client squad." },
  { step: "03", title: "Ship Projects", text: "Build production features across live 3CAPSTECH engagements." },
  { step: "04", title: "Certify & Place", text: "Earn a verified certificate and access our placement network." },
];

export const WHATSAPP = "https://wa.me/919000000000";
export const MAPS_EMBED =
  "https://www.google.com/maps?q=Hyderabad%20India&output=embed";
