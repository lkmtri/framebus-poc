const getCoeb = () => {
  if (typeof window !== 'undefined') {
    const { CrossOriginEventBus } = require('xo-bus')
    const coeb = new CrossOriginEventBus()
    coeb.emit = coeb.send
    coeb.on = coeb.subscribe
    coeb.off = coeb.unsubscribe

    const registerService = coeb.registerService.bind(coeb)
    const unregisterService = coeb.unregisterService.bind(coeb)

    coeb.registerService = (name, fn) => {
      registerService(name, fn)
      return () => unregisterService(name)
    }

    return coeb
  }
}

export default getCoeb()