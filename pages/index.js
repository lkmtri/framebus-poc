import React from 'react'
import { Input } from 'reakit/Input'
import { Button } from 'reakit/Button'
import framebus from '../utils/framebus'

const useInputState = (initialValue = '') => {
  const [value, setValue] = React.useState(initialValue)

  const onChange = React.useCallback((e) => {
    setValue(e.target.value)
  }, [])

  return { value, onChange }
}

const Index = () => {
  const { value, onChange } = useInputState()

  React.useEffect(
    () => framebus.registerService(
      'pingpong', 
      (data) => new Promise(
        (res) => setTimeout(() => res({ from: 'parent', message: 'Pong', received: data }), 2000))
      ), 
    []
  )

  const send = (to) => framebus.emit(to, { message: value })

  return (
    <>
      <Input placeholder="Enter some text" value={value} onChange={onChange} />
      <Button onClick={() => send('alex')}>Send Alex</Button>
      <Button onClick={() => send('bob')}>Send Bob</Button>
      <Button onClick={() => send('both')}>Send Both</Button>
      <iframe style={{ width: '100%', height: 100 }} src='alex' />
      <iframe style={{ width: '100%', height: 100 }} src='bob' />
    </>
  )
}

export default Index
