import './globals.css';

export const metadata = {
  title: 'Teste TDAH',
  description: 'Avalie seu nível de atenção e foco de forma profissional e interativa',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="font-sans">{children}</body>
    </html>
  );
}
