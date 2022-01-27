import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'

import ResCheck from './ResCheck'

const Hot = hot(ResCheck)

ReactDOM.render(<Hot />, document.querySelector('#root'))