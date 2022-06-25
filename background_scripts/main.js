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
  browser.browserAction.setIcon({ path: 'icons/main.png' });
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

  defaultSettings.links.push(request.url);
  navigator.clipboard.writeText(defaultSettings.links.join(', '));
  browser.storage.sync.set(defaultSettings).then(store => {
    settings = store;
    setIcon(settings);
  });
  return false;
}

const onChangedHandler = (changes, area) => {

  browser.storage.sync.get(defaultSettings).then(store => {
    settings = store;
    // setIcon(settings);
  });
};
// register handlers
browser.storage.sync.get(defaultSettings).then(store => {

  settings = store;
  // setIcon(settings);
  chrome.storage.onChanged.addListener(onChangedHandler);
  chrome.webRequest.onBeforeRequest.addListener(onRequestHandler, {
    urls: ["<all_urls>"]
  }, ["blocking"]);
});
