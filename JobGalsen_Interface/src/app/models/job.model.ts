export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string;
  benefits: string;
  deadline: string;
  postedDate: string;
  urgent?: boolean;
  skills: string[];
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  position: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  score: number;
  appliedAt: string;
  recruiterId: string;
  jobId: string;
  cvUrl?: string;
  notes?: string;
  interviewDate?: string;
  skills?: string[];
  experience?: {
    title: string;
    company: string;
    duration: string;
  }[];
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: string | Date;
  status: 'interview' | 'reviewed' | 'pending' | 'accepted' | 'rejected';
  interviewDate?: string | Date;
  notes?: string;
}

export interface Stats {
  applications: number;
  profileViews: number;
  savedJobs: number;
  interviews: number;
  applicationRate?: number;
  interviewRate?: number;
  lastUpdated?: string | Date;
  weeklyProgress?: {
    applications: number;
    profileViews: number;
    interviews: number;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  cvUrl?: string;
}

interface Experience {
  title: string;
  company: string;
  duration: string;
  description?: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Interview {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  date: string;
  location: string;
  onlineMeetingUrl?: string;
}


/**
 * Modèle représentant une offre d'emploi
 * Correspond au composant OffresComponent
 */


/**
 * Données mockées pour les offres d'emploi
 */
export const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: "Développeur Full Stack",
    company: "TechSen",
    location: "Dakar, Sénégal",
    type: "CDI",
    category: "Développement",
    salary: "800 000 - 1 200 000 FCFA",
    experience: "3-5 ans",
    description: "Nous recherchons un développeur full stack expérimenté pour rejoindre notre équipe. Vous serez responsable du développement et de la maintenance d'applications web modernes.",
    requirements: "Diplôme en informatique, maîtrise de React et Node.js, expérience avec les bases de données NoSQL",
    benefits: "Mutuelle santé, télétravail partiel, formation continue, primes de performance",
    deadline: "2024-04-15",
    postedDate: "2024-03-10",
    urgent: false,
    skills: ["React", "Node.js", "MongoDB", "TypeScript", "AWS"]
  },
  {
    id: 2,
    title: "Chef de Projet Digital",
    company: "Digital Solutions",
    location: "Thiès, Sénégal",
    type: "CDI",
    category: "Gestion de Projet",
    salary: "1 000 000 - 1 500 000 FCFA",
    experience: "5-8 ans",
    description: "Pilotage de projets digitaux et coordination d'équipes multidisciplinaires. Gestion du budget et des délais.",
    requirements: "Master en gestion de projet, certification Agile/Scrum, expérience en gestion d'équipe",
    benefits: "Voiture de fonction, bonus annuel, assurance groupe, formation certifiante",
    deadline: "2024-04-20",
    postedDate: "2024-03-12",
    urgent: false,
    skills: ["Gestion de projet", "Agile", "Leadership", "Jira", "Budgeting"]
  },
  {
    id: 3,
    title: "Analyste Marketing Digital",
    company: "MarketPro",
    location: "Dakar, Sénégal",
    type: "CDD",
    category: "Marketing",
    salary: "600 000 - 900 000 FCFA",
    experience: "2-4 ans",
    description: "Analyse des performances marketing et optimisation des campagnes digitales. Reporting et recommandations stratégiques.",
    requirements: "Bac+4 en marketing, expérience avec les outils analytics, maîtrise des réseaux sociaux",
    benefits: "Télétravail, tickets restaurant, équipement fourni, horaires flexibles",
    deadline: "2024-04-10",
    postedDate: "2024-03-08",
    urgent: true,
    skills: ["Google Analytics", "SEO", "Social Media", "Data Analysis", "Google Ads"]
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataTech Africa",
    location: "Dakar, Sénégal",
    type: "CDI",
    category: "Data Science",
    salary: "1 200 000 - 1 800 000 FCFA",
    experience: "4-6 ans",
    description: "Développement de modèles prédictifs et analyse de données complexes pour optimiser les processus business.",
    requirements: "PhD ou Master en Data Science, maîtrise Python/R, expérience en machine learning",
    benefits: "Recherche académique encouragée, conférences internationales, environnement innovant",
    deadline: "2024-05-01",
    postedDate: "2024-03-15",
    urgent: false,
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Data Visualization"]
  }
];