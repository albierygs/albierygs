/* --- SISTEMA DE IDIOMAS (I18N) --- */

const translations = {
  pt: {
    // Header & Nav
    "nav-resume": "Currículo",
    "nav-resume-tooltip": "Baixar currículo",
    "nav-email-tooltip": "Enviar e-mail",
    "nav-lattes-tooltip": "Currículo Lattes",
    "btn-contact-mobile": "Entrar em contato",
    "theme-tooltip": "Alternar tema",
    "lang-tooltip": "Mudar para Inglês", // Tooltip mostra a proxima ação

    // Apresentação
    "hero-role": "Desenvolvedor Full Stack",
    "hero-desc":
      "Caiu aqui de paraquedas? Sou Albiery, desenvolvedor Full Stack, graduando em Engenharia de Software, com forte foco em back-end. Crio aplicações web eficientes e bem estruturadas, sempre em busca de evolução técnica constante. Vamos construir algo incrível juntos?",
    "hero-desc-link": "Entre em contato!",

    // Seções
    "section-github": "Estatísticas do GitHub",
    "stat-commits": "Commits (últimos 12 meses)",
    "stat-repos": "Repositórios públicos",
    "stat-last-project": "Último projeto",
    "section-projects": "Projetos",
    "section-skills": "Habilidades",
    "project-info-json": "informacoes_projeto.json",
    "contacts-modal-title": "Contatos",
    "resume-modal": "Baixar Currículo",
    "email-modal": "Enviar E-mail",
    "lattes-modal": "Currículo Lattes",

    // Botões
    "btn-see-more": "Ver mais",
    "btn-see-less": "Ver menos",
    "btn-see-project": "Ver projeto",
    "btn-github-repo": "Repositório",
    "btn-see-project-tooltip": "Ver projeto",

    // Rodapé
    "footer-text": "Código fonte no GitHub",
  },
  en: {
    // Header & Nav
    "nav-resume": "Resume",
    "nav-resume-tooltip": "Download Resume",
    "nav-email-tooltip": "Send e-mail",
    "nav-lattes-tooltip": "Lattes Resume",
    "btn-contact-mobile": "Get in touch",
    "theme-tooltip": "Toggle theme",
    "lang-tooltip": "Change to Portuguese",

    // Presentation
    "hero-role": "Full Stack Developer",
    "hero-desc":
      "Just landed here by chance? I'm Albiery, a Full Stack developer and Software Engineering student, with a strong focus on back-end development. I build efficient and well-structured web applications, always striving for continuous technical growth. Let’s build something amazing together!",
    "hero-desc-link": "Get in touch!",

    // Sections
    "section-github": "GitHub Stats",
    "stat-commits": "Commits (last 12 months)",
    "stat-repos": "Public Repositories",
    "stat-last-project": "Latest Project",
    "section-projects": "Projects",
    "section-skills": "Skills",
    "project-info-json": "project_info.json",
    "contacts-modal-title": "Contacts",
    "resume-modal": "Download Resume",
    "email-modal": "Send E-mail",
    "lattes-modal": "Lattes Resume",

    // Buttons
    "btn-see-more": "See more",
    "btn-see-less": "See less",
    "btn-see-project": "See project",
    "btn-github-repo": "Repository",
    "btn-see-project-tooltip": "See project",

    // Footer
    "footer-text": "Source code on GitHub",
  },
};

// Carregar idioma salvo ou detectar do navegador
let currentLang =
  localStorage.getItem("lang") ||
  (navigator.language.startsWith("pt") ? "pt" : "en");

function applyLanguage(lang) {
  // Atualiza variável e localStorage
  currentLang = lang;
  localStorage.setItem("lang", lang);

  // Atualiza o texto do botão (mostra a sigla do idioma ATUAL)
  const btnText = document.getElementById("idioma-texto");
  if (btnText) btnText.textContent = lang === "pt" ? "BR" : "EN";

  // Atualiza o tooltip do botão de idioma
  const btnLang = document.getElementById("btn-idioma");
  if (btnLang) {
    btnLang.setAttribute("data-tooltip", translations[lang]["lang-tooltip"]);
  }

  // Percorre todos os elementos com data-lang
  document.querySelectorAll("[data-lang]").forEach((element) => {
    const key = element.getAttribute("data-lang");
    const text = translations[lang][key];

    if (text) {
      if (key.includes("-tooltip")) {
        element.setAttribute("data-tooltip", text);
      } else if (element.children.length === 0) {
        element.textContent = text;
      } else {
        // Caso complexo: tenta achar um nó de texto direto e substituir
        // Ou, se você estruturou bem, o data-lang está num <span> interno, caindo no caso acima.
        // Para simplificar, vou assumir que você colocou data-lang no elemento que contem o texto.

        // Estratégia segura: Se for o botão mobile com ícone
        if (
          [
            "btn-contato-mobile",
            "btn-ver-mais",
            "btn-ver-menos",
            "drawer-link-github",
            "drawer-link-deploy",
          ].includes(element.id)
        ) {
          // Preserva o ícone, muda só o texto
          const icon = element.querySelector("i");
          element.innerHTML = text + " ";
          if (icon) element.appendChild(icon);
        } else if (element.id === "hero-desc") {
          const link = element.querySelector("a");
          element.innerHTML = text + " ";
          if (link) element.appendChild(link);
        } else {
          element.textContent = text;
        }
      }
    }
  });

  renderizarProjetos(); // Re-renderiza projetos para atualizar textos dinâmicos
}

