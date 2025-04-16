
import { useEffect, useState } from "react";

// Sound effect hook for game interactions
export function useSoundEffects() {
  const [initialized, setInitialized] = useState(false);
  const [sounds, setSounds] = useState<{
    correct: HTMLAudioElement | null;
    incorrect: HTMLAudioElement | null;
    click: HTMLAudioElement | null;
    complete: HTMLAudioElement | null;
  }>({
    correct: null,
    incorrect: null,
    click: null,
    complete: null,
  });

  // Initialize sounds
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Only create audio objects once
    if (!initialized) {
      const correctSound = new Audio("https://assets.mixkit.co/active_storage/sfx/1111/1111-preview.mp3");
      const incorrectSound = new Audio("https://assets.mixkit.co/active_storage/sfx/953/953-preview.mp3");
      const clickSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
      const completeSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2002/2002-preview.mp3");

      // Preload sounds
      correctSound.load();
      incorrectSound.load();
      clickSound.load();
      completeSound.load();

      // Set volume
      correctSound.volume = 0.3;
      incorrectSound.volume = 0.3;
      clickSound.volume = 0.2;
      completeSound.volume = 0.4;

      setSounds({
        correct: correctSound,
        incorrect: incorrectSound,
        click: clickSound,
        complete: completeSound,
      });

      setInitialized(true);
    }
  }, [initialized]);

  // Play sounds
  const playSound = (type: "correct" | "incorrect" | "click" | "complete") => {
    const sound = sounds[type];
    if (sound) {
      sound.currentTime = 0; // Reset to start
      sound.play().catch((e) => {
        // Ignore autoplay errors (browser policy)
        console.log("Audio play was prevented:", e);
      });
    }
  };

  return { playSound };
}
