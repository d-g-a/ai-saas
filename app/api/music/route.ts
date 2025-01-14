import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import Replicate from 'replicate'

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
})

export async function POST(req: Request){
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { prompt } = body;       

        if (!userId){
            return new NextResponse("Unauthorized", { status: 401})
        }

        if (!prompt){
            return new NextResponse('Prompt is required', { status: 400})
        }

        const output = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", { 
            input: {
                // alpha: 0.5,
                // prompt_a: prompt,
                prompt_b: prompt,
                // denoising: 0.75,
                // seed_image_id: 'vibes',
                // num_inference_steps: 50
            }
         });

         console.log(output)
        
        return NextResponse.json(output)

    } catch (error) {
        console.log('[MUSIC ERROR]', error)
        return new NextResponse('Internal Error', {status: 500})
    }
}