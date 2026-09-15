import { NextResponse } from "next/server";
import { ACOES_MOCK } from "@/lib/mocks";
import { normalizeAcao } from "@/lib/normalizeAcao";



const TICKERS = "PETR4,VALE3,ITUB4,MGLU3,BBDC4";

// Para usar dados reais da brapi.dev:
// 1. Crie conta gratuita em https://brapi.dev/account e copie seu token
// 2. Crie .env.local na raiz do projeto com: BRAPI_TOKEN=seu_token_aqui
// 3. Substitua a linha do fetch abaixo por:
//    const res = await fetch(`https://brapi.dev/api/quote/${TICKERS}?token=${process.env.BRAPI_TOKEN}&fundamental=false`, ...)
// Campos retornados pela brapi: symbol | shortName | regularMarketPrice | regularMarketChangePercent | regularMarketVolume

export async function GET() {
  try {
    const res = await fetch(`https://brapi.dev/api/quote/${TICKERS}?fundamental=false`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("brapi offline");
    const data = await res.json();
    return NextResponse.json(normalizeAcao(data.results[0]));
  
  } catch {
    // brapi indisponivel ou token nao configurado — retornando dados mock
    return NextResponse.json({
      _aviso: "brapi.dev indisponivel - exibindo dados mock estaticos",
      _instrucoes: {
        api: "https://brapi.dev",
        como_configurar: [
          "1. Crie conta gratuita em https://brapi.dev/account",
          "2. Copie seu token de API",
          "3. Crie o arquivo .env.local na raiz do projeto",
          "4. Adicione a linha: BRAPI_TOKEN=seu_token_aqui",
          "5. Atualize o fetch neste arquivo para incluir ?token=${process.env.BRAPI_TOKEN}",
        ],
        url_com_token: `https://brapi.dev/api/quote/${TICKERS}?token=SEU_TOKEN&fundamental=false`,
        campos_retornados_pela_brapi: ["symbol", "shortName", "regularMarketPrice", "regularMarketChangePercent", "regularMarketVolume"],
      },
      acoes: ACOES_MOCK,
    });
  }
}
