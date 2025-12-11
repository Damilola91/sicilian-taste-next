import "./globals.css";

import { ReduxProvider } from "@/providers/ReduxProvider";

export default async function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
