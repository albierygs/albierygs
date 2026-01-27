// Adiciona o ano atual ao rodapé automaticamente
const footerCopyright = document.getElementById("footer-copyright").innerHTML;
footerCopyrightText = footerCopyright.replace(
  "©",
  "© " + new Date().getFullYear(),
);
document.getElementById("footer-copyright").innerHTML = footerCopyrightText;

// Tema claro/escuro: localStorage > sistema > padrão escuro
const TEMA_KEY = "tema";

function temaAtual() {
  return document.documentElement.getAttribute("data-tema") || "escuro";
}

function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema;
  localStorage.setItem(TEMA_KEY, tema);
  atualizarIconeTema();
}

function atualizarIconeTema() {
  const icone = document.getElementById("tema-icone");
  if (!icone) return;
  const isEscuro = temaAtual() === "escuro";
  icone.classList.remove("fa-sun", "fa-moon");
  icone.classList.add(isEscuro ? "fa-sun" : "fa-moon");
}

function trocarTema() {
  const proximo = temaAtual() === "escuro" ? "claro" : "escuro";
  aplicarTema(proximo);
}

atualizarIconeTema();

// GitHub Stats
const GITHUB_USER = "albierygs";

async function carregarGitHubStats() {
  const elCommits = document.getElementById("stat-commits");
  const elRepos = document.getElementById("stat-repos");
  const elUltimoProjeto = document.getElementById("ultimo-projeto-nome");
  const elUltimoProjetoLink = document.getElementById("ultimo-projeto-link");
  if (!elCommits || !elRepos || !elUltimoProjeto || !elUltimoProjetoLink)
    return;

  try {
    const dataInicio = new Date();
    dataInicio.setFullYear(dataInicio.getFullYear() - 1);
    const dataStr = dataInicio.toISOString().slice(0, 10);

    const [userRes, commitsRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`),
      fetch(
        `https://api.github.com/search/commits?q=author:${GITHUB_USER}+author-date:>${dataStr}`,
        { headers: { Accept: "application/vnd.github.cloak-preview+json" } },
      ),
      fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?sort=created&direction=desc&per_page=1`,
      ),
    ]);

    if (userRes.ok) {
      const user = await userRes.json();
      elRepos.textContent = user.public_repos ?? "--";
    }

    if (commitsRes.ok) {
      const commits = await commitsRes.json();
      elCommits.textContent =
        typeof commits.total_count === "number" ? commits.total_count : "--";
    }

    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (repos.length > 0) {
        const ultimoRepo = repos[0];
        elUltimoProjeto.textContent = ultimoRepo.name;
        elUltimoProjetoLink.href = ultimoRepo.html_url;
      }
    }
  } catch {
    elCommits.textContent = "--";
    elRepos.textContent = "--";
    elUltimoProjeto.textContent = "--";
    elUltimoProjetoLink.href = "#";
  }
}

carregarGitHubStats();

// Skills Slider Infinito
function iniciarSkillsSlider() {
  const skillsSlider = document.getElementById("skills-slider");
  if (!skillsSlider) return;

  const skills = [
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      url: "https://nodejs.org",
    },
    {
      name: "Express",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
      url: "https://expressjs.com",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      url: "https://www.typescriptlang.org",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      url: "https://react.dev",
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
      url: "https://nextjs.org",
    },
    {
      name: "NestJS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
      url: "https://nestjs.com",
    },
    {
      name: "HTML",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    {
      name: "CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    },
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
      url: "https://www.java.com",
    },
    {
      name: "Spring Boot",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
      url: "https://spring.io/projects/spring-boot",
    },
    {
      name: "Prisma",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
      url: "https://www.prisma.io",
    },
    {
      name: "Zustand",
      icon: "https://raw.githubusercontent.com/pmndrs/zustand/main/examples/demo/public/logo192.png",
      url: "https://github.com/pmndrs/zustand",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
      url: "https://www.python.org",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
      url: "https://www.mongodb.com",
    },
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
      url: "https://www.mysql.com",
    },
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
      url: "https://www.postgresql.org",
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
      url: "https://www.docker.com",
    },
    {
      name: "Kubernetes",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg",
      url: "https://kubernetes.io",
    },
  ];

  const skillsHTML = skills
    .map(
      (skill) => `
    <a href="${skill.url}" target="_blank" rel="noopener noreferrer" class="skill-item com-tooltip tooltip-abaixo" data-tooltip="${skill.name}" title="${skill.name}">
      <img src="${skill.icon}" alt="${skill.name}" />
      <span>${skill.name}</span>
    </a>
  `,
    )
    .join("");

  // Duplicamos apenas 2 vezes é o suficiente para o loop infinito visual
  skillsSlider.innerHTML = skillsHTML + skillsHTML;

  let isPaused = false;
  let currentTranslate = 0;
  const speed = 0.8; // Velocidade ajustada

  skillsSlider.addEventListener("mouseenter", () => (isPaused = true));
  skillsSlider.addEventListener("mouseleave", () => (isPaused = false));

  function animate() {
    if (!isPaused) {
      currentTranslate -= speed;

      // O slider contém duas cópias. Resetamos quando a primeira cópia sumir (metade da largura total)
      const halfWidth = skillsSlider.scrollWidth / 2;

      if (Math.abs(currentTranslate) >= halfWidth) {
        currentTranslate = 0;
      }

      skillsSlider.style.transform = `translateX(${currentTranslate}px)`;
    }
    requestAnimationFrame(animate);
  }

  animate();
}

iniciarSkillsSlider();

/* --- SISTEMA DE PROJETOS --- */

// Array de Projetos (Exemplo Inicial)
const projetos = [
  {
    nome: "Gerenciador de Despesas",
    descricao:
      "Aplicação desktop para gerenciamento de despesas pessoais e gestão de produtos para pequenas empresas. O sistema permite o cadastro de usuários e empresas, gerenciamento de despesas, visualização de gráficos estatísticos e geração de relatórios em PDF.",
    stacks: [
      "Java",
      "JavaFX",
      "HyperSQL",
      "JFreeChart",
      "Maven",
      "Apache PDFBox",
      "JUnit 5",
    ],
    caminho_capa: "./assets/images/gerenciador-despesas-capa.png",
    link_github: "https://github.com/albierygs/GerenciadorDespesas",
    link_deploy: "https://github.com/albierygs/GerenciadorDespesas/releases",
    license: "MIT",
  },
  {
    nome: "To-Do List com geolocalização",
    descricao:
      "Aplicação Fullstack de To-Do List robusta desenvolvida em React. Diferente de listas de tarefas comuns, esta aplicação integra funcionalidades avançadas como autenticação de usuários, geolocalização de tarefas e categorização temporal inteligente.",
    stacks: [
      "React",
      "Javascript",
      "CSS modules",
      "Zod",
      "Axios",
      "Express",
      "MongoDB",
    ],
    caminho_capa: "./assets/images/to-do-list-capa.png",
    link_github: "https://github.com/albierygs/to-do-list",
    link_deploy: "https://to-do-list-five-red-99.vercel.app/",
    license: "MIT",
  },
  {
    nome: "Blockchain Audit",
    descricao:
      "Este projeto é uma solução de backend focada em transparência filantrópica. Ele gerencia o fluxo de recursos dentro de organizações (ONGs), conectando doadores, membros e beneficiários.",
    stacks: [
      "React",
      "Tailwind CSS",
      "Express",
      "Node.js",
      "Zod",
      "MySQL",
      "Prisma",
      "JWT",
    ],
    caminho_capa: "./assets/images/blockchain-capa.png",
    link_github: "https://github.com/albierygs/blockchain-audit",
    link_deploy: "https://auditoria-nine.vercel.app/",
    license: "MIT",
  },
  {
    nome: "Water Classifier HGBC",
    descricao:
      "Projeto que consiste na implementação e otimização de um classificador (HistGradientBoostingClassifier) para determinar a potabilidade da água (Potability) a partir de dados físico-químicos contidos em um dataset (CSV). O objetivo é criar um modelo preditivo eficiente que auxilie na avaliação da qualidade da água para consumo humano.",
    stacks: [
      "Python",
      "Pandas",
      "Matplotlib",
      "HistGradientBoostingClassifier",
    ],
    caminho_capa: "./assets/images/water-classifier-capa.png",
    link_github:
      "https://github.com/albierygs/water-classifier-HistGradientBoosting",
    link_deploy: null,
    license: "MIT",
  },
  {
    nome: "Big Data Covid-19",
    descricao:
      "Projeto de análise de dados sobre a pandemia de Covid-19. Utilizando Python e bibliotecas como Pandas e Matplotlib, o projeto coleta, processa e visualiza grandes volumes de dados relacionados à disseminação do vírus, utilizando dados públicos do governo e organizações de saúde.",
    stacks: ["Python", "Pandas", "Jupyter Notebook", "Matplotlib"],
    caminho_capa: "./assets/images/big-data-covid-capa.png",
    link_github: "https://github.com/albierygs/big-data-covid",
    link_deploy: null,
    license: null,
  },
  {
    nome: "Extra: Astro Jumper",
    descricao:
      "Astro Jumper é um jogo de plataforma 2D em Java com tema espacial, inspirado em Super Mario Bros. Você controla um astronauta explorando um mundo industrial no espaço, saltando por plataformas, evitando perigos e sobrevivendo a meteoros caindo do céu.",
    stacks: ["Java", "LibGDX", "Tiled Map Editor"],
    caminho_capa: "./assets/images/astro-jumper-capa.png",
    link_github: "https://github.com/albierygs/astro-jumper",
    link_deploy: "https://github.com/albierygs/astro-jumper/releases",
    license: "MIT",
  },
];

let projetosVisiveis = 4; // Quantidade inicial

function renderizarProjetos() {
  const grid = document.getElementById("projetos-grid");
  const btnMais = document.getElementById("btn-ver-mais");
  const btnMenos = document.getElementById("btn-ver-menos");

  if (!grid) return;

  grid.innerHTML = "";

  // Fatiar o array baseado na quantidade visível
  const itemsParaMostrar = projetos.slice(0, projetosVisiveis);

  itemsParaMostrar.forEach((projeto, index) => {
    // Criação do Card
    const card = document.createElement("div");
    card.className = "projeto-card";
    // Ao clicar no card, abre o drawer (passando o índice real)
    card.onclick = (e) => {
      // Evita abrir se clicar diretamente nos ícones de link pequenos
      if (e.target.closest(".card-link-icon")) return;
      abrirDrawer(index);
    };

    // Imagem de capa (fallback se não houver imagem)
    const imagemSrc =
      projeto.caminho_capa ||
      "https://via.placeholder.com/400x200?text=No+Image";

    // Ícones de link
    const githubIcon = projeto.link_github
      ? `<a href="${projeto.link_github}" target="_blank" class="card-link-icon" title="GitHub"><i class="fa-brands fa-github"></i></a>`
      : "";

    const deployIcon = projeto.link_deploy
      ? `<a href="${projeto.link_deploy}" target="_blank" class="card-link-icon" title="Ver Projeto"><i class="fa-solid fa-globe"></i></a>`
      : "";

    // HTML do Card
    card.innerHTML = `
      <div class="card-capa">
        <img src="${imagemSrc}" alt="${projeto.nome}">
      </div>
      <div class="card-body">
        <h3 class="card-titulo">${projeto.nome}</h3>
        <div class="card-tags">
          ${projeto.stacks.map((tech) => `<span class="tag-tech">${tech}</span>`).join("")}
        </div>
        <div class="card-links">
          ${githubIcon}
          ${deployIcon}
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Lógica dos Botões
  if (projetosVisiveis >= projetos.length) {
    btnMais.classList.add("hidden");
    // Só mostra "Ver Menos" se houver mais que o limite inicial (4)
    if (projetos.length > 4) {
      btnMenos.classList.remove("hidden");
    }
  } else {
    btnMais.classList.remove("hidden");
    btnMenos.classList.add("hidden");
  }

  // Se voltamos para apenas 4, esconde o botão "Ver Menos"
  if (projetosVisiveis <= 4) {
    btnMenos.classList.add("hidden");
  }
}

function gerenciarProjetos(acao) {
  if (acao === "mais") {
    projetosVisiveis += 4;
  } else if (acao === "menos") {
    projetosVisiveis = 4;
    // Scroll suave de volta para o topo da seção de projetos
    document
      .getElementById("projetos-container")
      .scrollIntoView({ behavior: "smooth" });
  }
  renderizarProjetos();
}

// Inicializa
renderizarProjetos();

/* --- DRAWER E JSON --- */

function abrirDrawer(index) {
  const projeto = projetos[index];
  const drawer = document.getElementById("projeto-drawer");
  const overlay = document.getElementById("drawer-overlay");

  // Preencher Imagem e Links
  const imgElement = document.getElementById("drawer-img");
  imgElement.src =
    projeto.caminho_capa || "https://via.placeholder.com/800x400";

  const btnGithub = document.getElementById("drawer-link-github");
  const btnDeploy = document.getElementById("drawer-link-deploy");

  if (projeto.link_github) {
    btnGithub.href = projeto.link_github;
    btnGithub.style.display = "inline-block";
  } else {
    btnGithub.style.display = "none";
  }

  if (projeto.link_deploy) {
    btnDeploy.href = projeto.link_deploy;
    btnDeploy.style.display = "inline-block";
  } else {
    btnDeploy.style.display = "none";
  }

  // Preencher JSON Simulado (Colorido)
  const jsonContent = document.getElementById("drawer-json-content");
  jsonContent.innerHTML = formatarJsonColorido(projeto);

  // Abrir
  drawer.classList.add("open");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden"; // Bloqueia scroll da página
}

function fecharDrawer() {
  const drawer = document.getElementById("projeto-drawer");
  const overlay = document.getElementById("drawer-overlay");

  drawer.classList.remove("open");
  overlay.classList.remove("open");
  document.body.style.overflow = ""; // Libera scroll
}

// Função auxiliar para colorir o JSON (Syntax Highlighting manual)
function formatarJsonColorido(obj) {
  const jsonString = JSON.stringify(obj, null, 2);
  console.log(jsonString);

  // Regex simples para capturar chaves, strings e booleanos/null
  return jsonString.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      let cls = "json-number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "json-key"; // Chave "key":
        } else {
          cls = "json-string"; // Valor String "value"
        }
      } else if (/true|false/.test(match)) {
        cls = "json-boolean";
      } else if (/null/.test(match)) {
        cls = "json-null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    },
  );
}

/* --- MODAL DE CONTATO (MOBILE) --- */
const modalContato = document.getElementById("modal-contato");

function abrirModalContato() {
  if (modalContato) {
    modalContato.showModal(); // Método nativo do <dialog>
  }
}

function fecharModalContato() {
  if (modalContato) {
    modalContato.close();
  }
}

// Fechar ao clicar no backdrop (fora da caixa)
if (modalContato) {
  modalContato.addEventListener("click", (e) => {
    const dialogDimensions = modalContato.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      modalContato.close();
    }
  });
}
