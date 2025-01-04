'use client'
// src/components/features/TranslationPanel.js
import { useState } from 'react'
import { ArrowLeftRight, Volume2, Copy, RotateCcw } from 'lucide-react'

export default function TranslationPanel() {
  // State declarations with proper empty string initialization
  const [sourceText, setSourceText] = useState('')
  const [targetText, setTargetText] = useState('')
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('fr')

  // Rest of your component code...

  // Languages array
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
  ]

  // Handler functions
  const handleTranslate = () => {
    console.log('Translating:', sourceText)
  }

  const swapLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setSourceText(targetText)
    setTargetText(sourceText)
  }

  // Component render
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg">
        {/* Language Selection */}
        <div className="flex items-center justify-between p-4 border-b">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="p-2 rounded-md border"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          <button
            onClick={swapLanguages}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeftRight className="w-5 h-5" />
          </button>

          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="p-2 rounded-md border"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Translation Area */}
        <div className="grid md:grid-cols-2 gap-4 p-4">
          {/* Source Text */}
          <div>
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Enter text to translate..."
              className="w-full h-48 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex justify-between mt-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Volume2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSourceText('')}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Target Text */}
          <div>
            <textarea
              value={targetText}
              readOnly
              placeholder="Translation will appear here..."
              className="w-full h-48 p-4 border rounded-lg resize-none bg-gray-50"
            />
            <div className="flex justify-between mt-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Volume2 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t">
          <button
            onClick={handleTranslate}
            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Translate
          </button>
        </div>
      </div>
    </div>
  )
}
