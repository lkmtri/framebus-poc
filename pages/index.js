import React from 'react'
import bus from '../utils/bus'

const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue)

  const onChange = React.useCallback((e) => {
    setValue(e.target.value)
  }, [])

  return [value, onChange]
}

const Index = () => {
  const [value, onChange] = useInputState()

  React.useEffect(
    () => bus.registerService(
      'pingpong', 
      (data) => new Promise(
        (res) => setTimeout(() => res({ from: 'parent', message: 'Pong', received: data }), 2000))
      ), 
    []
  )

  const send = (to) => bus.emit(to, { message: value })

  return (
    <>
      <input placeholder="Enter some text" value={value} onChange={onChange} />
      <button onClick={() => send('alex')}>Send Alex</button>
      <button onClick={() => send('bob')}>Send Bob</button>
      <button onClick={() => send('cindy')}>Send Cindy</button>
      <button onClick={() => send('all')}>Send All</button>
      <iframe style={{ width: '100%', height: 100 }} src='alex' />
      <iframe style={{ width: '100%', height: 200 }} src='bob' />
    </>
  )
}

export default Index
