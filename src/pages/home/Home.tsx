import { Button, Space } from 'antd'
import style from './Home.module.scss'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className={style.home}>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            navigate('/exam')
          }}
        >开始考试</Button>
        <Link to="history">
          <Button>历史记录</Button>
        </Link>
      </Space>
    </div>
  )
}

export default Home