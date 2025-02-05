import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

/**
 * Generates an AI-based security recommendation for a given issue using OpenAI's GPT-4o model.
 *
 * @async
 * @function getAISuggestion
 * @param {string} issue - The security issue that needs resolution.
 * @returns {Promise<string>} A security recommendation from the AI.
 */
async function getAISuggestion(issue) {
    const prompt = `As a security expert for Supabase, recommend steps to resolve: ${issue}`;

    const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'system',
                content: `You are a helpful assistant that responds using markdown formatting.
                Prioritize the current query asked by the user and relate only information from previous related conversation queries, focusing only on the user's input.
                For the keywords, extract **only** the exact words or phrases used in the user's query, **do not infer additional terms**.
                If there are any spelling mistakes, correct them but still use the corrected words as keywords.
                Provide your response prefixed with "Guide:" followed by the content.
                Also, include a "Keyword:" section, listing only the keywords found **directly** in the user query.`
            },
            ...session.history,
            { role: 'user', content: data?.prompt }
        ],
        stream: true,
        response_format: { type: 'text' },
        temperature: 0.7,
        top_p: 1
    });
    
    return response.choices[0].message?.content || "No response";
}

/**
 * API handler for processing security issue queries and providing AI-generated recommendations.
 *
 * @async
 * @function POST
 * @param {Request} req - The incoming API request containing the security issue.
 * @returns {Promise<Response>} The response containing an AI-generated security suggestion or an error message.
 */
export async function POST(req) {
    try {
        const { issue } = await req.json();
        if (!issue) {
            return new Response(JSON.stringify({ error: "Issue is required" }), { status: 400 });
        }

        const suggestion = await getAISuggestion(issue);
        return new Response(JSON.stringify({ suggestion }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
