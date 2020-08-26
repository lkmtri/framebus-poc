# Setup
- Install deps by `yarn`
- `yarn serve-static` to generate static bundle and serve on port 3002
- `yarn dev` to start dev server on port 3001.
- Visit http://localhost:3001 and inspect the dev console on browser.

# Framebus
Framebus is an event bus that works accross frames in a nested browsing context. 

## Usage
index.html

```javascript
const framebus = require('framebus')

framebus.on('about', console.log) // { message: 'Hi from About' }
const response = await framebus.request('api', { data: 'request' })
console.log(response) // Process request
```

about.html

```javascript
const framebus = require('framebus')

framebus.emit('about', { message: 'Hi from About' })
framebus.registerService('api', (payload) => `Process ${payload.data}`)
```