
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from './components/context/AuthContext';
const queryClient = new QueryClient();
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId="496767715933-e1408l6j5a7dfn2qvtlvqs538d48emdb.apps.googleusercontent.com">
    <AuthProvider>
      <App />
    </AuthProvider>
    </GoogleOAuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
