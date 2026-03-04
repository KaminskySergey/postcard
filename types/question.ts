interface QuizContent {
    text: string;
    options: string[];
  }
  
  interface ReorderContent {
    words: string[];
  }
  
  export interface IQuestion {
    id: string;
    topic: string;
    type: 'quiz' | 'reorder'; 
    explanation: string;
    content: QuizContent & ReorderContent; 
    correct_answer: string | string[];
  }