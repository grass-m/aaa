import type { Question } from '../../../../services'
import style from './Options.module.scss'
import { Radio, Tag } from 'antd'
import classNames from 'classnames'

interface Props {
  title: string
  options: string[]
  result: Question['result']
  myAnswer?: Question['result']
  finish: boolean
  onChange?: (value: Question['result']) => void
}

const Options: React.FC<Props> = ({
  title,
  options,
  myAnswer,
  result,
  finish,
  onChange
}) => {
  return (
    <li>
      <h3 className={style.title}>{title}</h3>
      <Radio.Group
        vertical
        disabled={finish}
        onChange={e => onChange?.(e.target.value)}
        value={myAnswer}
        options={options.map((v, index) => ({
          value: String.fromCharCode(65 + index),
          label: `${String.fromCharCode(65 + index)}. ${v}`
        }))}
      />
      {finish && 
        <div>
          <p className={classNames(style.result, myAnswer !== result ? style.red : style.green)}>
            正确答案：
            <Tag color={myAnswer === result ? 'success' : 'error'} >
              {result}
            </Tag>
          </p>
        </div>
      }
    </li>
  )
}

export default Options