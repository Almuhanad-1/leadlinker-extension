function replacePhoneNumbersWithLeadlinker(htmlContent) {
  // Phone number regex
  const phoneRegex = /(?:\+|00)[1-9]\d{0,3}[\s-]?(?:(?:\(\d{1,5}\)[\s-]?)?[\d\s-]{5,}|(?:\d[\s-]?){8,})/g;

  // Find all matches
  const matches = htmlContent.match(phoneRegex);

  if (!matches) {
    return htmlContent;
  }

  // Filter out matches within SVG, PATH, PICTURE tags
  const filteredMatches = matches
    .filter((match) => {
      const excludedTagsRegex = /<svg.*?<\/svg>|<path.*?<\/path>|<picture.*?<\/picture>/g;
      const excludedMatches = htmlContent.match(excludedTagsRegex);
      return excludedMatches ? excludedMatches.every((tag) => !tag.includes(match)) : true;
    });

  // Replace phone numbers with anchor tags using the filtered matches
  const replacedContent = htmlContent.replace(phoneRegex, (match) => {
    if (filteredMatches.includes(match)) {
      // Format the phone number as "+1234567890" without spaces, parentheses, dots, or dashes
      const formattedNumber = match.replace(/[\s\(\).-]/g, '');

      // Use the formatted number inside the WhatsApp anchor tag
      return `${match}<a href="https://api.whatsapp.com/send?phone=${formattedNumber}" target="_blank"><span class="material-symbols-outlined">link</span></a>`;
    } else {
      return match;
    }
  });

  return replacedContent;
}

// add font icon to head
const linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0';
const headElement = document.head || document.getElementsByTagName('head')[0];
headElement.appendChild(linkElement);


console.log('file loaded #########');

window.onload = function () {
  console.log('Page fully loaded');
  const bodyContent = document.body.innerHTML;
  const replacedContent = replacePhoneNumbersWithLeadlinker(bodyContent);
  document.body.innerHTML = replacedContent;
};

// alert('DOM loadedqq');
chrome.runtime.sendMessage({ type: 'example' }, function (response) {
  console.log('Response received:', response);
});