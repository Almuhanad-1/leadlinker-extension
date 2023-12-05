chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Message received in background:', request);

  // Example: send a response back
  sendResponse({ data: 'example response' });
});