export interface StructureItem {
  label: string;
  latex: string;
  display: string;
  description?: string;
}

export interface StructureCategory {
  name: string;
  items: StructureItem[];
}

export const structureCategories: StructureCategory[] = [
  {
    name: 'Дробь',
    items: [
      { label: 'a/b', latex: '\\frac{}{}', display: '\\frac{a}{b}', description: 'Обыкновенная дробь' },
      { label: 'Дробь', latex: '\\dfrac{}{}', display: '\\dfrac{a}{b}', description: 'Большая дробь' },
      { label: 'Этаж', latex: '\\cfrac{}{}', display: '\\cfrac{a}{b}', description: 'Цепная дробь' },
      { label: 't/b', latex: '\\tfrac{}{}', display: '\\tfrac{a}{b}', description: 'Маленькая дробь' },
      { label: 'a/b/c', latex: '\\frac{\\frac{}{}}{}', display: '\\frac{\\frac{a}{b}}{c}', description: 'Многоэтажная дробь' },
      { label: 'b/(a/b)', latex: '\\frac{}{\\frac{}{}}', display: '\\frac{c}{\\frac{a}{b}}', description: 'Обратная многоэтажная' },
    ],
  },
  {
    name: 'Индекс',
    items: [
      { label: 'x²', latex: '^{}', display: 'x^{2}', description: 'Верхний индекс' },
      { label: 'x₁', latex: '_{}', display: 'x_{1}', description: 'Нижний индекс' },
      { label: 'x₁²', latex: '_{}^{}', display: 'x_{1}^{2}', description: 'Оба индекса' },
      { label: 'x²₁', latex: '^{}_{}', display: 'x^{2}_{1}', description: 'Оба индекса (обр.)' },
      { label: 'xⁿₘ', latex: '_{_{}}^{^{}}', display: 'x_{m}^{n}', description: 'Двойной индекс' },
      { label: 'ⁿxₘ', latex: '{}_{}^{}', display: 'n_{a}^{b}', description: 'Индексы справа' },
    ],
  },
  {
    name: 'Корень',
    items: [
      { label: '√', latex: '\\sqrt{}', display: '\\sqrt{x}', description: 'Квадратный корень' },
      { label: '∛', latex: '\\sqrt[3]{}', display: '\\sqrt[3]{x}', description: 'Кубический корень' },
      { label: 'ⁿ√', latex: '\\sqrt[n]{}', display: '\\sqrt[n]{x}', description: 'Корень n-й степени' },
      { label: '√(a+b)', latex: '\\sqrt{+}', display: '\\sqrt{a+b}', description: 'Корень из суммы' },
      { label: '√(a/b)', latex: '\\sqrt{\\frac{}{}}', display: '\\sqrt{\\frac{a}{b}}', description: 'Корень из дроби' },
      { label: '∛(a+b)', latex: '\\sqrt[3]{+}', display: '\\sqrt[3]{a+b}', description: 'Куб. корень из суммы' },
    ],
  },
  {
    name: 'Интеграл',
    items: [
      { label: '∫', latex: '\\int ', display: '\\int', description: 'Одиночный интеграл' },
      { label: '∫ₐᵇ', latex: '\\int_{}^{}', display: '\\int_{a}^{b}', description: 'Определённый интеграл' },
      { label: '∮', latex: '\\oint ', display: '\\oint', description: 'Контурный интеграл' },
      { label: '∮ₐᵇ', latex: '\\oint_{}^{}', display: '\\oint_{a}^{b}', description: 'Контурный с пределами' },
      { label: '∬', latex: '\\iint ', display: '\\iint', description: 'Двойной интеграл' },
      { label: '∭', latex: '\\iiint ', display: '\\iiint', description: 'Тройной интеграл' },
      { label: '∫∫∫∫', latex: '\\iiiint ', display: '\\iiiint', description: 'Четверной интеграл' },
      { label: '∫dx', latex: '\\int_{}^{} \\, d', display: '\\int_{a}^{b} f(x)\\,dx', description: 'Интеграл с dx' },
    ],
  },
  {
    name: 'Крупный оператор',
    items: [
      { label: 'Σ', latex: '\\sum ', display: '\\sum', description: 'Сумма' },
      { label: 'Σᵢ₌₁ⁿ', latex: '\\sum_{}^{}', display: '\\sum_{i=1}^{n}', description: 'Сумма с пределами' },
      { label: 'Σᵢ₌₁ⁿ aᵢ', latex: '\\sum_{}^{} ', display: '\\sum_{i=1}^{n} a_i', description: 'Полная сумма' },
      { label: 'Π', latex: '\\prod ', display: '\\prod', description: 'Произведение' },
      { label: 'Πᵢ₌₁ⁿ', latex: '\\prod_{}^{}', display: '\\prod_{i=1}^{n}', description: 'Произведение с пределами' },
      { label: '⋃', latex: '\\bigcup ', display: '\\bigcup', description: 'Большое объединение' },
      { label: '⋂', latex: '\\bigcap ', display: '\\bigcap', description: 'Большое пересечение' },
      { label: '⊕', latex: '\\bigoplus ', display: '\\bigoplus', description: 'Большая прямая сумма' },
    ],
  },
  {
    name: 'Скобка',
    items: [
      { label: '( )', latex: '\\left( \\right)', display: '\\left( x \\right)', description: 'Круглые скобки' },
      { label: '[ ]', latex: '\\left[ \\right]', display: '\\left[ x \\right]', description: 'Квадратные скобки' },
      { label: '{ }', latex: '\\left\\{ \\right\\}', display: '\\left\\{ x \\right\\}', description: 'Фигурные скобки' },
      { label: '| |', latex: '\\left| \\right|', display: '\\left| x \\right|', description: 'Модуль' },
      { label: '‖ ‖', latex: '\\left\\| \\right\\|', display: '\\left\\| x \\right\\|', description: 'Двойные модули' },
      { label: '⟨ ⟩', latex: '\\left\\langle \\right\\rangle', display: '\\left\\langle x \\right\\rangle', description: 'Угловые скобки' },
      { label: '⌊ ⌋', latex: '\\left\\lfloor \\right\\rfloor', display: '\\left\\lfloor x \\right\\rfloor', description: 'Пол (floor)' },
      { label: '⌈ ⌉', latex: '\\left\\lceil \\right\\rceil', display: '\\left\\lceil x \\right\\rceil', description: 'Потолок (ceil)' },
    ],
  },
  {
    name: 'Функция',
    items: [
      { label: 'sin', latex: '\\sin ', display: '\\sin x', description: 'Синус' },
      { label: 'cos', latex: '\\cos ', display: '\\cos x', description: 'Косинус' },
      { label: 'tan', latex: '\\tan ', display: '\\tan x', description: 'Тангенс' },
      { label: 'cot', latex: '\\cot ', display: '\\cot x', description: 'Котангенс' },
      { label: 'sec', latex: '\\sec ', display: '\\sec x', description: 'Секанс' },
      { label: 'csc', latex: '\\csc ', display: '\\csc x', description: 'Косеканс' },
      { label: 'arcsin', latex: '\\arcsin ', display: '\\arcsin x', description: 'Арксинус' },
      { label: 'arccos', latex: '\\arccos ', display: '\\arccos x', description: 'Арккосинус' },
      { label: 'arctan', latex: '\\arctan ', display: '\\arctan x', description: 'Арктангенс' },
      { label: 'sinh', latex: '\\sinh ', display: '\\sinh x', description: 'Гиперболический синус' },
      { label: 'cosh', latex: '\\cosh ', display: '\\cosh x', description: 'Гиперболический косинус' },
      { label: 'tanh', latex: '\\tanh ', display: '\\tanh x', description: 'Гиперболический тангенс' },
      { label: 'ln', latex: '\\ln ', display: '\\ln x', description: 'Натуральный логарифм' },
      { label: 'log', latex: '\\log ', display: '\\log x', description: 'Логарифм' },
      { label: 'exp', latex: '\\exp ', display: '\\exp x', description: 'Экспонента' },
      { label: 'det', latex: '\\det ', display: '\\det A', description: 'Определитель' },
    ],
  },
  {
    name: 'Диакритика',
    items: [
      { label: 'x⃗', latex: '\\vec{}', display: '\\vec{x}', description: 'Вектор (стрелка)' },
      { label: 'x̂', latex: '\\hat{}', display: '\\hat{x}', description: 'Крышечка' },
      { label: 'x̄', latex: '\\bar{}', display: '\\bar{x}', description: 'Чёрточка' },
      { label: 'x̃', latex: '\\tilde{}', display: '\\tilde{x}', description: 'Тильда' },
      { label: 'x⃗', latex: '\\overrightarrow{}', display: '\\overrightarrow{AB}', description: 'Стрелка над выражением' },
      { label: 'x⃗', latex: '\\overleftarrow{}', display: '\\overleftarrow{AB}', description: 'Стрелка влево' },
      { label: 'ẋ', latex: '\\dot{}', display: '\\dot{x}', description: 'Точка' },
      { label: 'ẍ', latex: '\\ddot{}', display: '\\ddot{x}', description: 'Две точки' },
      { label: 'x̂', latex: '\\widehat{}', display: '\\widehat{ABC}', description: 'Широкая крышка' },
      { label: 'x̃', latex: '\\widetilde{}', display: '\\widetilde{ABC}', description: 'Широкая тильда' },
      { label: 'x̲', latex: '\\underline{}', display: '\\underline{x}', description: 'Подчёркивание' },
      { label: 'x̅', latex: '\\overline{}', display: '\\overline{AB}', description: 'Надчёркивание' },
    ],
  },
  {
    name: 'Предел и логарифм',
    items: [
      { label: 'lim', latex: '\\lim ', display: '\\lim', description: 'Предел' },
      { label: 'lim x→a', latex: '\\lim_{}\\to{}', display: '\\lim_{x \\to a}', description: 'Предел с точкой' },
      { label: 'lim→∞', latex: '\\lim_{\\to\\infty}', display: '\\lim_{x \\to \\infty}', description: 'Предел к бесконечности' },
      { label: 'logₐ', latex: '\\log_{}', display: '\\log_{a}', description: 'Логарифм с основанием' },
      { label: 'min', latex: '\\min ', display: '\\min', description: 'Минимум' },
      { label: 'max', latex: '\\max ', display: '\\max', description: 'Максимум' },
      { label: 'inf', latex: '\\inf ', display: '\\inf', description: 'Инфимум' },
      { label: 'sup', latex: '\\sup ', display: '\\sup', description: 'Супремум' },
    ],
  },
  {
    name: 'Оператор',
    items: [
      { label: '→⁻', latex: '\\xrightarrow{}', display: '\\xrightarrow{\\text{текст}}', description: 'Стрелка с текстом' },
      { label: '←⁻', latex: '\\xleftarrow{}', display: '\\xleftarrow{\\text{текст}}', description: 'Стрелка влево с текстом' },
      { label: '→₋⁻', latex: '\\xrightarrow[{}]', display: '\\xrightarrow[\\text{снизу}]{\\text{сверху}}', description: 'Стрелка с текстом сверху и снизу' },
      { label: '=⁻', latex: '\\overset{}{=}', display: '\\overset{\\text{def}}{=}', description: 'Равенство с пояснением' },
      { label: '→', latex: '\\to ', display: '\\to', description: 'Стрелка' },
      { label: '⟹', latex: '\\implies ', display: '\\implies', description: 'Следствие' },
      { label: '⟸', latex: '\\impliedby ', display: '\\impliedby', description: 'Обратное следствие' },
      { label: '⟺', latex: '\\iff ', display: '\\iff', description: 'Эквивалентность' },
    ],
  },
  {
    name: 'Матрица',
    items: [
      {
        label: '2×2',
        latex: '\\begin{pmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{pmatrix}',
        display: '\\begin{pmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{pmatrix}',
        description: 'Матрица 2×2 (круглые)',
      },
      {
        label: '2×2[]',
        latex: '\\begin{bmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{bmatrix}',
        display: '\\begin{bmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{bmatrix}',
        description: 'Матрица 2×2 (квадратные)',
      },
      {
        label: '3×3',
        latex: '\\begin{pmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\\\ a_{31} & a_{32} & a_{33} \\end{pmatrix}',
        display: '\\begin{pmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\\\ a_{31} & a_{32} & a_{33} \\end{pmatrix}',
        description: 'Матрица 3×3',
      },
      {
        label: 'det',
        latex: '\\begin{vmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{vmatrix}',
        display: '\\begin{vmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{vmatrix}',
        description: 'Определитель 2×2',
      },
      {
        label: 'I₂',
        latex: '\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}',
        display: '\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}',
        description: 'Единичная 2×2',
      },
      {
        label: 'Пустая',
        latex: '\\begin{matrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{matrix}',
        display: '\\begin{matrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{matrix}',
        description: 'Матрица без скобок',
      },
    ],
  },
];

export function generateMatrix(rows: number, cols: number, bracketType: 'pmatrix' | 'bmatrix' | 'vmatrix' | 'Vmatrix' | 'matrix'): string {
  const matrixRows: string[] = [];
  for (let i = 1; i <= rows; i++) {
    const cells: string[] = [];
    for (let j = 1; j <= cols; j++) {
      cells.push(`a_{${i}${j}}`);
    }
    matrixRows.push(cells.join(' & '));
  }
  return `\\begin{${bracketType}} ${matrixRows.join(' \\\\ ')} \\end{${bracketType}}`;
}

export function generateIdentityMatrix(size: number): string {
  const matrixRows: string[] = [];
  for (let i = 1; i <= size; i++) {
    const cells: string[] = [];
    for (let j = 1; j <= size; j++) {
      cells.push(i === j ? '1' : '0');
    }
    matrixRows.push(cells.join(' & '));
  }
  return `\\begin{pmatrix} ${matrixRows.join(' \\\\ ')} \\end{pmatrix}`;
}
