# Account Sign-up & Onboarding SPEC (Reconstructed Sample)

> **This is a reconstructed sample for portfolio use.** It uses a fictional creator-content platform called "Beacon" to show how I write full-English specs for global dev teams. All names, rules, numbers, and UI details are fictional. No confidential information from any former employer is included.

| Document Info | |
|---|---|
| Module | Web App > Sign-up & Onboarding |
| Readers | Frontend, Backend, QA |
| Prototype | Axure prototype attached in real work; key screens are described in text in this sample |

## 1. Overview

The first page a visitor sees. The goal is to turn a visitor into a registered user with as few steps as possible.

Sign-up methods:

| Method | Steps |
|---|---|
| E-mail | Enter e-mail → get a 6-digit code by mail → enter code → set username → done |
| Google | Google OAuth → set username (pre-filled from Google name) → done |
| Phone | Enter phone number → get a 6-digit code by SMS → enter code → set username → done |
| Wallet (browser extension) | Connect wallet → sign a one-time message → set username → done |

Main flow (e-mail):

```
Visitor enters e-mail → [Sign Up]
   │
   ├─ E-mail already registered?
   │     ├─ Yes → switch button to [Login], send login code instead
   │     └─ No  → send sign-up code (valid 10 minutes)
   │
   └─ Enter 6-digit code
         ├─ Correct   → go to "Set username" page
         ├─ Wrong     → show error, 5 tries max, then lock this code
         └─ Timeout   → [Resend] button turns on after 60 seconds
```

## 2. Front Page

| Item | Spec |
|---|---|
| Logo | Show product logo. Click to reload the front page. |
| Menu button | Click to open the side menu (About / FAQ / Help, each opens in a new tab on desktop). |
| Headline | "Get access to exclusive chat and content". |
| E-mail field | Placeholder: "Enter your e-mail address". |
| Sign Up button | Click to check format in frontend first, then send the request to backend for the same checks again. Never trust frontend-only checks. |
| Other methods | Click to open a dropdown with Google / Phone / Wallet. |
| Terms line | "By clicking Sign Up, you agree to our Terms of Service and Privacy Policy." Both link to the official site, new tab on desktop. |
| Login line | "Already have an account? Log in" — click to switch the form into login mode and hide the terms line. |
| Hot Creators | Show 10 creators, sorted by follower count (high to low), then by account creation time (new to old). Each card: avatar, background image, display name (fall back to username if empty). |
| New Creators | Show 20 creators, sorted by creation time (new to old). |

## 3. Field Checks and Error Messages

Every field lists its rules and the exact error text, so frontend, backend, and QA all use the same words:

| Field | Rule | Error message |
|---|---|---|
| E-mail | Required | "E-mail is required" |
| E-mail | Must match e-mail format | "Please enter a valid e-mail address" |
| Verify code | 6 digits, valid 10 minutes | "This code has expired. Please resend." |
| Verify code | Max 5 wrong tries per code | "Too many tries. Please resend a new code." |
| Username | Required | "Username cannot be empty" |
| Username | 3–32 characters, letters / numbers / underscore only | "Username should be 3 to 32 characters, letters, numbers, or underscore only" |
| Username | Must not equal an existing username (case-insensitive) | "Please try another username. This one has been used." |
| Phone | Country code required, number checked by country rule | "Please enter a valid phone number" |

Notes:

- Username check is case-insensitive: "Anton" and "anton" are the same name.
- The resend button shows a 60-second countdown. Max 5 sends per e-mail/phone per hour; after that show "Too many requests. Please try again later."

## 4. Set Username Page

| Item | Spec |
|---|---|
| Username field | Placeholder: "Enter username". Pre-filled from Google display name when using Google sign-up (strip illegal characters; if empty after stripping, leave blank). |
| Register button | Click to finish sign-up and go to the Discover page. |
| Cancel button | Click to drop the sign-up and go back to the front page. The verified e-mail/phone is NOT registered in this case. |

## 5. Edge Cases (Q&A)

1. **User closes the tab after the code is verified but before setting a username?**
   → The account is not created. Next time the same e-mail signs up again from the start.
2. **Google account has no display name?**
   → Username field starts empty. User must type one.
3. **Two users submit the same username at the same time?**
   → Backend unique check decides. The slower one gets the "has been used" error.
4. **User signs up with e-mail, then later uses Google login with the same e-mail?**
   → Treat as the same account. Log the user in and link Google to it. Show a one-time toast: "Google account linked."
5. **Wallet user disconnects the wallet later?**
   → The account stays. Ask the user to bind an e-mail before disconnecting, so the account is not lost.
