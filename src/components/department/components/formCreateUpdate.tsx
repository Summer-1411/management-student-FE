import React from 'react';
import '../index.scss'

import { Button, Col, Drawer, Form, Input, Row, Select, Space, notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

import { CreateUpdateProps } from '../types';
import { useCreateDepartment, useUpdateDepartment } from '~/services';
import { listStatus } from '~/contants';

const { Option } = Select;


const CreateUpdate: React.FC<CreateUpdateProps> = (props: CreateUpdateProps) => {
  const { open, setOpen, listTeacher, form, isEdit, setIsEdit, initValue } = props
  const createDepartment = useCreateDepartment();
  const updateDepartment = useUpdateDepartment();

  const onClose = () => {
    setOpen(false);
    setIsEdit(false)
    onReset()
  };
  const onFinish = async () => {
    const param = form.getFieldsValue()

    if (isEdit) {
      param.id = initValue?.id
      console.log('111', param);
      await updateDepartment.mutateAsync(param)
    } else {
      await createDepartment.mutateAsync(param)
    }
    onClose();

  };
  const onReset = () => {
    form.resetFields()
  }


  return (
    <Drawer
      title={isEdit ? "Cập nhật khoa" : "Thêm mới khoa"}
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
    // extra={

    // }
    >
      {/* {contextHolder} */}
      <Form layout="vertical" hideRequiredMark form={form} onFinish={onFinish}>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Tên khoa"
              rules={[{ required: true, message: 'Bạn chưa nhập tên khoa' }]}
            >
              <Input placeholder="Nhập tên khoa" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lead"
              label="Trưởng khoa"
              rules={[{ required: true, message: 'Vui lòng chọn trưởng khoa' }]}
            >
              <Select placeholder="Chọn trưởng khoa" >
                {
                  listTeacher.map((teacher) => (
                    <Option key={teacher.id} value={teacher.id}>{teacher.name}</Option>
                  ))
                }
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
              <Select placeholder="Chọn trạng thái" >
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