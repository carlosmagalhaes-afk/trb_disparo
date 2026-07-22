import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [template, setTemplate] = useState('trb_evento_lembrete');
  const [loading, setLoading] = useState(false);

  // Lembrete: Troque a URL abaixo pela URL gerada no Render.
  // Exemplo: const API_URL = 'https://trb-backend.onrender.com/api/disparar';
  const API_URL = 'http://localhost:3001/api/disparar'; 

  const contatosSelecionados = [
    { nome: 'Dr. Roberto', telefone: '5511999999999' },
    { nome: 'Dra. Camila', telefone: '5511888888888' }
  ];

  const realizarDisparo = async () => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, {
        contatos: contatosSelecionados,
        templateName: template
      });
      alert(`Sucesso! ${response.data.relatorio.length} mensagens enviadas.`);
    } catch (error) {
      console.error(error);
      alert('Erro ao disparar as mensagens. Verifique o console e a URL do backend.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        
        <h1 className="text-2xl font-bold text-blue-900 mb-6">TRB Disparos - WhatsApp</h1>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Template da Mensagem</label>
          <select 
            value={template} 
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="trb_evento_lembrete">Lembrete de Evento (Amanhã)</option>
            <option value="trb_evento_convite">Convite Oficial TRB</option>
          </select>
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-700 mb-2">Contatos Selecionados ({contatosSelecionados.length})</h2>
          <ul className="bg-gray-100 p-4 rounded text-sm text-gray-600">
            {contatosSelecionados.map((medico, index) => (
              <li key={index}>✅ {medico.nome} - {medico.telefone}</li>
            ))}
          </ul>
        </div>

        <button 
          onClick={realizarDisparo}
          disabled={loading}
          className={`w-full text-white font-bold py-3 px-4 rounded ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {loading ? 'Disparando...' : 'Iniciar Disparo para Médicos'}
        </button>

      </div>
    </div>
  );
}
