<h1 align="center">Gerador de Curriculo IA </h1>

Repositorio criado para o Projeto do Gerador Inteligente de Currículos com IA.
______________________________________________________________________________________________


Participantes do projeto:
* Geraldo George Trindade Costa 
* Lilian Mendes Silva dos Santos 
* Juliana Cristina Alves Fioretti

## Gerador de Currículo Inteligente com Preview em Tempo Real

Esse projeto permite que os usuarios elaborem de forma online um Curriculo Inteligente, em que ao mesmo tempo consiga ver a previa do curriculo pronto.

____________________________________________________________________________________________
## Objetivo do projeto

Colocar em prática, as tecnologias que aprendemos em sala de aula:
_React 19_ + _TypeScript_ + _TailwindCSS v4_ + _Vite_ .

______________________________________________________________________________________________

## Funcionalidades

**• Preview Instantâneo** - Mudanças aparecem em tempo real

**• Listas Dinâmicas** - Adicionar/remover habilidades e experiências

**• Layout Desktop** - Interface otimizada para desktop

**• Design Profissional** - Interface clean e moderna

____________________________________________________________________________________________
## Tecnologias Utilizadas

Como mencionado anteriormente utilizaremos as tecnologias que aprendemos em sala de aula:

-`React 19:` Biblioteca JavaScript para criar interfaces de usuário dinâmicas e reativas.

-`TypeScript:` Superconjunto do JavaScript que adiciona tipagem estática para maior segurança e organização do código.

-`TailwindCSS v4:` Framework CSS "utility-first" para estilizar componentes de forma rápida e direta.

-`Vite:` Ferramenta de build extremamente rápida para iniciar e desenvolver projetos web modernos.

_____________________________________________________________________________________________

## Estrutura do Projeto

src/
├── App.tsx

├── components/

│ ├── Layout/

│ │ ├── FormSection.tsx

│ │ └── PreviewSection.tsx

│ ├── Form/

│ │ ├── PersonalInfo.tsx

│ │ ├── Skills.tsx

│ │ ├── Experience.tsx

│ │ └── AIEnhanceButton.tsx

│ ├── Preview/

│ │ ├── CVPreview.tsx

│ │ ├── PersonalHeader.tsx

│ │ ├── SkillsSection.tsx

│ │ └── ExperienceSection.tsx

│ └── UI/

│ ├── LoadingSpinner.tsx

│ ├── ErrorBoundary.tsx

│ └── Toast.tsx

├── services/

│ └── aiService.ts

├── hooks/

│ ├── useCVData.ts

│ ├── useAIEnhancement.ts

│ └── useToast.ts

├── utils/

│ ├── validation.ts

│ └── textProcessing.ts

├── types/

│ ├── cv.types.ts

│ └── api.types.ts

└── index.css

