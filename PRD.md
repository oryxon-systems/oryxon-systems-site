# PRD — Oryxon Systems Site

Última atualização: 2026-10-19
Propósito: definir o problema, o público, os objetivos e o escopo do site institucional da Oryxon Systems.

## Problema

PMEs do Alto Tietê (SP) e de Guarulhos dependem de TI e não têm equipe interna nem processo de segurança. O site precisa apresentar a Oryxon como alternativa gerenciada e converter o visitante em conversa comercial, principalmente pelo celular (maioria dos acessos [A CONFIRMAR: fonte GA4]).

## Público-alvo

- Donos e gestores de PMEs (escritórios, clínicas, comércio, indústria leve) em Suzano, Mogi das Cruzes, Itaquaquecetuba, Poá, Ferraz de Vasconcelos, Guararema e Santa Isabel (Alto Tietê) e em Guarulhos (vizinha, fora do Alto Tietê). Atendimento remoto fora dessas cidades.
- Clientes atuais que procuram suporte (`/suporte/`).

## Proposta de valor

- MSP de gestão de TI e cibersegurança para PMEs, com posicionamento "Security by Design".
- Controles alinhados à ISO 27001 implementados internamente, **sem certificação**.
- Parceira oficial da Help Digital (franquia Help Digital São Paulo; não há unidade no Alto Tietê).
- Pentest executado por parceiro.
- SLA: confirmação automática do chamado em até 15 min; contato de técnico em até 2 h; plantão para incidentes críticos (texto-fonte: `termos.html`, seção 3).
- Sede única em Poá-SP. "Suzano" em textos de SEO é referência de território, não endereço.

## Objetivos do site

1. **Leads via WhatsApp** (`wa.me/5511934932992`): diagnóstico gratuito, mini-form do hero, CTA flutuante.
2. **Conversão GA4 `generate_lead`** (propriedade `G-FXFSLJDCNW`), enviada somente com consentimento e nas páginas com `data-track-leads="on"`.
3. **SEO local**: páginas `ti-<cidade>/`, blog, pilar de cibersegurança, JSON-LD e `llms.txt`.
4. **Conformidade LGPD**: banner de consentimento, política de privacidade e de cookies.

## Páginas e funcionalidades existentes

Ver o mapa completo em [ARCHITECTURE.md](ARCHITECTURE.md). Resumo:
home, sobre, soluções, managed services, cibersegurança (pilar), LGPD, privacidade, termos, blog (30 posts), case GregTur, central de suporte, 6 páginas de cidade.
Funcionalidades: formulários que abrem WhatsApp, contadores animados, texto rotativo no hero, rede animada em canvas no hero, view transitions, speculation rules, banner de cookies.

## Fora de escopo

- Backend próprio, banco de dados ou formulário com POST.
- Build system ou framework.
- Área logada de cliente (o portal GLPI é externo).
- Certificações que a Oryxon não possui; estatísticas sem fonte nomeada.

## Métricas de sucesso

Todas [A CONFIRMAR] (metas não registradas no repositório): leads `generate_lead` por mês, taxa de clique no WhatsApp, posições locais por cidade, LCP/CLS em mobile, taxa de aceite do banner.

## Roadmap

Ver [TASK.md](TASK.md) (Em andamento / Backlog).
