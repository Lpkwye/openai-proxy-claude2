import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { AnthropicStream, StreamingTextResponse } from 'ai'

/**
 * 重新生成内容
 */
export async function POST(request: NextRequest) {
    const base_url: string = `${process.env.CLAUDE_BASE}/retry_message`;
    const init: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream',
            'Cookie': `sessionKey=${cookies().get('sessionKey')?.value}`,
        },
        redirect: 'follow',
        body: JSON.stringify(
            await request.json()
        ),
    }
    const response = await fetch(base_url, init);
    const stream = AnthropicStream(response)
    return new StreamingTextResponse(stream);
}