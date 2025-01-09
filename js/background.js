// Background script for handling extension events

chrome.runtime.onInstalled.addListener(() => {
  console.log('Douban Beautifier installed successfully');
});

// Listen for tab updates to refresh styles
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('douban.com')) {
    chrome.tabs.sendMessage(tabId, { type: 'REFRESH_STYLES' });
  }
});
