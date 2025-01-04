// src/app/api/translate/route.js
import { NextResponse } from 'next/server'
import { TRANSLATION_TYPES } from '@/lib/constants'

const getPromptPrefix = (type) => {
  switch (type) {
    case TRANSLATION_TYPES.PROFESSIONAL:
      return "Translate this professional document, maintaining formal language and technical terminology: "
    case TRANSLATION_TYPES.SCIENTIFIC:
      return "Translate this scientific content, preserving technical accuracy and scientific terminology: "
    case TRANSLATION_TYPES.DOCUMENTS:
      return "Translate this official document, maintaining exact formatting and official terminology: "
    case TRANSLATION_TYPES.CONVERSATION:
      return "Translate this conversation naturally, preserving tone and colloquial expressions: "
    default:
      return "Translate the following text: "
  }
}

export async function POST(request) {
  const body = await request.json()
  const { text, sourceLang, targetLang, translationType } = body

  // Here you would integrate with your existing translation API
  // Add the prompt prefix based on the translation type
  const promptPrefix = getPromptPrefix(translationType)
  
  // Use your existing translation logic here
  // ...
}