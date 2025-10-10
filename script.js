/* === CONFIG ===
 * Troque pelo telefone em formato internacional (ex: 55DDDTEL)
 * sem sinais. Ex: 5581999998888
 */
const WHATSAPP_NUMBER = "55XXXXXXXXXXX"; // <--- substituir pelo número real
const DEFAULT_WHATS_MESSAGE = "Olá!%20Quero%20saber%20mais%20sobre%20os%20planos%20da%20Academia%20Ultra.";

/* Util: cria link do whatsapp com mensagem (encode) */
function makeWhatsAppLink(phone, text) {
  const base = "https://api.whatsapp.com/send";
  const encoded = encodeURIComponent(text);
  return `${base}?phone=${phone}&text=${encoded}`;
}

/* DOM */
document.addEventListener("DOMContentLoaded", () => {
  // ano no rodapé
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // botões de whatsapp
  const wpFloat = document.getElementById("whatsapp-float");
  const btnHero = document.getElementById("btn-whatsapp-hero");
  const footerWhats = document.getElementById("footer-whats");
  const btnCtaWhatsapp = document.getElementById("btn-cta-whatsapp");

  const defaultLink = makeWhatsAppLink(WHATSAPP_NUMBER, DEFAULT_WHATS_MESSAGE);

  [wpFloat, btnHero, footerWhats, btnCtaWhatsapp].forEach(el => {
    if (!el) return;
    el.setAttribute("href", defaultLink);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  // Float button keyboard focus accessible
  if (wpFloat) wpFloat.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") wpFloat.click();
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Form handling: valida e abre WhatsApp com mensagem preenchida
  const form = document.getElementById("leadForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const whatsapp = document.getElementById("whatsapp").value.trim();

      if (!name || !email || !whatsapp) {
        alert("Por favor preencha todos os campos.");
        return;
      }

      // Mensagem personalizada
      const msg = `Olá!%20Meu%20nome%20é%20${encodeURIComponent(name)}.%20Meu%20email%20é%20${encodeURIComponent(email)}.%20Meu%20WhatsApp%20é%20${encodeURIComponent(whatsapp)}.%20Tenho%20interesse%20no%20Plano%20GoldPró.`;
      const url = makeWhatsAppLink(WHATSAPP_NUMBER, msg);

      // opcional: enviar dados para endpoint aqui via fetch (backend) antes de abrir wp

      window.open(url, "_blank", "noopener");
    });
  }

  // botão CTA que abre direto o WhatsApp (sem formulário)
  const directBtns = [document.getElementById("btn-whatsapp-hero"), document.getElementById("footer-whats"), document.getElementById("btn-cta-whatsapp")];
  directBtns.forEach(b => {
    if (!b) return;
    b.addEventListener("click", (e) => {
      // deixa a href fazer o job (já configurada acima)
    });
  });

});
