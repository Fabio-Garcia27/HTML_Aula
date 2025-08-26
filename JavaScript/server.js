import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { PrismaClient, Prisma } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Criar gasto
app.post("/api/gastos", async (req, res) => {
    try {
        const { periodo, descricao, categoria, valor } = req.body;

        if (!periodo || !descricao || !categoria || !valor) {
            return res.status(400).json({ erro: "Preencha todos os campos!" });
        }

        const gasto = await prisma.gasto.create({
            data: {
                periodo,
                descricao,
                categoria,
                valor: new Prisma.Decimal(valor),
            },
        });

        res.status(201).json(gasto);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao salvar gasto!" });
    }
});
// Listar gastos
app.get("/api/gastos", async (req, res) => {
    try {
        const gastos = await prisma.gasto.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(gastos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao buscar gastos!" });
    }
});
// Atualizar gasto
app.put("/api/gastos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { periodo, descricao, categoria, valor } = req.body;

        const gasto = await prisma.gasto.update({
            where: { id },
            data: {
                periodo,
                descricao,
                categoria,
                valor: new Prisma.Decimal(valor),
            },
        });

        res.json(gasto);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao atualizar gasto!" });
    }
});

// Excluir gasto
app.delete("/api/gastos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.gasto.delete({ where: { id } });
        res.json({ mensagem: "Gasto excluído com sucesso!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao excluir gasto!" });
    }
});

// Rodar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));

