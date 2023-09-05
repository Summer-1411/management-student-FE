import React, { useEffect, useState } from 'react';
import '../index.scss'

import { Button, Col, Drawer, Form, Input, Row, Select, Space, InputNumber } from 'antd';
import { ClassContextProps, CreateUpdateProps } from '../types';
import { listStatus } from '~/contants';
import { useCreateClass, useUpdateClass } from '~/services';
import { useWatch } from 'antd/es/form/Form';
import { IMajor } from '~/types';
import { useClass } from '../hooks/ClassContext';

const { Option } = Select;

const CreateUpdate: React.FC<CreateUpdateProps> = (props: CreateUpdateProps) => {
  const { open, setOpen, form, initValue, edit, setEdit } = props
  const department = useWatch("idDepartment", form)

  const [majors, setMajors] = useState<IMajor[]>([])

  const { listDepartment, listTeacher, listMajor } = useClass() as ClassContextProps
  const createClass = useCreateClass();
  const updateClass = useUpdateClass();
  useEffect(() => {
    if (department) {
      setMajors(listMajor.filter(item => item.id_department === department))

    } else {
      setMajors(listMajor)
    }
    form.setFieldValue("idMajor", undefined)
  }, [department])

  // console.log(form.getFieldValue("idDepartment"));

  const onClose = () => {
    setOpen(false);
    setEdit(false)
    onReset();
  };
  const onFinish = async () => {
    const param = form.getFieldsValue()

    if (edit) {
      console.log('param', param);
      console.log('initValue', initValue);
      param.id = initValue?.id
      await updateClass.mutateAsync(param)
    } else {
      await createClass.mutateAsync(param)
    }

    onClose();

  };
  const onReset = () => {
    form.resetFields()
  }


  return (
    <Drawer
      title={edit ? "Cập nhật thông tin lớp" : "Thêm mới lớp"}
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
    // extra={

    // }
    >
      <Form layout="vertical" hideRequiredMark form={form} onFinish={onFinish}>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Tên lớp"
              rules={[{ required: true, message: 'Bạn chưa nhập tên lớp' }]}
            >
              <Input placeholder="Nhập tên lớp" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="idDepartment"
              label="Thuộc khoa"
            >
              <Select placeholder="Chọn tên khoa" >
                {listDepartment?.map((item) => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="id_major"
              label="Thuộc ngành"
              rules={[{ required: true, message: 'Vui lòng chọn tên ngành' }]}
            >
              <Select placeholder="Chọn tên ngành ngành" >
                {majors?.map((item) => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="teacher"
              label="Giáo viên chủ nhiệm"
              rules={[{ required: true, message: 'Vui lòng chọn tên giáo viên' }]}
            >
              <Select placeholder="Chọn tên giáo viên" >
                {listTeacher?.map((item) => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="schoolYear"
              label="Khóa"
              rules={[{ required: true, message: 'Bạn chưa nhập khóa' }]}
            >
              <Input placeholder="Nhập khóa" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="quantity"
              label="Số lượng sinh viên"
              rules={[{ required: true, message: 'Bạn chưa nhập số lượng sinh viên' }]}
            >
              <InputNumber min={1} max={65} />
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
                {listStatus?.map((item) => (
                  <Option key={item.value} value={item.value}>{item.label}</Option>
                ))}
              </Select>
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