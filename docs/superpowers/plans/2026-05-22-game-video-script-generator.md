# Game Video Script Generator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local HTML app and Node.js service that generate short game promotion video scripts through MiniMax, while keeping provider support extensible.

**Architecture:** A single-page HTML UI sends validated form data to a local Node.js endpoint. The server builds a specialized prompt, calls the configured provider, and returns structured text for display.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js built-in HTTP server, Node test runner, MiniMax OpenAI-compatible chat completions API.

---

## File Structure

- `index.html`: Local app UI, form behavior, API call, result rendering.
- `server.js`: Static file serving, `.env` loading, JSON API endpoint, provider selection.
- `src/prompt.js`: Prompt construction for game promotion video scripts.
- `src/validation.js`: Required field validation and normalization.
- `providers/minimax.js`: MiniMax chat completion request.
- `providers/openai.js`: OpenAI-compatible provider for future use.
- `tests/prompt.test.js`: Verifies prompt includes duration, ratio, style, and output requirements.
- `tests/validation.test.js`: Verifies required fields and defaults.
- `.env.example`: Configuration sample.
- `README.md`: Setup and usage guide.

## Tasks

### Task 1: Project Skeleton And Configuration

- [x] Create `package.json` with `start` and `test` scripts.
- [x] Create `.env.example` with MiniMax and future OpenAI configuration.
- [x] Create `README.md` with setup, API key, and launch instructions.

### Task 2: Prompt And Validation Modules

- [x] Create `src/validation.js` to normalize custom duration, ratio, style, and required fields.
- [x] Create `src/prompt.js` to build a Chinese prompt for 10-15 second game promotion scripts.
- [x] Create Node tests covering validation and prompt content.

### Task 3: Provider Layer

- [x] Create `providers/minimax.js` using `https://api.minimax.io/v1/chat/completions`.
- [x] Create `providers/openai.js` with the same interface for future expansion.
- [x] Ensure missing keys and provider errors return clear messages.

### Task 4: Local Server

- [x] Create `server.js` to load environment variables, serve `index.html`, and expose `POST /api/generate`.
- [x] Wire validation, prompt building, provider selection, and JSON responses.
- [x] Add health endpoint at `GET /api/health`.

### Task 5: Frontend App

- [x] Build the single-page UI with game fields, custom duration, ratio quick choices, style selection, and extra notes.
- [x] Add loading, error, and result states.
- [x] Render generated output in a copy-friendly format.

### Task 6: Verification

- [x] Run `npm test`.
- [x] Start the local server.
- [x] Check the page in a browser and verify the UI renders.
