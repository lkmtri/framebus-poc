import React from 'react'
import bus from '../utils/bus'

const log = (...args) => console.log('[Cindy]', ...args)

if (typeof window !== 'undefined') {
  window.name = 'Cindy'
}
const Cindy = () => {
  React.useEffect(() => {
    const onMessage = (data) => log('Received: ', data)
    bus.on('cindy', onMessage)
    bus.on('all', onMessage)
    return () => {
      bus.off('cindy', onMessage)
      bus.off('all', onMessage)
    }
  }, [])

  const pingParent = async () => {
    log('Received: ', await bus.request('bob_pingpong', { from: 'Cindy', message: 'Ping' }))
  }

  return (
    <>
      <p>Cindy</p>
      <button onClick={pingParent}>Ping Parent</button>
    </>
  )
}

export default Cindy
