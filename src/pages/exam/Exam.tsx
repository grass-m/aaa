import{ useEffect, useState } from 'react'
import { getQuestion, type Question } from '../../services'
import { Radio, type RadioChangeEvent } from 'antd'
import style from './Exam.module.scss'

const Exam = () => {
  const [question, setQuestion] = useState<Question[]>([])
  const [value, setValue] = useState(-1)
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getQuestion()
        console.log(res)
        setQuestion(res.data)
      } catch(e) {
        console.log(e)
      }
    }
    getData()
  }, [])

  return (
    <div className={style.exam}>
      <h3>单选题</h3>
      <ul>
        {question.map((item, index) => 
          <li key={item.question}>
            <h3 className={style.title}>{index + 1}.{item.question}</h3>
            <Radio.Group
              vertical
              onChange={onChange}
              value={value}
            >
              {item.options.map((option, optIndex) => (
                <Radio 
                  key={optIndex} 
                  value={optIndex}
                  className={style.radioButton}
                >
                  {String.fromCharCode(65 + optIndex)}. {option}
                </Radio>
              ))}
            </Radio.Group>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Exam