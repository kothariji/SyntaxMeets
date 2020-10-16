# Catenary Curve - Calculate the ideal catenary between two points

Given two points and a length, this library will calculate and draw the catenary
between two points, the "correct" way, so that it behaves natural (technically).

## How to use

```javascript
import { Catenary, Point } from 'catenary-curve'

// This is optional, you can also use a simple { x: 200, y: 300 } object.
let p1 = new Point(200, 300)
let p2 = new Point(250, 400)

let chain = new Catenary({
  segments: 50,
  iterationLimit: 100
})

const context = canvas.getContext('2d')

// The drawToCanvas function will only call the actual draw function (moveTo,
// lineTo, quadraticCurveTo), so you have to call beginPath() and stroke()
// yourself.
context.beginPath()
context.lineWidth = 1
context.strokeStyle = 'black'
chain.drawToCanvas(context, p1, p2, 500)
context.stroke()
```

## Acknowledgement

The basis of this library is an ActionScript by poiasd, originally released on
wonderfl.net, archived and preserved at http://wa.zozuar.org/code.php?c=8Bnl.

Unfortunately I wasn't able to find out who the original author was and ask
them if and how they want to be mentioned/linked.
