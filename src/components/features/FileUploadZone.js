// src/components/features/FileUploadZone.js
'use client'

import { useState } from 'react'
import { Upload, X, File } from 'lucide-react'

export default function FileUploadZone() {
  const [file, setFile] = useState(null)

  const handleFileDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer?.files[0] || e.target.files[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }

  const removeFile = () => {
    setFile(null)
  }

  return (
    <div className="mt-4">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          file ? 'border-primary bg-primary/5' : 'border-gray-300'
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
      >
        {!file ? (
          <div>
            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-4" />
            <label className="block">
              <span className="text-gray-700">Drop your file here, or</span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileDrop}
              />
              <span className="text-primary cursor-pointer ml-1">browse</span>
            </label>
            <p className="text-sm text-gray-500 mt-2">
              Supports PDF, DOCX, TXT (up to 10MB)
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <File className="w-6 h-6 text-primary mr-2" />
              <span className="text-gray-700">{file.name}</span>
            </div>
            <button
              onClick={removeFile}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}