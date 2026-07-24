<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)

</div>

## 📸 App Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/7a818af5-f0ce-4ed0-a480-b65540229b76" alt="AI Studio Pro Dashboard" width="48%" />
  <img src="https://github.com/user-attachments/assets/617f15b8-5b9d-4918-a698-a47c4ab4ec59" alt="AI Voice Generator & Player" width="48%" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/164e7310-6236-4867-90d5-786b5dd0a979" alt="AI Text Enhancer & Diff Viewer" width="48%" />
  <img src="https://github.com/user-attachments/assets/d1218f6a-4e4d-446d-b14b-cd15ebfc48c2" alt="AI Image Studio" width="48%" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/8a6fdbb0-bcdb-4334-9562-354014e744de" alt="History & Tokens Management" width="97%" />
</p>

---

## 🔥 Feature Overview

### 1. 🎙️ AI Voice Generator & TTS Engine
* **Multi-Voice Studio Voices:** Switch between distinct AI speech models and voice character presets (`Kore`, `Puck`, `Zephyr`, `Fenrir`, `Charon`).
* **Speed & Pitch Modulation:** Fine-tune speech rate and pitch parameters.
* **Dual Engine with Fallback:** Uses server-side Gemini Speech Synthesis when active, and seamlessly transitions to direct streaming audio fallback so voice creation never fails or hangs.
* **Valid Audio Export:** Produces non-empty `.wav` / `.mp3` files with actual sound data ready for instant download and offline usage.

### 2. ✍️ AI Text Enhancer & Code Diff Viewer
* **Tone & Style Rewriting:** Refine draft copy, expand notes, rewrite code, or adjust tone to Professional, Creative, Concise, or Technical.
* **Visual Diff Inspector:** Side-by-side and unified diff visualization to easily compare original inputs against AI-suggested rewrites line-by-line.
* **One-Click Copy & Insertion:** Copy diff outputs directly formatted in Markdown or insert them directly into project workflows.

### 3. 🎨 AI Image Studio & Visual Generator
* **Prompt-to-Image Creation:** Generate high-resolution visual assets directly from text prompts powered by Gemini Image models.
* **Style Presets & Aspect Ratios:** Choose from presets like Photorealistic, Minimalist 3D, Anime/Illustration, Cyberpunk, and switch aspect ratios (`1:1`, `16:9`, `9:16`).
* **Canvas Fallback Generator:** Fallback image canvas creation ensures visual creation functions reliably even during strict rate limits.

### 4. 🎵 Integrated Multi-Format Audio Player
* **Waveform Progress Bar:** Interactive audio scrub bar with real-time playback timestamp tracking.
* **Playback Speed & Volume:** Full speed control, mute toggle, and volume sliders.
* **Drag-and-Drop Uploader:** Upload external audio clips (`.mp3`, `.wav`, `.m4a`, `.ogg`) directly into the studio player to inspect metadata and re-listen.

### 5. 📊 Bento Dashboard & Production History
* **Unified Workspace Dashboard:** All-in-one control center featuring quick access cards for Voice Generation, Text Enhancing, and Image Creation.
* **Generation History & Persistence:** Tracks token usage, model choices, prompt parameters, and saved media outputs locally on your device.
* **One-Click Asset Re-download:** Download past generated audio clips and visual outputs at any time from the History panel.
* 




---

## 📺 YouTube Channel & Video Guides

Subscribe to my YouTube channel for feature walk-throughs, video editing tutorials, and development updates for **UltimateCut Pro**!

<p align="left">
  <a href="https://www.youtube.com/@unknown-3amx" target="_blank">
    <img src="https://img.shields.io/badge/Subscribe_on_YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Subscribe on YouTube" />
  </a>
</p>

<div align="center">
  <a href="https://www.youtube.com/@unknown-3amx" target="_blank">
    <img src="https://github.com/user-attachments/assets/b331d652-d8c5-41f0-8f1d-0a492dedb519" alt="YouTube Channel Preview" width="100%" />
  </a>
  <p><i>Click the image above to visit the channel and watch full video guides!</i></p>
