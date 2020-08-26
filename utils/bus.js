import framebus from './framebus'
import xobus from './xobus'

const modes = {
  xobus: 'xobus',
  framebus: 'framebus',
}

// EDIT THIS TO CHANGE BUS IMPLEMENTATION
const mode = modes.xobus

const bus = mode === modes.xobus ? xobus : framebus

export default bus