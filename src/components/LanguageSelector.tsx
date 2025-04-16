
import { useGame } from "@/contexts/GameContext";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

export function LanguageSelector() {
  const { language, setLanguage } = useGame();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4" />
      <Select value={language} onValueChange={(val: any) => setLanguage(val)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="telugu">Telugu</SelectItem>
            <SelectItem value="hindi">Hindi</SelectItem>
            <SelectItem value="french">French</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
