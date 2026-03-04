'use client'
import { Container } from '@/components/ui/Container'
import { Check, Copy, Send, Sparkles } from 'lucide-react'
import { useParams } from 'next/navigation'
import {  useState } from 'react'

export default function SharePage() {
    const [copied, setCopied] = useState(false)
    const params = useParams()
  
    
    const id = params?.id as string
    const battleUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/battle/${id}`
    const copyToClipboard = () => {
        navigator.clipboard.writeText(battleUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

   

    return (
        <section >
            <Container>
                <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl text-center">
                    <div className="bg-green-400/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-400/30">
                        <Sparkles className="text-green-300" size={32} />
                    </div>

                    <h1 className="text-2xl font-bold text-white mb-2">Battle ist bereit!</h1>
                    <p className="text-indigo-100 mb-8">Kopiere den Link oder sende ihn direkt über Telegram an deinen Freund.</p>

                    <div className="space-y-4">
                        <button
                            onClick={copyToClipboard}
                            className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-4 px-6 rounded-2xl flex items-center justify-between transition-all"
                        >
                            <span className="truncate mr-4 text-sm opacity-80">{battleUrl}</span>
                            {copied ? <Check className="text-green-400" size={20} /> : <Copy size={20} />}
                        </button>

                    </div>
                </div>
            </Container>
        </section>
    )
}