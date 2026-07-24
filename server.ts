import { GoogleGenAI, Modality, Type } from "@google/genai";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// Helper to safely obtain GoogleGenAI client
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// ----------------------------------------------------
// 1. Health Endpoint
// ----------------------------------------------------
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// ----------------------------------------------------
// 2. AI Text Enhancer & Corrector API
// ----------------------------------------------------
app.post("/api/text/enhance", async (req, res) => {
  try {
    const { action, text, tone, targetLanguage } = req.body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "Text prompt is required" });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.status(503).json({
        error: "GEMINI_API_KEY is missing in server environment.",
        fallbackAvailable: true,
      });
    }

    if (action === "grammar") {
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `You are an expert English grammar & spelling corrector.
Analyze the following text, fix all grammatical, spelling, punctuation, and stylistic errors, while maintaining the author's original message and voice.

Return a JSON object strictly matching this schema:
{
  "originalText": "...",
  "enhancedText": "...",
  "corrections": [
    { "original": "mistake", "fixed": "correction", "reason": "why it was fixed" }
  ]
}

Text to review:
"""${text}"""`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              originalText: { type: Type.STRING },
              enhancedText: { type: Type.STRING },
              corrections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    original: { type: Type.STRING },
                    fixed: { type: Type.STRING },
                    reason: { type: Type.STRING },
                  },
                },
              },
            },
            required: ["originalText", "enhancedText", "corrections"],
          },
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({
        action: "grammar",
        originalText: text,
        enhancedText: parsed.enhancedText || text,
        corrections: parsed.corrections || [],
      });
    }

    if (action === "tone") {
      const selectedTone = tone || "Professional";
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Rewrite the following text to embody a "${selectedTone}" tone.
Ensure the core message is preserved while adjusting vocabulary, cadence, and style to perfectly match the "${selectedTone}" style.

Text to rewrite:
"""${text}"""`,
        config: {
          systemInstruction:
            "Provide only the rewritten text directly without conversational intro or meta commentary.",
        },
      });

      return res.json({
        action: "tone",
        toneUsed: selectedTone,
        originalText: text,
        enhancedText: response.text?.trim() || text,
        corrections: [],
      });
    }

    if (action === "summarize") {
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Summarize the following content concisely and extract 3-5 key bullet takeaways.

Return a JSON object:
{
  "enhancedText": "a high-level concise summary paragraph",
  "takeaways": ["takeaway 1", "takeaway 2", "takeaway 3"]
}

Text to summarize:
"""${text}"""`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              enhancedText: { type: Type.STRING },
              takeaways: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ["enhancedText", "takeaways"],
          },
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({
        action: "summarize",
        originalText: text,
        enhancedText: parsed.enhancedText || text,
        takeaways: parsed.takeaways || [],
        corrections: [],
      });
    }

    if (action === "translate") {
      const lang = targetLanguage || "Spanish";
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Translate the following text into ${lang}. Maintain the tone, nuance, and formatting of the original.

Text:
"""${text}"""`,
        config: {
          systemInstruction:
            "Provide only the direct translation without extra notes.",
        },
      });

      return res.json({
        action: "translate",
        targetLanguage: lang,
        originalText: text,
        enhancedText: response.text?.trim() || text,
        corrections: [],
      });
    }

    return res.status(400).json({ error: `Unknown action: ${action}` });
  } catch (error: any) {
    console.error("Error in /api/text/enhance:", error);
    return res.status(500).json({
      error: error.message || "Failed to process text enhancement request.",
    });
  }
});

// ----------------------------------------------------
// 3. AI Voice Generator (TTS) API
// ----------------------------------------------------
app.post("/api/voice/generate", async (req, res) => {
  try {
    const { text, voiceName, speed = 1.0, pitch = 0 } = req.body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "Text is required for TTS" });
    }

    const ai = getGenAI();
    let audioPartData = "";
    let mimeType = "audio/wav";
    const validVoices = ["Kore", "Puck", "Zephyr", "Fenrir", "Charon"];
    const chosenVoice = validVoices.includes(voiceName) ? voiceName : "Kore";

    if (ai) {
      const ttsModels = ["gemini-3.1-flash-tts-preview"];

      for (const modelName of ttsModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: [{ parts: [{ text }] }],
            config: {
              responseModalities: [Modality.AUDIO],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: chosenVoice },
                },
              },
            },
          });

          const candidate = response.candidates?.[0];
          const audioPart = candidate?.content?.parts?.find((p: any) => p.inlineData);

          if (audioPart?.inlineData?.data) {
            audioPartData = audioPart.inlineData.data;
            mimeType = audioPart.inlineData.mimeType || "audio/wav";
            break;
          }
        } catch (err: any) {
          const isQuota = err?.status === 429 || err?.message?.includes("429") || err?.message?.includes("RESOURCE_EXHAUSTED");
          if (isQuota) {
            console.log(`Gemini TTS free tier quota reached for ${modelName}. Seamlessly switching to voice audio stream engine.`);
          } else {
            console.log(`TTS Model ${modelName} notice:`, err?.message || err);
          }
        }
      }
    }

    if (!audioPartData) {
      // Direct stream fallback via Google Translate TTS audio endpoint
      try {
        const encodedText = encodeURIComponent(text.slice(0, 200));
        const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=en&client=tw-ob`;
        const ttsRes = await fetch(ttsUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          },
        });

        if (ttsRes.ok) {
          const arrayBuffer = await ttsRes.arrayBuffer();
          if (arrayBuffer.byteLength > 0) {
            audioPartData = Buffer.from(arrayBuffer).toString("base64");
            mimeType = "audio/mp3";
          }
        }
      } catch (fallbackErr) {
        console.warn("Google Translate TTS fallback error:", fallbackErr);
      }
    }

    if (audioPartData) {
      return res.json({
        audioBase64: audioPartData,
        mimeType,
        sampleRate: 24000,
        voiceName: chosenVoice,
        text,
      });
    } else {
      return res.status(500).json({
        error: "No audio stream generated.",
        fallbackAvailable: true,
      });
    }
  } catch (error: any) {
    console.error("Error in /api/voice/generate:", error);
    return res.status(500).json({
      error: error.message || "Failed to generate voice audio.",
      fallbackAvailable: true,
    });
  }
});

