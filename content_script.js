/**
 * Copyright (c) 2011 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

var speakKeyStr;
var redKeyStr = "Option+1";
var blueKeyStr = "Option+2";


function speakSelection(color) {
  var focused = document.activeElement;
  var sel ="none";
  var selectedText;

  if (focused) {
    try {
      var text = focused.value.substring(
          focused.selectionStart, focused.selectionEnd);
      focused.value = "<font color="+color+">"+text+"</font>";

      // selectedText = focused.value.substring(
          // focused.selectionStart, focused.selectionEnd);
    } catch (err) {
    }
  }

}

function onExtensionMessage(request) {
  if (request['speakSelection'] != undefined) {
    if (!document.hasFocus()) {
      return;
    }
    speakSelection("red");

  } else if (request['key'] != undefined) {
    speakKeyStr = request['key'];
  }
}

function initContentScript() {
  chrome.extension.onRequest.addListener(onExtensionMessage);
  chrome.extension.sendRequest({'init': true}, onExtensionMessage);

  document.addEventListener('keydown', function(evt) {
    if (!document.hasFocus()) {
      return true;
    }
    var keyStr = keyEventToString(evt);
    console.log(keyStr);
    if (keyStr == redKeyStr && speakKeyStr.length > 0) {
      speakSelection("red");
      evt.stopPropagation();
      evt.preventDefault();
      return false;
    } else if (keyStr == blueKeyStr && speakKeyStr.length > 0) {
      speakSelection("blue");
      evt.stopPropagation();
      evt.preventDefault();
      return false;
    }
    return true;
  }, false);
}

initContentScript();
