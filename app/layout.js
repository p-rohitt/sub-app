"use client";

import "./globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

const noAuthRequired = ["/", "/login", "/createAccount", "/subscriptions","/subscribed"];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthContextProvider>
        {/* {noAuthRequired.includes(usePathname()) ? (
          <body>{children}</body>
        ) : (
          <ProtectedRoute>
            <body>{children}</body>
          </ProtectedRoute>
        )} */}
        <body>{children}</body>
      </AuthContextProvider>
    </html>
  );
}
