// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function load() {
  // var color1 = document.getElementById('color1');
  // var color2 = document.getElementById('color2');
  // localStorage['color1'] = color1;
  // localStorage['color2'] = color2;
  //


  var shortcut1 = localStorage['shortcut1'] || "Option+1";
  var shortcut2 = localStorage['shortcut2'] || "Option+2";
  var shortcut3 = localStorage['shortcut3'] || "Option+3";
  var color1 = localStorage['color1'] || "red";
  var color2 = localStorage['color2'] || "blue";
  var color3 = localStorage['color3'] || "#F0B5A5";
  let array = [shortcut1, shortcut2, shortcut3];
  let colarray = [color1, color2, color3];


  for (const [index, element] of array.entries()) {
      document.getElementById("shortcut"+(index+1).toString()).value = element;
    };
  for (const [index, element] of colarray.entries()) {
      document.getElementById("color"+(index+1).toString()).value = element;
    };
    for (i = 1; i < 4; i++) {
      k = document.getElementById('shortcut'+i.toString()).value;
      c = document.getElementById('color'+i.toString()).value;
      mySendToAllTabs(k,c);
    };

  // var selectedElement = document.getElementById('selected');
  // var sel = window.getSelection();
  // sel.removeAllRanges();
  // var range = document.createRange();
  // range.selectNode(selectedElement);
  // sel.addRange(range);

  var saveElement = document.getElementById('save');
  saveElement.addEventListener('click', saveValue);

  function saveValue(e) {
    // localStorage['color2'] = e.target.value;
    // window.test = e.target.value;
    var k,c;
    for (i = 1; i < 4; i++) {
      k = document.getElementById('shortcut'+i.toString()).value;
      c = document.getElementById('color'+i.toString()).value;
      localStorage['shortcut'+i.toString()] = k;
      localStorage['color'+i.toString()] = c;
      mySendToAllTabs(k,c);
    };
  }

}

document.addEventListener('DOMContentLoaded', load);
