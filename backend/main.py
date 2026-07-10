from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OLLAMA_URL = "http://localhost:11434/api/generate"


@app.get("/")
def home():
    return {
        "message": "Agriculture Assistant SLM Backend is Running"
    }


@app.get("/chat")
def chat(prompt: str, language: str = "English"):

    # -------------------------------
    # Agriculture Keywords
    # -------------------------------
    agriculture_keywords = [

        # English
        "agriculture", "farmer", "farming", "crop", "crops",
        "rice", "wheat", "maize", "corn", "cotton",
        "soil", "fertilizer", "fertiliser",
        "irrigation", "drip", "seed", "seeds",
        "pesticide", "pest", "harvest",
        "weather", "plant", "cultivation",

        # Telugu
        "వ్యవసాయం", "వ్యవసాయ", "పంట", "పంటలు",
        "వరి", "గోధుమ", "మొక్కజొన్న",
        "నేల", "మట్టి", "ఎరువు",
        "సాగు", "నీటి", "నీటిపారుదల",
        "విత్తనం", "విత్తనాలు",
        "పురుగు", "పురుగుమందు",
        "కోత",

        # Hindi
        "कृषि", "खेती", "फसल",
        "धान", "गेहूं", "मिट्टी",
        "उर्वरक", "सिंचाई",
        "बीज", "कीटनाशक"
    ]

    question = prompt.lower()

    # -------------------------------
    # Reject Non Agriculture Questions
    # -------------------------------
    if not any(keyword.lower() in question for keyword in agriculture_keywords):

        if language == "Telugu":
            return {
                "response": "❌ క్షమించండి, నేను వ్యవసాయానికి సంబంధించిన ప్రశ్నలకు మాత్రమే సమాధానం ఇవ్వగలను."
            }

        elif language == "Hindi":
            return {
                "response": "❌ क्षमा करें, मैं केवल कृषि से संबंधित प्रश्नों का उत्तर दे सकता हूँ।"
            }

        else:
            return {
                "response": "❌ Sorry, I can answer only agriculture-related questions."
            }

    # -------------------------------
    # Prompt for Ollama
    # -------------------------------
    SYSTEM_PROMPT = f"""
You are an Agriculture AI Assistant.

Rules:

1. Answer ONLY agriculture related questions.
2. Never answer non-agriculture questions.
3. Reply ONLY in the user's selected language.

Selected Language:
{language}

User Question:
{prompt}
"""

    print("================================")
    print("Language :", language)
    print("Question :", prompt)
    print("================================")

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "qwen2.5:3b",
            "prompt": SYSTEM_PROMPT,
            "stream": False
        }
    )

    data = response.json()

    return {
        "response": data.get("response", "No response from model.")
    }