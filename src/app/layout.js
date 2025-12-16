import "./globals.css";

import { ReduxProvider } from "@/providers/ReduxProvider";

export default async function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className="min-h-screen flex flex-col bg-white">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
