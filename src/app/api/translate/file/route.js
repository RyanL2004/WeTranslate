// src/app/api/translate/file/route.js
import { NextResponse } from 'next/server';
import { TRANSLATION_TYPES } from '@/lib/constants';

const getAzureCategory = (type) => {
  const categoryMap = {
    [TRANSLATION_TYPES.PROFESSIONAL]: 'business',
    [TRANSLATION_TYPES.SCIENTIFIC]: 'tech',
    [TRANSLATION_TYPES.DOCUMENTS]: 'general',
    [TRANSLATION_TYPES.CONVERSATION]: 'conversational',
    [TRANSLATION_TYPES.GENERAL]: 'general'
  };
  return categoryMap[type] || 'general';
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const sourceLang = formData.get('sourceLang');
    const targetLang = formData.get('targetLang');
    const translationType = formData.get('translationType');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Read file content based on type
    const buffer = await file.arrayBuffer();
    const content = new TextDecoder().decode(buffer);

    // Call Azure Translator API (similar to text translation)
    const translatedContent = await translateContent(content, sourceLang, targetLang, translationType);

    // Prepare response headers based on original file type
    const headers = new Headers();
    headers.append('Content-Type', file.type);
    headers.append('Content-Disposition', `attachment; filename="translated_${file.name}"`);

    // Create response with translated content in original format
    return new NextResponse(translatedContent, {
      headers,
      status: 200
    });

  } catch (error) {
    console.error('File translation error:', error);
    return NextResponse.json(
      { 
        error: 'File translation failed', 
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}

async function translateContent(content, sourceLang, targetLang, translationType) {
  // Implementation similar to text translation but handling document structure
  const url = new URL('/translate', 'https://api.cognitive.microsofttranslator.com');
  url.searchParams.append('api-version', '3.0');
  url.searchParams.append('from', sourceLang);
  url.searchParams.append('to', targetLang);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.AZURE_TRANSLATOR_KEY,
      'Ocp-Apim-Subscription-Region': process.env.AZURE_REGION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{
      text: content,
      category: getAzureCategory(translationType)
    }])
  });

  if (!response.ok) {
    throw new Error('Translation service failed');
  }

  const data = await response.json();
  return data[0]?.translations[0]?.text;
}