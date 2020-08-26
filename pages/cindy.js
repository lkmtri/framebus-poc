import React from 'react'
import framebus from '../utils/framebus'

const log = (...args) => console.log('[Cindy]', ...args)

const Cindy = () => {
  React.useEffect(() => {
    const onMessage = (data) => log('Received: ', data)
    framebus.on('cindy', onMessage)
    framebus.on('all', onMessage)
    return () => {
      framebus.off('cindy', onMessage)
      framebus.off('all', onMessage)
    }
  }, [])

  const pingParent = async () => {
    log('Received: ', await framebus.request('bob_pingpong', { from: 'Cindy', message: 'Ping' }))
  }

  return (
    <>
      <p>Cindy</p>
      <button onClick={pingParent}>Ping Parent</button>
    </>
  )
}

export default Cindy
