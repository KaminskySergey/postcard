'use server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function createBattleAction(formData: FormData) {
  const supabase = await createClient()

  const creatorName = formData.get('creatorName') as string
  const targetName = formData.get('targetName') as string

  if (!creatorName || !targetName) {
    throw new Error('Names are required')
  }

  const { data: questions, error: qError } = await supabase
    .from('questions')
    .select('id')
    .limit(20) 

  if (qError || !questions || questions.length < 5) {
    console.error('Database error or not enough questions:', qError)
    throw new Error('Fehler beim Laden der Fragen')
  }

  const selectedIds = questions
    .sort(() => 0.5 - Math.random())
    .slice(0, 5)
    .map(q => q.id)

  const { data: battle, error: bError } = await supabase
    .from('battles')
    .insert([
      { 
        creator_name: creatorName, 
        target_name: targetName, 
        selected_questions: selectedIds 
      }
    ])
    .select()
    .single()

  if (bError) {
    console.error('Error creating battle:', bError)
    throw new Error('Fehler beim Erstellen des Battles')
  }

  redirect(`/share/${battle.id}`)
}