import './globals.css';

export const metadata = {
  title: 'Teste TDAH',
  description: 'Avalie seu nível de atenção e foco de forma profissional e interativa, para identificar sinais de TDAH',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="font-sans bg-gradient-to-b from-indigo-50 via-white to-pink-50">
        {children}
      </body>
    </html>
  );
}
