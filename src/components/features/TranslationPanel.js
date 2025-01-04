// src/components/features/TranslationPanel.js
'use client'

import { useState } from 'react'
import { ArrowLeftRight, Volume2, Copy, RotateCcw, FileText, MessageSquare, Microscope, Book, Globe } from 'lucide-react'
import { TRANSLATION_TYPES } from '@/lib/constants'

export default function TranslationPanel() {
  const [sourceText, setSourceText] = useState('')
  const [targetText, setTargetText] = useState('')
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('fr')
  const [translationType, setTranslationType] = useState(TRANSLATION_TYPES.GENERAL)
  const [isTranslating, setIsTranslating] = useState(false)

  const translationModes = [
    { type: TRANSLATION_TYPES.GENERAL, icon: Globe, label: 'General Translation', 
      description: 'For everyday translation needs' },
    { type: TRANSLATION_TYPES.PROFESSIONAL, icon: FileText, label: 'Professional Documents', 
      description: 'For business and legal documents' },
    { type: TRANSLATION_TYPES.SCIENTIFIC, icon: Microscope, label: 'Scientific Content', 
      description: 'For research papers and technical documents' },
    { type: TRANSLATION_TYPES.DOCUMENTS, icon: Book, label: 'ID & Official Documents', 
      description: 'For certificates, IDs, and official papers' },
    { type: TRANSLATION_TYPES.CONVERSATION, icon: MessageSquare, label: 'Daily Communication', 
      description: 'For casual conversations and messages' }
  ]

  const handleTranslate = async () => {
    if (!sourceText.trim()) return
    setIsTranslating(true)

    try {
      // Use your existing API endpoint but include the translation type
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: sourceText,
          sourceLang,
          targetLang,
          translationType, // Include the type to adjust translation style
        }),
      })

      const data = await response.json()
      setTargetText(data.translatedText)
    } catch (error) {
      console.error('Translation error:', error)
    } finally {
      setIsTranslating(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Translation Mode Selection */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {translationModes.map(({ type, icon: Icon, label, description }) => (
            <button
              key={type}
              onClick={() => setTranslationType(type)}
              className={`p-4 rounded-lg border-2 transition-all ${
                translationType === type
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              <Icon className={`w-6 h-6 ${
                translationType === type ? 'text-primary' : 'text-gray-500'
              }`} />
              <h3 className="font-semibold mt-2">{label}</h3>
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        {/* Your existing language selection and translation areas */}
        {/* ... rest of your component */}
      </div>
    </div>
  )
}