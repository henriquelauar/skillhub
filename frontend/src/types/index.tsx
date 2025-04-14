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
  