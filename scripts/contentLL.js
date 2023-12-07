function addFontIconToHead() {
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0';
  const headElement = document.head || document.getElementsByTagName('head')[0];
  headElement.appendChild(linkElement);
}

function createLinkIcon() {
  // Create SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("class", "ionicon");
  svg.setAttribute("viewBox", "0 0 512 512");
  svg.setAttribute("width", '28px');

  // Create path element
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M208 352h-64a96 96 0 010-192h64M304 160h64a96 96 0 010 192h-64M163.29 256h187.42");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("stroke-width", "36");

  // Append path to SVG
  svg.appendChild(path);
  return svg;
}
function insertPhoneNumbers(textContent, phoneRegex) {
  return textContent.replace(phoneRegex, (match) => {
    // Format the phone number as "+1234567890" without spaces, parentheses, dots, or dashes
    const formattedNumber = match.replace(/[\s\(\).-]/g, '');

    // anchor element with whatsapp link
    const anchorElement = document.createElement('a');
    anchorElement.href = `https://api.whatsapp.com/send?phone=${formattedNumber}&text=Hi%20there!`;
    anchorElement.target = '_blank';
    anchorElement.onclick = function (e) { e.stopPropagation(); };
    anchorElement.style = "z-index: 2147483647; pointer-events: auto;"

    // span element for icon
    // const spanElement = document.createElement('span');
    // spanElement.className = 'material-symbols-outlined';
    // spanElement.textContent = 'link';

    const linkIcon = createLinkIcon();

    anchorElement.appendChild(linkIcon);

    return `${match} ${anchorElement.outerHTML} `;
  });
}

function insertPhoneNumbersWithLeadlinker() {
  const bodyElement = document.body;
  const allTagsInBody = Array.from(bodyElement.getElementsByTagName('*'));

  const phoneRegex = /(?:\+|00)[1-9]\d{0,3}[\s-]?(?:(?:\(\d{1,5}\)[\s-]?)?[\d\s-]{5,}|(?:\d[\s-]?){8,})/g;
  // debugger;

  allTagsInBody.forEach((tag) => {
    // console.log('%c----------------------------', 'color: green;')
    if (tag.hasChildNodes()) {
      Array.from(tag.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const replacedContent = insertPhoneNumbers(child.textContent, phoneRegex);
          if (replacedContent !== child.textContent) {
            // console.log('%creplaced :', 'color: red;');
            // console.log(tag)
            const tempElement = document.createElement('div');
            tempElement.innerHTML = replacedContent;
            // console.log('%ctempElement:', 'color: yellow;')
            // console.log(tempElement.innerHTML)
            // console.log('first child: ', tempElement.firstChild)
            while (tempElement.firstChild) {
              tag.insertBefore(tempElement.firstChild, child);
            }
            tag.removeChild(child);
          }
        }
      });
    } else if (tag.nodeType === Node.TEXT_NODE) {
      // console.log('%c----------------------------', 'color: blue;')
      // console.log('%ctext node', 'color: yellow;')
      const replacedContent = insertPhoneNumbers(tag.textContent, phoneRegex);
      if (replacedContent !== child.textContent) {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = replacedContent;
        while (tempElement.firstChild) {
          tag.parentNode.insertBefore(tempElement.firstChild, tag);
        }
        tag.parentNode.removeChild(tag);
      }
    }
  });
}


let firedFromBackground = false;

function start() {
  if (firedFromBackground) return;
  console.log('%cinsertPhoneNumbersWithLeadlinker', 'color: green;')
  insertPhoneNumbersWithLeadlinker()
}

window.onload = start


// for spa sites
// Listen for messages from background.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // Check if the message is related to URL changes
  if (message.action === 'urlChanged') {
    insertPhoneNumbersWithLeadlinker();
    firedFromBackground = true;
    console.log('%cURL changed in content.js:', "color: red", message.url);
  }
});