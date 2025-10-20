export interface Seminar {
  id: number;
  title: string;
  speaker: string;
  speakerDescription?: string;
  date: string;
  phone: string;
  likes?: number;
  status: 'future' | 'history' | 'request';
  type: 'future' | 'history' | 'request';
}

export interface SeminarFormData {
  title: string;
  speaker: string;
  speakerDescription?: string;
  date: string;
  phone: string;
  type: 'future' | 'history' | 'request';
}
