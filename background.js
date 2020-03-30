/**
 * Copyright (c) 2011 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

var lastUtterance = '';
var speaking = false;
var globalUtteranceIndex = 0;

if (localStorage['lastVersionUsed'] != '1') {
  localStorage['lastVersionUsed'] = '1';
  chrome.tabs.create({
    url: chrome.extension.getURL('options.html')
  });
}

function speak(utterance) {
  if (speaking && utterance == lastUtterance) {
    chrome.tts.stop();
    return;
  }
}



function initBackground() {
  loadContentScriptInAllTabs();

  // sendKeyToAllTabs(keyString);
  // var defaultKeyString = getDefaultKeyString();
  // var keyString = localStorage['speakKey'];
  // if (keyString == undefined) {
  //   keyString = defaultKeyString;
  //   localStorage['speakKey'] = keyString;
  // }
  // sendKeyToAllTabs(keyString);
  var shortcut1 = localStorage['shortcut1'] || "Option+1";
  var shortcut2 = localStorage['shortcut2'] || "Option+2";
  var shortcut3 = localStorage['shortcut3'] || "Option+3";
  var color1 = localStorage['color1'] || "red";
  var color2 = localStorage['color2'] || "blue";
  var color3 = localStorage['color3'] || "#F0B5A5";
  let pair = [[shortcut1, color1], [shortcut2, color2], [shortcut3, color3]];

  for (const [index, element] of pair.entries()) {
      mySendToAllTabs(element[0],element[1]);
    };

  chrome.extension.onRequest.addListener(
      function(request, sender, sendResponse) {
        if (request['init']) {
          sendResponse({'key': localStorage['speakKey']});
        } else if (request['speak']) {
          speak(request['speak']);
        } 
      });

  chrome.browserAction.onClicked.addListener(
      function(tab) {
        chrome.tabs.sendRequest(
            tab.id,
            {'speakSelection': true});
      });
}

initBackground();
