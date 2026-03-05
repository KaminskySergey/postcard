'use client'
import { IQuestion } from '@/types/question'
import { cn } from '@/utils/utils'
import { useState } from 'react'

interface IQuizStep {
  data: IQuestion
  onAnswer: (isCorrect: boolean) => void
}


export default function QuizStep({ data, onAnswer }: IQuizStep) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleClick = (opt: string) => {
    if (isSubmitted) return;
    setSelectedAnswer(opt);
    setIsSubmitted(true);
    const correct = opt === data.correct_answer;
    setIsCorrect(correct);
    onAnswer(correct);
  };

  const [before, after] = (data.content.text || "").split("______");

  return (
    <div className="w-full max-w-md mx-auto space-y-4 animate-in fade-in duration-300">
      <div className="bg-white/5 p-5 rounded-2xl border border-white/10 shadow-lg text-center">
        <p className="text-lg text-white leading-snug">
          {before}
          <span className={cn(
            "mx-1 border-b-2 px-1 transition-all font-bold",
            !isSubmitted ? "text-sky-400 border-sky-500/50" : 
            isCorrect ? "text-green-400 border-green-500" : "text-red-400 border-red-500"
          )}>
            {selectedAnswer || "____"}
          </span>
          {after}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {data.content.options.map((el, idx) => {
          const isSelected = el === selectedAnswer;
          const isRight = el === data.correct_answer;

          return (
            <button
              key={idx}
              onClick={() => handleClick(el)}
              disabled={isSubmitted}
              className={cn(
                "p-3 rounded-xl text-sm font-semibold border-b-2 transition-all active:border-b-0 active:translate-y-px",
                {
                  "bg-white/10 border-white/20 text-white": !isSubmitted,
                  "bg-green-500 border-green-700 text-white": isSubmitted && isRight,
                  "bg-red-500 border-red-700 text-white": isSubmitted && isSelected && !isRight,
                  "opacity-30 border-transparent": isSubmitted && !isRight && !isSelected
                }
              )}
            >
              {el}
            </button>
          );
        })}
      </div>
    </div>
  );
}