/**
 * Modèle représentant une entreprise partenaire
 * Correspond au composant EntreprisesComponent
 */
export interface Entreprise {
  id: number;
  name: string;
  logo: string;
  location: string;
  sector: string;
  employees: string;
  rating: number;
  openJobs: number;
  description: string;
}

/**
 * Modèle pour les statistiques d'entreprise
 */
export interface EntrepriseStats {
  value: string;
  label: string;
}

/**
 * Données mockées pour les entreprises
 */
export const MOCK_Entreprises: Entreprise[] = [
  {
    id: 1,
    name: "TechSen",
    logo: "🏢",
    location: "Dakar, Sénégal",
    sector: "Technologie",
    employees: "50-300",
    rating: 4.5,
    openJobs: 8,
    description: "Leader de la transformation digitale au Sénégal, spécialisé dans le développement d'applications web et mobiles."
  },
  {
    id: 2,
    name: "Digital Solutions",
    logo: "💻",
    location: "Thiès, Sénégal",
    sector: "Conseil Digital",
    employees: "20-50",
    rating: 4.2,
    openJobs: 5,
    description: "Agence de conseil en transformation digitale accompagnant les entreprises dans leur évolution."
  },
  {
    id: 3,
    name: "BankTech Africa",
    logo: "🏦",
    location: "Dakar, Sénégal",
    sector: "Fintech",
    employees: "100-200",
    rating: 4.7,
    openJobs: 12,
    description: "Pionnier des solutions bancaires digitales en Afrique de l'Ouest."
  },
  {
    id: 4,
    name: "AgriSmart",
    logo: "🌱",
    location: "Kaolack, Sénégal",
    sector: "AgriTech",
    employees: "30-50",
    rating: 4.3,
    openJobs: 6,
    description: "Solutions technologiques innovantes pour l'agriculture moderne au Sénégal."
  }
];

/**
 * Statistiques mockées pour les entreprises
 */
export const MOCK_Entreprise_STATS: EntrepriseStats[] = [
  { value: '500+', label: 'Entreprises partenaires' },
  { value: '95%', label: 'Taux de satisfaction' },
  { value: '2000+', label: 'Postes pourvus' },
  { value: '50+', label: 'Secteurs d\'activité' }
];