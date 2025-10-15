'use client';
import { useState } from 'react';

export default function TesteTDAH() {
  // Array de 30 perguntas
  const perguntas = [
    { pergunta: 'Você tem dificuldade para se concentrar em tarefas longas?', opcoes: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
    { pergunta: 'Você se distrai facilmente com estímulos externos?', opcoes: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
    { pergunta: 'Você procrastina tarefas importantes?', opcoes: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
    // ... continue até 30 perguntas
  ];

  const [respostas, setRespostas] = useState(Array(perguntas.length).fill(null));

  const handleChange = (index, value) => {
    const newRespostas = [...respostas];
    newRespostas[index] = value;
    setRespostas(newRespostas);
  };

  const handleSubmit = () => {
    if (respostas.includes(null)) {
      alert('Por favor, responda todas as perguntas antes de continuar.');
      return;
    }

    // Calcular pontuação (simples: soma de índices das respostas)
    const pontuacao = respostas.reduce((acc, val) => acc + Number(val), 0);

    // Guardar pontuação e redirecionar para checkout
    localStorage.setItem('pontuacaoTeste', pontuacao);
    window.location.href = '/checkout'; // página que criaremos em seguida
  };

  return (
    <main style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#2563eb' }}>Teste Interativo TDAH</h1>
      {perguntas.map((p, idx) => (
        <div key={idx} style={{ marginBottom: '20px' }}>
          <p><strong>{idx + 1}. {p.pergunta}</strong></p>
          {p.opcoes.map((opcao, i) => (
            <label key={i} style={{ display: 'block', marginBottom: '5px' }}>
              <input 
                type="radio" 
                name={`pergunta-${idx}`} 
                value={i} 
                checked={respostas[idx] == i} 
                onChange={() => handleChange(idx, i)} 
              />
              {' '}{opcao}
            </label>
          ))}
        </div>
      ))}

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button 
          onClick={handleSubmit} 
          style={{ padding: '15px 30px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', cursor: 'pointer' }}
        >
          Concluir Teste
        </button>
      </div>
    </main>
  );
}
