'use client';

import { useState, useCallback } from "react";
import {
  ArrowLeftRight,
  Volume2,
  Copy,
  RotateCcw,
  FileText,
  MessageSquare,
  Microscope,
  Book,
  Globe,
  AlertCircle,
  Loader2,
  Download
} from "lucide-react";
import FileUploadZone from "./FileUploadZone";
import { TRANSLATION_TYPES } from '@/lib/constants';

export default function TranslationPanel() {
  // State declarations
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("fr");
  const [translationType, setTranslationType] = useState(TRANSLATION_TYPES.GENERAL);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [translatedFile, setTranslatedFile] = useState(null);

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
  ];

  const translationModes = [
    {
      type: TRANSLATION_TYPES.GENERAL,
      icon: Globe,
      label: "General Translation",
      description: "For everyday translation needs",
    },
    {
      type: TRANSLATION_TYPES.PROFESSIONAL,
      icon: FileText,
      label: "Professional Documents",
      description: "For business and legal documents",
    },
    {
      type: TRANSLATION_TYPES.SCIENTIFIC,
      icon: Microscope,
      label: "Scientific Content",
      description: "For research papers and technical documents",
    },
    {
      type: TRANSLATION_TYPES.DOCUMENTS,
      icon: Book,
      label: "ID & Official Documents",
      description: "For certificates, IDs, and official papers",
    },
    {
      type: TRANSLATION_TYPES.CONVERSATION,
      icon: MessageSquare,
      label: "Daily Communication",
      description: "For casual conversations and messages",
    },
  ];

  // Inside your TranslationPanel.js, update the handleFileProcess function

  const handleFileProcess = useCallback(async (fileData) => {
    console.log('Client: Starting file processing:', fileData?.name);
    setCurrentFile(fileData);
    setSourceText("");
    setError(null);
    
    try {
      setIsTranslating(true);
  
      // Create FormData
      const formData = new FormData();
      
      // Create a proper File object from the blob
      const fileBlob = new Blob([fileData.content], { type: fileData.type });
      const file = new File([fileBlob], fileData.name, { type: fileData.type });
      
      formData.append('file', file);
      formData.append('sourceLang', sourceLang);
      formData.append('targetLang', targetLang);
      formData.append('translationType', translationType);
  
      console.log('Client: Sending request to /api/translate/file');
  
      const response = await fetch('/api/translate/file', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const text = await response.text();
        console.error('Server error response:', text);
        throw new Error(`Server error: ${text}`);
      }
  
      const data = await response.json();
      console.log('Client: Received response:', data);
  
      if (!data.success) {
        throw new Error(data.error || 'Translation failed');
      }
  
      // Handle the translated content
      const translatedBlob = new Blob(
        [data.translatedText],
        { type: fileData.type }
      );
  
      setTranslatedFile({
        content: translatedBlob,
        name: `translated_${fileData.name}`,
        type: fileData.type
      });
  
      // Show preview for text files or PDFs
      if (fileData.type === 'text/plain' || fileData.type === 'application/pdf') {
        setTargetText(data.translatedText);
      }
  
      console.log('Client: File processing completed successfully');
  
    } catch (err) {
      console.error("Client: File processing error:", err);
      setError(err.message || 'Failed to process file');
    } finally {
      setIsTranslating(false);
    }
  }, [sourceLang, targetLang, translationType]);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setIsTranslating(true);
    setError(null);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: sourceText,
          sourceLang,
          targetLang,
          translationType
        })
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Unexpected response type:', contentType);
        console.error('Raw response:', text);
        throw new Error('Invalid server response');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Translation failed');
      }

      setTargetText(data.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
      setError(error.message || 'Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleDownloadTranslation = useCallback(() => {
    if (translatedFile) {
      const url = URL.createObjectURL(translatedFile.content);
      const a = document.createElement('a');
      a.href = url;
      a.download = translatedFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [translatedFile]);

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(targetText);
    setTargetText(sourceText);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const showFileUpload =
    translationType === TRANSLATION_TYPES.DOCUMENTS ||
    translationType === TRANSLATION_TYPES.PROFESSIONAL ||
    translationType === TRANSLATION_TYPES.SCIENTIFIC;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <p className="ml-3 text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Translation Mode Selection */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {translationModes.map(({ type, icon: Icon, label, description }) => (
            <button
              key={type}
              onClick={() => {
                setTranslationType(type);
                setCurrentFile(null);
                setTranslatedFile(null);
                setSourceText("");
                setTargetText("");
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                translationType === type
                  ? "border-primary bg-primary-light text-primary"
                  : "border-gray-200 hover:border-primary hover:bg-primary-light/20"
              }`}
            >
              <Icon
                className={`w-6 h-6 ${
                  translationType === type
                    ? "text-primary"
                    : "text-textSecondary"
                }`}
              />
              <h3 className="font-semibold mt-2 text-textPrimary">{label}</h3>
              <p className="text-sm text-textSecondary mt-1">{description}</p>
            </button>
          ))}
        </div>
      </div>

      {showFileUpload && (
        <FileUploadZone 
          onFileProcess={handleFileProcess}
          onError={(err) => setError(err.message)}
        />
      )}

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
              className="w-full h-48 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary text-textPrimary placeholder-textSecondary/60"
              disabled={isTranslating}
            />
            <div className="flex justify-between mt-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Volume2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSourceText("")}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Target Text */}
          <div>
            {isTranslating ? (
              <div className="h-48 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            ) : (
              <textarea
                value={targetText}
                readOnly
                placeholder="Translation will appear here..."
                className="w-full h-48 p-4 border rounded-lg resize-none bg-gray-50"
              />
            )}
            <div className="flex justify-between mt-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Volume2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => copyToClipboard(targetText)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t">
          <button
            onClick={handleTranslate}
            disabled={isTranslating || !sourceText.trim()}
            className={`w-full py-3 rounded-lg transition-colors ${
              isTranslating || !sourceText.trim()
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl"
            }`}
          >
            {isTranslating ? "Translating..." : "Translate"}
          </button>
        </div>
      </div>

      {/* Download Button for Translated Files */}
      {translatedFile && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleDownloadTranslation}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Translated File
          </button>
        </div>
      )}
    </div>
  );
}