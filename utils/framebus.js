import { v4 } from 'uuid'

const createServices = () => {
  const _services = {}

  const hasService = name => typeof _services[name] === 'function'

  const registerService = (name, fn) => {
    if (!hasService(name)) {
      _services[name] = fn
      return () => {
        delete _services[name]
      }
    }
  }

  const doService = (name, args) => {
    if (!hasService(name)) {
      throw Error(`No registered service with name "${name}"`)
    }
    return _services[name](args)
  }
  
  return {
    registerService,
    doService,
  }
}

const createFrameBus = () => {
  const services = createServices()
  const framebus = require('framebus')
  const getResponseId = id => `response-${id}`

  framebus.once = (event, fn) => {
    const cb = (data) => {
      framebus.off(event, cb)
      fn(data)
    }
    framebus.on(event, cb)
  }

  framebus.on('request', async ({ id, name, data }) => {
    try {
      const response = await services.doService(name, data)
      framebus.emit(getResponseId(id), response)
    } catch (err) {
      // console.error(err.message)
    }
  })

  framebus.request = (name, data) => {
    const id = v4()
    framebus.emit('request', { id, name, data })
    return new Promise((res) => framebus.once(getResponseId(id), (data) => res(data)))
  }

  framebus.registerService = services.registerService

  return framebus
}

export default createFrameBus()