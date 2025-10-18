import "./globals.css";

export const metadata = {
  title: "Teste TDAH",
  description: "Avalie seu nível de atenção e foco de forma profissional e interativa para saber se possui traços de TDAH",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen text-white antialiased">
        {children}
      </body>
    </html>
  );
}
