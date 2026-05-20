export type TipoEspaco = "habitacao" | "alojamento" | "comercio";
export type Tamanho = "pequeno" | "medio" | "grande";
export type Divisoes = "uma" | "algumas" | "muitas";
export type Orcamento = "baixo" | "medio" | "alto";
export type PlanoRecomendado =
  | "Essential"
  | "Confort"
  | "Premium"
  | "Essential Business"
  | "Business";

export function calcularPlano(
  tipo: TipoEspaco,
  tamanho: Tamanho,
  divisoes: Divisoes,
  orcamento: Orcamento
): PlanoRecomendado {
  if (tipo !== "habitacao") {
    if (orcamento === "alto" || divisoes === "muitas") return "Business";
    return "Essential Business";
  }
  if (tamanho === "pequeno" || divisoes === "uma" || orcamento === "baixo")
    return "Essential";
  if (tamanho === "grande" || divisoes === "muitas") return "Premium";
  return "Confort";
}
