// Function to inject the content script
async function injectScript(tabId) {
  try {
    // First, check if the script is already injected
    const results = await chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => window.redmineEnhancerInjected || false
    });

    // If script is not already injected, inject it
    if (!results[0].result) {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js']
      });
    }
  } catch (err) {
    console.error('Script injection failed:', err);
  }
}

// Function to remove injected modifications
async function removeInjectedChanges(tabId) {
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        if (window.redmineEnhancerCleanup) {
          window.redmineEnhancerCleanup();
        }
      }
    });
  } catch (err) {
    console.error('Cleanup failed:', err);
  }
}

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.match(/https:\/\/redmine\.linways\.com\/issues\//)) {
    chrome.storage.sync.get(['enabled'], function(result) {
      if (result.enabled) {
        injectScript(tabId);
      }
    });
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleStateChanged') {
    chrome.tabs.query({url: 'https://redmine.linways.com/issues/*'}, function(tabs) {
      tabs.forEach(tab => {
        if (message.enabled) {
          injectScript(tab.id);
        } else {
          removeInjectedChanges(tab.id);
        }
      });
    });
  }
});