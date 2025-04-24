export interface Skill {
  id: number;
  name: string;
  isLearning: boolean;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  skills?: Skill[];
  skillsToLearn?: Skill[];
}
export interface SkillFormProps {
  skillToEdit?: Skill;
  onSkillAdded: () => void;
  onClose: () => void;
  defaultType?: 'domino' | 'aprender';
}

export type SkillWithOwner = Skill & {
  owner: {
    id: number;
    name: string;
    email: string;
  };
};

export interface PopularSkills {
  name: string;
  count: number;
  type: 'domino' | 'aprender';
}

export interface Teacher {
  id: number;
  name: string;
  email: string;
};

export interface Match {
  id: string;
  skillName: string;
  senderId: number;
  receiverId: number;
  teachers: Teacher[];
  status: 'PENDENTE' | 'ACEITO' | 'RECUSADO';
}

export interface APIMatch {
  receiverId: number;
  skill: {
    name: string;
  };
}

export interface SearchResult {
  userId: number;
  name: string;
  email: string;
  skillName: string;
}