// function replacePhoneNumbersWithLeadlinker(htmlContent) {
//   const phoneRegex = /(?:(?:\+|00)[1-9]\d{0,3}[\s-]?)?(?:(?:\(\d{1,5}\)[\s-]?)?[\d\s-]{5,}|(?:\d[\s-]?){8,})/g;


//   const replacedContent = htmlContent.replace(phoneRegex, (match) => {
//     // Format the phone number as "+1234567890" without spaces, parentheses, dots, or dashes
//     const formattedNumber = match.replace(/[\s\(\).-]/g, '');

//     // Use the formatted number inside the WhatsApp anchor tag
//     return `<a href="https://api.whatsapp.com/send?phone=${formattedNumber}">${match}</a>`;
//   });

//   return replacedContent;
// }

// // Example usage
// // const htmlContent = `
// //   <p>Contact us at +123 456-7890 or (555) 123-4567 for assistance.</p>
// //   <p>For support, call +1 (800) 555-1234 or (123) 456-7890.</p>
// //   <p>International format: +44 20 7946 0958</p>
// //   <p>Country code without plus: 49 89 636 48018</p>
// //   <p>Various separators: 555.123.4567, 555-123-4567, 555 123 4567</p>
// //   <p>Complex format: +81 (0) 90-1234-5678</p>
// //   <p>Alternative formats: 1234 5678, 1234-5678, 12345678</p>
// //   <p>Special characters: +1 (555) 123-4567 ext. 123</p>
// //   <p>10-digit number without separators: 1234567890</p>
// //   <p>Number with area code: (123) 456-7890 or 123-456-7890</p>
// // `;

// const bodyContent = document.body.innerHTML;
// const replacedContent = replacePhoneNumbersWithLeadlinker(bodyContent);
// document.body.innerHTML = replacedContent;
