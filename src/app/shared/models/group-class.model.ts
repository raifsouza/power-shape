export interface ClassScheduleSlot {
  days: string;
  time: string;
}

export interface GroupClassItem {
  id: string;
  name: string;
  description: string;
  schedules: ClassScheduleSlot[];
  instructor?: string;
  featured?: boolean;
}