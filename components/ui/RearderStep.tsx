'use client'
import { RotateCcw } from 'lucide-react'

type ReorderStepProps = {
    data: {
        words: string[]
    }
    userWords: string[]
    shuffledWords: string[]
    isCorrect: boolean | null
    onUpdate: (newWords: string[], newShuffled: string[]) => void
}

export default function ReorderStep({
    data,
    userWords,
    shuffledWords,
    isCorrect,
    onUpdate
}: ReorderStepProps) {
    console.log(data,)
    const handleWordClick = (word: string, index: number) => {
        if (isCorrect !== null) return

        const newWords = [...userWords, word]
        const remainingWords = shuffledWords.filter((_, i) => i !== index)

        onUpdate(newWords, remainingWords)
    }

    const reset = () => {
        const shuffled = [...data.words].sort(() => Math.random() - 0.5)
        onUpdate([], shuffled)
    }
console.log(userWords)
    return (
        <div className="w-full space-y-6">
            <div
                className={`w-full p-5 rounded-3xl bg-black/30 border-2 border-dashed flex flex-wrap gap-2 justify-start ${isCorrect === true
                        ? 'border-green-500 bg-green-500/10'
                        : isCorrect === false
                            ? 'border-red-500 bg-red-500/10'
                            : 'border-white/10'
                    }`}
            >
                {userWords.map((w, i) => (
                    <span
                        key={i}
                        className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-xl font-bold"
                    >
                        {w}
                    </span>
                ))}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
                {shuffledWords.map((word, i) => (
                    <button
                        key={i}
                        onClick={() => handleWordClick(word, i)}
                        className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-2xl border border-white/10"
                    >
                        {word}
                    </button>
                ))}
            </div>

            <button
                onClick={reset}
                className="flex items-center gap-2 text-xs text-white/40 mx-auto"
            >
                <RotateCcw size={14} /> Zurücksetzen
            </button>
        </div>
    )
}