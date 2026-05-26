export type TipoEspaco = "habitacao" | "alojamento" | "comercio";
export type Tamanho = "pequeno" | "medio" | "grande";
export type Divisoes = "uma" | "algumas" | "muitas";
export type PlanoRecomendado = "Essential" | "Confort" | "Premium";

export function calcularPlano(
  tipo: TipoEspaco,
  tamanho: Tamanho,
  divisoes: Divisoes
): PlanoRecomendado {
  if (tamanho === "pequeno" || divisoes === "uma") return "Essential";
  if (tamanho === "grande" || divisoes === "muitas") return "Premium";
  return "Confort";
}
