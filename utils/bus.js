const coeb = (() => {
  // For SSR compatibility
  if (typeof window !== 'undefined') {
    const { CrossOriginEventBus } = require('xo-bus')
    return new CrossOriginEventBus()
  }
})()

export default coeb