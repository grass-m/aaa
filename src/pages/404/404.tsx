import { Button, Result } from "antd"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <Result
      status="error"
      title="404"
      subTitle="访问的页面不存在"
      extra={[
        <Link to="/" key="404">
          <Button type="primary" key="console">
            返回首页
          </Button>
        </Link>,
        <Button key="buy">重试</Button>,
      ]}
    />
  )
}

export default NotFound