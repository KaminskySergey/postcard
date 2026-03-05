'use client'
import { IQuestion } from '@/types/question'
import { cn } from '@/utils/utils'
import { useState, useEffect } from 'react'
interface IReorderStep {
    data: IQuestion
    onAnswer: (isCorrect: boolean) => void
}


export default function ReorderStep({ data, onAnswer }: IReorderStep) {
    const [shuffled, setShuffled] = useState([...data.content.words].sort(() => Math.random() - 0.5));
    const [selected, setSelected] = useState<string[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const toggleWord = (word: string, index: number, isFromAvailable: boolean) => {
        if (isSubmitted) return;
        if (isFromAvailable) {
            setSelected(prev => [...prev, word]);
            setShuffled(prev => prev.filter((_, i) => i !== index));
        } else {
            setShuffled(prev => [...prev, word]);
            setSelected(prev => prev.filter((_, i) => i !== index));
        }
    };

    useEffect(() => {
        if (shuffled.length === 0 && selected.length > 0 && !isSubmitted) {
            const correctAnswer = Array.isArray(data.correct_answer)
                ? data.correct_answer.join(" ").trim()
                : String(data.correct_answer).trim();

            const userSentence = selected.join(" ").trim();

            const isCorrect = userSentence === correctAnswer;

            setIsSubmitted(true);
            onAnswer(isCorrect);
        }
    }, [shuffled, selected, data.correct_answer, isSubmitted, onAnswer]);

    const correctAnswerStr = Array.isArray(data.correct_answer)
        ? data.correct_answer.join(" ").trim()
        : String(data.correct_answer || "").trim();

    const isCorrect = isSubmitted && selected.join(" ").trim() === correctAnswerStr;

    return (
        <div className="w-full flex flex-col items-center gap-8 animate-in fade-in duration-500">
            <div className={cn(
                "w-full min-h-37.5 p-6 rounded-3xl border-b-4 transition-all flex flex-wrap gap-3 content-start",
                isSubmitted ? (isCorrect ? "bg-green-500/20 border-green-600" : "bg-red-500/20 border-red-600") : "bg-white/5 border-white/10 shadow-inner"
            )}>
                {selected.map((word, i) => (
                    <button key={i} onClick={() => toggleWord(word, i, false)} disabled={isSubmitted}
                        className={cn("px-5 py-2 rounded-xl font-bold text-lg shadow-md transition-all",
                            isSubmitted ? (isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white") : "bg-sky-500 text-white border-b-4 border-sky-700 active:border-0")}>
                        {word}
                    </button>
                ))}
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
                {shuffled.map((word, i) => (
                    <button key={i} onClick={() => toggleWord(word, i, true)} disabled={isSubmitted}
                        className="px-5 py-2 rounded-xl font-bold text-lg bg-white text-slate-800 border-b-4 border-slate-300 hover:bg-slate-50 disabled:opacity-0">
                        {word}
                    </button>
                ))}
            </div>
        </div>
    );
}







// console.log(data,)
//     const handleWordClick = (word: string, index: number) => {
//         if (isCorrect !== null) return

//         const newWords = [...userWords, word]
//         const remainingWords = shuffledWords.filter((_, i) => i !== index)

//         onUpdate(newWords, remainingWords)
//     }

//     const reset = () => {
//         const shuffled = [...data.words].sort(() => Math.random() - 0.5)
//         onUpdate([], shuffled)
//     }
// console.log(userWords)
//     return (
//         <div className="w-full space-y-6">
//             <div
//                 className={`w-full p-5 rounded-3xl bg-black/30 border-2 border-dashed flex flex-wrap gap-2 justify-start ${isCorrect === true
//                         ? 'border-green-500 bg-green-500/10'
//                         : isCorrect === false
//                             ? 'border-red-500 bg-red-500/10'
//                             : 'border-white/10'
//                     }`}
//             >
//                 {userWords.map((w, i) => (
//                     <span
//                         key={i}
//                         className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-xl font-bold"
//                     >
//                         {w}
//                     </span>
//                 ))}
//             </div>

//             <div className="flex flex-wrap gap-2 justify-center">
//                 {shuffledWords.map((word, i) => (
//                     <button
//                         key={i}
//                         onClick={() => handleWordClick(word, i)}
//                         className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-2xl border border-white/10"
//                     >
//                         {word}
//                     </button>
//                 ))}
//             </div>

//             <button
//                 onClick={reset}
//                 className="flex items-center gap-2 text-xs text-white/40 mx-auto"
//             >
//                 <RotateCcw size={14} /> Zurücksetzen
//             </button>
//         </div>
//     )