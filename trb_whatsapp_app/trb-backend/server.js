require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN; 
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

app.post('/api/disparar', async (req, res) => {
    const { contatos, templateName } = req.body;
    
    try {
        const resultados = await Promise.all(contatos.map(async (contato) => {
            const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;
            
            const payload = {
                messaging_product: "whatsapp",
                to: contato.telefone,
                type: "template",
                template: {
                    name: templateName,
                    language: { code: "pt_BR" },
                    components: [
                        {
                            type: "body",
                            parameters: [
                                { type: "text", text: contato.nome } 
                            ]
                        }
                    ]
                }
            };

            const response = await axios.post(url, payload, {
                headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` }
            });
            
            return { telefone: contato.telefone, status: 'Enviado', meta_id: response.data.messages[0].id };
        }));

        res.status(200).json({ sucesso: true, relatorio: resultados });
        
    } catch (error) {
        console.error("Erro na API:", error.response?.data || error.message);
        res.status(500).json({ sucesso: false, erro: 'Falha no disparo.' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
