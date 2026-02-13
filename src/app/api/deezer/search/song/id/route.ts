import axios from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      { error: 'Query parameter "id" is required' },
      { status: 400 }
    )
  }

  try {
    const response = await axios.get(`https://api.deezer.com/track/${id}`)

    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Deezer API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch from Deezer API' },
      { status: 500 }
    )
  }
}
