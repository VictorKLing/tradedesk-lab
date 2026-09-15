import type { Acao } from "@/types/acao";

export function normalizeAcao(raw: any): Acao {
  return {
    ticker: raw.symbol ?? raw.ticker,
    nome: raw.shortName ?? raw.nome,
    preco: raw.regularMarketPrice ?? raw.preco,
    variacao: raw.regularMarketChangePercent ?? raw.variacao,
    volume: raw.regularMarketVolume ?? raw.volume,
    logo: raw.logourl ?? raw.logo,
  };
}