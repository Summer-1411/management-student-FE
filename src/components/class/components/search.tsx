import { Layout, Form, Input, Button, Select, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { IClass } from '~/types';
import { listStatus } from '~/contants';
import { useGetTeacher, useSearchDepartment, useSearchMajor } from '~/services';
const { Content } = Layout;
const { Option } = Select;


interface SearchProps {
  setInitSearch: React.Dispatch<React.SetStateAction<IClass>>
}
const Search = (props: SearchProps) => {

  const [form] = Form.useForm();

  const { setInitSearch } = props
  const onFinish = (values: any) => {
    setInitSearch(values);
  };
  const { listMajor } = useSearchMajor({
    status: 1
  })
  const { listTeacher } = useGetTeacher({
    status: 1
  })

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
            <Form.Item label="Tên ngành" name="id_major" >
              <Select
                placeholder="Chọn ngành"
                allowClear
              >
                {listMajor?.map((item) => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Mã lớp" name="id">
              <Input placeholder="Nhập mã lớp" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Tên lớp" name="name">
              <Input placeholder="Nhập tên lớp" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} xl={6}>
            <Form.Item label="Giáo viên chủ nhiệm" name="teacher">
              <Select
                placeholder="Chọn ngành"
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