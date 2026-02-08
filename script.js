document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollAnimations();
    initCounters();
    initParticles();
    initSmoothScroll();
    initFormSubmission();
    initCardAnimations();
});

function initNavbar() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.language-card, .timeline-item, .resource-card, .feature');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / speed;
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString() + '+';
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 20 + 10;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            animation: particleFloat ${duration}s ease-in-out ${delay}s infinite;
            pointer-events: none;
        `;

        particlesContainer.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.5);
            }
        }
    `;
    document.head.appendChild(style);
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initFormSubmission() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            const button = newsletterForm.querySelector('button');
            const originalText = button.textContent;
            
            button.textContent = 'Inscrevendo...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Inscrito!';
                button.style.background = '#10b981';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    newsletterForm.reset();
                }, 2000);
            }, 1500);
        });
    }
}

function initCardAnimations() {
    const languageCards = document.querySelectorAll('.language-card');
    
    languageCards.forEach(card => {
        const color = card.getAttribute('data-color');
        
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = color;
            card.querySelector('.card-icon').style.background = color;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            card.querySelector('.card-icon').style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
        });
    });

    const cardButtons = document.querySelectorAll('.card-btn');
    
    cardButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.textContent;
        
        if (text === 'Começar Agora') {
            document.querySelector('#languages').scrollIntoView({ behavior: 'smooth' });
        } else if (text === 'Explorar Cursos') {
            document.querySelector('#courses').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-image, .code-window');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

const codeContent = document.querySelector('.code-content code');
if (codeContent) {
    const originalHTML = codeContent.innerHTML;
    codeContent.innerHTML = '';
    
    let index = 0;
    const typeWriter = () => {
        if (index < originalHTML.length) {
            codeContent.innerHTML = originalHTML.substring(0, index + 1);
            index++;
            setTimeout(typeWriter, 20);
        }
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(codeContent);
}

const languageData = {
    javascript: {
        title: 'JavaScript',
        intro: 'JavaScript é a linguagem de programação mais popular do mundo e a espinha dorsal da web moderna. Com ela, você pode criar desde simples interações até aplicações web complexas e servidores backend.',
        topics: [
            'Sintaxe básica e variáveis (let, const, var)',
            'Tipos de dados e operadores',
            'Funções e arrow functions',
            'Manipulação do DOM',
            'Eventos e event listeners',
            'Promises e async/await',
            'ES6+ features modernas',
            'APIs e Fetch',
            'Frameworks: React, Vue, Angular'
        ],
        code: `// Exemplo de JavaScript moderno
const saudacao = (nome) => {
    return \`Olá, \${nome}! Bem-vindo ao JavaScript!\`;
};

// Async/await para requisições
async function buscarDados() {
    const resposta = await fetch('https://api.exemplo.com/dados');
    const dados = await resposta.json();
    console.log(dados);
}

// Event listener
document.querySelector('.botao').addEventListener('click', () => {
    console.log('Botão clicado!');
});`,
        resources: [
            { name: 'MDN Web Docs', url: '#' },
            { name: 'JavaScript.info', url: '#' },
            { name: 'FreeCodeCamp', url: '#' },
            { name: 'Eloquent JavaScript', url: '#' }
        ]
    },
    python: {
        title: 'Python',
        intro: 'Python é uma linguagem versátil e amigável para iniciantes, perfeita para quem está começando. É amplamente usada em ciência de dados, inteligência artificial, automação e desenvolvimento web.',
        topics: [
            'Sintaxe simples e legível',
            'Variáveis e tipos de dados',
            'Estruturas de controle (if, for, while)',
            'Funções e módulos',
            'Listas, tuplas e dicionários',
            'Programação orientada a objetos',
            'Bibliotecas populares: NumPy, Pandas, Django',
            'Machine Learning com scikit-learn',
            'Automação de tarefas'
        ],
        code: `# Exemplo de Python
def calcular_media(numeros):
    """Calcula a média de uma lista de números"""
    return sum(numeros) / len(numeros)

# List comprehension
quadrados = [x**2 for x in range(10)]

# Trabalhando com dicionários
pessoa = {
    'nome': 'João',
    'idade': 25,
    'cidade': 'São Paulo'
}

# Função com decorador
@property
def nome_completo(self):
    return f"{self.primeiro_nome} {self.sobrenome}"`,
        resources: [
            { name: 'Python.org', url: '#' },
            { name: 'Real Python', url: '#' },
            { name: 'Automate the Boring Stuff', url: '#' },
            { name: 'Python for Everybody', url: '#' }
        ]
    },
    html: {
        title: 'HTML & CSS',
        intro: 'HTML e CSS são os pilares fundamentais da web. HTML estrutura o conteúdo, enquanto CSS cuida da apresentação visual. Juntos, eles permitem criar páginas web bonitas e funcionais.',
        topics: [
            'Estrutura HTML semântica',
            'Tags e elementos HTML5',
            'Formulários e inputs',
            'CSS: seletores e propriedades',
            'Flexbox e Grid Layout',
            'Responsividade e media queries',
            'Animações e transições CSS',
            'CSS preprocessors: Sass, Less',
            'Frameworks: Bootstrap, Tailwind CSS'
        ],
        code: `<!-- HTML5 Semântico -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Site</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Início</a></li>
                <li><a href="#sobre">Sobre</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section class="hero">
            <h1>Bem-vindo!</h1>
        </section>
    </main>
</body>
</html>

/* CSS Moderno */
.hero {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}`,
        resources: [
            { name: 'MDN Web Docs', url: '#' },
            { name: 'W3Schools', url: '#' },
            { name: 'CSS-Tricks', url: '#' },
            { name: 'Frontend Mentor', url: '#' }
        ]
    },
    typescript: {
        title: 'TypeScript',
        intro: 'TypeScript é um superset do JavaScript que adiciona tipagem estática. Ele ajuda a prevenir erros, melhora a produtividade e torna o código mais maintível, especialmente em projetos grandes.',
        topics: [
            'Sistema de tipos estáticos',
            'Interfaces e tipos customizados',
            'Generics',
            'Decorators',
            'Type inference',
            'Union e Intersection types',
            'Módulos e namespaces',
            'Integração com frameworks',
            'TypeScript com React/Node.js'
        ],
        code: `// TypeScript com tipos
interface Usuario {
    nome: string;
    idade: number;
    email: string;
}

// Função com tipos
function saudarUsuario(usuario: Usuario): string {
    return \`Olá, \${usuario.nome}!\`;
}

// Generics
function primeiroElemento<T>(arr: T[]): T {
    return arr[0];
}

// Type Union
type Status = 'ativo' | 'inativo' | 'pendente';

// Classes com TypeScript
class Produto {
    constructor(
        public nome: string,
        private preco: number
    ) {}
    
    calcularDesconto(percentual: number): number {
        return this.preco * (1 - percentual / 100);
    }
}`,
        resources: [
            { name: 'TypeScript Docs', url: '#' },
            { name: 'TypeScript Deep Dive', url: '#' },
            { name: 'Execute Program', url: '#' },
            { name: 'Total TypeScript', url: '#' }
        ]
    },
    react: {
        title: 'React',
        intro: 'React é a biblioteca JavaScript mais popular para construir interfaces de usuário. Criada pelo Facebook, ela permite criar componentes reutilizáveis e gerenciar o estado da aplicação de forma eficiente.',
        topics: [
            'Componentes e Props',
            'State e Lifecycle',
            'Hooks (useState, useEffect, useContext)',
            'Event handling',
            'Conditional rendering',
            'Listas e Keys',
            'Forms e controlled components',
            'React Router',
            'State management: Redux, Zustand'
        ],
        code: `// Componente funcional com Hooks
import React, { useState, useEffect } from 'react';

function Contador() {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        document.title = \`Você clicou \${count} vezes\`;
    }, [count]);
    
    return (
        <div>
            <h1>Contador: {count}</h1>
            <button onClick={() => setCount(count + 1)}>
                Incrementar
            </button>
        </div>
    );
}

// Custom Hook
function useFetch(url) {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setData(data));
    }, [url]);
    
    return data;
}`,
        resources: [
            { name: 'React Docs', url: '#' },
            { name: 'React Beta Docs', url: '#' },
            { name: 'Scrimba React Course', url: '#' },
            { name: 'React Patterns', url: '#' }
        ]
    },
    java: {
        title: 'Java',
        intro: 'Java é uma linguagem robusta e orientada a objetos, amplamente usada em aplicações corporativas, Android e sistemas de grande escala. Com o lema "Write Once, Run Anywhere", Java é conhecida por sua portabilidade.',
        topics: [
            'Sintaxe e estrutura básica',
            'Orientação a objetos',
            'Classes e objetos',
            'Herança e polimorfismo',
            'Interfaces e classes abstratas',
            'Coleções (List, Set, Map)',
            'Exception handling',
            'Multithreading',
            'Spring Framework e Spring Boot'
        ],
        code: `// Classe Java com OOP
public class Pessoa {
    private String nome;
    private int idade;
    
    public Pessoa(String nome, int idade) {
        this.nome = nome;
        this.idade = idade;
    }
    
    public String getNome() {
        return nome;
    }
    
    public void fazerAniversario() {
        this.idade++;
        System.out.println(nome + " fez " + idade + " anos!");
    }
}

// Interface e implementação
public interface Calculavel {
    double calcular();
}

public class Circulo implements Calculavel {
    private double raio;
    
    @Override
    public double calcular() {
        return Math.PI * raio * raio;
    }
}`,
        resources: [
            { name: 'Oracle Java Docs', url: '#' },
            { name: 'Java Tutorial', url: '#' },
            { name: 'Baeldung', url: '#' },
            { name: 'Effective Java', url: '#' }
        ]
    }
};

function openLanguageModal(lang) {
    const modal = document.getElementById('languageModal');
    const modalBody = document.getElementById('modalBody');
    const data = languageData[lang];
    
    if (!data) return;
    
    const html = `
        <div class="language-detail">
            <h2>${data.title}</h2>
            <p class="language-intro">${data.intro}</p>
            
            <h3>O que você vai aprender:</h3>
            <ul>
                ${data.topics.map(topic => `<li>${topic}</li>`).join('')}
            </ul>
            
            <h3>Exemplo de Código:</h3>
            <div class="code-example">
                <pre><code>${data.code}</code></pre>
            </div>
            
            <h3>Recursos Recomendados:</h3>
            <div class="resources-links">
                ${data.resources.map(resource => `
                    <a href="${resource.url}" class="resource-link" target="_blank">
                        ${resource.name}
                    </a>
                `).join('')}
            </div>
        </div>
    `;
    
    modalBody.innerHTML = html;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLanguageModal() {
    const modal = document.getElementById('languageModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}