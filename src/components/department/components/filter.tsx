import { Layout, Form, Input, Button, Select, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FilterProps } from '../types';
const { Content } = Layout;
const { Option } = Select;


const Filter = (props: FilterProps) => {

  const { setInitSearch } = props
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setInitSearch(values)
    console.log('values', values);

  };

  return (
    <Content style={{
      padding: 24,
      marginTop: 20,
      background: '#fff',
    }}>
      <Form
        onFinish={onFinish}
        layout="vertical" hideRequiredMark
        form={form}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Mã khoa" name="id">
              <Input placeholder="Nhập mã khoa" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Tên khoa" name="name">
              <Input placeholder="Nhập tên khoa" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Trạng thái" name="status" initialValue={'1'}>
              <Select
                placeholder="Chọn trạng thái"
                allowClear
                style={{ minWidth: 200 }}
              >
                <Option value="1">Hoạt động</Option>
                <Option value="0">Không hoạt động</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24} style={{ textAlign: 'end' }}>
            <Form.Item >
              <Button type="primary" icon={<SearchOutlined />} htmlType="submit">Tìm kiếm</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Content >
  )
}

export default Filter