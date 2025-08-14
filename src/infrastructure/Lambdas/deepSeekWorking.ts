import OpenAI from "openai";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Context } from "vm";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey:  process.env.DEEPSEEK_KEY
}); 

async function main(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult>  {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are a helpful assistant." }],
            model: "deepseek-chat",
        });
        return {
            statusCode: 200,
            body: JSON.stringify(completion.choices[0].message.content)
        }
    }
    catch {
        return {
            statusCode: 500,
            body: JSON.stringify('error communicating with deepseek!')
        }
    }
}

export { main }