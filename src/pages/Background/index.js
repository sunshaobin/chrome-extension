console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'openSidePanel',
        title: 'Open side panel',
        contexts: ['all']
    });
    chrome.tabs.create({ url: 'page.html' });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'openSidePanel') {
        // This will open the panel in all the pages on the current window.
        chrome.sidePanel.open({ windowId: tab.windowId });
    }
});

chrome.runtime.onMessage.addListener((message, sender) => {
    // The callback for runtime.onMessage must return falsy if we're not sending a response
    (async () => {
        if (message.action === 'open_side_panel') {
            // This will open a tab-specific side panel only on the current tab.
            await chrome.sidePanel.open({ tabId: sender.tab.id });
            await chrome.sidePanel.setOptions({
                tabId: sender.tab.id,
                path: 'sidePanelGlobal.html',
                enabled: true
            });
        }
    })();
});
