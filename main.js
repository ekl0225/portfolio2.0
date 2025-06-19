document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".color-box");

  boxes.forEach((box) => {
    const hex = box.dataset.hex;
    if (hex) {
      box.style.backgroundColor = hex;
    }

    box.addEventListener("click", () => {
      navigator.clipboard.writeText(hex);
      const label = box.querySelector(".copy-label");
      label.textContent = "Copied!";
      setTimeout(() => {
        label.textContent = "Copy";
      }, 1200);
    });
  });
});
// Venter til hele HTML-dokumentet er ferdig lastet (DOMContentLoaded).

// Finn alle elementer med klassen .color-box.

// Henter en data-hex-verdi fra hvert element (f.eks. data-hex="#FF0000").

// Setter backgroundColor på boksen.

// Når brukeren klikker på boksen:

// Fargekoden kopieres til utklippstavlen.

// En etikett med klassen .copy-label viser "Copied!" i 1,2 sekunder, deretter "Copy".
// -------------------------------------------------------------------------

function typeWriterHTML(element, speed = 30) {
  const originalHTML = element.innerHTML;
  element.innerHTML = ""; // tøm først
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = originalHTML;

  const tokens = [];

  function traverse(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      for (const char of node.textContent) {
        tokens.push(document.createTextNode(char));
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = document.createElement(node.tagName);
      for (const attr of node.attributes) {
        el.setAttribute(attr.name, attr.value);
      }
      tokens.push(el);
      for (const child of node.childNodes) {
        const childTokens = traverse(child);
        // Legg barna som child-noder på dette elementet
        childTokens.forEach((childNode) => el.appendChild(childNode));
      }

      return [];
    }
    return [tokens.pop()];
  }

  const newTokens = [];
  for (const child of tempDiv.childNodes) {
    const result = traverse(child);
    if (result.length) newTokens.push(...result);
  }

  if (newTokens.length) tokens.push(...newTokens);

  let i = 0;

  function type() {
    if (i < tokens.length) {
      const token = tokens[i];
      element.appendChild(token);
      i++;
      const delay = token.nodeType === Node.TEXT_NODE ? speed : 0;
      setTimeout(type, delay);
    }
  }

  type();
}
// Tar inn et HTML-element og skriver ut innholdet karakter for karakter (typewriter-effekt), men bevarer all HTML-struktur (f.eks. <strong>, <a>, osv.).

// Først henter den eksisterende innerHTML.

// Så analyserer den HTML-strukturen og deler opp alt innhold i "tokens" — en liste med enten tekst-tegn eller HTML-elementer.

// Den bygger deretter opp dette innholdet gradvis ved å bruke setTimeout.

// --------------------------------------------

window.addEventListener("load", () => {
  document.body.classList.add("show");
  const target = document.getElementById("hero-typewriter");
  if (target) {
    typeWriterHTML(target, 35);
  }
});
// Når hele siden er lastet (inkludert bilder, CSS osv.), legger den til klassen show på <body> – ofte brukt til fade-in-effekter med CSS.

// Deretter kjører den typeWriterHTML på elementet med ID hero-typewriter.
