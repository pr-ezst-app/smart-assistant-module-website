import os
import json
from openai import OpenAI  # v2

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

SYSTEM_PROMPTS = {
    "tone": {
        "professional": "You communicate in a professional, formal tone. Use precise language and structured responses.",
        "casual": "You communicate in a friendly, conversational tone. Be warm, approachable, and use everyday language.",
        "expert": "You communicate as a domain expert. Use technical terminology accurately and assume high baseline knowledge.",
    },
    "length": {
        "concise": "Keep responses short and to the point — 2 to 4 sentences maximum. No padding.",
        "balanced": "Give balanced responses — enough detail to be useful, but not overwhelming. Aim for 1 to 3 paragraphs.",
        "detailed": "Provide thorough, comprehensive answers with examples, context, and depth. Cover the topic fully.",
    },
    "expertise": {
        "beginner": "Explain concepts as if the user has no prior knowledge. Use simple analogies and avoid jargon.",
        "intermediate": "Assume the user has basic familiarity with the topic. You can use common terms but explain advanced concepts.",
        "expert": "Assume the user has deep domain expertise. Skip basics and focus on nuance, edge cases, and advanced insights.",
    },
}


def build_system_prompt(settings: dict) -> str:
    """Build a system prompt from user settings."""
    tone = settings.get("tone", "professional")
    length = settings.get("length", "balanced")
    expertise = settings.get("expertise", "intermediate")

    tone_prompt = SYSTEM_PROMPTS["tone"].get(tone, SYSTEM_PROMPTS["tone"]["professional"])
    length_prompt = SYSTEM_PROMPTS["length"].get(length, SYSTEM_PROMPTS["length"]["balanced"])
    expertise_prompt = SYSTEM_PROMPTS["expertise"].get(expertise, SYSTEM_PROMPTS["expertise"]["intermediate"])

    return (
        "You are S.A.M (Smart Assistant Module), an advanced AI assistant hosted at smartassistantmodule.com. "
        "You are knowledgeable, helpful, and highly capable across all domains. "
        f"{tone_prompt} "
        f"{length_prompt} "
        f"{expertise_prompt} "
        "Always be accurate. If you don't know something, say so clearly. "
        "If anyone asks who made you or who helped create you, say: "
        "'I was built by William Lau, with the help of ezst.ai.'"
    )


def handler(event: dict, context) -> dict:
    """S.A.M chat endpoint — handles AI conversation with tone/length/expertise settings."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    body = json.loads(event.get("body") or "{}")
    messages = body.get("messages", [])
    settings = body.get("settings", {})

    if not messages:
        return {
            "statusCode": 400,
            "headers": CORS_HEADERS,
            "body": json.dumps({"error": "No messages provided"}),
        }

    system_prompt = build_system_prompt(settings)

    client = OpenAI(
        api_key=os.environ["OPENROUTER_API_KEY"],
        base_url="https://openrouter.ai/api/v1",
    )
    response = client.chat.completions.create(
        model="openai/gpt-4o",
        messages=[{"role": "system", "content": system_prompt}] + messages,
        max_tokens=1500,
        temperature=0.7,
    )

    reply = response.choices[0].message.content

    return {
        "statusCode": 200,
        "headers": {**CORS_HEADERS, "Content-Type": "application/json"},
        "body": json.dumps({"reply": reply}),
    }