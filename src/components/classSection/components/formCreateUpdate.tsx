import React from 'react';
import '../../../assets/index.scss'

import { Button, Col, Drawer, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import { ClassSectionContextProps, CreateUpdateProps } from '../types';
import { listStatus } from '~/contants';
import { useClass } from '../hooks/ClassSectionContext';
import { useCreateClassSection, useUpdateClassSection } from '~/services';

const { Option } = Select;

const CreateUpdate: React.FC<CreateUpdateProps> = (props: CreateUpdateProps) => {
  const { listSubject, listTeacher, form, edit, setEdit, initValue } = useClass() as ClassSectionContextProps
  const createClassSection = useCreateClassSection();
  const updateClassSection = useUpdateClassSection();
  const { open, setOpen } = props


  const onClose = () => {
    setOpen(false);
    onReset();
  };
  const onFinish = async () => {
    const param = form.getFieldsValue()
    if (edit) {
      param.id = initValue?.id
      await updateClassSection.mutateAsync(param)
    } else {
      await createClassSection.mutateAsync(param)
    }

    onClose();

  };
  const onReset = () => {
    form.resetFields()
  }


  return (
    <Drawer
      title={edit ? "Cập nhật lớp học phần" : "Thêm mới lớp học phần"}
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form layout="vertical" hideRequiredMark form={form} onFinish={onFinish}>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="subject_id"
              label="Môn học"
              rules={[{ required: true, message: 'Bạn chưa chọn tên môn học' }]}
            >
              <Select placeholder="Chọn môn học" >
                {
                  listSubject?.map((item) => (
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="teacher_id"
              label="Giáo viên"
              rules={[{ required: true, message: 'Vui lòng chọn giáo viên' }]}
            >
              <Select placeholder="Chọn giáo viên" >
                {
                  listTeacher?.map((teacher) => (
                    <Option key={teacher.id} value={teacher.id}>{teacher.name}</Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="max"
              label="Số lượng sinh viên"
              initialValue={65}
              rules={[{ required: true, message: 'Bạn chưa nhập số số lượng sinh viên' }]}
            >
              <InputNumber style={{ width: '100%' }} placeholder="Nhập số lượng sinh viên" />
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
              name="time"
              label="Thời gian"
            >
              <Input.TextArea rows={4} placeholder="Nhập thời gian học" />
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