const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace gold hex
html = html.replace(/#C9A84C/g, '#0de680');

// Replace rgb traces
html = html.replace(/201,\s*168,\s*76/g, '13,230,128');

// Hero section color Update
html = html.replace(
  /(\.hero-text \.line2 \{[^}]*)\}/,
  '$1 color: var(--gold); }'
);

// The SVG block was deleted in previous command maybe? So make sure it's resilient.
let hasSVGSymbol = html.includes('lambo-logo-symbol');
if (hasSVGSymbol) {
  html = html.replace(/<!-- SVG Logo Definition -->[\s\S]*?<\/svg>/, '');
}

// Replace all usages of SVG with img tag
html = html.replace(/<svg class="lambo-logo"><use href="#lambo-logo-symbol"><\/use><\/svg>/g, '<img src="logo.png" class="lambo-logo" alt="Lamborghini Logo">');

// Fix css targeting
html = html.replace(/svg\.lambo-logo/g, 'img.lambo-logo');

fs.writeFileSync('index.html', html);
console.log('Modifications executed!');
