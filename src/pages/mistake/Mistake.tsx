import Options from '@/components/options/Options'
import type { RootState } from '@/store'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import style from './Mistake.module.scss'


const Mistake = () => {
  const [searchParams] = useSearchParams()
  const examHistory = useSelector((s: RootState) => s.history.historyRecord)
  const navigate = useNavigate()

  const mistakeInfo = useMemo(() => {
    const id = Number(searchParams.get('id'))
    return examHistory.find(v => v.id === id)?.list.filter(item => item.myAnswer !== item.result)
  }, [examHistory, searchParams])

  useEffect(() => {
    if (examHistory.length === 0) {
      navigate('/')
    }
  }, [examHistory])

  return (
    <div className={style.mistake}>
      {mistakeInfo?.map((item, index) => 
        <Options 
          key={item.question}
          title={index + 1 + '' + item.question}
          options={item.options}
          result={item.result}
          myAnswer={item.myAnswer}
          finish
        />
      )}
    </div>
  )
}

export default Mistake