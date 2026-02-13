import axios from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const q = searchParams.get('q')
  const limit = searchParams.get('limit')
  const index = searchParams.get('index')

  if (!q) {
    return NextResponse.json(
      { error: 'Query parameter "q" is required' },
      { status: 400 }
    )
  }

  try {
    const response = await axios.get('https://api.deezer.com/search/album', {
      params: { q, limit, index }
    })

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Deezer API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch from Deezer API' },
      { status: 500 }
    )
  }
}
