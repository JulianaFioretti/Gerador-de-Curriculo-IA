# Overview

Este é um projeto de um **Gerador de Currículo Inteligente**, desenvolvido com tecnologias web modernas. A ideia principal é que, enquanto a pessoa preenche os formulários com suas informações, ela consegue ver uma prévia do currículo sendo montada em tempo real.

Analisando os arquivos, podemos ver que as principais tecnologias utilizadas são:

* **React:** Uma biblioteca para construir a interface de pessoa usuária de forma dinâmica.  
* **TypeScript:** Adiciona tipos ao JavaScript, o que torna o código mais robusto e com menos chances de erros.  
* **Tailwind CSS:** Um framework de CSS que agiliza a estilização dos componentes.  
* **Vite:** Uma ferramenta de build que torna o desenvolvimento mais rápido e eficiente.

A estrutura do código-fonte está na pasta `src` e dividida por responsabilidades:

* `components/`: Contém todos os blocos de construção visuais da aplicação.

  * `Form/`: Estão os componentes do formulário onde a pessoa insere os dados do currículo (`PersonalInfo.tsx`, `Skills.tsx`, `Experience.tsx`).

  * `Preview/`: Aqui ficam os componentes que mostram a prévia do currículo sendo gerado em tempo real (`CVPreview.tsx`, `PersonalHeader.tsx`).

  * `Layout/`: Define a estrutura visual da página, como o cabeçalho (`Header.tsx`), o rodapé (`Footer.tsx`) e as seções principais.

* `hooks/`: O arquivo `useCVData.tsx` é muito importante. Ele é um "hook" do React que centraliza e gerencia todos os dados do currículo. Quando você digita algo no formulário, é esse hook que guarda a informação e a distribui para a seção de preview.

* `services/`: Contém a lógica para funcionalidades mais complexas. O `pdfService.ts`, por exemplo, é responsável por pegar os dados do currículo e transformá-los em um arquivo PDF para download.

* `types/`: O arquivo `cv.types.ts` define a "forma" dos dados do currículo. Isso ajuda a evitar erros, garantindo que os dados estejam sempre no formato esperado em toda a aplicação.

Em resumo, a aplicação funciona assim:

* A pessoa usuária insere suas informações nos componentes da pasta `Form`.

* O hook `useCVData` armazena e atualiza essas informações em um estado central.

* Os componentes da pasta `Preview` leem essas informações do estado central e se atualizam automaticamente, mostrando o resultado em tempo real.


# Gerenciamento de dados

O gerenciamento de dados é o coração desta aplicação e é o que permite a mágica do "preview em tempo real".

A estratégia usada aqui é ter um **estado centralizado**. Pense nisso como uma única fonte de verdade para todas as informações do currículo. Qualquer parte da aplicação pode ler ou modificar essa fonte, e quando ela é modificada, todas as partes que a utilizam são notificadas e se atualizam automaticamente.

Isso é feito principalmente através de um arquivo: `src/hooks/useCVData.tsx`. Ele funciona da seguinte maneira:

1. **Criação de um Contexto (`CVContext`):** No React, um "Contexto" permite que os dados sejam compartilhados entre componentes sem precisar passá-los manualmente por cada nível da árvore de componentes. Neste arquivo, o `CVContext` é criado para armazenar o estado do currículo (`state`) e a função para atualizá-lo (`setState`).

2. **O Provedor de Dados (`CVProvider`):** Este é um componente que "abraça" toda a aplicação. Se você olhar no arquivo `src/App.tsx`, verá o `<CVProvider>` envolvendo os outros componentes. Isso significa que qualquer componente dentro dele (praticamente todos) pode acessar os dados do currículo.

3. **Armazenamento e Persistência dos Dados:** Dentro do `CVProvider`, a mágica acontece.

   * Ele usa o hook `useState` do React para criar e gerenciar o `state` do currículo.

   * **Ponto-chave:** Ao iniciar, ele primeiro tenta carregar os dados do `localStorage` do navegador. `localStorage` é um pequeno espaço de armazenamento no navegador que persiste mesmo que a pessoa usuária feche ou recarregue a página. É por isso que, se você preencher o formulário e atualizar a página, as informações não se perdem\!

   * Depois, ele usa outro hook, o `useEffect`, para "observar" qualquer mudança no `state`. Assim que uma informação do currículo é alterada, o `useEffect` é acionado e salva a versão mais recente do `state` no `localStorage`.

4. **Acesso aos Dados nos Componentes:**

   * Para facilitar o acesso a esses dados, foi criado o hook customizado `useCVData()`.

   * Qualquer componente que precise dos dados do currículo, como o `PersonalInfo.tsx` (formulário) ou o `PersonalHeader.tsx` (preview), simplesmente chama `const { state, setState } = useCVData();`.

   * Com o `state`, o componente pode ler e exibir as informações. Com o `setState`, ele pode atualizar as informações.

Por exemplo, no formulário de informações pessoais (`PersonalInfo.tsx`), o código observa as mudanças nos campos do formulário e, a cada alteração, chama `setState` para atualizar o nome, e-mail, etc., no estado central. Imediatamente, o componente `PersonalHeader.tsx`, que está lendo o mesmo `state`, se atualiza para exibir o novo nome que você digitou.

# Como um componente (exemplo) envia os dados

Exemplo de como um componente de formulário interage com o estado central.

O processo pode ser dividido em três partes principais:

**1\. Gerenciamento do Estado Local da Habilidade**

