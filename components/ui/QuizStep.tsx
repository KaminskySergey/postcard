'use client'
import { CheckCircle2, XCircle } from 'lucide-react'

export default function QuizStep({ data, onAnswer, selectedOption, isCorrect }: any) {
  return (
    <div className="space-y-6">
      <p className="text-white text-lg leading-relaxed bg-black/20 p-6 rounded-2xl border border-white/5">
        {data.text.split('______').map((part: string, i: number) => (
          <span key={i}>
            {part}
            {i === 0 && (
              <span className={`mx-2 border-b-2 px-2 transition-colors ${
                isCorrect === true ? 'text-green-400 border-green-400' : 
                isCorrect === false ? 'text-red-400 border-red-400' : 'text-pink-400 border-pink-500 italic'
              }`}>
                {selectedOption || '____'}
              </span>
            )}
          </span>
        ))}
      </p>
      <div className="grid grid-cols-1 gap-3">
        {data.options.map((opt: string) => (
          <button
            key={opt}
            disabled={!!selectedOption}
            onClick={() => onAnswer(opt)}
            className={`p-4 rounded-2xl font-bold text-left transition-all flex justify-between items-center ${
              selectedOption === opt 
              ? (isCorrect ? 'bg-green-500 shadow-lg scale-[1.02]' : 'bg-red-500') 
              : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
            }`}
          >
            {opt}
            {selectedOption === opt && (isCorrect ? <CheckCircle2 size={20}/> : <XCircle size={20}/>)}
          </button>
        ))}
      </div>
    </div>
  )
}