import { Layout, Form, Input, Button, Select, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { listStatus } from '~/contants';
import { useClass } from '../hooks/ClassSectionContext';
import { ClassSectionContextProps } from '../types';
const { Content } = Layout;
const { Option } = Select;
const Search = () => {

  const [form] = Form.useForm();

  const { listSubject, listTeacher, setInitSearch } = useClass() as ClassSectionContextProps
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
        layout="vertical" hideRequiredMark
        form={form}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Mã lớp học phần" name="id">
              <Input placeholder="Nhập mã lớp học phần" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Môn học" name="subject_id">
              <Select
                placeholder="Chọn tên môn học"
                allowClear
              >
                {listSubject?.map((item) => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Giáo viên" name="teacher_id">
              <Select
                placeholder="Chọn tên giáo viên"
                allowClear
              >
                {listTeacher?.map((item) => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>
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
            <Form.Item >
              <Button type="primary" icon={<SearchOutlined />} htmlType="submit">Tìm kiếm</Button>
            </Form.Item>
          </Col>

        </Row>






      </Form>
    </Content >
  )
}

export default Search