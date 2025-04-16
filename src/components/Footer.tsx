
import { Heart } from "lucide-react";
import { QuoteBox } from "./QuoteBox";

export function Footer() {
  return (
    <footer className="w-full py-6 mt-auto">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="mb-4">
          <QuoteBox />
        </div>
        <div className="flex justify-center text-sm text-muted-foreground pt-4 border-t">
          <p className="flex items-center">
            Made with <Heart className="h-3 w-3 mx-1 text-destructive" /> for language learners
          </p>
        </div>
      </div>
    </footer>
  );
}
