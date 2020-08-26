import React from 'react'
import bus from '../utils/bus'

const log = (...args) => console.log('[Bob]', ...args)

const Bob = () => {
  React.useEffect(() => {
    const onMessage = (data) => log('Received: ', data)
    bus.on('bob', onMessage)
    bus.on('all', onMessage)
    return () => {
      bus.off('bob', onMessage)
      bus.off('all', onMessage)
    }
  }, [])

  React.useEffect(
    () => bus.registerService('bob_pingpong', (data) => {
      return { from: 'Bob', message: 'Pong', received: data }
    })
    ,[]
  )

  const pingParent = async () => {
    log('Received: ', await bus.request('pingpong', { from: 'Bob', message: 'Ping' }))
  }

  return (
    <>
      <p>Bob</p>
      <button onClick={pingParent}>Ping Parent</button>
      <iframe style={{ width: '100%', height: 100 }} src='cindy' />
    </>
  )
}

export default Bob