function toggleLanguage() {
  const newLang = currentLang === "pt" ? "en" : "pt";
  applyLanguage(newLang);
}

// Inicializar ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  applyLanguage(currentLang);
});

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
    pt: {
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
      licenca: "MIT",
    },
    en: {
      name: "Expense Manager",
      description:
        "Desktop application for managing personal expenses and product management for small businesses. The system allows user and company registration, expense management, statistical chart visualization, and PDF report generation.",
      stacks: [
        "Java",
        "JavaFX",
        "HyperSQL",
        "JFreeChart",
        "Maven",
        "Apache PDFBox",
        "JUnit 5",
      ],
      cover_path: "./assets/images/gerenciador-despesas-capa.png",
      github_link: "https://github.com/albierygs/GerenciadorDespesas",
      deploy_link: "https://github.com/albierygs/GerenciadorDespesas/releases",
      license: "MIT",
    },
  },

  {
    pt: {
      nome: "To-Do List com geolocalização",
      descricao:
        "Aplicação Fullstack de To-Do List robusta desenvolvida em React. Diferente de listas de tarefas comuns, esta aplicação integra funcionalidades avançadas como autenticação de usuários, geolocalização de tarefas e categorização temporal inteligente.",
      stacks: [
        "React",
        "JavaScript",
        "CSS Modules",
        "Zod",
        "Axios",
        "Express",
        "MongoDB",
      ],
      caminho_capa: "./assets/images/to-do-list-capa.png",
      link_github: "https://github.com/albierygs/to-do-list",
      link_deploy: "https://to-do-list-five-red-99.vercel.app/",
      licenca: "MIT",
    },
    en: {
      name: "To-Do List with Geolocation",
      description:
        "Robust fullstack To-Do List application developed with React. Unlike common task lists, this application integrates advanced features such as user authentication, task geolocation, and smart time-based categorization.",
      stacks: [
        "React",
        "JavaScript",
        "CSS Modules",
        "Zod",
        "Axios",
        "Express",
        "MongoDB",
      ],
      cover_path: "./assets/images/to-do-list-capa.png",
      github_link: "https://github.com/albierygs/to-do-list",
      deploy_link: "https://to-do-list-five-red-99.vercel.app/",
      license: "MIT",
    },
  },

  {
    pt: {
      nome: "Auditoria Blockchain",
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
      licenca: "MIT",
    },
    en: {
      name: "Blockchain Audit",
      description:
        "This project is a backend solution focused on philanthropic transparency. It manages the flow of resources within organizations (NGOs), connecting donors, members, and beneficiaries.",
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
      cover_path: "./assets/images/blockchain-capa.png",
      github_link: "https://github.com/albierygs/blockchain-audit",
      deploy_link: "https://auditoria-nine.vercel.app/",
      license: "MIT",
    },
  },

  {
    pt: {
      nome: "Classificador de água HGBC",
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
      licenca: "MIT",
    },
    en: {
      name: "Water Classifier HGBC",
      description:
        "Project focused on implementing and optimizing a classifier (HistGradientBoostingClassifier) to determine water potability based on physicochemical data contained in a dataset (CSV). The goal is to build an efficient predictive model that helps evaluate water quality for human consumption.",
      stacks: [
        "Python",
        "Pandas",
        "Matplotlib",
        "HistGradientBoostingClassifier",
      ],
      cover_path: "./assets/images/water-classifier-capa.png",
      github_link:
        "https://github.com/albierygs/water-classifier-HistGradientBoosting",
      deploy_link: null,
      license: "MIT",
    },
  },

  {
    pt: {
      nome: "Big Data Covid-19",
      descricao:
        "Projeto de análise de dados sobre a pandemia de Covid-19. Utilizando Python e bibliotecas como Pandas e Matplotlib, o projeto coleta, processa e visualiza grandes volumes de dados relacionados à disseminação do vírus, utilizando dados públicos do governo e organizações de saúde.",
      stacks: ["Python", "Pandas", "Jupyter Notebook", "Matplotlib"],
      caminho_capa: "./assets/images/big-data-covid-capa.png",
      link_github: "https://github.com/albierygs/big-data-covid",
      link_deploy: null,
      licenca: null,
    },
    en: {
      name: "Big Data Covid-19",
      description:
        "Data analysis project about the Covid-19 pandemic. Using Python and libraries such as Pandas and Matplotlib, the project collects, processes, and visualizes large volumes of data related to the spread of the virus, using public data from government sources and health organizations.",
      stacks: ["Python", "Pandas", "Jupyter Notebook", "Matplotlib"],
      cover_path: "./assets/images/big-data-covid-capa.png",
      github_link: "https://github.com/albierygs/big-data-covid",
      deploy_link: null,
      license: null,
    },
  },

  {
    pt: {
      nome: "Extra: Astro Jumper",
      descricao:
        "Astro Jumper é um jogo de plataforma 2D em Java com tema espacial, inspirado em Super Mario Bros. Você controla um astronauta explorando um mundo industrial no espaço, saltando por plataformas, evitando perigos e sobrevivendo a meteoros caindo do céu.",
      stacks: ["Java", "LibGDX", "Tiled Map Editor"],
      caminho_capa: "./assets/images/astro-jumper-capa.png",
      link_github: "https://github.com/albierygs/astro-jumper",
      link_deploy: "https://github.com/albierygs/astro-jumper/releases",
      licenca: "MIT",
    },
    en: {
      name: "Extra: Astro Jumper",
      description:
        "Astro Jumper is a 2D platformer game in Java with a space theme, inspired by Super Mario Bros. You control an astronaut exploring an industrial world in space, jumping across platforms, avoiding hazards, and surviving meteors falling from the sky.",
      stacks: ["Java", "LibGDX", "Tiled Map Editor"],
      cover_path: "./assets/images/astro-jumper-capa.png",
      github_link: "https://github.com/albierygs/astro-jumper",
      deploy_link: "https://github.com/albierygs/astro-jumper/releases",
      license: "MIT",
    },
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
      projeto[currentLang].caminho_capa || projeto[currentLang].cover_path;

    // Ícones de link
    const githubIcon =
      projeto[currentLang].link_github || projeto[currentLang].github_link
        ? `<a href="${projeto[currentLang].link_github || projeto[currentLang].github_link}" target="_blank" class="card-link-icon com-tooltip" data-tooltip="GitHub"><i class="fa-brands fa-github"></i></a>`
        : "";

    const deployIcon =
      projeto[currentLang].link_deploy || projeto[currentLang].deploy_link
        ? `<a href="${projeto[currentLang].link_deploy || projeto[currentLang].deploy_link}" target="_blank" class="card-link-icon com-tooltip" data-tooltip="Ver Projeto" data-lang="btn-see-project-tooltip"><i class="fa-solid fa-globe"></i></a>`
        : "";

    // HTML do Card
    card.innerHTML = `
      <div class="card-capa">
        <img src="${imagemSrc}" alt="${projeto[currentLang].nome || projeto[currentLang].name}" />
      </div>
      <div class="card-body">
        <h3 class="card-titulo">${projeto[currentLang].nome || projeto[currentLang].name}</h3>
        <div class="card-tags">
          ${projeto[currentLang].stacks.map((tech) => `<span class="tag-tech">${tech}</span>`).join("")}
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
    projeto[currentLang].caminho_capa || projeto[currentLang].cover_path;

  const btnGithub = document.getElementById("drawer-link-github");
  const btnDeploy = document.getElementById("drawer-link-deploy");

  if (projeto[currentLang].link_github || projeto[currentLang].github_link) {
    btnGithub.href =
      projeto[currentLang].link_github || projeto[currentLang].github_link;
    btnGithub.style.display = "inline-block";
  } else {
    btnGithub.style.display = "none";
  }

  if (projeto[currentLang].link_deploy || projeto[currentLang].deploy_link) {
    btnDeploy.href =
      projeto[currentLang].link_deploy || projeto[currentLang].deploy_link;
    btnDeploy.style.display = "inline-block";
  } else {
    btnDeploy.style.display = "none";
  }

  // Preencher JSON Simulado (Colorido)
  const jsonContent = document.getElementById("drawer-json-content");
  jsonContent.innerHTML = formatarJsonColorido(projeto[currentLang]);

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
