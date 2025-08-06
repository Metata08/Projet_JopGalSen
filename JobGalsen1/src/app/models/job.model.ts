export interface Job {
  id: string;
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
  postedDate: string | Date;
  urgent?: boolean;
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