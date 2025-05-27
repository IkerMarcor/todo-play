import useTaskStore from "@/store/useTaskStore";
import { useState } from "react";
import { set } from "react-hook-form";

export default function usePlay() {
  const { tasks } = useTaskStore();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isPlayComplete, setIsPlayComplete] = useState(false);

  const currentTask = tasks[currentTaskIndex];

  const startTask = () => {
    if (!currentTask) {
        setIsPlayComplete(true);
        return;
    }
    // Logic to start playing the current task  
    console.log(`Starting task: ${currentTask.name}`);
    
  }

};