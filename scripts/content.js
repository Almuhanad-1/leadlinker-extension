function replacePhoneNumbersWithLeadlinker(htmlContent) {
  // Phone number regex
  const phoneRegex = /(?:(?:\+|00)[1-9]\d{0,3}[\s-]?)?(?:\(\d{1,5}\)[\s-]?)?[\d\s-]{5,}/g;
  // Find all matches
  const matches = htmlContent.match(phoneRegex);

  if (!matches) {
    return htmlContent;
  }

  // Filter out matches within SVG tags
  const filteredMatches = matches.filter((match) => {
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
      return `<a href="https://api.whatsapp.com/send?phone=${formattedNumber}" target="_blank">${match}</a>`;
    } else {
      return match;
    }
  });

  return replacedContent;
}

const bodyContent = document.body.innerHTML;
const replacedContent = replacePhoneNumbersWithLeadlinker(bodyContent);
document.body.innerHTML = replacedContent;


alert('DOM loadedqq');