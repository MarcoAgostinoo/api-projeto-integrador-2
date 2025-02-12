import express from "express"; 
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();
const corsOrigin = process.env.NEXT_PUBLIC_CORS_ORIGIN || '*'; // Permitir todas as origens

app.use(cors({
    origin: ['https://www.lccopper.com', 'https://api-vagas-lccopper.vercel.app'], // Permitir origens da Vercel e seu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'X-CSRF-Token',
        'X-Requested-With',
        'Accept',
        'Accept-Version',
        'Content-Length',
        'Content-MD5',
        'Content-Type',
        'Date',
        'X-Api-Version',
        'Authorization'
    ],
    credentials: true, // Permite o envio de cookies e cabeçalhos de autorização
}));

app.use(express.json());

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
        if (req.query.nome || req.query.localizacao) {
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
        await prisma.vaga.update({
            where: {
                id: req.params.id
            },
            data: {
                nome: req.body.nome,
                descricao: req.body.descricao,
                requisitos: req.body.requisitos,
                salario: req.body.salario,
                localizacao: req.body.localizacao,
            }
        });
        res.status(201).json(req.body);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar vaga' });
    }
});

app.delete('/vagas/:id', async (req, res) => {
    try {
        await prisma.vaga.delete({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json({ Message: 'Vaga deletada com sucesso!' });
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