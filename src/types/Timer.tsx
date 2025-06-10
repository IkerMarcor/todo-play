// @/types/Timer.ts
export interface Timer {
  id: number;
  time: number;           // total duration in seconds
  elapsedTime: number;    // total elapsed time in seconds
  remainTime: number;     // remaining time in seconds
  isRunning: boolean;
  playedAt: number | null; // timestamp in ms when timer started/resumed
  isCompleted: boolean;
}