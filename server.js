import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(express.json({limit:'256kb'}));

const client = new OpenAI({apiKey: process.env.XAI_API_KEY, baseURL:'https://api.x.ai/v1'});
const model = 'grok-4.6';

app.get('/health', (_, res) => res.json({ok:true, model}));

app.post('/chat', async (req,res) => {
  try {
    if (!process.env.XAI_API_KEY) return res.status(500).json({error:'XAI_API_KEY is not configured on the backend.'});
    const messages = Array.isArray(req.body.messages) ? req.body.messages.slice(-20) : [];
    if (!messages.length) return res.status(400).json({error:'messages is required'});
    const system = {
      role:'system',
      content:'You are JARVIS, a concise, helpful phone assistant. Be friendly and natural when speaking aloud. Do not claim to have performed a phone action unless the Android app actually reports that it did. Keep spoken responses reasonably short.'
    };
    const response = await client.chat.completions.create({model, messages:[system,...messages], temperature:0.7});
    res.json({text:response.choices?.[0]?.message?.content ?? 'I could not generate a response.'});
  } catch (e) {
    console.error(e);
    res.status(500).json({error:e?.message || 'Grok request failed'});
  }
});

app.listen(process.env.PORT || 8787, '0.0.0.0', () => console.log(`JARVIS backend listening on ${process.env.PORT || 8787}`));
