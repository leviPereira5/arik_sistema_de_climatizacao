# Arik Website — Paleta Teal/Petróleo

**Date:** 2026-05-20  
**Scope:** Substituição da paleta verde por azul petróleo (teal)

## Alteração

Apenas `app/globals.css` muda. Todos os componentes ficam intactos pois usam CSS variables.

## Valores

| Variável | Antes | Depois |
|---|---|---|
| `--green-primary` | `#3B6D11` | `#0B5869` |
| `--green-light` | `#EAF3DE` | `#DFF0F4` |
| `--green-mid` | `#639922` | `#1A8099` |
| `--green-dark` | `#27500A` | `#073A48` |
| `--bg-warm` | `#F7F5EE` | `#F3F7F8` |

Mantidos: `--amber-accent`, `--text-dark`, `--text-muted`, `--card-bg`, `--border`.

## Justificação

O amber `#BA7517` contrasta com teal de forma mais impactante (contraste quente/frio).  
O `--bg-warm` passa a `#F3F7F8` para consistência com o teal mas permanece neutro.
