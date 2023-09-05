import React from 'react';
import '../../../assets/index.scss'

import { Button, Col, Drawer, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import { CreateUpdateProps } from '../types';
import { listStatus } from '~/contants';
import { useCreateSubject, useUpdateSubject } from '~/services';

const { Option } = Select;

const CreateUpdate: React.FC<CreateUpdateProps> = (props: CreateUpdateProps) => {
  const { open, setOpen, listDepartment, edit, setEdit, form, initValue } = props


  const createSubject = useCreateSubject();
  const updateSubject = useUpdateSubject();

  const onClose = () => {
    setOpen(false);
    onReset();
    setEdit(false)
  };
  const onFinish = async () => {
    const param = form.getFieldsValue()
    if (edit) {
      param.id = initValue?.id
      await updateSubject.mutateAsync(param)
    } else {
      await createSubject.mutateAsync(param)
    }
    onClose();

  };
  const onReset = () => {
    form.resetFields()
  }


  return (
    <Drawer
      title={edit ? "Cập nhật thông tin môn học" : "Thêm mới môn học"}
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form layout="vertical" hideRequiredMark form={form} onFinish={onFinish}>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Tên môn học"
              rules={[{ required: true, message: 'Bạn chưa nhập tên môn học' }]}
            >
              <Input placeholder="Nhập tên môn học" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="id_department"
              label="Thuộc khoa"
              rules={[{ required: true, message: 'Vui lòng chọn tên khoa' }]}
            >
              <Select placeholder="Chọn tên khoa">
                {listDepartment?.map((department) => (
                  <Option key={department.id} value={department.id}>{department.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="quantity"
              label="Số tín chỉ"
              rules={[{ required: true, message: 'Bạn chưa nhập số tín chỉ' }]}
            >
              <InputNumber style={{ width: '100%' }} placeholder="Nhập số tín chỉ" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="status"
              label="Trạng thái"
              initialValue={1}
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
            >
              <Select placeholder="Chọn trạng thái" defaultValue={'0'}>
                {listStatus.map((item) => (
                  <Option key={item.value} value={item.value}>{item.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Mô tả"
            >
              <Input.TextArea rows={4} placeholder="Nhập mô tả về khoa" />
            </Form.Item>
          </Col>
        </Row>
        <Space>
          <Button onClick={onClose}>Hủy bỏ</Button>
          <Button onClick={onReset}>Làm mới</Button>
          <Button htmlType='submit' type="primary">
            Lưu dữ liệu
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
};

export default CreateUpdate;