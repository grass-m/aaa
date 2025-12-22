import type { Question } from '@/services'
import style from './MisItem.module.scss'
import { Radio, Tag } from 'antd'
import classNames from 'classnames'

interface Props {
  title: string
  options: string[]
  result: Question['result']
  myAnswer?: Question['result']
  finish: boolean
  mistake?: boolean
  score: number
  onChange?: (value: Question['result']) => void
}

const Options: React.FC<Props> = ({
  title,
  options,
  myAnswer,
  result,
  finish,
  mistake,
  score,
  onChange
}) => {
  return (
    <li className={style.box}>
      <h3 className={style.title}>
        <span>
          <Tag className={style.titleTag}>错题</Tag>
          {title}
        </span>
        <Tag className={style.scoreTag}>分值{score}分</Tag>
      </h3>
      <Radio.Group
        className={style.group}
        vertical
        disabled={finish}
        onChange={e => onChange?.(e.target.value)}
        value={myAnswer}
      >
        {options.map((v, index) => {
          const value = String.fromCharCode(65 + index);
          const isCorrect = value === result;
          const isMyAnswer = value === myAnswer;
          return (
            <Radio
              key={value}
              value={value}
              className={classNames(
                isCorrect && style.label_correct,
                isMyAnswer && !isCorrect && style.label_myAnswer
              )}
            >
              {`${value}. ${v}`}
              <span className={style.label_item}>
                {isCorrect && <Tag className={style.label_correct}>正确答案</Tag>}
                {isMyAnswer && <Tag className={style.label_myAnswer}>你的答案</Tag>}
              </span>
            </Radio>
          );
        })}
      </Radio.Group>
      {mistake && 
        <div className={style.result}>
          <span 
            className={classNames(
            style.myAnswer,  
            myAnswer !== result ? style.red : style.green
          )}>
            你的答案：
            {myAnswer}
          </span>
          <span className={classNames(style.correctAnswer, style.green)}>
            正确答案：
            <Tag color={'success'} >
              {result}
            </Tag>
          </span>
        </div>
      }
    </li>
  )
}

export default Options