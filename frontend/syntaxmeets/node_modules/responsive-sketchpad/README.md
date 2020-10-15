# Responsive-Sketchpad

[![npm version](https://img.shields.io/npm/v/responsive-sketchpad)](https://www.npmjs.com/package/responsive-sketchpad)
[![Build](https://github.com/tsand/responsive-sketchpad/workflows/Build/badge.svg)](https://github.com/tsand/responsive-sketchpad/actions)

A completely responsive, HTML5 canvas sketchpad for use on desktop and mobile browsers with no dependencies.

[Demo](https://tsand.github.io/responsive-sketchpad/)

### Installation

`npm install responsive-sketchpad`

### Example Usage

```html
<!-- index.html -->
<html>
  <head>
    <script src="script.js" async></script>
  </head>
  <body>
    <div id="sketchpad"></div>
  </body>
  <!-- Can also include global bindings if not using JS modules -->
  <!-- <script src="sketchpad.js"></script> -->
</html>
```

```js
// script.js
var Sketchpad = require('responsive-sketchpad');

// Initialize Sketchpad
var el = document.getElementById('sketchpad');
var pad = new Sketchpad(el, {
    line: {
        color: '#f44335',
        size: 5
    }
});

// Set line color
pad.setLineColor('#f44336');

// Set line size
pad.setLineSize(10);

// Undo
pad.undo();

// Redo
pad.redo();

// Clear canvas
pad.clear();

// Resize canvas
pad.resize(100);

// Make read only
pad.setReadOnly(true);
```
