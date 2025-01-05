'use client';

import { useState, useCallback } from 'react';
import { Upload, X, File, AlertCircle } from 'lucide-react';

const ALLOWED_TYPES = {
  'application/pdf': '.pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'text/plain': '.txt'
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function FileUploadZone({ onFileProcess, onError }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateFile = (file) => {
    if (!file) return 'No file selected';
    if (!Object.keys(ALLOWED_TYPES).includes(file.type)) {
      return `Invalid file type. Allowed types: ${Object.values(ALLOWED_TYPES).join(', ')}`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size exceeds 10MB limit';
    }
    return null;
  };

  const handleFileDrop = useCallback(async (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer?.files[0] || e.target.files[0];
    
    if (!droppedFile) return;

    const error = validateFile(droppedFile);
    if (error) {
      onError(new Error(error));
      return;
    }

    setLoading(true);
    try {
      const reader = new FileReader();
      
      reader.onload = async () => {
        try {
          const content = reader.result;
          console.log('File read successfully:', {
            name: droppedFile.name,
            type: droppedFile.type,
            size: content.byteLength
          });

          setFile(droppedFile);
          onFileProcess({
            content,
            name: droppedFile.name,
            type: droppedFile.type
          });
        } catch (err) {
          console.error('Error processing file:', err);
          onError(new Error('Failed to process file'));
        } finally {
          setLoading(false);
        }
      };

      reader.onerror = () => {
        console.error('Error reading file');
        onError(new Error('Failed to read file'));
        setLoading(false);
      };

      reader.readAsArrayBuffer(droppedFile);
    } catch (err) {
      console.error('Error handling file:', err);
      onError(new Error('Failed to handle file'));
      setLoading(false);
    }
  }, [onFileProcess, onError]);

  const removeFile = useCallback(() => {
    setFile(null);
  }, []);

  return (
    <div className="mt-4">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          file ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'
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
                accept={Object.values(ALLOWED_TYPES).join(',')}
                onChange={handleFileDrop}
              />
              <span className="text-primary cursor-pointer ml-1">browse</span>
            </label>
            <p className="text-sm text-gray-500 mt-2">
              Supports: {Object.values(ALLOWED_TYPES).join(', ')} (up to 10MB)
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
  );
}