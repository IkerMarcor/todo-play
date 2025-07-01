
export interface Task {
  id: number;
  name: string;
  description: string;
  priority: string;
  time: number;
  state: string;
  createdAt: number;
  type: string; // 'task' | 'break'
}
