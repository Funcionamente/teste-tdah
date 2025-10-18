import './globals.css';

export const metadata = {
  title: 'Teste TDAH',
  description: 'Descubra se você possui traços de TDAH com base em padrões internacionais de saúde mental.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
