import React from 'react';
import '../index.scss'

import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { CreateUpdateProps } from '../types';
import { listStatus } from '~/contants';
import { useCreateMajor, useUpdateMajor } from '~/services';

const { Option } = Select;

const CreateUpdate: React.FC<CreateUpdateProps> = (props: CreateUpdateProps) => {
  const { open, setOpen, listDepartment, form, isEdit, setIsEdit, initValue } = props

  const createMajor = useCreateMajor();
  const updateMajor = useUpdateMajor();

  const onClose = () => {
    setOpen(false);
    setIsEdit(false)
    onReset()
  };


  const onFinish = async () => {
    const param = form.getFieldsValue()
    try {
      if (isEdit) {
        param.id = initValue?.id
        await updateMajor.mutateAsync(param)
      } else {
        await createMajor.mutateAsync(param)
      }

    } catch (error) {
      console.log(error);

    }
    onClose();
  };
  const onReset = () => {
    form.resetFields()
  }


  return (
    <Drawer
      title={isEdit ? "Cập nhật thông tin ngành học" : "Thêm mới ngành học"}
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
              label="Tên ngành"
              rules={[{ required: true, message: 'Bạn chưa nhập tên ngành' }]}
            >
              <Input placeholder="Nhập tên ngành" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="idDepartment"
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
              name="status"
              label="Trạng thái"
              initialValue={1}
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
            >
              <Select placeholder="Chọn trạng thái">
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