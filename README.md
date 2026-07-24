# ⚡ AI Studio Pro

<p align="center">
  <img src="https://img.shields.io/github/license/edi10r/ai-studio-pro?style=for-the-badge&color=blue" alt="License">
  <img src="https://img.shields.io/github/stars/edi10r/ai-studio-pro?style=for-the-badge&color=gold" alt="Stars">
  <img src="https://img.shields.io/github/forks/edi10r/ai-studio-pro?style=for-the-badge&color=orange" alt="Forks">
  <img src="https://img.shields.io/github/issues/edi10r/ai-studio-pro?style=for-the-badge&color=red" alt="Issues">
  <img src="https://img.shields.io/badge/Maintained%3F-Yes-brightgreen?style=for-the-badge" alt="Maintained">
</p>

<p align="center">
  <b>The ultimate all-in-one studio suite for creators and developers: AI Voice Generation, Text Enhancement with Code Diffing, and AI Image Generation with dynamic token limits.</b>
</p>

<p align="center">
  <a href="#-app-screenshots">Screenshots</a> •
  <a href="#-feature-overview">Features</a> •
  <a href="#-installation--local-setup-guide">Installation</a> •
  <a href="#-contributing--feedback">Contributing</a> •
  <a href="#-connect--subscribe">YouTube Channel</a>
</p>

---

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

---

## 🚀 Installation & Local Setup Guide

### 📋 Prerequisites
Before getting started, make sure you have the following installed on your machine:
* **Node.js** (v18.0.0 or higher recommended)
* **npm** (v9.0.0 or higher) or yarn / pnpm

### Step 1: Clone or Export the Codebase
Open your terminal and run:
```bash
git clone [https://github.com/edi10r/ai-studio-pro.git](https://github.com/edi10r/ai-studio-pro.git)
cd ai-studio-pro
