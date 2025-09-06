  export type Skill = {
    id: string;
    name: string;
    level: 'Básico' | 'Intermediário' | 'Avançado';
  };

  export type Experience = {
    id: string;
    company: string;
    role: string;
    periodStart: string;
    periodEnd?: string;
    current?: boolean;
    description?: string;
  };

  export type CVState = {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    github?: string;
    summary: string;
    skills: Skill[];
    experiences: Experience[];
  };

  export type PersonalInfoData = {
    name: string;
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
    resume: string;
  };
