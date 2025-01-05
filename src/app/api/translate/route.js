// src/app/api/translate/route.js
import { NextResponse } from 'next/server';
import { TRANSLATION_TYPES } from '@/lib/constants';

const AZURE_ENDPOINT = 'https://api.cognitive.microsofttranslator.com';

// Helper function to map translation types to Azure categories
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
    const { text, sourceLang, targetLang, translationType } = await request.json();

    // Validation
    if (!text?.trim()) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }
    if (!process.env.AZURE_TRANSLATOR_KEY) {
      return NextResponse.json({ error: 'Translation service not configured' }, { status: 500 });
    }

    // Construct request URL
    const url = new URL('/translate', AZURE_ENDPOINT);
    url.searchParams.append('api-version', '3.0');
    url.searchParams.append('from', sourceLang);
    url.searchParams.append('to', targetLang);

    // Make request to Azure
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.AZURE_TRANSLATOR_KEY,
        'Ocp-Apim-Subscription-Region': process.env.AZURE_REGION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ 
        text,
        category: getAzureCategory(translationType)
      }])
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Azure translation error:', errorData);
      throw new Error(errorData.error?.message || 'Translation failed');
    }

    const data = await response.json();
    const translatedText = data[0]?.translations[0]?.text;

    if (!translatedText) {
      throw new Error('No translation received');
    }

    return NextResponse.json({ translatedText });

  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { 
        error: 'Translation failed', 
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}