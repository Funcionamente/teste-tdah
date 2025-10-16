export const metadata = {
  title: 'Teste TDAH',
  description: 'Avalie seu nível de atenção e foco de forma profissional e interativa, para identificar sinais de TDAH',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', backgroundColor: '#f3f4f6'}}>
        {children}
      </body>
    </html>
  );
}
