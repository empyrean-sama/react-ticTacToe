import OpenAI from "openai";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Context } from "vm";
import { SerializedBoard } from "../../interface/Types";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey:  process.env.DEEPSEEK_KEY
}); 

async function main(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    try {
        if(!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify('no board attached, must attach a tic tac toe board for the ai to play the next move'),
                headers: {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods': '*',
                }
            }
        }
        const board = JSON.parse(event.body) as SerializedBoard;
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: `Lets play tic tac toe, you must respond with the board after your turn in the format of the input. ill go first ${board} `}],
            model: "deepseek-chat",
        });
        return {
            statusCode: 200,
            body: JSON.stringify(completion.choices[0].message.content),
            headers: {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods': '*',
            }
        }
    }
    catch(error) {
        return {
            statusCode: 500,
            body: JSON.stringify((error as Error).message),
            headers: {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods': '*',
            }
        }
    }
}

export { main };