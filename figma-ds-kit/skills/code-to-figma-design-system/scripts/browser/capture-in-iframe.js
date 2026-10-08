// Fase 4 — captura uma rota do site numa largura exata, sem editar o código.
//
// Como usar (Claude in Chrome):
//   1. generate_figma_design({ fileKey, nodeId: '<id da página Screens>' }) → CAPTURE_ID
//   2. Abra uma aba em qualquer URL do MESMO domínio (ex.: http://localhost:3001/robots.txt)
//   3. Cole este arquivo no javascript_tool com as 4 constantes ajustadas.
//   4. Faça polling de generate_figma_design({ fileKey, captureId }) até "completed".
//
// Por que iframe: a janela do Chrome nem sempre aceita resize_window; o iframe dá
// uma viewport exata (1440×900, 390×844) e 100vh/media queries reagem a ela.
// Por que não aguardar: captureForDesign envia todas as imagens e pode levar
// minutos — aguardar estoura o timeout de 45s do CDP.

const PATH = '/';                       // rota a capturar (use a URL final, com barra se houver redirect)
const WIDTH = 1440, HEIGHT = 900;       // 390 × 844 para mobile
const CAPTURE_ID = 'COLE-O-CAPTURE-ID';
// Seletores de animações de entrada a forçar no estado final (ajuste por projeto):
const FORCE_VISIBLE = '[class*="fadeIn"]{opacity:1!important;transform:none!important;transition:none!important}';

document.documentElement.innerHTML = '<head></head><body style="margin:0;background:#888"></body>';
const f = document.createElement('iframe');
f.id = 'cap'; f.src = PATH;
f.style.cssText = `width:${WIDTH}px;height:${HEIGHT}px;border:0;display:block;background:#fff`;
document.body.appendChild(f);
await new Promise(r => (f.onload = r));
await new Promise(r => setTimeout(r, 2500)); // deixa hero/carrossel assentarem
const w = f.contentWindow, d = f.contentDocument;
const st = d.createElement('style'); st.textContent = FORCE_VISIBLE; d.head.appendChild(st);
const s = d.createElement('script'); s.src = 'https://mcp.figma.com/mcp/html-to-design/capture.js'; d.head.appendChild(s);
await new Promise(r => { s.onload = r; s.onerror = r; setTimeout(r, 8000); });
window.__cap = w.figma.captureForDesign({
  captureId: CAPTURE_ID,
  endpoint: `https://mcp.figma.com/mcp/capture/${CAPTURE_ID}/submit?bindVariables=true`,
  selector: 'body',
});
// Retorno imediato para conferência (a captura segue em segundo plano):
({ innerWidth: w.innerWidth, innerHeight: w.innerHeight, scrollHeight: d.documentElement.scrollHeight, title: d.title,
   aindaInvisiveis: [...d.querySelectorAll('[class*="fadeIn"]')].filter(e => w.getComputedStyle(e).opacity !== '1').length })

// Para checar depois sem travar:
//   await Promise.race([window.__cap.then(() => 'ok', e => String(e)), new Promise(r => setTimeout(() => r('pendente'), 2000))])
// Para ler o estado inicial de um carrossel (slide ativo, textos) use uma aba normal da página.
