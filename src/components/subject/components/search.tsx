import { Layout, Form, Input, Button, Select, Row, Col, InputNumber } from 'antd';
const { Content } = Layout;
const { Option } = Select;
import { SearchOutlined } from '@ant-design/icons';
import { IDepartment, ISubject } from '~/types';
import { listStatus } from '~/contants';
interface SearchProps {
  listDepartment: IDepartment[]
  setInitSearch: React.Dispatch<React.SetStateAction<ISubject>>
}
const Search = (props: SearchProps) => {

  const { listDepartment, setInitSearch } = props
  const [form] = Form.useForm();

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
            <Form.Item label="Môn học thuộc khoa" name="id_department">
              <Select
                placeholder="Chọn tên khoa"
                allowClear
              >
                {listDepartment?.map((department) => (
                  <Option key={department.id} value={department.id}>{department.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Mã môn học" name="id">
              <Input placeholder="Nhập mã môn học" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Tên môn học" name="name">
              <Input placeholder="Nhập tên môn học" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Số tín chỉ" name="quantity" >
              <InputNumber placeholder="Số tín chỉ" style={{ width: "100%" }} />
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