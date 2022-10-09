"use strict";

let settings;

// util
const getHostFromUrl = url => {
  return url ? (new URL(url)).host.toLowerCase() : null;
}
const getExtensionFromUrl = url => {
  return url ? (new URL(url)).pathname.split('.').pop().toLowerCase() : null;
}

const setIcon = settings => {
  let path = 'icons/active.png';
  if (settings.disable === true) {
    path = 'icons/inactive.png';
  }
  browser.browserAction.setIcon({ path });
}
// handlers
const onRequestHandler = request => {
  if (settings.disable) {
    return false;
  }
  // check if domain is valid
  if (!settings.ignore && !settings.whitelist.includes(getHostFromUrl(request.originUrl))) {
    return false;
  }

  // check if extension is valid
  if (!settings.extensions.includes(getExtensionFromUrl(request.url))) {
    return false;
  }
  // copy url to clipboard
  if (defaultSettings.links.includes(request.url) === false) {
    defaultSettings.links.push(request.url);
    // navigator.clipboard.writeText(defaultSettings.links.join(', '));
    browser.storage.local.set(defaultSettings).then(store => {
      settings = store;
      setIcon(settings);
    });
  }
  return false;
}

const onChangedHandler = (changes, area) => {
  browser.storage.local.get(defaultSettings).then(store => {
    settings = store;
    setIcon(settings);
  });
};
// register handlers

// async function clearStorage() {
//   await browser.storage.local.clear();
// };

// browser.runtime.onStartup.addListener(clearStorage);

browser.storage.local.get(defaultSettings).then(store => {
  settings = store;
  setIcon(settings);
  chrome.storage.onChanged.addListener(onChangedHandler);
  chrome.webRequest.onBeforeRequest.addListener(onRequestHandler, {
    urls: ["<all_urls>"]
  }, ["blocking"]);
});
