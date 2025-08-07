# FitRang – Main

This is the official web interface for **FitRang**, a fashion-tech platform that makes shopping more personalized.

Built with **React**, it interacts with various backend services via a centralized API Gateway (Kong), and supports real-time features through WebSocket connections.

---

## 🧠 Features

- 📄 Dossier Creation and Sharing
- 🔔 Real-time Notifications using WebSockets
- 📊 Profile Analytics powered by GPT-based prompts
- 📋 Profile Customization (Skin tone, body type, face type, etc.)
- 🛂 Secure Authentication via Keycloak
- 🌐 Seamless integration with Chrome Extension for profile sync

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
cd fitrang-ui
````

### 2. Install Dependencies

```bash
npm install
# or
yarn
```

### 3. Environment Configuration

Create a `.env` file in the root:

Update values based on your deployment.

---

## 🖥️ Running the App

```bash
npm run dev
# or
yarn run dev
```

The app will run on [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication Flow

* Auth is handled via **Keycloak**.
* On login, access & refresh tokens are stored in memory or cookie.
* Token refresh is handled using the `/refresh` endpoint.
* API requests go through **Kong** and use bearer tokens for authorization.

---

## 📡 WebSocket Notifications

1. Client makes a request to `/notification/session` to receive a session ID.
2. Session ID is stored and used to connect to WebSocket at `/notification-ws`.
3. On connection, server retrieves the user ID from Redis using session ID.

---

## 🧪 Development Tips

* Run with dev backend (Docker/Kubernetes): `REACT_APP_API_BASE_URL=http://localhost:8000`
* CORS is handled via the Kong `cors` plugin.
* Connect Chrome extension using its ID in the env file.

---

## 🧱 Dependencies

* **React** + **TypeScript**
* **Axios** – API calls
* **React Router** – Routing
* **Tailwind CSS** – Styling
* **Socket.IO / native WebSocket** – Real-time communication
* **Keycloak JS Adapter** – Auth integration

---

## 📦 Build for Production

```bash
npm run build
# or
yarn build
```

Then serve using:

```bash
npx serve -s build
```

---

## 🔐 Security Notes

* All API traffic goes through the **Kong Gateway**
* Sensitive endpoints require valid JWT tokens
* WebSocket connection uses a session-ID-based auth mechanism for safety

