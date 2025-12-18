import { Flex, Button, Tag, Row, Col, Table, type TableProps } from "antd"
import { 
  ContainerOutlined, 
  TrophyOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  MehOutlined 
} from '@ant-design/icons'
import { useNavigate } from "react-router-dom"
import style from './History.module.scss'
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import type { historyInfo } from '@/store/features/history'
import { useMemo } from "react"

const History = () => {
  const navigate = useNavigate()
  const historyInfo = useSelector((s: RootState) => s.history.historyRecord)

  const totalScore = useMemo(() => {
    return historyInfo.reduce((prev, item) => prev + item.score, 0)
  }, [historyInfo])

  const average = useMemo(() => {
    return Math.floor(totalScore / historyInfo.length)
  }, [totalScore])

  const topScore = useMemo(() => {
    const score = historyInfo.map(itme => itme.score)
    return Math.max(...score)
  }, [historyInfo])

  const minScore = useMemo(() => {
    const score = historyInfo.map(itme => itme.score)
    return Math.min(...score)
  }, [historyInfo])

  const Columns: TableProps<historyInfo>['columns'] = [
    {
      title: <span className={style.customTitle}>序号</span>,
      key: 'index',
      render: (_, record, index) => index + 1
    },
    {
      title: '考试时间',
      key: 'finishTime',
      dataIndex: 'finishTime',
      render: (_) => new Date(_).toLocaleString()
    },
    {
      title: <span className={style.customTotal}>总题数</span>,
      key: 'total',
      render: (_, record) => record.list.length
    },
    {
      title: <span className={style.customCorrect_count}>正确题数</span>,
      key: 'correctCount',
      dataIndex: 'correctCount',
      render: (_, record) => {
        return <Tag 
          className={style.correct_count} 
          icon={<CheckCircleOutlined />}
        >
          {record.correctCount}
        </Tag>
      }
    },
    {
      title: <span className={style.customError_count}>错误题数</span>,
      key: 'errorCount',
      dataIndex: 'errorCount',
      render: (_, record) => {
        return <Tag 
          className={style.error_count} 
          icon={<CloseCircleOutlined />}
        >
          {record.errorCount}
        </Tag>
      }
    },
    {
      title: <span className={style.customScore}>得分</span>,
      key: 'score',
      dataIndex: 'score',
      render: (_, record) => {
        return <Tag key="error" className={style.columns_score}>
          {record.score}分
        </Tag>
      }
    },
    {
      title: <span className={style.customAction}>操作</span>,
      key: 'action',
      render: (_, record) => {
        return <Button size="small" type="primary" onClick={() => {
          navigate(`/mistake?id=${record.id}`)
        }}>查看错题</Button>
      }
    },
  ]

  return (
    <div className={style.box}>
      <Flex justify="space-between" style={{marginBottom: 20}}>
        <h2> 
          <ContainerOutlined style={{width: '30px'}} />
          考试记录
        </h2>
        <Button onClick={() => navigate('/')}>返回首页</Button>
      </Flex>
      {historyInfo.length ? 
        <Row gutter={16} style={{marginBottom: 20}}>
        <Col span={6}>
          <div className={style.title}>
            考试次数
            <p className={style.exam_count}>{historyInfo.length} 次</p>
          </div>
        </Col>
        <Col span={6}>
          <div className={style.title}>
            平均分
            <p className={style.average}>{average} 分</p>
          </div>
        </Col>
        <Col span={6}>
          <div className={style.title}>
            最高分
            <p className={style.top_score}>
              <TrophyOutlined style={{marginRight: 5}} />
              {topScore} 分
            </p>
          </div>
        </Col>
        <Col span={6}>
          <div className={style.title}>
            最低分
            <p className={style.min_score}>{minScore} 分</p>
          </div>
        </Col>
      </Row> : null
      }
      <Table 
        columns={Columns}
        dataSource={historyInfo}
        rowKey={row => row.id}
        locale={{
          emptyText: <div className={style.customEmpty}>
            <MehOutlined style={{fontSize: 50, marginBottom: 20, marginTop: 50}} />
            <p style={{marginBottom: 20}}>暂无考试记录，快去答题吧~</p>
            <Button 
              style={{marginBottom: 50}}
              type="primary"
              onClick={() => navigate('/exam')}
            >开始考试</Button>
          </div>
        }}
      />
    </div>
  )
}

export default History