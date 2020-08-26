const getCoeb = () => {
  if (typeof window !== 'undefined') {
    const { CrossOriginEventBus } = require('xo-bus')
    const coeb = new CrossOriginEventBus()
    
    // To expose same apis as framebus
    coeb.emit = coeb.send.bind(coeb)
    coeb.on = coeb.subscribe.bind(coeb)
    coeb.off = coeb.unsubscribe.bind(coeb)

    const registerService = coeb.registerService.bind(coeb)
    const unregisterService = coeb.unregisterService.bind(coeb)

    // Monkey-patch coeb.registerService to return the unregister function
    coeb.registerService = (name, fn) => {
      registerService(name, fn)
      return () => unregisterService(name)
    }

    return coeb
  }
}

export default getCoeb()