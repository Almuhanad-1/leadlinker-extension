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
  path.setAttribute("d", "M414.73 97.1A222.14 222.14 0 00256.94 32C134 32 33.92 131.58 33.87 254a220.61 220.61 0 0029.78 111L32 480l118.25-30.87a223.63 223.63 0 00106.6 27h.09c122.93 0 223-99.59 223.06-222A220.18 220.18 0 00414.73 97.1zM256.94 438.66h-.08a185.75 185.75 0 01-94.36-25.72l-6.77-4-70.17 18.32 18.73-68.09-4.41-7A183.46 183.46 0 0171.53 254c0-101.73 83.21-184.5 185.48-184.5a185 185 0 01185.33 184.64c-.04 101.74-83.21 184.52-185.4 184.52zm101.69-138.19c-5.57-2.78-33-16.2-38.08-18.05s-8.83-2.78-12.54 2.78-14.4 18-17.65 21.75-6.5 4.16-12.07 1.38-23.54-8.63-44.83-27.53c-16.57-14.71-27.75-32.87-31-38.42s-.35-8.56 2.44-11.32c2.51-2.49 5.57-6.48 8.36-9.72s3.72-5.56 5.57-9.26.93-6.94-.46-9.71-12.54-30.08-17.18-41.19c-4.53-10.82-9.12-9.35-12.54-9.52-3.25-.16-7-.2-10.69-.2a20.53 20.53 0 00-14.86 6.94c-5.11 5.56-19.51 19-19.51 46.28s20 53.68 22.76 57.38 39.3 59.73 95.21 83.76a323.11 323.11 0 0031.78 11.68c13.35 4.22 25.5 3.63 35.1 2.2 10.71-1.59 33-13.42 37.63-26.38s4.64-24.06 3.25-26.37-5.11-3.71-10.69-6.48z");
  path.setAttribute("fill-rule", "evenodd");
  path.setAttribute("fill", "currentColor");

  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  // path.setAttribute("stroke-width", "36");

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
    anchorElement.title = 'Send message via WhatsApp';

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