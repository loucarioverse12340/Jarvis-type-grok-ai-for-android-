# JARVIS Grok Assistant

Android + Node/Express backend using xAI's Grok API.

## Architecture
Android app -> your backend -> xAI Grok API

The xAI API key is NEVER placed in the Android APK. Set `XAI_API_KEY` on the backend.

## Backend
Requirements: Node.js 20+

```bash
cd backend
npm install
cp .env.example .env
# Put your xAI key in .env
npm start
```

Default backend URL: `http://10.0.2.2:8787` for the Android emulator.
For a physical phone, replace `API_BASE_URL` in `android/app/build.gradle.kts` with the LAN URL of the computer running the backend (for example `http://192.168.1.20:8787/`). Both devices must be on the same network.

## Android
Open the `android` folder in Android Studio, sync Gradle, connect an Android device/emulator, then Run.

Grant microphone and notification permissions. Press Start Assistant, then Listen.

## Notes
- The app uses Android SpeechRecognizer + TextToSpeech locally.
- Grok handles the conversational response.
- The app includes safe local actions for time/date, opening YouTube/Chrome, and web search.
- No hidden recording: microphone use is user-controlled and the assistant uses an Android foreground service.
