import express from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();
app.use(express.json());

const port = process.env.PORT || 3009;


app.get('/', (req, res) => {
    return res.json("conectou vagas");
})

app.post('/usuarios', async (req, res) => {

    await prisma.vaga.create({
        data: {
            nome: req.body.nome,
            descricao: req.body.descricao,
            requisitos: req.body.requisitos,
            salario: req.body.salario,
            localizacao: req.body.localizacao,
        }
    })

    res.status(201).json(req.body);
})

app.get('/usuarios', async (req, res) => {
    let vagas = [];

    if (req.query) {
        vagas = await prisma.vaga.findMany ({
            where: {
                nome: req.query.nome,
                localizacao : req.query.localizacao
            }
        })
    } else {
        vagas = await prisma.vaga.findMany()
    }
    
    res.status(200).json(vagas);
})


app.put('/usuarios/:id', async (req, res) => {

    console.log(req)

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
    })

    res.status(201).json(req.body);
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.vaga.delete({
        where: {
            id: req.params.id,
        }
        }),

        res.status(200).json({ Message: 'Vaga deletada com sucesso!' })
})

app.listen(3006)


/*
-Criar usuarios
-Listar usuarios
-Editar um usuário
-Deletar um usuário
usuario : userlccopper senha : Lccopper123456
npx prisma studio para ver o banco
 */