function addFontIconToHead() {
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0';
  const headElement = document.head || document.getElementsByTagName('head')[0];
  headElement.appendChild(linkElement);
}

function insertPhoneNumbers(textContent, phoneRegex) {
  return textContent.replace(phoneRegex, (match) => {
    // Format the phone number as "+1234567890" without spaces, parentheses, dots, or dashes
    const formattedNumber = match.replace(/[\s\(\).-]/g, '');

    // anchor element with whatsapp link
    const anchorElement = document.createElement('a');
    anchorElement.href = `https://api.whatsapp.com/send?phone=${formattedNumber}`;
    anchorElement.target = '_blank';

    // span element for icon
    const spanElement = document.createElement('span');
    spanElement.className = 'material-symbols-outlined';
    spanElement.textContent = 'link';

    anchorElement.appendChild(spanElement);

    return `${match} ${anchorElement.outerHTML} `;
  });
}

function insertPhoneNumbersWithLeadlinker(allTagsInBody) {
  const phoneRegex = /(?:\+|00)[1-9]\d{0,3}[\s-]?(?:(?:\(\d{1,5}\)[\s-]?)?[\d\s-]{5,}|(?:\d[\s-]?){8,})/g;

  allTagsInBody.forEach((tag) => {
    if (tag.hasChildNodes()) {
      tag.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const replacedContent = insertPhoneNumbers(child.textContent, phoneRegex);
          const tempElement = document.createElement('div');
          tempElement.innerHTML = replacedContent;
          while (tempElement.firstChild) {
            tag.insertBefore(tempElement.firstChild, child);
          }
          tag.removeChild(child);
        }
      });
    } else if (tag.nodeType === Node.TEXT_NODE) {
      const replacedContent = insertPhoneNumbers(tag.textContent, phoneRegex);
      const tempElement = document.createElement('div');
      tempElement.innerHTML = replacedContent;
      while (tempElement.firstChild) {
        tag.parentNode.insertBefore(tempElement.firstChild, tag);
      }
      tag.parentNode.removeChild(tag);
    }
  });
}



window.onload = function () {
  const bodyElement = document.body;
  const allTagsInBody = Array.from(bodyElement.getElementsByTagName('*'));
  insertPhoneNumbersWithLeadlinker(allTagsInBody)
  addFontIconToHead();
};

chrome.runtime.sendMessage({ type: 'example' }, function (response) {
  console.log('Response received:', response);
});