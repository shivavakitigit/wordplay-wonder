
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

// Sample quotes
const quotes = [
  "Learning is a treasure that will follow its owner everywhere.",
  "The only way to learn a language is to practice it.",
  "The more that you read, the more things you will know.",
  "Words are, in my not-so-humble opinion, our most inexhaustible source of magic.",
  "Language is the road map of a culture. It tells you where its people come from and where they are going.",
  "A different language is a different vision of life.",
  "Knowledge of languages is the doorway to wisdom.",
  "The limits of my language mean the limits of my world.",
  "One language sets you in a corridor for life. Two languages open every door along the way.",
  "Language is the dress of thought.",
];

export function QuoteBox() {
  const [currentQuote, setCurrentQuote] = useState("");
  
  useEffect(() => {
    // Set initial quote
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    
    // Change quote every 2 minutes
    const intervalId = setInterval(() => {
      let newQuote;
      do {
        newQuote = quotes[Math.floor(Math.random() * quotes.length)];
      } while (newQuote === currentQuote); // Ensure we get a different quote
      
      setCurrentQuote(newQuote);
    }, 120000); // 2 minutes
    
    return () => clearInterval(intervalId);
  }, [currentQuote]);
  
  return (
    <Card className="glass-card animate-pulse-subtle">
      <CardContent className="p-4">
        <div className="flex items-start gap-2">
          <Quote className="h-5 w-5 mt-1 flex-shrink-0 text-primary" />
          <p className="italic text-sm">{currentQuote}</p>
        </div>
      </CardContent>
    </Card>
  );
}
