// src/app/translate/page.js
'use client'

import TranslationPanel from '@/components/features/TranslationPanel'

export default function TranslatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">SmartTranslate</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-10">
            Smart Translation
          </h1>
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100">
            <TranslationPanel />
          </div>
          
        </div>
      </main>
    </div>
  )
}