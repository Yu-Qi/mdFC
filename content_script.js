/**
 * Copyright (c) 2011 The Chromium Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

var speakKeyStr;
var k, c;
var dict={};


function speakSelection(color) {
  var focused = document.activeElement;

  if (focused) {
    try {
      var text = focused.value.substring(
          focused.selectionStart, focused.selectionEnd);
      focused.value = "<font color="+color+">"+text+"</font>";

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
  } else if (request['k'] != undefined){
    k = request['k'];
    c = request['c'];
    dict[k] = c;
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
    console.log(dict);
    if (keyStr in dict ) {
      speakSelection(dict[keyStr]);
      evt.stopPropagation();
      evt.preventDefault();
      return false;
    }
    // else if (keyStr == k ) {
    //   // speakSelection("blue");
    //   speakSelection(c);
    //   // alert(localStorage['color2']);
    //   // alert("window: "+test);

    //   evt.stopPropagation();
    //   evt.preventDefault();
    //   return false;
    // }
    return true;
  }, false);
}

initContentScript();
