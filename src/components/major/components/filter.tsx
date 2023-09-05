import { Layout, Form, Input, Button, Select, Row, Col } from 'antd';
const { Content } = Layout;
const { Option } = Select;
import { SearchOutlined } from '@ant-design/icons';
import { IDepartment, IMajor } from '~/types';
import { listStatus } from '~/contants';

interface FilterProps {
  listDepartment: IDepartment[]
  setInitSearch: React.Dispatch<React.SetStateAction<IMajor>>
}
const Filter = (props: FilterProps) => {

  const [form] = Form.useForm();

  const { listDepartment, setInitSearch } = props
  const onFinish = (values: any) => {
    setInitSearch(values)
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
        layout="vertical" hideRequiredMark
        form={form}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Tên khoa" name="idDepartment">
              <Select
                placeholder="Chọn tên khoa"
                allowClear
              >
                {listDepartment?.map((item) => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Mã ngành" name="id">
              <Input placeholder="Nhập mã ngành" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Tên ngành" name="name">
              <Input placeholder="Nhập tên ngành" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Trạng thái" name="status" initialValue={1}>
              <Select
                placeholder="Chọn trạng thái"
                allowClear
                style={{ minWidth: 182 }}
              >
                {listStatus.map((item) => (
                  <Option key={item.value} value={item.value}>{item.label}</Option>
                ))}
              </Select>
            </Form.Item>
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

export default Filter