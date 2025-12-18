import MisItem from './components/MisItem'
import type { RootState } from '@/store'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import style from './Mistake.module.scss'
import { Flex, Button } from 'antd'


const Mistake = () => {
  const [searchParams] = useSearchParams()
  const examHistory = useSelector((s: RootState) => s.history.historyRecord)
  const navigate = useNavigate()

  const mistakeTitle = useMemo(() => {
    const id = Number(searchParams.get('id'))
    return examHistory.find(v => v.id === id)
  }, [examHistory, searchParams])

  const mistakeInfo = useMemo(() => {
    const id = Number(searchParams.get('id'))
    return examHistory.find(v => v.id === id)?.list.filter(item => item.myAnswer !== item.result)
  }, [examHistory, searchParams])

  return (
    <div className={style.mistake}>
      <Flex justify="space-between" style={{marginBottom: 20}}>
        <h1 className={style.title}>
          错题本
          <p>考试时间:{new Date(mistakeTitle!.id).toLocaleString()}|考试得分:{mistakeTitle?.score}分|错题数量:{mistakeTitle?.errorCount}题</p>
        </h1>
        <Button onClick={() => navigate('/history')}>返回记录</Button>
      </Flex>
      {mistakeInfo?.map((item, index) => 
        <MisItem 
          key={item.question}
          title={index + 1 + '.' + item.question}
          options={item.options}
          result={item.result}
          myAnswer={item.myAnswer}
          score={item.score}
          finish
          mistake
        />
      )}
    </div>
  )
}

export default Mistake