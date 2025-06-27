import { NextRequest, NextResponse } from 'next/server';
import { getDummyChatMessages } from '../../../utils/dummyData';

export async function GET(request: NextRequest) {
  try {
    // Get chatId from query parameters
    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get('chatId');

    if (!chatId) {
      return NextResponse.json(
        { error: 'Chat ID is required' },
        { status: 400 }
      );
    }

    // Get chat messages
    const messages = getDummyChatMessages(chatId);

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chat history' },
      { status: 500 }
    );
  }
} 