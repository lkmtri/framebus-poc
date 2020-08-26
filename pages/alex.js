import React from 'react'
import bus from '../utils/bus'

const log = (...args) => console.log('[Alex]', ...args)

const Alex = () => {
  React.useEffect(() => {
    const onMessage = (data) => log('Received: ', data)
    bus.subscribe('alex', onMessage)
    return () => {
      bus.unsubscribe('alex', onMessage)
    }
  }, [])

  const pingParent = async () => {
    log('Received: ', await bus.request('pingpong', { from: 'Alex', message: 'Ping' }))
  }

  return (
    <>
      <p>Alex</p>
      <button onClick={pingParent}>Ping Parent</button>
    </>
  )
}

export default Alex
