# Game Video Script Generator Implementation Plan

**Goal:** Build a local HTML app and Node.js service that generate short game promotion video scripts through MiniMax, while keeping provider support extensible.

**Architecture:** A single-page HTML UI sends validated form data to a local Node.js endpoint. The server builds a specialized prompt, calls the configured provider, and returns structured text for display.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js built-in HTTP server, Node test runner, MiniMax OpenAI-compatible chat completions API.

## File Structure

- `index.html`: Local app UI, form behavior, API call, result rendering.
- `server.js`: Static file serving, `.env` loading, JSON API endpoint, provider selection.
- `src/prompt.js`: Prompt construction for game promotion video scripts.
- `src/validation.js`: Required field validation and normalization.
- `providers/minimax.js`: MiniMax chat completion request.
- `providers/openai.js`: OpenAI-compatible provider for future expansion.
- `tests/prompt.test.js`: Verifies prompt includes duration, ratio, style, and output requirements.
- `tests/validation.test.js`: Verifies required fields and defaults.
- `.env.example`: Configuration sample.
- `README.md`: Setup and usage guide.

## Tasks

- Create project configuration and documentation.
- Add prompt and validation modules.
- Add MiniMax and future OpenAI provider layer.
- Add local Node.js server.
- Build the single-page HTML UI.
- Verify with Node tests and local health check.
