
import { LanguageSelector } from "./LanguageSelector";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Achievements } from "./Achievements";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useGame } from "@/contexts/GameContext";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const GameHeader = () => {
  const { score } = useGame();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-primary/10 backdrop-blur-md py-4">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">Word Master</span>
            <div className="hidden md:block bg-primary/20 px-3 py-1 rounded-full text-sm">
              Score: {score}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">{user?.username}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout}
              className="flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
        
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full mb-2 flex items-center justify-center">
              {isOpen ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
              <span>Game Controls</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-4">
              <div className="p-3 bg-card rounded-lg">
                <h3 className="font-medium mb-2">Language Selection</h3>
                <LanguageSelector />
              </div>
              
              <div className="p-3 bg-card rounded-lg">
                <h3 className="font-medium mb-2">Theme Settings</h3>
                <ThemeSwitcher />
              </div>
              
              <div className="p-3 bg-card rounded-lg">
                <h3 className="font-medium mb-2">Your Achievements</h3>
                <Achievements />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </header>
  );
};
