import FormSection from './components/Layout/FormSection';
import PreviewSection from './components/Layout/PreviewSection';
import './index.css'


function App() {
  return (
    <div className="flex w-full h-full max-h-full">
      {/* overflow-auto permite auto scroll */}
      <div className="flex-1 max-w-1/2 max-h-full border-r overflow-auto border-gray-200">
        <FormSection />
      </div>
      <div className="flex-1 max-w-1/2 max-h-full overflow-auto">
        <PreviewSection />
      </div>
    </div>
  )
}

import React, { useEffect, useMemo, useState, createContext, useContext } from 'react';

/*
  CV Builder AI - single-file React + TypeScript prototype
  - Uses TailwindCSS for styling (assume Tailwind is configured in the project)
  - Desktop-first split-screen layout
  - Components, hooks and lightweight mock AI enhancer included
  - Default export is App
*/

// ----------------------------- Types -----------------------------
type Skill = { id: string; name: string; level: 'Básico' | 'Intermediário' | 'Avançado' };
type Experience = {
  id: string;
  company: string;
  role: string;
  periodStart: string;
  periodEnd?: string;
  current?: boolean;
  description?: string;
};

type CVState = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  skills: Skill[];
  experiences: Experience[];
};

// -------------------------- Context & Hook ------------------------
const initialState: CVState = {
  name: '',
  email: '',
  phone: '',
  linkedin: '',
  summary: '',
  skills: [],
  experiences: []
};

const CVContext = createContext<{
  state: CVState;
  setState: React.Dispatch<React.SetStateAction<CVState>>;
}>({ state: initialState, setState: () => null });

function useCV() {
  return useContext(CVContext);
}

// small utility to generate ids
function uid(prefix = '') {
  return prefix + Math.random().toString(36).slice(2, 9);
}

// -------------------------- useAIEnhancement (mock) ------------------
function useAIEnhancement() {
  const { state, setState } = useCV();
  const enhancing = useMemo(() => ({ loading: false }), []);

  async function enhanceSummary() {
    // Mock enhancement: in real app call /services/aiService.ts
    setState(prev => ({ ...prev, summary: prev.summary ? prev.summary + ' • Orientado a resultado e comunicação clara.' : 'Profissional dedicado com foco em resultados e melhoria contínua.' }));
    return;
  }

  return { enhanceSummary, enhancing };
}

// ----------------------------- Components -----------------------------

function Header() {
  return (
    <header className="h-16 bg-white/80 backdrop-blur border-b border-slate-100 flex items-center px-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-semibold">CV</div>
        <div>
          <h1 className="text-lg font-semibold">CV Builder AI</h1>
          <p className="text-sm text-slate-500">Preview em tempo real • Protótipo React + TypeScript</p>
        </div>
      </div>
      <div className="ml-auto text-sm text-slate-500">Desktop • 50/50 split</div>
    </header>
  );
}

