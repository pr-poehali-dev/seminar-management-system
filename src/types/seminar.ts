export interface City {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  roleId: number;
  cityId: number;
  speciality: string;
}

export interface Seminar {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
  userId: number;
  status: 'application' | 'upcoming' | 'history';
  likes?: number;
}

export interface SeminarFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
  userId: number;
  status: 'application' | 'upcoming' | 'history';
}

export interface DatabaseData {
  cities: City[];
  roles: Role[];
  users: User[];
  seminars: Seminar[];
}
