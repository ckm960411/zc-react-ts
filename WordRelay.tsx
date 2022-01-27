import * as React from 'react'
import { useState, useRef, useCallback } from 'react'

const WordRelay = () => {
  const [word, setWord] = useState('제로초')
  const [result, setResult] = useState('')
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const onSubmitForm = useCallback<(e: React.FormEvent<HTMLFormElement>) => void>((e) => {
    e.preventDefault()
    const input = inputRef.current
    if (word[word.length-1] === value[0]) {
      setResult('딩동댕')
      setWord(value)
      setValue('')
      if (input) input.focus()
    } else {
      setResult('떙')
      setValue('')
      if (input) input.focus()
    }
  }, [value])
  const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }, [])

  return (
    <>
      <h1>끝말 잇기</h1>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input 
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChangeHandler}
        />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  )
}

export default WordRelay