"""
NU-Way back end: forwards requests from the React front end to the Claude API.
The API key stays on the server and is never sent to the browser.

Setup:
    pip install fastapi uvicorn anthropic
    export ANTHROPIC_API_KEY="your-key-here"
    export CLAUDE_MODEL="current-model-name"   # see docs.claude.com for current model names
    uvicorn server:app --reload --port 8000
"""

import os

import anthropic
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow the local Vite dev server to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY from the environment
MODEL = os.environ["CLAUDE_MODEL"]


@app.post("/api/claude")
def call_claude(body: dict):
    """Accepts the same messages payload the artifact sent and returns
    the API response in the same shape, so the front end parsing still works."""
    response = client.messages.create(
        model=MODEL,
        max_tokens=body.get("max_tokens", 4000),
        messages=body["messages"],
        **({"system": body["system"]} if "system" in body else {}),
    )
    return response.model_dump()
