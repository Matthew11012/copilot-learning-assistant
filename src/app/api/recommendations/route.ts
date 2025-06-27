import { NextRequest, NextResponse } from 'next/server';
import { searchDummyMaterials } from '../../utils/dummyData';

export async function GET(request: NextRequest) {
  try {
    // Get query from search parameters
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const limit = parseInt(searchParams.get('limit') || '4', 10);

    // Search for materials
    const materials = searchDummyMaterials(query, limit);

    return NextResponse.json({ materials });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recommendations' },
      { status: 500 }
    );
  }
} 