function FormSection() {
  const { state, setState } = useCV();
  const { enhanceSummary } = useAIEnhancement();

  function update<K extends keyof CVState>(key: K, value: CVState[K]) {
    setState(prev => ({ ...prev, [key]: value }));
  }

  return (
    <section className="w-1/2 p-6 overflow-hidden">
      <div className="h-full overflow-y-auto pr-2 space-y-6">
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-semibold mb-3">Dados Pessoais</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Nome</label>
              <input value={state.name} onChange={e => update('name', e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-200" placeholder="João da Silva" />
            </div>
            <div>
              <label className="block text-sm font-medium">LinkedIn</label>
              <input value={state.linkedin} onChange={e => update('linkedin', e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" placeholder="https://linkedin.com/in/username" />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input value={state.email} onChange={e => update('email', e.target.value)} type="email" className="mt-1 w-full rounded-md border px-3 py-2" placeholder="meu@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium">Telefone</label>
              <input value={state.phone} onChange={e => update('phone', e.target.value)} type="tel" className="mt-1 w-full rounded-md border px-3 py-2" placeholder="(11) 9 9999-9999" />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Resumo profissional</label>
            <textarea value={state.summary} onChange={e => update('summary', e.target.value)} maxLength={500} rows={4} className="mt-1 w-full rounded-md border px-3 py-2 resize-none" placeholder="Resumo sucinto — destaque suas competências e objetivo" />
            <div className="flex justify-between items-center mt-1 text-xs text-slate-500">
              <div>Sugestão: 2–4 linhas, focadas em resultado.</div>
              <div>{state.summary.length}/500</div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button onClick={() => enhanceSummary()} type="button" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:brightness-105">💡 Melhorar com IA</button>
          </div>
        </div>

        <SkillsEditor />
        <ExperiencesEditor />

        <div className="flex gap-3 justify-end">
          <button onClick={() => alert('Mock: export/PDF será implementado no app completo')} className="px-4 py-2 bg-gray-900 text-white rounded-md">Baixar (mock)</button>
          <button onClick={() => setState(initialState)} className="px-4 py-2 border rounded-md">Limpar</button>
        </div>
      </div>
    </section>
  );
}

function SkillsEditor() {
  const { state, setState } = useCV();
  const [name, setName] = useState('');
  const [level, setLevel] = useState<Skill['level']>('Intermediário');

  function addSkill() {
    if (!name.trim()) return;
    const s: Skill = { id: uid('sk_'), name: name.trim(), level };
    setState(prev => ({ ...prev, skills: [...prev.skills, s] }));
    setName('');
    setLevel('Intermediário');
  }

  function updateSkill(id: string, fields: Partial<Skill>) {
    setState(prev => ({ ...prev, skills: prev.skills.map(s => s.id === id ? { ...s, ...fields } : s) }));
  }

  function removeSkill(id: string) {
    setState(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));
  }

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold mb-3">Habilidades</h2>
      <div className="space-y-3">
        {state.skills.length === 0 && <div className="text-sm text-slate-500 italic">Nenhuma habilidade adicionada.</div>}
        {state.skills.map(s => (
          <div key={s.id} className="flex items-center gap-2">
            <input value={s.name} onChange={e => updateSkill(s.id, { name: e.target.value })} className="flex-1 rounded-md border px-3 py-2" />
            <select value={s.level} onChange={e => updateSkill(s.id, { level: e.target.value as Skill['level'] })} className="rounded-md border px-3 py-2">
              <option>Básico</option>
              <option>Intermediário</option>
              <option>Avançado</option>
            </select>
            <button onClick={() => removeSkill(s.id)} className="text-sm text-red-600">Remover</button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input placeholder="Nome da habilidade (ex: React)" value={name} onChange={e => setName(e.target.value)} className="flex-1 rounded-md border px-3 py-2" />
        <select value={level} onChange={e => setLevel(e.target.value as Skill['level'])} className="rounded-md border px-3 py-2">
          <option>Básico</option>
          <option>Intermediário</option>
          <option>Avançado</option>
        </select>
        <button onClick={addSkill} className="px-4 py-2 bg-green-600 text-white rounded-md">Adicionar</button>
      </div>
    </div>
  );
}

function ExperiencesEditor() {
  const { state, setState } = useCV();

  function addExperience() {
    const e: Experience = { id: uid('ex_'), company: '', role: '', periodStart: '', periodEnd: '', current: false, description: '' };
    setState(prev => ({ ...prev, experiences: [...prev.experiences, e] }));
  }

  function updateExperience(id: string, fields: Partial<Experience>) {
    setState(prev => ({ ...prev, experiences: prev.experiences.map(x => x.id === id ? { ...x, ...fields } : x) }));
  }

  function removeExperience(id: string) {
    setState(prev => ({ ...prev, experiences: prev.experiences.filter(x => x.id !== id) }));
  }

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-semibold mb-3">Experiências</h2>
      <div className="space-y-4">
        {state.experiences.length === 0 && <div className="text-sm text-slate-500 italic">Nenhuma experiência registrada.</div>}
        {state.experiences.map(ex => (
          <div key={ex.id} className="border rounded-md p-3">
            <div className="flex gap-2">
              <input value={ex.company} onChange={e => updateExperience(ex.id, { company: e.target.value })} placeholder="Empresa" className="flex-1 rounded-md border px-3 py-2" />
              <input value={ex.role} onChange={e => updateExperience(ex.id, { role: e.target.value })} placeholder="Cargo" className="flex-1 rounded-md border px-3 py-2" />
            </div>
            <div className="flex gap-2 mt-2 items-center">
              <input value={ex.periodStart} onChange={e => updateExperience(ex.id, { periodStart: e.target.value })} placeholder="Início (MM/AAAA)" className="rounded-md border px-3 py-2" />
              <input value={ex.periodEnd} onChange={e => updateExperience(ex.id, { periodEnd: e.target.value })} placeholder="Fim (MM/AAAA)" className="rounded-md border px-3 py-2" disabled={!!ex.current} />
              <label className="flex items-center gap-2 text-sm"><input checked={!!ex.current} onChange={e => updateExperience(ex.id, { current: e.target.checked })} type="checkbox" /> Trabalho atual</label>
              <button onClick={() => removeExperience(ex.id)} className="ml-auto text-red-600">Remover</button>
            </div>
            <div className="mt-2">
              <textarea value={ex.description} onChange={e => updateExperience(ex.id, { description: e.target.value })} rows={3} placeholder="Descrição das atividades" className="w-full rounded-md border px-3 py-2" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t pt-4">
        <button onClick={addExperience} className="px-4 py-2 bg-indigo-600 text-white rounded-md">Adicionar experiência</button>
      </div>
    </div>
  );
}

function CVPreview() {
  const { state } = useCV();

  return (
    <aside className="w-1/2 p-6 bg-gradient-to-b from-white to-slate-50">
      <div className="h-full overflow-y-auto flex justify-center">
        <div className="w-[820px] bg-white rounded-xl shadow p-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className={`text-2xl font-bold ${!state.name ? 'text-slate-400 italic' : ''}`}>{state.name || 'Seu Nome Aqui'}</h2>
              <div className="text-sm text-slate-600">{[state.email, state.phone, state.linkedin].filter(Boolean).join(' • ') || 'email • telefone • linkedin'}</div>
            </div>
            <div className="text-right">
              <div className={`mt-2 max-w-[320px] text-sm text-slate-700 ${!state.summary ? 'italic text-slate-400' : ''}`}>{state.summary || 'Resumo profissional aparecerá aqui.'}</div>
            </div>
          </div>

          <hr className="my-5 border-slate-100" />

          <section>
            <h3 className="text-lg font-semibold mb-3">Habilidades</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm text-slate-700">
              {state.skills.length === 0 ? (
                <li className="italic text-slate-400">Nenhuma habilidade adicionada.</li>
              ) : (
                state.skills.map(s => (
                  <li key={s.id} className="flex items-center gap-2">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-xs text-slate-500">({s.level})</span>
                  </li>
                ))
              )}
            </ul>
          </section>

          <hr className="my-5 border-slate-100" />

          <section>
            <h3 className="text-lg font-semibold mb-3">Experiências</h3>
            <div className="space-y-4 text-sm text-slate-700">
              {state.experiences.length === 0 ? (
                <div className="italic text-slate-400">Nenhuma experiência registrada.</div>
              ) : (
                state.experiences.map(ex => (
                  <div key={ex.id} className="border-l-2 border-slate-100 pl-3">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium">{ex.role || 'Cargo não informado'}</div>
                        <div className="text-xs text-slate-500">{ex.company || 'Empresa não informada'}</div>
                      </div>
                      <div className="text-xs text-slate-500">{ex.current ? `${ex.periodStart} — Atualmente` : `${ex.periodStart} — ${ex.periodEnd || ''}`}</div>
                    </div>
                    <div className={`mt-1 text-sm text-slate-700 ${!ex.description ? 'italic text-slate-400' : ''}`}>{ex.description || 'Descrição da experiência.'}</div>
                  </div>
                ))
              )}
            </div>
          </section>

          <div className="mt-6 text-xs text-slate-400">* Campos vazios aparecem com indicação visual. Protótipo React + TypeScript.</div>
        </div>
      </div>
    </aside>
  );
}

// ----------------------------- App (root) -----------------------------
export default function App() {
  const [state, setState] = useState<CVState>(() => ({
    ...initialState,
    skills: [ { id: uid('sk_'), name: 'JavaScript', level: 'Avançado' } ],
    experiences: [ {
      id: uid('ex_'),
      company: 'Empresa Exemplo',
      role: 'Desenvolvedor Front-end',
      periodStart: '01/2021',
      periodEnd: '12/2023',
      current: false,
      description: 'Desenvolvimento de interfaces responsivas e colaboração em times ágeis.'
    } ]
  }));

  // Persist to localStorage for convenience
  useEffect(() => {
    localStorage.setItem('cv_state_v1', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const raw = localStorage.getItem('cv_state_v1');
    if (raw) {
      try { setState(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  return (
    <CVContext.Provider value={{ state, setState }}>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Header />
        <main className="flex-1 flex">
          <FormSection />
          <CVPreview />
        </main>
      </div>
    </CVContext.Provider>
  );
}


export default App

