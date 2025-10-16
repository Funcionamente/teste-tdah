import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Teste TDAH",
  description: "Avalie seu nível de atenção e foco de forma profissional e interativa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className={inter.variable}>
      <body className="font-inter">{children}</body>
    </html>
  );
}
