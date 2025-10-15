'use client'; // Necessário para permitir interatividade

export default function Home() {
  return (
    <main style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
      
      {/* Hero Section */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #2563eb, #60a5fa)',
        color: 'white',
        textAlign: 'center',
        padding: '0 20px'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: 'bold' }}>
          Descubra se você pode ter TDAH
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
          Responda 30 perguntas criadas seguindo <strong>normas de saúde reconhecidas</strong> e receba dois e-books gratuitos.
        </p>
        <a 
          href="/teste" 
          style={{
            backgroundColor: 'white',
            color: '#2563eb',
            padding: '15px 30px',
            borderRadius: '12px',
            fontWeight: 'bold',
            textDecoration: 'none',
            fontSize: '1.2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
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
        <h2 style={{ fontSize: '2rem', marginBottom: '40px', textAlign: 'center' }}>Por que fazer este teste?</h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            width: '250px',
            textAlign: 'center'
          }}>
            <h3>Entenda seus comportamentos</h3>
            <p>Saiba se sinais do dia a dia podem estar ligados ao TDAH.</p>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            width: '250px',
            textAlign: 'center'
          }}>
            <h3>Orientação profissional</h3>
            <p>O teste indica se você deve procurar um especialista para avaliação.</p>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            width: '250px',
            textAlign: 'center'
          }}>
            <h3>Receba e-books gratuitos</h3>
            <p>Aprenda mais sobre TDAH com os e-books: <strong>Explicando o TDAH</strong> e <strong>Como o TDAH afeta relacionamentos</strong>.</p>
          </div>
        </div>
      </section>

      {/* Garantia / Credibilidade */}
      <section style={{
        backgroundColor: '#f3f4f6',
        textAlign: 'center',
        padding: '40px 20px',
        fontSize: '1rem',
        color: '#333'
      }}>
        <p>🔒 Este teste é apenas informativo, criado seguindo normas de saúde reconhecidas e não substitui avaliação médica profissional. Seus dados são totalmente protegidos.</p>
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
            borderRadius: '12px',
            fontWeight: 'bold',
            textDecoration: 'none',
            fontSize: '1.2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Começar Teste
        </a>
      </section>
    </main>
  );
}
