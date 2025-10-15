export default function Home() {
  return (
    <main style={{
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
      backgroundColor: '#f9fafb'
    }}>
      {/* Hero Section */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#2563eb',
        color: 'white',
        textAlign: 'center',
        padding: '0 20px'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
          Descubra se você pode ter TDAH!
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
          Responda 30 perguntas rápidas e receba 2 e-books gratuitos sobre TDAH.
        </p>
        <a 
          href="/teste" 
          style={{
            backgroundColor: 'white',
            color: '#2563eb',
            padding: '15px 30px',
            borderRadius: '8px',
            fontWeight: 'bold',
            textDecoration: 'none',
            fontSize: '1.1rem'
          }}
        >
          Iniciar Teste
        </a>
      </section>

      {/* Benefícios */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '40px' }}>Por que fazer este teste?</h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            width: '250px',
            textAlign: 'center'
          }}>
            <h3>Entenda seus comportamentos</h3>
            <p>Saiba se sinais do seu dia a dia podem estar ligados ao TDAH.</p>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            width: '250px',
            textAlign: 'center'
          }}>
            <h3>Orientação profissional</h3>
            <p>O teste indica se você deve procurar um especialista para avaliação.</p>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            width: '250px',
            textAlign: 'center'
          }}>
            <h3>Receba e-books gratuitos</h3>
            <p>Aprenda mais sobre TDAH com os e-books: Explicando o TDAH e Como o TDAH afeta relacionamentos.</p>
          </div>
        </div>
      </section>

      {/* Garantia */}
      <section style={{
        backgroundColor: '#f3f4f6',
        textAlign: 'center',
        padding: '40px 20px'
      }}>
        <p>🔒 Teste informativo, não substitui avaliação médica. Seus dados são protegidos.</p>
      </section>

      {/* CTA Final */}
      <section style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <a 
          href="/teste" 
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '15px 30px',
            borderRadius: '8px',
            fontWeight: 'bold',
            textDecoration: 'none',
            fontSize: '1.1rem'
          }}
        >
          Começar Teste
        </a>
      </section>
    </main>
  );
}
