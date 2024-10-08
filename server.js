import express from "express";
import { PrismaClient } from '@prisma/client';
import cors from 'cors'; 

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'https://projeto-integrador-2-kappa.vercel.app'], // Permitir requisições do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true // Se você precisar de cookies ou autenticação
}));

app.get('/', (req, res) => {
    return res.json("conectou vagas");
});

app.post('/vagas', async (req, res) => {
    try {
        const vaga = await prisma.vaga.create({
            data: {
                nome: req.body.nome,
                descricao: req.body.descricao,
                requisitos: req.body.requisitos,
                salario: req.body.salario,
                localizacao: req.body.localizacao,
            }
        });
        res.status(201).json(vaga);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar vaga' });
    }
});

app.get('/vagas', async (req, res) => {
    try {
        let vagas;
        if (req.query) {
            vagas = await prisma.vaga.findMany({
                where: {
                    nome: req.query.nome,
                    localizacao: req.query.localizacao
                }
            });
        } else {
            vagas = await prisma.vaga.findMany();
        }
        res.status(200).json(vagas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar vagas' });
    }
});

app.put('/vagas/:id', async (req, res) => {
    try {
        const vaga = await prisma.vaga.update({
            where: {
                id: Number(req.params.id), // Certifique-se de que o ID seja um número
            },
            data: {
                nome: req.body.nome,
                descricao: req.body.descricao,
                requisitos: req.body.requisitos,
                salario: req.body.salario,
                localizacao: req.body.localizacao,
            }
        });
        res.status(200).json(vaga);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar vaga' });
    }
});

app.delete('/vagas/:id', async (req, res) => {
    try {
        await prisma.vaga.delete({
            where: {
                id: Number(req.params.id), // Certifique-se de que o ID seja um número
            }
        });
        res.status(200).json({ message: 'Vaga deletada com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar vaga' });
    }
});

app.listen(3006, () => {
    console.log('Servidor rodando na porta 3006');
});

/*
-Criar vagas
-Listar vagas
-Editar um usuário
-Deletar um usuário
usuario : userlccopper senha : Lccopper123456
npx prisma studio para ver o banco
npx prisma generate para atualizar as tabelas no mongodb
npm install -g vercel para fazer deploy na vercel 
vercel login para logar na vercel
vercel - para finalizar
 */