export interface SymbolItem {
  label: string;
  latex: string;
  display?: string; // KaTeX render string if different from latex
}

export const symbolRows: SymbolItem[][] = [
  // Row 1
  [
    { label: '±', latex: '\\pm ' },
    { label: '∞', latex: '\\infty ' },
    { label: '=', latex: '= ' },
    { label: '≠', latex: '\\neq ' },
    { label: '∼', latex: '\\sim ' },
    { label: '×', latex: '\\times ' },
    { label: '÷', latex: '\\div ' },
    { label: '!', latex: '! ' },
    { label: '∝', latex: '\\propto ' },
    { label: '<', latex: '< ' },
    { label: '≪', latex: '\\ll ' },
    { label: '>', latex: '> ' },
    { label: '≫', latex: '\\gg ' },
    { label: '≤', latex: '\\le ' },
  ],
  // Row 2
  [
    { label: '≥', latex: '\\ge ' },
    { label: '∓', latex: '\\mp ' },
    { label: '≅', latex: '\\cong ' },
    { label: '≈', latex: '\\approx ' },
    { label: '≡', latex: '\\equiv ' },
    { label: '∀', latex: '\\forall ' },
    { label: '⊂', latex: '\\subset ' },
    { label: '∂', latex: '\\partial ' },
    { label: '√', latex: '\\sqrt{}', display: '\\sqrt{\\,}' },
    { label: '∛', latex: '\\sqrt[3]{}', display: '\\sqrt[3]{\\,}' },
    { label: '∜', latex: '\\sqrt[4]{}', display: '\\sqrt[4]{\\,}' },
    { label: '∪', latex: '\\cup ' },
    { label: '∩', latex: '\\cap ' },
    { label: '∅', latex: '\\emptyset ' },
  ],
  // Row 3
  [
    { label: '%', latex: '\\% ' },
    { label: '°', latex: '^{\\circ} ' },
    { label: '°F', latex: '^{\\circ}\\text{F} ' },
    { label: '°C', latex: '^{\\circ}\\text{C} ' },
    { label: 'Δ', latex: '\\Delta ' },
    { label: '∇', latex: '\\nabla ' },
    { label: '∃', latex: '\\exists ' },
    { label: '∄', latex: '\\nexists ' },
    { label: '∈', latex: '\\in ' },
    { label: '∋', latex: '\\ni ' },
    { label: '←', latex: '\\leftarrow ' },
    { label: '↑', latex: '\\uparrow ' },
    { label: '→', latex: '\\rightarrow ' },
    { label: '↓', latex: '\\downarrow ' },
  ],
  // Row 4
  [
    { label: '↔', latex: '\\leftrightarrow ' },
    { label: '∴', latex: '\\therefore ' },
    { label: '+', latex: '+ ' },
    { label: '−', latex: '- ' },
    { label: '¬', latex: '\\neg ' },
    { label: 'α', latex: '\\alpha ' },
    { label: 'β', latex: '\\beta ' },
    { label: 'γ', latex: '\\gamma ' },
    { label: 'δ', latex: '\\delta ' },
    { label: 'ε', latex: '\\epsilon ' },
    { label: 'ε', latex: '\\varepsilon ' },
    { label: 'θ', latex: '\\theta ' },
    { label: 'ϑ', latex: '\\vartheta ' },
    { label: 'μ', latex: '\\mu ' },
  ],
  // Row 5
  [
    { label: 'π', latex: '\\pi ' },
    { label: 'ρ', latex: '\\rho ' },
    { label: 'σ', latex: '\\sigma ' },
    { label: 'τ', latex: '\\tau ' },
    { label: 'φ', latex: '\\varphi ' },
    { label: 'ω', latex: '\\omega ' },
    { label: '∗', latex: '\\ast ' },
    { label: '□', latex: '\\square ' },
    { label: '⋮', latex: '\\vdots ' },
    { label: '⋯', latex: '\\cdots ' },
    { label: '⋱', latex: '\\ddots ' },
    { label: '⋰', latex: '\\cdots ' },
    { label: 'ℵ', latex: '\\aleph ' },
    { label: 'ℶ', latex: '\\beth ' },
  ],
  // Row 6
  [
    { label: '■', latex: '\\blacksquare ' },
  ],
];
