import { Layout, Form, Input, Button, Select, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { IClass, IStudent } from '~/types';
import { listStatus } from '~/contants';
import { useStudent } from '../hooks/StudentContext';
import { StudentContextProps } from '../types';
const { Content } = Layout;
const { Option } = Select;

interface SearchProps {
  setInitSearch: React.Dispatch<React.SetStateAction<IStudent>>
}
const Search = (props: SearchProps) => {

  const { listClass } = useStudent() as StudentContextProps
  const [form] = Form.useForm();

  const { setInitSearch } = props
  const onFinish = (values: any) => {
    setInitSearch(values)
  };

  return (
    <Content style={{
      padding: 24,
      marginTop: 20,
      background: '#fff',
    }}>
      <Form
        onFinish={onFinish}
        form={form}
        layout="vertical" hideRequiredMark
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Thuộc lớp" name="idClass" >
              <Select
                placeholder="Chọn lớp"
                allowClear
              >
                {listClass?.map((item) => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Mã sinh viên" name="code">
              <Input placeholder="Nhập mã sv" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Tên sinh viên" name="name">
              <Input placeholder="Nhập tên sinh viên" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Email" name="email">
              <Input placeholder="Nhập email" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Số điện thoại" name="phone">
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Trạng thái" name="status" initialValue={1}>
              <Select
                placeholder="Chọn trạng thái"
                allowClear
              >
                {listStatus.map((item) => (
                  <Option key={item.value} value={item.value}>{item.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>

          </Col>
          <Col span={24} style={{ textAlign: 'end' }}>
            <Form.Item  >
              <Button type="primary" icon={<SearchOutlined />} htmlType="submit">Tìm kiếm</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Content >
  )
}

export default Search