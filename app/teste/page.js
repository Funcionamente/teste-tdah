'use client';
import { useState } from 'react';

export default function TesteTDAH() {
  // 30 perguntas exemplo
  const perguntas = [
    { pergunta: 'Você tem dificuldade para se concentrar em tarefas longas?', opcoes: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
    { pergunta: 'Você se distrai facilmente com estímulos externos?', opcoes: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
    { pergunta: 'Você procrastina tarefas importantes?', opcoes: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] },
    // Complete até 30 perguntas
  ];

  const [respostas, setRespostas] = useState(Array(perguntas.length).fill(null));
  const [indice, setIndice] = useState(0);

  const handleChange = (value) => {
    const newRespostas = [...respostas];
    newRespostas[indice] = value;
    setRespostas(newRespostas);
  };

  const handleNext = () => {
    if (respostas[indice] === null) {
      alert('Por favor, selecione uma opção antes de continuar.');
      return;
    }
    if (indice < perguntas.length - 1) setIndice(indice + 1);
  };

  const handlePrev = () => {
    if (indice > 0) setIndice(indice - 1);
  };

  const handleSubmit = () => {
    if (respostas[indice] === null) {
      alert('Por favor, selecione uma opção antes de concluir.');
      return;
    }
    // Calcular pontuação
    const pontuacao = respostas.reduce((acc, val) => acc + Number(val), 0);
    localStorage.setItem('pontuacaoTeste', pontuacao);
    window.location.href = '/checkout';
  };

  return (
    <main style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#2563eb', marginBottom: '30px' }}>Teste Interativo TDAH</h1>

      <div style={{ marginBottom: '20px' }}>
        <p><strong>{indice + 1}. {perguntas[indice].pergunta}</strong></p>
        {perguntas[indice].opcoes.map((opcao, i) => (
          <label key={i} style={{ display: 'block', marginBottom: '10px' }}>
            <input
              type="radio"
              name={`pergunta-${indice}`}
              value={i}
              checked={respostas[indice] == i}
              onChange={() => handleChange(i)}
            />{' '}
            {opcao}
          </label>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        {indice > 0 ? (
          <button onClick={handlePrev} style={{ padding: '10px 20px', backgroundColor: '#ddd', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            Voltar
          </button>
        ) : <div></div>}

        {indice < perguntas.length - 1 ? (
          <button onClick={handleNext} style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            Seguinte
          </button>
        ) : (
          <button onClick={handleSubmit} style={{ padding: '10px 20px', backgroundColor: '#16a34a', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            Concluir Teste
          </button>
        )}
      </div>
    </main>
  );
}
