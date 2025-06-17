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

function typeWriterHTML(element, speed = 30) {
  const originalHTML = element.innerHTML;
  element.innerHTML = ""; // tøm først
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = originalHTML;

  const tokens = [];

  // Traverserer og bygger opp tokens rekursivt,
  // bevarer tagger og legger til tekst som enkelttegn
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
      // Returner tom liste for å unngå doble push utenfor
      return [];
    }
    return [tokens.pop()];
  }

  // Kjør traverse for hver child node i tempDiv og samle tokens
  const newTokens = [];
  for (const child of tempDiv.childNodes) {
    const result = traverse(child);
    // Result er som regel tom liste, fordi tokens legges til inne i traverse
    // Men tekstnoder returneres i array
    if (result.length) newTokens.push(...result);
  }

  // Erstatt tokens med newTokens hvis de ble funnet
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

window.addEventListener("load", () => {
  document.body.classList.add("show");
  const target = document.getElementById("hero-typewriter");
  if (target) {
    typeWriterHTML(target, 35);
  }
});
