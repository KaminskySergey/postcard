'use client'
import { createBattleAction } from "@/actions/createBattle";
import { Container } from "@/components/ui/Container";
import { Swords, Sparkles, User, Send } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [targetName, setTargetName] = useState('')
  const [creatorName, setCreatorName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreateBattle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    formData.append('creatorName', creatorName);
    formData.append('targetName', targetName);

    try {
      await createBattleAction(formData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="">
      <div className="absolute top-10 left-10 animate-pulse text-white/20"><Sparkles size={40} /></div>
      <div className="absolute bottom-10 right-10 animate-bounce text-white/20"><Swords size={60} /></div>
      <Container>

        <div className=" bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
              <Swords className="text-white" size={40} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Deutsch-Battle</h1>
            <p className="text-indigo-100">Fordere deine Freunde heraus und teste ihr Wissen!</p>
          </div>

          <form onSubmit={handleCreateBattle} className="space-y-6">
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-white/60" size={20} />
              <input
                type="text"
                name="creatorName"
                placeholder="Dein Name (z. B. Anna)"
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Send className="absolute left-4 top-3.5 text-white/60" size={20} />
              <input
                type="text"
                name="targetName"
                placeholder="Für wen? (z. B. Alex)"
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                value={targetName}
                onChange={(e) => setTargetName(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-pink-500 to-orange-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "Wird erstellt..." : "Battle erstellen"}
              <Sparkles size={20} />
            </button>
          </form>
        </div>
      </Container>
    </section>
  )
}
