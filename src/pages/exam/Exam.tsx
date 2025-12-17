import{ useEffect, useRef, useState } from 'react'
import { getQuestion, type Question } from '../../services'
import style from './Exam.module.scss'
import Options from '../../components/options/Options'
import AnswerCard from './components/answerCard/AnswerCard'
import Modal from 'antd/es/modal/Modal'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import type { RootDispatch } from '@/store'
import { addData } from '@/store/features/history'

const Exam = () => {
  const [question, setQuestion] = useState<Question[]>([])
  const [finish, setFinish] = useState(false)
  const [total, setTotal] = useState(0)
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const cardScroll = useRef<HTMLUListElement | null>(null)
  const dispatch: RootDispatch = useDispatch()
  
  const onSubmit = () => {
    const totalScore =  question.reduce((prev, item) => {
      return prev + (item.myAnswer === item.result ? item.score : 0)
    }, 0)
    const correctCount = question.filter(v => v.myAnswer === v.result).length
    console.log(correctCount)
    setFinish(true)
    setTotal(totalScore)
    setShow(true)
    dispatch(addData({
      list: question,
      id: Date.now(),
      finishTime: Date.now(),
      score: totalScore,
      errorCount: question.length - correctCount,
      correctCount
    }))
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
      <div className={style.left}>
        <h3>单选题</h3>
        <ul className={style.list} ref={cardScroll}>
          {question.map((item, index) => 
            <Options
              key={item.question}
              title={`${index + 1}. ${item.question}`}
              options={item.options}
              result={item.result}
              myAnswer={item.myAnswer}
              finish={finish}
              onChange={value => {
                const newQuestions = [...question]
                newQuestions[index].myAnswer = value
                setQuestion(newQuestions)
              }}
            />
          )}
        </ul>
      </div>
      <AnswerCard
        finish={finish}
        onSubmit={onSubmit}
        question={question}
        goFloor={index => {
          document.documentElement.scrollTop = (cardScroll.current?.children[index] as HTMLUListElement).offsetTop
        }}
      />
      <Modal
        title="提交成功"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={show}
        onOk={() => navigate('/history', {replace: true})}
        okText="考试记录"
        cancelText="关闭弹窗"
        onCancel={() => {
          setShow(false)
        }}
      >
        <div>成绩：{total}</div>
      </Modal>
    </div>
  )
}

export default Exam