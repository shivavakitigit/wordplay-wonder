
import { useState, useEffect } from "react";
import { Question } from "@/contexts/GameContext";

interface ApiQuestion {
  questionId: string;
  question: string;
  questionType: string;
  answerType: string;
  options: string[];
  correctAnswer: string[];
}

interface ApiResponse {
  status: string;
  data: {
    testId: string;
    questions: ApiQuestion[];
  };
  message: string;
  activity: {
    id: string;
    userId: string;
    type: string;
    coinType: string;
    coins: number;
    description: string;
    createdAt: string;
  };
}

// Function to convert API format to our game context format
const convertToGameQuestions = (apiQuestions: ApiQuestion[]): Question[] => {
  return apiQuestions.map((q, index) => {
    // Extract blanks from the question
    const blankCount = (q.question.match(/____________/g) || []).length;
    const blanks = Array.from({ length: blankCount }).map((_, i) => ({
      id: `b${i+1}`,
      correctOptionId: `o${i+1}`,
      selectedOptionId: null,
    }));

    // Create options for each blank position
    const options = q.options.map((text, i) => ({
      id: `o${i+1}`,
      text,
      isCorrect: q.correctAnswer[i] === text,
    }));

    return {
      id: `q${index+1}`,
      text: q.question,
      blanks,
      options,
    };
  });
};

export const useQuestionData = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/data/questions.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        
        const data: ApiResponse = await response.json();
        
        if (data.status === "SUCCESS" && data.data.questions) {
          const gameQuestions = convertToGameQuestions(data.data.questions);
          setQuestions(gameQuestions);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return { questions, loading, error };
};
