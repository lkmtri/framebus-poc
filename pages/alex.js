import React from 'react'
import bus from '../utils/bus'

const log = (...args) => console.log('[Alex]', ...args)

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
