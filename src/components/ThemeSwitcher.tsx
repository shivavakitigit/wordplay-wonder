
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useGame();

  return (
    <div className="flex items-center gap-2 justify-between">
      <Button
        variant={theme === "light" ? "default" : "outline"}
        size="sm"
        onClick={() => setTheme("light")}
        className="flex-1"
        aria-label="Light theme"
      >
        <Sun className="h-4 w-4 mr-2" />
        Light
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        size="sm"
        onClick={() => setTheme("dark")}
        className="flex-1"
        aria-label="Dark theme"
      >
        <Moon className="h-4 w-4 mr-2" />
        Dark
      </Button>
      <Button
        variant={theme === "system" ? "default" : "outline"}
        size="sm"
        onClick={() => setTheme("system")}
        className="flex-1"
        aria-label="System theme"
      >
        <Monitor className="h-4 w-4 mr-2" />
        System
      </Button>
    </div>
  );
}
