import * as React from 'react'
import { useRef, useState, useCallback } from 'react'
import Try from './Try'
import { TryInfo } from './types'

const getNumbers: () => number[] = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const array = []
  for (let i = 0; i < candidates.length; i++) { // 랜덤숫자 4개 중복 없이
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0]
    array.push(chosen)
  }
  return array
}

const NumberBaseball: React.FC = () => {
  const [answer, setAnswer] = useState(getNumbers())
  const [value, setValue] = useState('')
  const [result, setResult] = useState('')
  const [tries, setTries] = useState<TryInfo[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const onChange = useCallback<(e: React.ChangeEvent<HTMLInputElement>) => void>((e) => {
    setValue(e.currentTarget.value)
  }, [value])
  const onSubmitForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = inputRef.current
    if (value === answer.join('')) {
      setTries((t) => [
        ...t,
        {
          try: value,
          result: '홈런!',
        }
      ])
      setResult('홈런!')
      alert('게임을 다시 실행합니다.')
      setValue('')
      setAnswer(getNumbers())
      setTries([])
      input?.focus()
    } else {
      const answerArray = value.split('').map(v => parseInt(v))
      let strike = 0
      let ball = 0
      if (tries.length >= 9) {
        setResult(`10번을 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`) // state set은 비동기
        alert('게임을 다시 시작합니다.')
        setValue('')
        setAnswer(getNumbers())
        setTries([])
        input?.focus()
      } else {
        console.log('답은', answer.join(''))
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            console.log('strike', answerArray[i], answer[i])
            strike++
          } else if (answer.includes(answerArray[i])) {
            console.log('ball', answerArray[i], answer.indexOf(answerArray[i]))
            ball++
          }
        }
      }
      setTries(t => ([
        ...t,
        {
          try: value,
          result: `${strike} 스트라이크, ${ball} 볼입니다.`
        }
      ]))
      setValue('')
      input?.focus()
    }
  }, [value, answer])

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input 
          ref={inputRef}
          maxLength={4}
          value={value}
          onChange={onChange}
        />
        <button>입력</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => (
          <Try key={`${i + 1}차 시도: ${v.try}`} tryInfo={v} />
        ))}
      </ul>
    </>
  )
}

export default NumberBaseball