export const metadata = {
  title: 'Teste TDAH',
  description: 'Teste interativo para identificar sinais de TDAH',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', backgroundColor: '#f3f4f6' }}>
        {children}
      </body>
    </html>
  );
}
