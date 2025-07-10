import { useEffect } from "react";
import useTaskStore from "@/store/useTaskStore";
import useBreakStore from "@/store/useBreakStore";
import useMergeStore from "@/store/useMergeStore";

export default function useMergeSync() {
  useEffect(() => {
    const unsubTask = useTaskStore.subscribe(() => {
      useMergeStore.getState().merge();
    });

    const unsubBreak = useBreakStore.subscribe(() => {
      useMergeStore.getState().merge();
    });

    // Ensure initial sync
    useMergeStore.getState().merge();

    return () => {
      unsubTask();
      unsubBreak();
    };
  }, []);
}
