/**
 * Modèle représentant un Conseils de conseil
 * Correspond au composant ConseilsComponent
 */
export interface Conseils {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

/**
 * Modèle représentant une catégorie d'Conseils
 */
export interface ConseilsCategory {
  name: string;
  count: number;
}

/**
 * Données mockées pour les Conseils
 */
export const MOCK_Conseils: Conseils[] = [
  {
    id: 1,
    title: "Comment réussir un entretien d'embauche au Sénégal",
    excerpt: "Découvrez les clés pour impressionner les recruteurs et décrocher le poste de vos rêves.",
    category: "Entretien",
    author: "Aminata Diallo",
    date: "15 Mars 2024",
    readTime: "5 min",
    image: "💼"
  },
  {
    id: 2,
    title: "Les compétences digitales les plus demandées en 2024",
    excerpt: "Analyse des compétences technologiques qui ouvrent le plus d'opportunités professionnelles.",
    category: "Compétences",
    author: "Moussa Kane",
    date: "12 Mars 2024",
    readTime: "7 min",
    image: "💻"
  },
  {
    id: 3,
    title: "Négocier son salaire : guide pratique",
    excerpt: "Stratégies et conseils pour obtenir la rémunération que vous méritez.",
    category: "Carrière",
    author: "Fatou Sall",
    date: "10 Mars 2024",
    readTime: "6 min",
    image: "💰"
  },
  {
    id: 4,
    title: "LinkedIn : optimiser son profil pour les recruteurs",
    excerpt: "Comment créer un profil LinkedIn attractif et augmenter sa visibilité professionnelle.",
    category: "Réseautage",
    author: "Omar Diop",
    date: "8 Mars 2024",
    readTime: "4 min",
    image: "🔗"
  }
];

/**
 * Catégories mockées pour les Conseilss
 */
export const MOCK_CATEGORIES: ConseilsCategory[] = [
  { name: "Entretien", count: 12 },
  { name: "Compétences", count: 18 },
  { name: "Carrière", count: 15 },
  { name: "Réseautage", count: 8 },
  { name: "Formation", count: 10 }
];