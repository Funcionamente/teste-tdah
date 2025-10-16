export default function Home() {
  return (
    <main style={{
      fontFamily: 'Inter, Arial, sans-serif',
      backgroundColor: '#f9fafb',
      color: '#111827',
      lineHeight: 1.6
    }}>
      {/* HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
        color: 'white',
        textAlign: 'center',
        padding: '100px 20px'
      }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '20px', fontWeight: 'bold' }}>
          Descubra se você pode ter TDAH
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 30px' }}>
          Um teste rápido e gratuito, desenvolvido com base em protocolos internacionais de triagem em saúde mental.
          Receba também 2 e-books exclusivos sobre o TDAH.
        </p>
        <a
          href="/teste"
          style={{
            backgroundColor: 'white',
            color: '#2563eb',
            padding: '15px 35px',
            borderRadius: '10px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            textDecoration: 'none',
            transition: '0.3s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#f3f4f6')}
          onMouseOut={(e) => (e.target.style.backgroundColor = 'white')}
        >
          Fazer o teste agora
        </a>
      </section>

      {/* IDENTIFICAÇÃO — "VOCÊ JÁ SE PERGUNTOU..." */}
      <section style={{
        textAlign: 'center',
        padding: '80px 20px',
        backgroundColor: 'white'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: '#1f2937' }}>
          Você já se perguntou por que...
        </h2>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          fontSize: '1.1rem',
          color: '#374151'
        }}>
          <p>… tem dificuldade em manter o foco por muito tempo?</p>
          <p>… começa várias tarefas mas raramente as conclui?</p>
          <p>… se sente sobrecarregado facilmente ou esquece compromissos importantes?</p>
          <p>Esses podem ser sinais de <strong>Traços de TDAH (Transtorno de Déficit de Atenção e Hiperatividade)</strong> — 
          um padrão de funcionamento cerebral que afeta milhões de adultos em todo o mundo.</p>
        </div>
      </section>

      {/* SOBRE O TDAH */}
      <section style={{
        backgroundColor: '#f3f4f6',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>O que é o TDAH?</h2>
          <p style={{ fontSize: '1.1rem', color: '#374151' }}>
            O TDAH é um transtorno neurobiológico caracterizado por sintomas de desatenção, impulsividade e hiperatividade. 
            Ele pode afetar o desempenho no trabalho, nos estudos e nas relações pessoais — mas é totalmente possível 
            aprender a gerenciar e equilibrar esses traços com orientação adequada.
          </p>
        </div>
      </section>

      {/* IMAGEM DO RESULTADO */}
      <section style={{
        textAlign: 'center',
        padding: '60px 20px'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Exemplo do resultado do teste</h2>
        <img
          src="https://via.placeholder.com/700x400.png?text=Exemplo+do+Resultado+do+Teste"
          alt="Exemplo do resultado do teste"
          style={{
            width: '100%',
            maxWidth: '700px',
            borderRadius: '12px',
            boxShadow: '0 6px 15px rgba(0,0,0,0.1)'
          }}
        />
      </section>

      {/* BENEFÍCIOS */}
      <section style={{
        padding: '80px 20px',
        backgroundColor: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '40px' }}>Por que fazer o teste?</h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          justifyContent: 'center'
        }}>
          {[
            {
              title: 'Entenda seus padrões mentais',
              desc: 'Descubra se seus desafios diários estão ligados a traços de TDAH.'
            },
            {
              title: 'Orientação profissional',
              desc: 'Saiba quando é importante procurar um especialista para uma avaliação completa.'
            },
            {
              title: 'Receba e-books gratuitos',
              desc: 'Ganhe acesso a 2 materiais exclusivos sobre TDAH e autoconhecimento.'
            }
          ].map((item, index) => (
            <div key={index} style={{
              backgroundColor: '#f9fafb',
              padding: '25px',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
              width: '260px'
            }}>
              <h3 style={{ marginBottom: '10px', color: '#1f2937' }}>{item.title}</h3>
              <p style={{ color: '#4b5563' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section style={{
        backgroundColor: '#f3f4f6',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '40px' }}>O que dizem as pessoas que já fizeram o teste</h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          justifyContent: 'center'
        }}>
          {[
            {
              name: 'Mariana S.',
              text: '“Achei o teste extremamente esclarecedor. Foi o ponto de partida para eu buscar diagnóstico e melhorar minha rotina.”'
            },
            {
              name: 'Lucas R.',
              text: '“O resultado fez muito sentido pra mim. Percebi que não era preguiça, mas um padrão que precisava entender melhor.”'
            },
            {
              name: 'Camila T.',
              text: '“Adorei o material e a explicação. Tudo é muito didático e acolhedor.”'
            }
          ].map((dep, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
              width: '280px'
            }}>
              <p style={{ fontStyle: 'italic', color: '#374151' }}>{dep.text}</p>
              <p style={{ marginTop: '15px', fontWeight: 'bold', color: '#2563eb' }}>{dep.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GARANTIA E CREDIBILIDADE */}
      <section style={{
        backgroundColor: '#1e293b',
        color: 'white',
        textAlign: 'center',
        padding: '60px 20px'
      }}>
        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1rem' }}>
          Este teste foi desenvolvido seguindo padrões internacionais de triagem em saúde mental e respeita as normas éticas e de privacidade. 
          É uma ferramenta informativa e não substitui diagnóstico médico ou psicológico.
        </p>
      </section>

      {/* CTA FINAL */}
      <section style={{
        textAlign: 'center',
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
        color: 'white'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>
          Dê o primeiro passo para entender melhor sua mente
        </h2>
        <a
          href="/teste"
          style={{
            backgroundColor: 'white',
            color: '#2563eb',
            padding: '15px 35px',
            borderRadius: '10px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            textDecoration: 'none',
          }}
        >
          Fazer o teste agora
        </a>
      </section>
    </main>
  );
}
