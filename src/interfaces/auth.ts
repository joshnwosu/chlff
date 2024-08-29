// Base interface for additional data common to all roles
export interface BaseAdditionalData {
  email: string;
  fullName: string;
  country: string;
  password: string;
  confirmPassword: string;
}

// Interface for School registration
export interface SchoolAdditionalData extends BaseAdditionalData {
  schoolName: string;
}

// Interface for Teacher registration
export interface TeacherAdditionalData extends BaseAdditionalData {
  surname: string;
}

// Interface for Parent registration
export interface ParentAdditionalData extends BaseAdditionalData {
  firstName: string;
  surname: string;
  childrenNames: [string, string?, string?, string?]; // Up to four names, optional
}

// Interface for Tutor registration
export interface TutorAdditionalData extends BaseAdditionalData {
  surname: string;
}

// Interface for Student onboarding
export interface StudentAdditionalData {
  username: string;
  nickname?: string; // Optional
  grade: string;
  password: string;
}

// Interface for Student login
export interface StudentLoginData {
  username: string;
  schoolName: string;
  password: string;
}
