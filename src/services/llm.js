import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

let openai;
if (apiKey) {
    openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Creating a client-side only app for now
    });
} else {
    console.warn("VITE_OPENAI_API_KEY is missing. LLM features will be disabled or mocked.");
}

/**
 * Summarizes a single turn of speech.
 * @param {string} text - The text spoken by the player.
 * @param {string} playerName - The name of the player.
 * @returns {Promise<string>} - A bulleted summary of the point.
 */
export const summarizeTurn = async (text, playerName) => {
    if (!openai) return `(Mock Summary) ${playerName} said: ${text.substring(0, 50)}...`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a conflict mediator assistant. Summarize the user's speech into a concise, neutral bullet point. Focus on the core feeling or need expressed." },
                { role: "user", content: `${playerName} said: "${text}"` }
            ],
            max_tokens: 60
        });
        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("LLM Error:", error);
        return `Error summarizing: ${text.substring(0, 20)}...`;
    }
};

/**
 * Analyzes the entire conflict history to provide a final summary and resolution status.
 * @param {Array} history - Array of turn objects { player, text, summary }.
 * @returns {Promise<Object>} - { resolution: boolean, summary: string }
 */
export const analyzeConflict = async (history) => {
    if (!openai || !history || history.length === 0) {
        return {
            resolution: false,
            summary: "No conflict data available to analyze. (Or API Key missing)"
        };
    }

    const conversationText = history.map(h => `${h.player}: ${h.text}`).join("\n");

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a master conflict mediator. Analyze the following transcript. \n1. Summarize the key points for both sides.\n2. Determine if a resolution or understanding was reached (True/False).\n3. Provide a constructive closing statement.\n\nReturn JSON format: { \"p1_summary\": \"...\", \"p2_summary\": \"...\", \"resolved\": boolean, \"closing\": \"...\" }" },
                { role: "user", content: conversationText }
            ],
            response_format: { type: "json_object" }
        });

        return JSON.parse(response.choices[0].message.content);
    } catch (error) {
        console.error("LLM Analysis Error:", error);
        return {
            resolved: false,
            summary: "Failed to analyze conflict due to an error.",
            p1_summary: "N/A",
            p2_summary: "N/A",
            closing: "Technical error during analysis."
        };
    }
};

/**
 * Generates 3 constructive questions based on the conflict history.
 * @param {Array} history - Array of turn objects { player, text, summary }.
 * @returns {Promise<Array>} - Array of 3 string questions.
 */
export const suggestQuestions = async (history) => {
    if (!openai || !history || history.length === 0) {
        return [
            "Can you tell me more about how that made you feel?",
            "What is the most important thing for you in this situation?",
            "What would a successful outcome look like for you?"
        ];
    }

    const conversationText = history.map(h => `${h.player || 'Speaker'}: ${h.text}`).join("\n");

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a conflict mediator assistant. Based on the conversation transcript, suggest 3 constructive, open-ended questions the current speaker could ask to de-escalate tension or better understand the other person's perspective. Return JSON format: { \"questions\": [\"question 1\", \"question 2\", \"question 3\"] }" },
                { role: "user", content: conversationText }
            ],
            response_format: { type: "json_object" }
        });

        const content = JSON.parse(response.choices[0].message.content);
        return content.questions || [
            "Could you clarify what you mean?",
            "How does this situation affect you?",
            "What steps can we take to resolve this?"
        ];
    } catch (error) {
        console.error("LLM Suggestion Error:", error);
        return [
            "Could you say that in a different way?",
            "What do you need right now?",
            "How can we move forward?"
        ];
    }
};

