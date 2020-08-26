import React from 'react'
import bus from '../utils/bus'

const log = (...args) => console.log('[Alex]', ...args)

if (typeof window !== 'undefined') {
  window.name = 'Alex'
}

const Alex = () => {
  React.useEffect(() => {
    const onMessage = (data) => log('Received: ', data)
    bus.on('alex', onMessage)
    bus.on('all', onMessage)
    return () => {
      bus.off('alex', onMessage)
      bus.off('all', onMessage)
    }
  }, [])

  React.useEffect(() => {
    // const clear = setInterval(() => {
    //   console.log(bus)
    // }, 2000)
    // return clear
    console.log(window.name, window.parent.name)
  }, [])

  const pingParent = async () => {
    log('Received: ', await bus.request('pingpong', { from: 'Alex', message: 'Ping' }))
  }

  const pingBob = async () => {
    log('Received: ', await bus.request('bob_pingpong', { from: 'Alex', message: 'Ping' }))
  }

  return (
    <>
      <p>Alex</p>
      <button onClick={pingParent}>Ping Parent</button>
      <button onClick={pingBob}>Ping Bob</button>
    </>
  )
}

export default Alex
