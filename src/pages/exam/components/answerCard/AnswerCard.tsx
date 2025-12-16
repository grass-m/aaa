import { Card, Button } from "antd"
import style from './AnswerCard.module.scss'
import type { NewQuestion } from "../../Exam"
import { useCountDown } from '../../../../hooks/useCountDown'
import { useNavigate } from "react-router-dom"
import classNames from "classnames"

interface Props {
  question: NewQuestion[]
  finish: boolean
  onSubmit: () => void
  goFloor: (index: number) => void
}

const AnswerCard: React.FC<Props> = ({
  question,
  finish,
  onSubmit,
  goFloor
}) => {
  const navigate = useNavigate()

  const {timeStr, stop} = useCountDown(10, false, () => {
    onSubmit()
  })

  const onFinish = () => {
    stop()
    onSubmit()
  }

  const submitButton = () => {
    const actions = [
      <Button disabled={finish} type="primary" onClick={onFinish}>提交试卷</Button>
    ]
    return finish ? [
      ...actions,
      <Button type="default" onClick={() => navigate('/history', {replace: true})}>考试记录</Button>
    ] : actions
  }

  return (
    <div className={style.cardBox}>
      <Card 
        title="答题卡" 
        extra={<b>{timeStr}</b>} 
        className={style.card}
        actions={submitButton()}
      >
        <div className={style.btns}>
          {question.map((v, index) =>
            <Button
              key={v.question}
              className={classNames(style.btn, {[style.active]: finish && v.myAnswer !== v.result})}
              type={v.myAnswer ? 'primary' : 'default'}
              onClick={() => goFloor(index)}
            >
              {index + 1}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

export default AnswerCard