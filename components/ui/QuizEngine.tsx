'use client'
import { useState } from 'react'
import { Swords, Trophy } from 'lucide-react'
import QuizStep from './QuizStep'
import ReorderStep from './ReorderStep'
import { IQuestion } from '@/types/question'
import { useRouter } from 'next/navigation'
import { cn } from '@/utils/utils'
import ProgressBar from './ProgressBar'

interface IQuizEngine {
    questions: IQuestion[],
    targetName: string,
    creatorName: string
}

export default function QuizEngine({ questions, targetName, creatorName }: IQuizEngine) {
    const [step, setStep] = useState(-1)
    const [currentIdx, setCurrentIdx] = useState(0)
    const [score, setScore] = useState(0)
    const [answered, setAnswered] = useState(false)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

    const router = useRouter()
    const currentQuestion = questions[currentIdx]

    const handleAnswer = (correct: boolean) => {
        if (answered) return
        setAnswered(true)
        setIsCorrect(correct)
        if (correct) setScore(prev => prev + 1)
    }

    const handleNext = () => {
        setAnswered(false)
        setIsCorrect(null)
        if (currentIdx < questions.length - 1) {
            setCurrentIdx(prev => prev + 1)
        } else {
            setStep(1) 
        }
    }

    if (step === -1) {
        return (
            <div className="text-center text-white space-y-6 animate-in fade-in zoom-in duration-500">
                <Swords size={64} className="mx-auto text-pink-500 animate-bounce" />
                <h1 className="text-4xl font-black italic">HALLO, {targetName.toUpperCase()}!</h1>
                <p className="text-indigo-200">{creatorName} hat dich herausgefordert!</p>
                <button
                    onClick={() => setStep(0)}
                    className="bg-white text-black px-12 py-4 rounded-2xl font-bold shadow-[0_5px_0_rgb(200,200,200)] active:translate-y-1 active:shadow-none transition-all"
                >
                    STARTEN
                </button>
            </div>
        )
    }

    if (step === 1) {
        return (
            <div className="text-center text-white space-y-8 animate-in slide-in-from-bottom-10 duration-500">
                <Trophy size={100} className="mx-auto text-yellow-400" />
                <div className="space-y-2">
                    <h2 className="text-4xl font-black text-pink-500">ERGEBNIS</h2>
                    <p className="text-6xl font-black">{score} / {questions.length}</p>
                </div>
                <div className="space-y-4 pt-10">
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-white text-black py-4 rounded-2xl font-bold"
                    >
                        NOCHMAL SPIELEN
                    </button>
                    <button onClick={() => router.push('/')} className="block w-full text-indigo-300 underline font-medium">
                        Eigene Challenge erstellen
                    </button>
                </div>
            </div>
        )
    }

 
    return (
        <div className="w-full space-y-8">
            <ProgressBar current={currentIdx} total={questions.length}/>

            <div className="relative">
                {currentQuestion.type === "quiz" && (
                    <QuizStep key={currentIdx} data={currentQuestion} onAnswer={handleAnswer} />
                )}
                {currentQuestion.type === "reorder" && (
                    <ReorderStep key={currentIdx} data={currentQuestion} onAnswer={handleAnswer} />
                )}
            </div>

            {answered && (
                <div className="space-y-4 animate-in slide-in-from-bottom-5 duration-300">
                    {!isCorrect && currentQuestion.explanation && (
                        <div className="p-5 bg-red-500/20 border border-red-500/30 rounded-2xl text-white text-sm">
                            <span className="font-bold block mb-1 text-red-400">💡 Hinweis:</span>
                            {currentQuestion.explanation}
                        </div>
                    )}

                    <button
                        onClick={handleNext}
                        className={cn(
                            "w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg",
                            isCorrect
                                ? "bg-green-500 text-white shadow-green-900/40"
                                : "bg-white text-black"
                        )}
                    >
                        {currentIdx < questions.length - 1 ? "Weiter" : "Ergebnis sehen"}
                    </button>
                </div>
            )}
        </div>
    )

}







