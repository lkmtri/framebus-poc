import React from 'react'
import framebus from '../utils/framebus'

const log = (...args) => console.log('[Alex]', ...args)

const Alex = () => {
  React.useEffect(() => {
    const onMessage = (data) => log('Received: ', data)
    framebus.on('alex', onMessage)
    framebus.on('both', onMessage)
    return () => {
      framebus.off('alex', onMessage)
      framebus.off('both', onMessage)
    }
  }, [])

  const pingParent = async () => {
    log('Received: ', await framebus.request('pingpong', { from: 'Alex', message: 'Ping' }))
  }

  const pingBob = async () => {
    log('Received: ', await framebus.request('bob_pingpong', { from: 'Alex', message: 'Ping' }))
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
