import { useState, useRef, useEffect, useCallback } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { toPng } from 'html-to-image';
import { symbolRows } from './data/symbols';
import { structureCategories, generateMatrix, generateIdentityMatrix } from './data/structures';

function FormulaRenderer({ latex }: { latex: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(latex || '\\text{Начните вводить формулу...}', ref.current, {
          displayMode: true,
          throwOnError: false,
          trust: true,
          strict: false,
        });
      } catch {
        if (ref.current) {
          ref.current.innerHTML = `<span style="color:#666;font-style:italic">Формула появится здесь...</span>`;
        }
      }
    }
  }, [latex]);

  return (
    <div
      ref={ref}
      className="min-h-[100px] flex items-center justify-center text-2xl overflow-x-auto p-4"
    />
  );
}

function InlineRenderer({ latex, className = '' }: { latex: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(latex, ref.current, {
          displayMode: false,
          throwOnError: false,
          trust: true,
          strict: false,
        });
      } catch {
        if (ref.current) {
          ref.current.textContent = latex;
        }
      }
    }
  }, [latex]);

  return <span ref={ref} className={className} />;
}

// Matrix Builder
function MatrixBuilder({ onInsert }: { onInsert: (latex: string) => void }) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [bracketType, setBracketType] = useState<'pmatrix' | 'bmatrix' | 'vmatrix' | 'Vmatrix' | 'matrix'>('pmatrix');
  const [previewLatex, setPreviewLatex] = useState('');

  useEffect(() => {
    setPreviewLatex(generateMatrix(rows, cols, bracketType));
  }, [rows, cols, bracketType]);

  const brackets = [
    { value: 'pmatrix' as const, label: '( )', desc: 'Круглые' },
    { value: 'bmatrix' as const, label: '[ ]', desc: 'Квадратные' },
    { value: 'vmatrix' as const, label: '| |', desc: 'Определитель' },
    { value: 'Vmatrix' as const, label: '‖ ‖', desc: 'Двойные' },
    { value: 'matrix' as const, label: 'без', desc: 'Без скобок' },
  ];

  return (
    <div className="p-3 space-y-3">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400">Строки:</label>
          <div className="flex items-center gap-1">
            <button onClick={() => setRows(Math.max(1, rows - 1))} className="w-7 h-7 rounded bg-white/10 hover:bg-white/20 text-sm font-bold transition">−</button>
            <span className="w-8 text-center text-sm font-mono font-bold text-blue-300">{rows}</span>
            <button onClick={() => setRows(Math.min(8, rows + 1))} className="w-7 h-7 rounded bg-white/10 hover:bg-white/20 text-sm font-bold transition">+</button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400">Столбцы:</label>
          <div className="flex items-center gap-1">
            <button onClick={() => setCols(Math.max(1, cols - 1))} className="w-7 h-7 rounded bg-white/10 hover:bg-white/20 text-sm font-bold transition">−</button>
            <span className="w-8 text-center text-sm font-mono font-bold text-blue-300">{cols}</span>
            <button onClick={() => setCols(Math.min(8, cols + 1))} className="w-7 h-7 rounded bg-white/10 hover:bg-white/20 text-sm font-bold transition">+</button>
          </div>
        </div>
        <div className="text-xs text-slate-500">{rows} × {cols} = {rows * cols} ячеек</div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400">Тип скобок:</span>
        {brackets.map((b) => (
          <button
            key={b.value}
            onClick={() => setBracketType(b.value)}
            className={`px-3 py-1.5 text-xs rounded-lg border transition ${
              bracketType === b.value
                ? 'bg-blue-500/20 text-blue-300 border-blue-400/40'
                : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
            }`}
          >
            {b.label} <span className="text-[10px] opacity-60">({b.desc})</span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400">Быстрый размер:</span>
        {[[2,2],[2,3],[3,2],[3,3],[3,4],[4,3],[4,4],[5,5],[6,6]].map(([r,c]) => (
          <button
            key={`${r}x${c}`}
            onClick={() => { setRows(r); setCols(c); }}
            className={`px-2 py-1 text-[11px] rounded border transition ${
              rows === r && cols === c
                ? 'bg-purple-500/20 text-purple-300 border-purple-400/40'
                : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
            }`}
          >
            {r}×{c}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 bg-white/90 rounded-lg p-3 text-black overflow-x-auto">
          <InlineRenderer latex={previewLatex} className="text-sm" />
        </div>
        <button
          onClick={() => onInsert(previewLatex)}
          className="px-4 py-2 rounded-lg bg-blue-500/30 hover:bg-blue-500/40 text-blue-200 border border-blue-400/40 text-sm font-medium transition whitespace-nowrap"
        >
          Вставить ↗
        </button>
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-white/10">
        <span className="text-xs text-slate-400">Единичная матрица:</span>
        {[2,3,4,5].map((size) => (
          <button
            key={size}
            onClick={() => onInsert(generateIdentityMatrix(size))}
            className="px-3 py-1.5 text-xs rounded-lg bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-400/40 text-slate-300 transition"
          >
            I<sub>{size}</sub>
          </button>
        ))}
      </div>
    </div>
  );
}

const quickTemplates = [
  { label: 'Квадратное уравнение', latex: 'ax^2 + bx + c = 0' },
  { label: 'Формула корней', latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
  { label: 'Теорема Пифагора', latex: 'a^2 + b^2 = c^2' },
  { label: 'Производная', latex: '\\frac{d}{dx} f(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}' },
  { label: 'Интеграл', latex: '\\int_{a}^{b} f(x) \\, dx' },
  { label: 'Ряд Тейлора', latex: 'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n' },
  { label: 'Формула Эйлера', latex: 'e^{i\\pi} + 1 = 0' },
  { label: 'Тождество Эйлера', latex: 'e^{ix} = \\cos x + i\\sin x' },
  { label: 'Сумма ряда', latex: '\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}' },
  { label: 'Биномиальная', latex: '(a+b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^k b^{n-k}' },
];

export default function App() {
  const [latex, setLatex] = useState('');
  const [activeStructureTab, setActiveStructureTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [symbolsCollapsed, setSymbolsCollapsed] = useState(false);
  const [structuresCollapsed, setStructuresCollapsed] = useState(false);
  const [showTextDialog, setShowTextDialog] = useState(false);
  const [textInput, setTextInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const insertAtCursor = useCallback((text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setLatex(prev => prev + text);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = latex.substring(0, start);
    const after = latex.substring(end);
    const newLatex = before + text + after;
    setLatex(newLatex);

    setTimeout(() => {
      textarea.focus();
      const emptyBraceMatch = text.match(/\{\}/);
      if (emptyBraceMatch) {
        const braceStart = text.indexOf(emptyBraceMatch[0]);
        const newPos = start + braceStart + 1;
        textarea.setSelectionRange(newPos, newPos);
      } else {
        const newPos = start + text.length;
        textarea.setSelectionRange(newPos, newPos);
      }
    }, 0);
  }, [latex]);

  const insertText = () => {
    if (textInput.trim()) {
      insertAtCursor(`\\text{${textInput}}`);
      setTextInput('');
      setShowTextDialog(false);
    }
  };

  const copyLatex = () => {
    navigator.clipboard.writeText(latex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const exportAsPng = async () => {
    if (!latex.trim() || !previewRef.current) return;
    
    setExporting(true);
    try {
      const dataUrl = await toPng(previewRef.current, {
        backgroundColor: '#ffffff',
        pixelRatio: 2,
        quality: 1,
      });
      
      const link = document.createElement('a');
      link.download = 'formula.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
      alert('Не удалось экспортировать изображение');
    } finally {
      setExporting(false);
    }
  };

  const saveToHistory = () => {
    if (latex.trim()) {
      setHistory(prev => {
        const filtered = prev.filter(h => h !== latex);
        return [latex, ...filtered].slice(0, 19);
      });
    }
  };

  const clearEditor = () => {
    if (latex.trim()) saveToHistory();
    setLatex('');
    textareaRef.current?.focus();
  };

  const undoLast = () => {
    if (history.length > 0) {
      setLatex(history[0]);
      setHistory(prev => prev.slice(1));
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'Enter') { e.preventDefault(); copyLatex(); }
      if (e.ctrlKey && e.shiftKey && e.key === 'Z') { e.preventDefault(); undoLast(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [history]);

  const isMatrixTab = structureCategories[activeStructureTab].name === 'Матрица';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold">∑</div>
            <div>
              <div className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">Math Equation Editor</div>
              <div className="text-[10px] text-slate-500 hidden sm:block">Визуальный редактор → экспорт в LaTeX</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowTemplates(!showTemplates)} className={`px-3 py-1.5 text-xs rounded-lg border transition ${showTemplates ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'}`}>⚡ Шаблоны</button>
            <button onClick={() => setShowHistory(!showHistory)} className={`px-3 py-1.5 text-xs rounded-lg border transition ${showHistory ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'}`}>📋 История ({history.length})</button>
            <button onClick={undoLast} disabled={history.length === 0} className="px-3 py-1.5 text-xs rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed">↩</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
        {/* Quick Templates */}
        {showTemplates && (
          <div className="bg-amber-500/5 backdrop-blur-sm rounded-2xl border border-amber-500/20 overflow-hidden">
            <div className="px-4 py-2 border-b border-amber-500/10 bg-amber-500/5 flex items-center justify-between">
              <span className="text-sm text-amber-300 font-medium">⚡ Быстрые шаблоны</span>
              <button onClick={() => setShowTemplates(false)} className="text-amber-400/50 hover:text-amber-300 text-xs">✕</button>
            </div>
            <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
              {quickTemplates.map((tmpl, i) => (
                <button key={i} onClick={() => { setLatex(tmpl.latex); setShowTemplates(false); }} className="flex flex-col items-start gap-1 p-2 rounded-xl bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-400/30 transition text-left">
                  <span className="text-[10px] text-amber-300/70 font-medium">{tmpl.label}</span>
                  <div className="text-black bg-white/90 rounded px-2 py-1 w-full overflow-hidden"><InlineRenderer latex={tmpl.latex} className="text-xs" /></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* History */}
        {showHistory && history.length > 0 && (
          <div className="bg-blue-500/5 backdrop-blur-sm rounded-2xl border border-blue-500/20 overflow-hidden">
            <div className="px-4 py-2 border-b border-blue-500/10 bg-blue-500/5 flex items-center justify-between">
              <span className="text-sm text-blue-300 font-medium">📋 Сохранённые формулы</span>
              <div className="flex gap-2">
                <button onClick={() => setHistory([])} className="text-xs text-red-400/70 hover:text-red-300">Очистить всё</button>
                <button onClick={() => setShowHistory(false)} className="text-blue-400/50 hover:text-blue-300 text-xs">✕</button>
              </div>
            </div>
            <div className="p-3 space-y-1.5 max-h-48 overflow-y-auto">
              {history.map((item, i) => (
                <div key={i} className="flex items-center gap-2 group">
                  <button onClick={() => { setLatex(item); setShowHistory(false); }} className="flex-1 text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition text-sm font-mono truncate">{item}</button>
                  <button onClick={() => setHistory(prev => prev.filter((_, idx) => idx !== i))} className="opacity-0 group-hover:opacity-100 text-red-400/50 hover:text-red-300 text-xs p-1 transition">✕</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formula Preview */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
            <span className="text-sm text-slate-300 font-medium">📐 Предпросмотр</span>
            <div className="flex gap-2">
              <button onClick={saveToHistory} disabled={!latex.trim()} className="px-3 py-1 text-xs rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition disabled:opacity-30 disabled:cursor-not-allowed">💾 Сохранить</button>
              <button onClick={exportAsPng} disabled={!latex.trim() || exporting} className={`px-3 py-1 text-xs rounded-md border transition disabled:opacity-30 disabled:cursor-not-allowed ${exporting ? 'bg-purple-500/30 text-purple-200 border-purple-500/40' : 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border-purple-500/30'}`}>
                {exporting ? '⏳ Экспорт...' : '🖼 Экспорт PNG'}
              </button>
              <button onClick={copyLatex} disabled={!latex.trim()} className={`px-3 py-1 text-xs rounded-md border transition disabled:opacity-30 disabled:cursor-not-allowed ${copied ? 'bg-emerald-500/30 text-emerald-200 border-emerald-500/40' : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-500/30'}`}>
                {copied ? '✓ Скопировано!' : '📋 Копировать LaTeX'}
              </button>
              <button onClick={clearEditor} disabled={!latex.trim()} className="px-3 py-1 text-xs rounded-md bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 transition disabled:opacity-30 disabled:cursor-not-allowed">🗑 Очистить</button>
            </div>
          </div>
          <div ref={previewRef} className="bg-white/95 text-black">
            <FormulaRenderer latex={latex} />
          </div>
        </div>

        {/* LaTeX Input */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
            <span className="text-sm text-slate-300 font-medium">✏️ Редактор LaTeX</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowTextDialog(true)} className="px-2 py-1 text-xs rounded bg-white/10 hover:bg-white/20 border border-white/10 transition">📝 Текст</button>
              <button
                onClick={() => insertAtCursor(' \\\\ ')}
                className="px-2 py-1 text-xs rounded bg-white/10 hover:bg-white/20 border border-white/10 transition font-mono"
                title="Перенос строки (\\)"
              >
                ↵ Перенос
              </button>
              <span className="text-[10px] text-slate-500">Ctrl+Enter — копировать</span>
            </div>
          </div>
          <textarea
            ref={textareaRef}
            value={latex}
            onChange={(e) => { setLatex(e.target.value); }}
            placeholder="Введите формулу или нажмите на символ/структуру ниже..."
            className="w-full h-20 p-4 bg-transparent text-white font-mono text-sm resize-none focus:outline-none placeholder-slate-500"
            spellCheck={false}
          />
        </div>

        {/* Text Dialog */}
        {showTextDialog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl border border-white/10 p-6 max-w-md w-full">
              <h3 className="text-lg font-bold mb-4">📝 Вставить текст</h3>
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') insertText(); }}
                placeholder="Введите текст..."
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 mb-4"
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button onClick={() => { setShowTextDialog(false); setTextInput(''); }} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition">Отмена</button>
                <button onClick={insertText} disabled={!textInput.trim()} className="px-4 py-2 rounded-lg bg-blue-500/30 hover:bg-blue-500/40 text-blue-200 border border-blue-400/40 transition disabled:opacity-30 disabled:cursor-not-allowed">Вставить</button>
              </div>
            </div>
          </div>
        )}



        {/* Structures */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          <button onClick={() => setStructuresCollapsed(!structuresCollapsed)} className="w-full flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5 hover:bg-white/[0.07] transition">
            <span className="text-sm text-slate-300 font-medium">🧮 Структуры</span>
            <span className="text-xs text-slate-500">{structuresCollapsed ? '▶' : '▼'}</span>
          </button>
          {!structuresCollapsed && (
            <>
              <div className="flex overflow-x-auto border-b border-white/10 bg-white/[0.02]">
                {structureCategories.map((cat, i) => (
                  <button key={i} onClick={() => setActiveStructureTab(i)} className={`px-3 py-2 text-xs font-medium whitespace-nowrap transition border-b-2 ${activeStructureTab === i ? 'border-blue-400 text-blue-300 bg-blue-500/10' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}>
                    {cat.name}
                  </button>
                ))}
              </div>
              {isMatrixTab ? (
                <MatrixBuilder onInsert={insertAtCursor} />
              ) : (
                <div className="p-3 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {structureCategories[activeStructureTab].items.map((item, i) => (
                    <button key={i} onClick={() => insertAtCursor(item.latex)} className="group flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-400/40 transition" title={`${item.description}\nLaTeX: ${item.latex}`}>
                      <div className="h-9 flex items-center justify-center text-black bg-white/90 rounded px-2 min-w-[48px] overflow-hidden">
                        <InlineRenderer latex={item.display} className="text-sm" />
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-slate-200 truncate max-w-full text-center">{item.description}</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Symbols */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          <button onClick={() => setSymbolsCollapsed(!symbolsCollapsed)} className="w-full flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5 hover:bg-white/[0.07] transition">
            <span className="text-sm text-slate-300 font-medium">🔣 Основные математические символы</span>
            <span className="text-xs text-slate-500">{symbolsCollapsed ? '▶' : '▼'}</span>
          </button>
          {!symbolsCollapsed && (
            <div className="p-3 space-y-2">
              {symbolRows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex flex-wrap gap-1.5">
                  {row.map((sym, symIdx) => (
                    <button key={symIdx} onClick={() => insertAtCursor(sym.latex)} className="group w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-400/40 transition text-lg" title={sym.latex.trim()}>
                      <InlineRenderer latex={sym.display || sym.latex} className="text-base" />
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* LaTeX Output */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
            <span className="text-sm text-slate-300 font-medium">📄 LaTeX код для экспорта</span>
            <button onClick={copyLatex} disabled={!latex.trim()} className={`px-3 py-1 text-xs rounded-md border transition disabled:opacity-30 disabled:cursor-not-allowed ${copied ? 'bg-emerald-500/30 text-emerald-200 border-emerald-500/40' : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'}`}>
              {copied ? '✓ Скопировано!' : '📋 Копировать'}
            </button>
          </div>
          <div className="p-4">
            <pre className="text-sm font-mono text-green-300 whitespace-pre-wrap break-all bg-black/30 rounded-lg p-3 min-h-[50px] border border-white/5">
              {latex || '\\text{Пусто}'}
            </pre>
          </div>
        </div>

        <footer className="text-center text-xs text-slate-500 py-6 space-y-1">
          <p>Нажмите на символ или структуру для вставки. Используйте кнопку "📝 Текст" для добавления обычного текста в формулу.</p>
          <p>Экспортируйте формулу как PNG изображение или скопируйте LaTeX-код для вставки в Overleaf, LaTeX-документ, Jupyter и т.д.</p>
        </footer>
      </div>
    </div>
  );
}
