# PopX Clone - React Pixel-Perfect Mobile Application

A high-fidelity, polished, and mobile-first clone of the PopX design build with React, Tailwind CSS, and React Router. This project demonstrates strong React fundamentals, dynamic live validations, localStorage data persistence, layout responsiveness, and micro-interactions while remaining simple and accessible for student presentations.

---

## 📱 Live Demo & Project Preview
- **Target Width**: Centered mobile viewport (~375px) on desktop screens, scaling to full-screen on mobile viewports.
- **Visual Design**: Sleek border curves, outline floating label input fields, customized buttons, and a polished user profile experience.

---

## 🛠️ Tech Stack
- **Framework**: [React.js](https://react.dev/) (Vite bundler)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **State Management**: React state hooks (`useState`, `useRef`), utilizing lazy-state initializers to load configurations directly from browser `localStorage`.

---

##  Features & UX Details

###  Dynamic Page Transitions
Subtle fade-in page entry animations triggered automatically when shifting between routes.

### Premium Floating Label Inputs
- **Interactive borders**: Embedded labels resting directly on the border lines.
- **State styling**: Colors animate cleanly (Purple for active/valid, Red for invalid, Gray for default).
- **Password visibility toggles**: Quick hide/show icons in password inputs.

###  Live Validations & Helper Text
Form fields validate dynamically as the user types, displaying neat validation messages and helper text:
- Email formatting checks.
- Password minimum length verification.
- Telephone digits-only input filtering (filters out non-digits immediately).
- Character counter: Live `x / 50` character length counter for the Company Name.

### Loading Spinner States
Clicking "Login" or "Create Account" triggers a 1-second asynchronous loading spinner block to simulate network delay, enhancing UI feedback before navigating.

### SUCCESS Toast Notifications
Temporary success toast alerts appear on registration completion before moving pages.

### Avatar Customization & Initials Fallback
- **Initials generator**: Displays user initials (e.g., Ashwitha Devasani → AD) on a stylized circle background if no custom avatar is present.
- **Image upload capability**: A live base64 encoder updates and persists customized profile pictures directly inside `localStorage` upon clicking the camera icon overlay.

### Data Persistence & Prefill
- Saved profile settings remain persistent after reloading the page.
- Prefills the last-used email address on the Login page using cache values.
- Friendly "No Account Found" fallback state card displays when navigating to Account Settings without being logged in.

---

##  Folder Structure

```
src/
├── components/
│   ├── Button.jsx         # Custom button with loading spinner, disabled & hover states
│   ├── InputField.jsx     # Floating label outline input with live validation, eye toggler, character limits
│   └── Toast.jsx          # Success toast alert element for registration confirmations
│
├── pages/
│   ├── Welcome.jsx        # Landing page with primary and secondary routes
│   ├── Login.jsx          # Account login, dynamic validations, email prefill caching
│   ├── Register.jsx       # Registration form, custom agency radios, character limits
│   └── Account.jsx        # User profile layout, custom initials, avatar file upload, logout option
│
├── App.css                # Unused boilerplate styling (cleaned)
├── App.jsx                # Layout wrapper (375px phone simulation container) and routing configuration
├── index.css              # Tailwind imports, animation keyframes, and global scrollbars
└── main.jsx               # React DOM rendering entrypoint
```

---

##  Installation & Running Locally

Follow these instructions to run the application on your local machine:

### 1. Prerequisites
Make sure you have Node.js (version 18+ recommended) and npm installed.

### 2. Clone and Navigate
```bash
cd EduCaseIndia
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser.

### 5. Production Build
To create an optimized production bundle:
```bash
npm run build
```

---

##  Design Decisions & Implementation Notes
###  No Context / State Libraries
State is managed locally using React state hooks. We utilized **lazy state initialization** (`useState(() => value)`) to load and query data from `localStorage` synchronously during setup. This prevents double rendering, enhances speed, and strictly avoids complex third-party tools like Redux or Context API, making the codebase beginner-friendly.

###  CSS Transitions vs Framer Motion
We chose native CSS animations (`@keyframes`) inside Tailwind rather than adding a heavy animation library. This avoids peer dependency conflicts (especially in newer React versions) and remains highly readable, making it easy to explain.

---

##  Deployment Instructions for Vercel

To host this project on Vercel:

1. Install the Vercel CLI (`npm install -g vercel`) or link your GitHub repository to [Vercel.com](https://vercel.com).
2. Use the following project settings during configuration:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. Click **Deploy**. Vercel will build and serve your static client application on a secure HTTPS server.
