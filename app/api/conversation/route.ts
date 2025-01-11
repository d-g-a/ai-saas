import { auth } from "@clerk/nextjs/server"
import OpenAI from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
}) 


export async function POST(req: Request){
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { messages } = body;       

        if (!userId){
            return new NextResponse("Unauthorized", { status: 401})
        }

        if (!openai.apiKey){
            return new NextResponse('OpenAI API Key not configured', { status: 500})
        }

        if (!messages){
            return new NextResponse('Messages are required', { status: 400})
        }
        
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            store: true,
            messages
        });

        return NextResponse.json(completion?.choices[0]?.message)

    } catch (error) {
        console.log('[CONVERSATION ERROR]', error)
        return new NextResponse('Internal Error', {status: 500})
    }
}