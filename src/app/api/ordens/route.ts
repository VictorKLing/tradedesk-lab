import { NextResponse } from "next/server";
import { ACOES_MOCK, ORDENS_MOCK } from "@/lib/mocks";
import type { Ordem } from "@/types/ordem";

// validacao de quantidade minima? isso e front-end fazer nao eu
export async function GET() {
  return NextResponse.json(ORDENS_MOCK);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.quantidade || body.quantidade < 100) {
    return NextResponse.json(
      { error: "Quantidade minima de compra e 100 acoes" },
      { status: 400 }
    );
  }

  const ordem: Ordem = {
    id: crypto.randomUUID(),
    ticker: body.ticker,
    quantidade: body.quantidade,
    preco: body.preco,
    total: body.total,
    tipo: "compra",
    timestamp: new Date().toISOString(),
  };

  ORDENS_MOCK.push(ordem);

  return NextResponse.json(ordem, { status: 201 });
}
