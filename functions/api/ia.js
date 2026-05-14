/**
 * Jus 9 Tecnologia Jurídica
 * Repositório: ia-dupla-jus9-tecnologia-juridica
 * Software livre com autoria preservada.
 * Direitos autorais reservados para Jus 9 Tecnologia Jurídica.
Produção do site: © Jus 9 Tecnologia Jurídica. Direitos autorais da produção reservados.
 * A licença livre não remove autoria, origem, assinatura institucional nem direitos autorais.
 * Referência oficial: https://www.jus9tecnologia.com.br/
 * E-mail de contato: clovis@jus9tecnologia.com.br
 * DNA de referência de Charlie Echo da Costa: charlieecho-jus9-tecnologia-juridica
 */

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json().catch(() => ({}));
    const modo = body.modo || "estudantes";
    const perfil = body.perfil || "geral";
    const mensagem = body.mensagem || body.pergunta || "";
    if (!env.OPENAI_API_KEY) return json({ error: "OPENAI_API_KEY não configurada na Cloudflare Pages." }, 500);
    if (!mensagem.trim()) return json({ error: "Envie uma pergunta." }, 400);
    const model = env.JUS9_MODEL_DEFAULT || "gpt-5.5";
    const instructions = buildInstructions(modo, perfil);
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Authorization": `Bearer ${env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model, input: [{ role: "system", content: instructions }, { role: "user", content: mensagem }] })
    });
    const data = await response.json();
    if (!response.ok) return json({ error: data.error?.message || "Erro na OpenAI API." }, response.status);
    return json({ resposta: data.output_text || extractText(data) || "Sem texto de resposta." });
  } catch (err) { return json({ error: err.message || "Erro inesperado." }, 500); }
}
function buildInstructions(modo, perfil) {
  const base = `Você é a CharlieEcho da Jus 9 Tecnologia Jurídica. Responda em português do Brasil. Seja clara, prudente, educativa e responsável. Nunca substitua profissional responsável. Proteja dados, segredo de justiça e informações sensíveis. Diga “não sei” quando faltar base. Não oriente fraude, invasão, perseguição, obtenção ilegal de dados, manipulação de prova ou violência.`;
  if (modo === "mvp") return base + ` Modo MVP Jurídico. Perfil do líder: ${perfil}. Priorize apoio técnico supervisionado, modelos, jurisprudência, DAJ, checklists e organização. Toda minuta exige revisão humana qualificada.`;
  if (modo === "social") return base + ` Modo Jus9 Verde/Social. Você está em tempo de ócio criativo, gratuita e em serviço social. Foque acolhimento inicial, cidadania, educação, não violência, sustentabilidade e encaminhamento responsável. Não atue como especialista jurídica nem profissional de saúde.`;
  return base + ` Modo Estudantes. Foque doutrina, monografia, pesquisa acadêmica, estrutura de estudos e orientação educacional. Não faça plágio; ajude a compreender, estruturar e pesquisar.`;
}
function extractText(data) { try { return data.output?.flatMap(o => o.content || []).map(c => c.text || "").join("\n"); } catch { return ""; } }
function json(obj, status = 200) { return new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json; charset=utf-8" } }); }
