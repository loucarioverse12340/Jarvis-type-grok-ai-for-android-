# Phone-only build guide

This package is designed so you can build the Android APK from an Android phone without installing Android Studio.

## What you need

- An Android phone with a browser
- A GitHub account
- This project ZIP

## Build from your phone

1. Create a new GitHub repository in your browser.
2. Extract this ZIP on your phone using your file manager.
3. Upload the **contents of the `JARVIS-Grok-Assistant` folder** to the GitHub repository. Make sure `.github/workflows/build-apk.yml` is uploaded too. If your file manager hides dot-folders, enable hidden files before uploading.
4. Open the repository's **Actions** tab.
5. Select **Build JARVIS APK**.
6. Tap **Run workflow**.
7. Wait for the workflow to finish successfully.
8. Open the completed workflow run and download the **JARVIS-debug-apk** artifact.
9. Extract the downloaded artifact if necessary, then tap `app-debug.apk`.
10. Android may ask you to allow your browser/file manager to install unknown apps. Only allow this for the app you trust and turn the permission back off afterward if you don't need it.
11. Install the APK.

## Important: Grok backend

The APK does **not** contain an xAI API key. The app talks to the backend defined by `API_BASE_URL` in `android/app/build.gradle.kts`.

The default URL is:

    http://10.0.2.2:8787/

That address is for an Android emulator talking to a computer, so it will **not** work on a normal phone by itself.

For a real phone, the backend must be hosted at a reachable HTTPS URL. After you have a backend URL, change the `API_BASE_URL` BuildConfig value, commit the change, and run the GitHub Actions workflow again.

## Why use GitHub Actions?

Android's normal Gradle/Android build toolchain is desktop-oriented. The workflow provides a clean Linux build machine while letting you do the entire process from your phone.

## Safety / privacy

Do not put your xAI API key into the Android source code or APK. Keep it in the backend's server-side environment.
