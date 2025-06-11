import { toast } from "sonner";
import { Notification } from "@/types/Notification";

export function useNotificationToast() {
  const showToastWithSound = (
    type: Notification,
    message: string,
    opts = {}
  ) => {
    let soundPath = "/notification_default.wav";
    let showToast = () => toast(message, opts);

    switch (type) {
      case "success":
        soundPath = "/notification_success.wav";
        showToast = () => toast.success(message, opts);
        break;
      case "error":
        soundPath = "/notification_error.wav";
        showToast = () => toast.error(message, opts);
        break;
      case "warning":
        soundPath = "/notification_warning.mp3";
        showToast = () => toast.warning(message, opts);
        break;
      case "info":
        soundPath = "/notification_default.wav";
        showToast = () => toast.info(message, opts);
        break;
      case "default":
      default:
        break;
    }

    if (type !== "default") {
      const sound = new Audio(soundPath);
      sound.play().catch((e) => console.error("Audio playback failed", e));
    }

    showToast();
  };

  return showToastWithSound;
}
