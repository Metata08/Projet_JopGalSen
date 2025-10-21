/**
 * Modèle représentant un membre de l'équipe
 * Correspond au composant AProposComponent
 */
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

/**
 * Modèle représentant une valeur d'entreprise
 */
export interface CompanyValue {
  icon: string;
  title: string;
  description: string;
}

/**
 * Données mockées pour l'équipe
 */
export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Daouda FICKOU",
    role: "Developpeur Front-End",
    bio: "Passionné par les technologies web, Daouda est responsable de l'interface utilisateur et de l'expérience utilisateur de notre plateforme.",
    avatar: "👨‍💼"
  },
  {
    name: "Mame Anta BATHILY",
    role: "Developpeuse Back-End",
    bio: "Experte en bases de données et en architecture serveur, Mame Anta assure la robustesse et la sécurité de notre application.",
    avatar: "👩‍💻"
  },
  {
    name: "Mouhamadou GUEYE",
    role: "Developpeur Back-End",
    bio: "Spécialiste des API et des services web, Mouhamadou travaille sur l'intégration des systèmes et la performance du back-end.",
    avatar: "👨‍💼"
  }
];

/**
 * Valeurs mockées pour l'entreprise
 */
export const MOCK_VALUES: CompanyValue[] = [
  {
    icon: "🎯",
    title: "Excellence",
    description: "Nous visons l'excellence dans tout ce que nous faisons pour offrir la meilleure expérience à nos utilisateurs."
  },
  {
    icon: "👥",
    title: "Inclusivité",
    description: "Nous croyons que chacun mérite sa chance et nous œuvrons pour un marché de l'emploi plus inclusif."
  },
  {
    icon: "🏆",
    title: "Innovation",
    description: "Nous innovons constamment pour proposer des solutions modernes et efficaces."
  },
  {
    icon: "❤️",
    title: "Impact Social",
    description: "Notre mission va au-delà du business : nous voulons contribuer au développement du Sénégal."
  }
];