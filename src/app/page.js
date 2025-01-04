import Link from 'next/link'
import { Globe, Mic, Type } from 'lucide-react'
import TranslationPanel from '@/components/features/TranslationPanel';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">SmartTranslate</h1>
            </div>
            <div className="flex gap-4">
              <Link 
                href="/login"
                className="px-4 py-2 rounded-lg text-primary hover:bg-primary hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/signup"
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6">
                Break Language Barriers with AI
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Instant, accurate translations powered by advanced AI. Support for over 100 languages.
              </p>
              <div className="flex gap-4">
                <Link 
                  href="/translate"
                  className="px-8 py-4 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
                >
                  Start Translating
                </Link>
              
                <button className="px-8 py-4 rounded-lg border-2 border-primary text-primary hover:bg-gray-50 transition-colors" >
                  Watch Demo
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <FeatureCard 
                Icon={Globe} 
                title="100+ Languages"
                description="Translate between any supported language pair instantly"
              />
              <FeatureCard 
                Icon={Mic} 
                title="Speech to Text"
                description="Convert spoken words to written text in real-time"
              />
              <FeatureCard 
                Icon={Type} 
                title="Smart Context"
                description="Context-aware translations for better accuracy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
    
  )
}

function FeatureCard({ Icon, title, description }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <Icon className="w-12 h-12 text-primary mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}