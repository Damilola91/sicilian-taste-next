import "./globals.css";
import { getSession } from "@/lib/session";
import Navbar from "@/components/Navbar/Navbar";
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
