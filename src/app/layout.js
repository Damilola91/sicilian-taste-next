import "./globals.css";
import { getSession } from "@/lib/session";
import Navbar from "@/components/Navbar/Navbar";

export default async function RootLayout({ children }) {
  const session = await getSession();

  return (
    <html lang="it">
      <body>
        <Navbar session={session} />
        {children}
      </body>
    </html>
  );
}
