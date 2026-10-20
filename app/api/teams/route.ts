import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Lista todas as equipas
export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      include: { league: true },
    });
    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar equipas' }, { status: 500 });
  }
}

// POST: Cadastra uma nova equipa
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, leagueId } = body;

    if (!name) {
      return NextResponse.json({ error: 'O nome da equipa é obrigatório' }, { status: 400 });
    }

    let targetLeagueId = leagueId;
    if (!targetLeagueId) {
      const defaultLeague = await prisma.league.findFirst();
      if (!defaultLeague) {
        return NextResponse.json({ error: 'Nenhuma liga encontrada. Crie uma liga primeiro.' }, { status: 400 });
      }
      targetLeagueId = defaultLeague.id;
    }

    const newTeam = await prisma.team.create({
      data: {
        name,
        leagueId: targetLeagueId,
      },
    });

    return NextResponse.json(newTeam, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao cadastrar equipa' }, { status: 500 });
  }
}