// ----------------------------------------------------
// 4. AI Image Generator API
// ----------------------------------------------------
app.post("/api/image/generate", async (req, res) => {
  try {
    const { prompt, negativePrompt, style, aspectRatio = "1:1" } = req.body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.status(503).json({
        error: "GEMINI_API_KEY is missing in server environment.",
        fallbackAvailable: true,
      });
    }

    let fullPrompt = prompt;
    if (style && style !== "None") {
      fullPrompt = `${prompt}, in ${style} style, high detail, masterpiece, 8k resolution`;
    }
    if (negativePrompt && negativePrompt.trim()) {
      fullPrompt += `. Avoid: ${negativePrompt.trim()}`;
    }

    const supportedRatios = ["1:1", "3:4", "4:3", "9:16", "16:9"];
    const ratio = supportedRatios.includes(aspectRatio) ? aspectRatio : "1:1";

    let imageUrl = "";

    // Primary: Try Imagen 3 model first
    try {
      const imgRes = await ai.models.generateImages({
        model: "imagen-3.0-generate-002",
        prompt: fullPrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: "image/jpeg",
          aspectRatio: ratio as any,
        },
      });

      const firstImage = imgRes.generatedImages?.[0]?.image?.imageBytes;
      if (firstImage) {
        imageUrl = `data:image/jpeg;base64,${firstImage}`;
      }
    } catch {
      // Imagen 3 model unavailable or quota reached; failover to secondary or tertiary
    }

    // Secondary: Try gemini-3.1-flash-lite-image model if Imagen did not return image
    if (!imageUrl) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite-image",
          contents: {
            parts: [{ text: fullPrompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: ratio as any,
            },
          },
        });

        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const mime = part.inlineData.mimeType || "image/png";
              imageUrl = `data:${mime};base64,${part.inlineData.data}`;
              break;
            }
          }
        }
      } catch {
        // Flash Lite image model quota reached; failover to high quality Pollinations AI engine
      }
    }

    // Tertiary: Fallback to high-quality Pollinations AI image generator if Gemini quotas are exceeded
    if (!imageUrl) {
      const seed = Math.floor(Math.random() * 1000000);
      let width = 1024;
      let height = 1024;
      if (ratio === "16:9") { width = 1280; height = 720; }
      else if (ratio === "9:16") { width = 720; height = 1280; }
      else if (ratio === "4:3") { width = 1024; height = 768; }
      else if (ratio === "3:4") { width = 768; height = 1024; }

      imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=${width}&height=${height}&seed=${seed}&nologo=true`;
    }

    return res.json({
      imageUrl,
      prompt,
      style,
      aspectRatio: ratio,
    });
  } catch {
    const seed = Math.floor(Math.random() * 1000000);
    const fallbackImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(req.body?.prompt || "artwork")}` +
      `?width=1024&height=1024&seed=${seed}&nologo=true`;

    return res.json({
      imageUrl: fallbackImageUrl,
      prompt: req.body?.prompt || "artwork",
      style: req.body?.style || "Photorealistic",
      aspectRatio: req.body?.aspectRatio || "1:1",
    });
  }
});

// ----------------------------------------------------
// Vite Server Integration
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Studio Pro server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
