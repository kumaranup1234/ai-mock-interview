
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import {createRoot} from "react-dom/client";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey={clerkPublishableKey}>
        <App />
    </ClerkProvider>
);
