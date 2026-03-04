import { Container } from "@/components/ui/Container"
import QuizEngine from "@/components/ui/QuizEngine"
import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"

export default async function BattlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: battle } = await supabase
        .from('battles')
        .select('*')
        .eq('id', id)
        .single()

    if (!battle) return notFound()

    const { data: questions } = await supabase
        .from('questions')
        .select('*')
        .in('id', battle.selected_questions)
    console.log(questions)
    const orderedQuestions = battle.selected_questions.map((qId: string) =>
        questions?.find(q => q.id === qId)
    ).filter(Boolean)

    return (
        <section>
            <Container className="">
                <div className='w-full  bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl text-center'>

                    <QuizEngine
                        questions={orderedQuestions}
                        targetName={battle.target_name}
                        creatorName={battle.creator_name}
                    />
                </div>
            </Container>
        </section>
    )
}