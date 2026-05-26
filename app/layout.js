import './globals.css';

export const metadata = {
  title: 'Questionário de Autoavaliação',
  description: 'Um questionário rápido e informativo para explorar padrões de atenção e comportamento.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
