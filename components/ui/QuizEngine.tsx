'use client'
import { useState, useEffect } from 'react'
import { Swords, Trophy } from 'lucide-react'
import QuizStep from './QuizStep'
import ReorderStep from './RearderStep'
import { IQuestion } from '@/types/question'
import { useRouter } from 'next/navigation'

interface IQuizEngine {
    questions: IQuestion[],
    targetName: string,
    creatorName: string
}

export default function QuizEngine({ questions, targetName, creatorName }: IQuizEngine) {
    const router = useRouter()

    const [step, setStep] = useState(-1) 
    const [currentIdx, setCurrentIdx] = useState(0)
    const [score, setScore] = useState(0)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [userWords, setUserWords] = useState<string[]>([])
    const [shuffledWords, setShuffledWords] = useState<string[]>([])

    const currentQuestion = questions[currentIdx]

    useEffect(() => {
        if (step === 0 && currentQuestion.type === 'reorder') {
            setUserWords([])
            setShuffledWords([...currentQuestion.content.words].sort(() => Math.random() - 0.5))
        }
    }, [currentIdx, step, currentQuestion])

    const handleAnswer = (correct: boolean) => {
        setIsCorrect(correct)
        if (correct) setScore(prev => prev + 1)
    }

    const handleNext = () => {
        setIsCorrect(null)
        setSelectedOption(null)
        setUserWords([])
        setShuffledWords([])

        if (currentIdx + 1 < questions.length) {
            setCurrentIdx(prev => prev + 1)
        } else {
            setStep(1)
        }
    }

    if (step === -1) {
        return (
            <div className="text-center text-white space-y-6">
                <Swords size={64} className="mx-auto text-pink-500" />
                <h1 className="text-4xl font-black">HALLO, {targetName.toUpperCase()}!</h1>
                <p className="text-indigo-200 italic">{creatorName} hat dich herausgefordert!</p>
                <button
                    onClick={() => setStep(0)}
                    className="bg-white text-black px-12 py-4 rounded-2xl font-bold"
                >
                    STARTEN
                </button>
            </div>
        )
    }

    if (step === 1) {
        return (
            <div className="text-center text-white space-y-4">
                <Trophy size={80} className="mx-auto text-yellow-400" />
                <h2 className="text-3xl font-bold">ERGEBNIS</h2>
                <p className="text-5xl font-black">{score} / {questions.length}</p>
                <button onClick={() => router.push('/')} className="underline pt-8">
                    Eigene Challenge erstellen
                </button>
            </div>
        )
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-4">
            <div className="flex justify-between text-white/50 text-xs">
                <span>{currentQuestion.topic}</span>
                <span>{currentIdx + 1} / {questions.length}</span>
            </div>

            <div className="bg-white/10 p-8 rounded-3xl shadow-lg w-full">
                {currentQuestion.type === 'quiz' ? (
                    <QuizStep
                        data={currentQuestion.content}
                        selectedOption={selectedOption}
                        isCorrect={isCorrect}
                        onAnswer={(opt: string) => {
                            setSelectedOption(opt)
                            handleAnswer(opt === currentQuestion.correct_answer)
                        }}
                    />
                ) : (
                    <ReorderStep
                        data={currentQuestion.content}
                        userWords={userWords}
                        shuffledWords={shuffledWords}
                        isCorrect={isCorrect}
                        onUpdate={(newWords, newShuffled) => {
                            setUserWords(newWords)
                            setShuffledWords(newShuffled)
                            if (newWords.length === currentQuestion.content.words.length) {
                                handleAnswer(
                                    JSON.stringify(newWords) === JSON.stringify(currentQuestion.correct_answer)
                                )
                            }
                        }}
                    />
                )}

                {isCorrect !== null && (
                    <div className="mt-6 space-y-2">
                        <div className="p-4 bg-indigo-500/20 rounded-xl text-sm">
                            💡 {currentQuestion.explanation}
                        </div>
                        <button
                            onClick={handleNext}
                            className="bg-white text-black px-6 py-2 rounded-xl font-bold"
                        >
                            Weiter
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}