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
  skillName: string;
  teachers: Teacher[];
};

export interface MatchPage {
  id: string;
  name: string;
  status: 'pending' | 'sent' | 'received' | 'accepted';
  skill: string;
  avatarUrl?: string;
}