</div>

---





# AI Studio Pro — GitHub Project Setup & Installation Prompt

I have created an AI application called **AI Studio Pro**. The application is an AI-powered creative platform that includes features such as AI voice generation from prompts, text-to-speech, AI image generation, text-based AI features, and other AI-powered creative tools.

I want you to prepare and configure this project so that it can be easily installed and run locally from its GitHub repository.

## Technology Stack

The project uses:

* React 19
* Vite
* Express
* TypeScript
* Tailwind CSS v4
* Motion
* Google Gemini AI / `@google/genai` SDK
* Lucide Icons
* Node.js
* npm

## Required Prerequisites

The user should have:

* Node.js v18.0.0 or newer
* npm v9.0.0 or newer
* Git (recommended for cloning the repository)

## Installation Process

The project should support the following installation process.

### 1. Clone the Repository

The user should be able to clone the GitHub repository using:

```bash
git clone <your-repository-url>
cd ai-studio-pro
```

If the user downloaded the project as a ZIP file, they should extract it and open a terminal inside the project folder.

### 2. Install Dependencies

Install all required dependencies with:

```bash
npm install
```

Make sure all required packages for React, Vite, Express, Tailwind CSS, Motion, Google Gemini AI, Lucide Icons, and other project dependencies are correctly defined in `package.json`.

### 3. Configure Environment Variables

The project must include a `.env.example` file.

The user should create their local `.env` file by copying the example:

```bash
cp .env.example .env
```

The `.env` file should contain:

```env
GEMINI_API_KEY="your_gemini_api_key_here"
APP_URL="http://localhost:3000"
```

The `GEMINI_API_KEY` must be used securely on the server side for Gemini AI features, including:

* AI text generation
* AI voice / text-to-speech features
* AI image prompting
* Other Gemini-powered features

Never expose the Gemini API key directly in the browser or client-side JavaScript.

The `APP_URL` should default to:

```env
APP_URL="http://localhost:3000"
```

The application should obtain the Gemini API key from environment variables and should not hard-code API keys anywhere in the source code.

Users can obtain a Gemini API key through Google AI Studio.

### 4. Start the Development Server

The application should use an integrated Express + Vite development server.

Run:

```bash
npm run dev
```

After starting the server, the user should open:

```text
http://localhost:3000
```

The development environment should support hot reloading.

### 5. Build for Production

The project should provide a production build command:

```bash
npm run build
```

This should:

1. Build the Vite frontend.
2. Compile or bundle the TypeScript backend server.
3. Prepare the application for production deployment.

After building, the production server should be started with:

```bash
npm start
```

## Important Requirements

Please ensure that:

1. The project contains a complete and correct `package.json`.
2. All required dependencies are included.
3. The project contains a `.env.example` file.
4. The actual `.env` file is included in `.gitignore`.
5. API keys and secrets are never committed to GitHub.
6. Gemini API requests that require secret credentials are handled securely on the server.
7. `npm install` successfully installs all dependencies.
8. `npm run dev` starts the local development server.
9. The application is available at `http://localhost:3000` during development.
10. `npm run build` successfully creates the production build.
11. `npm start` successfully launches the production server.
12. The project should be compatible with Node.js v18 or newer.
13. The README.md file should contain clear installation, configuration, development, and production instructions.

## Expected README Installation Instructions

Create or update the project's `README.md` with a simple installation guide containing:

### Prerequisites

* Node.js v18+
* npm v9+
* Git
* A Google Gemini API key

### Installation

```bash
git clone <your-repository-url>
cd ai-studio-pro
npm install
```

### Environment Configuration

```bash
cp .env.example .env
```

Then configure:

```env
GEMINI_API_KEY="your_gemini_api_key_here"
APP_URL="http://localhost:3000"
```

### Run Development Mode

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

## Final Goal

The final result should be a clean, reliable, and easy-to-install **AI Studio Pro** GitHub project. A new user should be able to clone or download the project, install dependencies, add their Gemini API key, run one development command, and immediately access the application locally.

