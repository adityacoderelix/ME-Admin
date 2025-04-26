import "./globals.css";
import { bricolage, poppins } from "./fonts";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata = {
  title: "Admin Panel | Majestic Escape",
  description:
    "Welcome, Admin. Check what's happening with Majestic Escape today",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${poppins.variable}`}>
      <body className="bg-white text-gray-800 antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
