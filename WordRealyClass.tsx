import * as React from 'react'
import { createRef } from 'react'

interface IState {
  word: string
  result: string
  value: string
}

class WordRelayClass extends React.Component<{}, IState>{
  state = {
    word: '제로초',
    result: '',
    value: '',
  }

  input: HTMLInputElement | null = null

  onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    const input = this.onRefInput.current
    if (this.state.word[this.state.word.length-1] === this.state.value[0]) {
      this.setState({
        result: '딩동댕',
        word: this.state.value,
        value: '',
      })
      input?.focus()
    } else {
      this.setState({
        result: '땡',
        value: '',
      })
      input?.focus()
    }
  }

  onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.currentTarget.value })
  }

  // onRefInput = (c: HTMLInputElement) => {
  //   this.input = c
  // }

  onRefInput = createRef<HTMLInputElement>()

  render() {
    return (
      <>
        <h1>끝말 잇기</h1>
          <div>{this.state.word}</div>
          <form onSubmit={this.onSubmitForm}>
            <input 
              ref={this.onRefInput}
              type="text"
              value={this.state.value}
              onChange={this.onChangeHandler}
            />
            <button>입력</button>
          </form>
        <div>{this.state.result}</div>
      </>
    )
  }
}

export default WordRelayClass