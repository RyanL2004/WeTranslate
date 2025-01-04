// src/components/features/CharacterCount.js
export default function CharacterCount({ text, maxLength = 5000 }) {
    const charCount = text.length
    const percentage = (charCount / maxLength) * 100
  
    return (
      <div className="text-sm text-gray-500 mt-2 flex items-center justify-between">
        <div>
          {charCount}/{maxLength} characters
        </div>
        <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${
              percentage > 90 ? 'bg-red-500' : 'bg-primary'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    )
  }