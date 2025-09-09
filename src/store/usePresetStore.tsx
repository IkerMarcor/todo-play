import { create } from "zustand";

interface Preset {
  id: number;
  name: string;
  description: string;
  priority: string;
  time: number;
  type: "preset";
}

interface PresetStore {
  presets: Preset[];
  createPreset: (
    name: string,
    description: string,
    priority: string,
    time: number,
    locked: boolean
  ) => void;
}

const usePresetStore = create<PresetStore>()((set, get) => ({
      presets: [] as Preset[],

      createPreset: (name, description, priority, time) => {
        const date = Date.now();
        const newPreset: Preset = {     
          id: date,
          name,
          description,
          priority,
          time,
          type: "preset",
        };
        set({ presets: [...get().presets, newPreset] });
      },
    }));

export default usePresetStore;