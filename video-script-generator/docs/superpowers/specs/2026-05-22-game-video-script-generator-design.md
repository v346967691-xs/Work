# Game Video Script Generator Design

## Goal

Build a local HTML app that generates short promotional video scripts for games. The first version targets 10-15 second game promotion videos, especially high-impact and suspense-driven styles.

## Scope

The app runs locally. A browser page collects game information, then sends it to a local Node.js service. The service calls a model provider and returns a structured script package.

The first provider is MiniMax because the user has a MiniMax API key. The code keeps a provider boundary so OpenAI or other providers can be added later without rewriting the UI.

## Inputs

- Game name
- Game genre
- Core selling point
- Target players
- Custom duration, such as `10秒`, `12秒`, `15秒`, or `30秒`
- Video ratio, with quick choices for `16:9`, `4:3`, `3:4`, `9:16`, plus custom input
- Style: high-impact, suspense, or high-impact plus suspense
- Extra notes

## Output

The generated result includes:

- One-line hook
- Second-by-second shot plan
- Voiceover or subtitle copy
- Large on-screen text
- Sound and pacing suggestions
- AI video prompt
- Voice prompt
- Ending call to action

## Architecture

- `index.html`: single-page local UI
- `server.js`: local static server and `/api/generate` endpoint
- `src/prompt.js`: turns form data into a model prompt
- `src/validation.js`: validates and normalizes user input
- `providers/minimax.js`: MiniMax chat completions provider
- `providers/openai.js`: future OpenAI-compatible provider
- `.env.example`: local configuration template
- `tests/`: focused Node tests for prompt and validation behavior

## Provider Design

The server chooses a provider from `MODEL_PROVIDER`, defaulting to `minimax`. Each provider exposes a `generate(messages, options)` function and returns plain text. MiniMax uses the OpenAI-compatible chat completions endpoint.

MiniMax official docs currently describe the compatible endpoint as:

- `POST https://api.minimax.io/v1/chat/completions`
- Bearer API key authorization
- Supported text models include `MiniMax-M2.7`, `MiniMax-M2.7-highspeed`, `MiniMax-M2.5`, and `MiniMax-M2.1`

## Error Handling

The UI shows friendly error messages for missing required fields, missing API keys, provider errors, and network failures. The server returns JSON with a stable `error` field instead of raw stack traces.

## Verification

Run `npm test` for prompt and validation tests. Start the local server with `npm start`, open the local URL, and submit sample game information to verify the UI flow.
