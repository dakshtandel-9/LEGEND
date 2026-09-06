# 05 — Proposed Digital Color System

> These are proposed web values derived from the visual character of the supplied magazines. Replace them if the client provides official brand values.

## Master palette

| Token | Hex | Use |
|---|---:|---|
| `ink` | `#151515` | Primary text, dark sections |
| `paper` | `#F5F2EA` | Primary editorial background |
| `white` | `#FFFFFF` | Clean content sections |
| `muted` | `#6D6A63` | Secondary text |
| `line` | `#D8D2C6` | Rules and dividers |
| `gold` | `#B79D73` | Brand accent |
| `gold-soft` | `#DCCFB4` | Subtle decorative detail |

## Issue accents

| Token | Hex | Intended use |
|---|---:|---|
| `issue-may-lime` | `#D5E35B` | May issue badge/detail |
| `issue-may-yellow` | `#E2CB28` | May supporting accent |
| `issue-july-cyan` | `#16BCD6` | July issue badge/detail |
| `editorial-blue` | `#42579B` | Story-level optional accent |

## Usage ratio
Recommended page-level balance:
- 65% paper/white;
- 25% ink and imagery;
- 7% gold;
- 3% edition accents.

## Dark section
For a premium dark panel:
- background: `#151515`
- heading: `#F5F2EA`
- body: `#CFC9BD`
- accent: `#B79D73`

## Accessibility rule
Never use the lime or cyan accent as small body text on white.
Use them for:
- blocks;
- tags;
- borders;
- large display treatment;
- decorative rules.

## Tailwind token suggestion
```ts
colors: {
  legend: {
    ink: "#151515",
    paper: "#F5F2EA",
    white: "#FFFFFF",
    muted: "#6D6A63",
    line: "#D8D2C6",
    gold: "#B79D73",
    goldSoft: "#DCCFB4",
    may: "#D5E35B",
    july: "#16BCD6",
    blue: "#42579B",
  }
}
```
