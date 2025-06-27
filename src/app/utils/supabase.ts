import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase credentials. Database functionality will not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type-safe database functions

// Materials
export async function searchMaterials(query: string, limit = 4) {
  try {
    // For a small dataset, we can use simple text search
    // In production with larger datasets, you'd use vector similarity search
    const { data, error } = await supabase
      .from('materials')
      .select('*')
      .ilike('title', `%${query}%`)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error searching materials:', error);
    return [];
  }
}

// Chats
export async function createChat(userId: string | undefined, title: string) {
  try {
    const { data, error } = await supabase
      .from('chats')
      .insert([{ user_id: userId, title }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating chat:', error);
    return null;
  }
}

// Messages
export async function saveMessage(chatId: string, role: 'user' | 'assistant', content: string, imageUrl?: string) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ chat_id: chatId, role, content, image_url: imageUrl }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving message:', error);
    return null;
  }
}

// Get chat history
export async function getChatMessages(chatId: string) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting chat messages:', error);
    return [];
  }
}

// File upload
export async function uploadImage(file: File, userId?: string) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId || 'anonymous'}-${Date.now()}.${fileExt}`;
    const filePath = `chat-images/${fileName}`;

    const { error } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (error) throw error;

    // Get public URL
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
} 