import React from 'react'
import framebus from '../utils/framebus'

const log = (...args) => console.log('[Bob]', ...args)

const Bob = () => {
  React.useEffect(() => {
    const onMessage = (data) => log('Received: ', data)
    framebus.on('bob', onMessage)
    framebus.on('both', onMessage)
    return () => {
      framebus.off('bob', onMessage)
      framebus.off('both', onMessage)
    }
  }, [])

  React.useEffect(
    () => framebus.registerService('bob_pingpong', (data) => {
      return { from: 'Bob', message: 'Pong', received: data }
    })
    ,[]
  )

  const pingParent = async () => {
    log('Received: ', await framebus.request('pingpong', { from: 'Bob', message: 'Ping' }))
  }

  return (
    <>
      <p>Bob</p>
      <button onClick={pingParent}>Ping Parent</button>
    </>
  )
}

export default Bob