Dentro do componente `Skills`, existe um "estado local". Pense nele como uma memória temporária, usada apenas para construir *uma* habilidade por vez, antes de enviá-la para o estado global.

Isso é feito com a linha: `const [skill, setSkill] = useState<Omit<Skill, "id">>({ name: "", level: "Básico" });`

* `skill`: Armazena o nome e o nível da habilidade que a pessoa está digitando no momento.

* `setSkill`: É a função usada para atualizar essa habilidade temporária.

Quando a pessoa usuária digita no campo de texto ou seleciona um nível, a função `handleChange` é chamada. Ela usa `setSkill` para atualizar esse estado local com as novas informações.

**2\. Adicionando uma Nova Habilidade ao Estado Central**

Este é o passo crucial. Quando o botão "Adicionar Habilidade" é clicado, a função `addSkill` entra em ação.

* **Acesso ao Estado Central:** Primeiro, o componente obtém acesso à função `setState` do nosso estado global usando `const { setState } = useCVData();`.

* **Criação da Nova Habilidade:** A função `addSkill` pega os dados do estado local (`skill`), adiciona um `id` único e aleatório, e cria um novo objeto de habilidade completo.

* **Atualização do Estado Central:** A parte mais importante acontece aqui: `setState(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));`  
  Vamos quebrar essa linha:

  * `setState(prev => ...)`: Estamos chamando a função para atualizar o estado central. Usamos a forma com `prev` para garantir que estamos trabalhando com a versão mais atualizada do estado.

  * `...prev`: Isso cria uma cópia de todo o estado do currículo (nome, email, experiências, etc.). É fundamental nunca modificar o estado diretamente.

  * `skills: [...prev.skills, newSkill]`: Aqui está a mágica. Estamos substituindo a lista de `skills` antiga por uma nova. Essa nova lista é uma cópia de todas as habilidades que já existiam (`...prev.skills`), com a nova habilidade (`newSkill`) adicionada ao final.

* **Limpeza:** Após adicionar, o estado local é limpo com `setSkill({ name: "", level: "Básico" });` para que a pessoa possa adicionar a próxima habilidade.

**3\. Removendo uma Habilidade**

A remoção é um processo semelhante. Cada habilidade na lista tem um botão "Remover" que, quando clicado, chama a função `removeSkill` e passa o `id` daquela habilidade específica.

A função então atualiza o estado central da seguinte forma: `setState(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));`

Isso cria uma nova lista de `skills` que contém apenas as habilidades cujo `id` **não é** igual àquele que queremos remover, efetivamente filtrando e excluindo a habilidade selecionada.

Essa abordagem de criar cópias e substituir partes do estado (imortalizada como "imutabilidade") é um conceito central no React e garante que a aplicação funcione de forma previsível e eficiente.

# Como a preview recebe e exibe os dados

O processo de receber e exibir os dados no preview é a outra metade do ciclo "em tempo real" e é surpreendentemente direto, graças à forma como o React funciona.

Vamos usar o componente `src/components/Preview/SkillsSection.tsx` como exemplo. É um componente simples e perfeito para ilustrar o processo.

A lógica se resume a dois passos principais:

**1\. "Inscrevendo-se" para Receber os Dados do Estado Central**

A primeira e mais importante linha dentro do componente é: `const { state } = useCVData();`

* Isso é tudo que o componente precisa fazer para ter acesso a **todas** as informações do currículo. Ele está chamando o mesmo hook `useCVData` que os formulários usam.

* No entanto, note que aqui ele só precisa do `state` (os dados para ler), e não da função `setState`, já que a sua única responsabilidade é *exibir* as informações, não modificá-las.

* A partir deste momento, o React sabe que o componente `SkillsSection` depende dos dados do `CVContext`. Qualquer alteração no `state` central fará com que este componente seja "redesenhado" (re-renderizado) automaticamente com as novas informações.

**2\. Exibindo os Dados na Tela**

Uma vez que o componente tem acesso ao `state`, ele pode simplesmente ler os dados e usá-los para construir o HTML.

* **Verificação de Dados Vazios:** Primeiro, ele faz uma verificação inteligente: `state.skills.length === 0 ? ...` Isso checa se a lista de habilidades está vazia. Se estiver, ele exibe uma mensagem amigável como "Nenhuma habilidade adicionada.". Isso é uma ótima prática de interface de pessoa usuária.

* **Mapeando os Dados para Elementos Visuais:** Se a lista não estiver vazia, ele usa a função `.map()` do JavaScript para percorrer cada item da lista de habilidades: `state.skills.map((s) => ( <li key={s.id} ...> ... </li> ))`  
  Para cada habilidade (`s`) na lista, ele cria um elemento de lista (`<li>`). Dentro desse elemento, ele exibe o nome (`s.name`) e o nível (`s.level`) da habilidade. O `key={s.id}` é um atributo especial que o React usa para otimizar a renderização de listas, garantindo que tudo funcione de forma rápida e eficiente.

E é isso\! O componente de preview não precisa "saber" quando os dados mudam. Ele apenas se "inscreve" no estado central com `useCVData()` e o React cuida de todo o resto. Assim que o componente de formulário `Skills` atualiza o estado, o React avisa ao `SkillsSection` que ele precisa se redesenhar com os novos dados.

Esse padrão se repete para as outras seções de preview: `PersonalHeader` lê `state.name`, `state.email`, etc., e `ExperienceSection` lê `state.experiences`.