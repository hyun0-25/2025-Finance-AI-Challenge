export interface Schedule {
  id: number;
  date: string; // YYYY-MM-DD 형식
  title: string; // 필수
  time?: string; // 선택
  location?: string; // 선택
  repeatCycle?: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'; // 선택
  description?: string; // 선택
}

export interface AIChecklist {
  id: number;
  scheduleId: number;
  items: string[];
  createdAt: string;
}
