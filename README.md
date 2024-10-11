## Chat Application

A responsive real-time chat application built with **React**, **Tailwind CSS**, and **Firebase**. This app allows users to authenticate, send, and receive messages in real-time with a seamless experience on both mobile and desktop devices.

** Live link ** - https://chat-app-46dp.vercel.app/chat

## Features

- **User Authentication**: User sign-in and sign-out using Firebase Authentication.
- **Real-Time Messaging**: Send and receive messages in real-time using Firebase Firestore.
- **Responsive Design**: Optimized for both desktop and mobile screens using Tailwind CSS.
- **Chat List & Chat Box Views**:
  - On larger screens (desktop), the chat list is always visible on the left, while the selected conversation is displayed on the right.
  - On mobile, users can switch between the chat list and the chat box using a back button for smooth navigation.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Firebase (Firestore for real-time data and Firebase Authentication)
- **Hosting**: Vercel for frontend, Firebase for backend

## Getting Started

### Prerequisites

- Node.js installed on your local machine
- Firebase project set up with Firestore and Firebase Authentication

### Installation

1. Clone the repository:

   \`\`\`bash
   git clone https://github.com/SawantAchal/chat-app.git
   cd chat-app
   \`\`\`

2. Install dependencies:

   \`\`\`bash
   npm install
   \`\`\`

3. Set up Firebase:

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore and Firebase Authentication.
   - Go to **Project Settings** and get your Firebase config object.
   - Create a \`.env\` file at the root of your project and add your Firebase config values:

     \`\`\`bash
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     \`\`\`

4. Run the development server:

   \`\`\`bash
   npm run dev
   \`\`\`

   Your app should now be running on \`http://localhost:3000\`.

### Firebase Configuration

- Make sure you have the correct Firebase config in your \`.env\` file for both local development and production environments.
- For deployment, you may need to add the Firebase environment variables in your Vercel project settings.

## Deployment

To deploy your frontend to Vercel:

1. Push your code to GitHub or any Git repository.
2. Go to [Vercel](https://vercel.com/), import your repository, and follow the instructions to deploy.
3. Set up the necessary environment variables in your Vercel dashboard for Firebase.

To deploy Firebase backend services:

1. Set up Firebase Hosting if you need it for backend APIs or Firestore rules.
2. Follow the Firebase deployment guide by running:

   \`\`\`bash
   firebase deploy
   \`\`\`

## Usage

- **Desktop**: The chat list is always visible on the left. Clicking on a chat opens the chat box on the right side.
- **Mobile**: Tapping a chat in the chat list opens the chat box. A back arrow in the chat box navigates back to the chat list.

## Troubleshooting

### Common Errors

- **Firebase API Key Invalid**: Make sure your \`.env\` file has the correct Firebase config values.
- **Chat List Not Rendering on Mobile**: Ensure that the \`chatVisible\` state is correctly set in the mobile view logic.

