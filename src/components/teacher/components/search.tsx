import { Layout, Form, Input, Button, Select, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { SearchProps } from '../types';
import { listPosition, listStatus } from '~/contants';
const { Content } = Layout;
const { Option } = Select;
const Search = (props: SearchProps) => {

  const { setSearch } = props
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    setSearch(values)
    console.log(values);
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
            <Form.Item label="Mã giáo viên" name="id">
              <Input placeholder="Nhập mã giáo viên" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Tài khoản" name="code">
              <Input placeholder="Nhập tài khoản giáo viên" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Tên giáo viên" name="name">
              <Input placeholder="Nhập tên giáo viên" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Chức vụ" name="level" initialValue={0}>
              <Select
                placeholder="Chức vụ"
                allowClear
              >
                {listPosition.map((item) => (
                  <Option key={item.value} value={item.value}>{item.label}</Option>
                ))}
              </Select>
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