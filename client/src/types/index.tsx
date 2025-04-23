export interface Skill {
  id: number;
  name: string;
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