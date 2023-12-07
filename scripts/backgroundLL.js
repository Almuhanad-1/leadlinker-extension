// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log('Message received in background:', request);

//   // Example: send a response back
//   sendResponse({ data: 'example response' });
// });


let oldUrl = '';

chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
  if (details.url === oldUrl) return

  // 'details.url' contains the updated URL
  console.log('details:', details)
  console.log('URL changed:', details.url);

  // Send a message to content.js
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'urlChanged', url: details.url });
  });

  oldUrl = details.url;

});