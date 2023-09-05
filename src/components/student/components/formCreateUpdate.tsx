
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Modal, Upload, DatePicker, Image } from 'antd';
import '../index.scss'
import { CreateUpdateProps, StudentContextProps } from '../types';
// import dayjs from 'dayjs'
import { IMAGE_LINK, listStatus, toastOption } from '~/contants';
import { useCreateStudent, useUpdateStudent } from '~/services';
import dayjs from 'dayjs';
import { useStudent } from '../hooks/StudentContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const { Option } = Select;

const CreateUpdate: React.FC<CreateUpdateProps> = (props: CreateUpdateProps) => {
  const { formCreateUpdate, listClass, edit, setEdit, initValue } = useStudent() as StudentContextProps
  const { open, setOpen } = props
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const createStudent = useCreateStudent();
  const updateStudent = useUpdateStudent();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const dummyRequest = ({ onSuccess }: any) => {
    onSuccess('ok')
  }
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);




  const onClose = () => {
    setOpen(false);
    setEdit(false)
    onReset()


  };
  const onFinish = async () => {
    const param = formCreateUpdate.getFieldsValue()


    if (edit) {
      if (fileList && fileList.length > 0) {
        const data = new FormData()
        const fileName = fileList[0]?.originFileObj?.name ? Date.now() + fileList[0]?.originFileObj?.name : ""
        data.append("name", fileName)
        data.append("file", fileList[0]?.originFileObj || "")
        await axios.post(`http://localhost:6868/api/upload`, data)
        param.avatar = fileName
      } else {
        param.avatar = initValue?.avatar
      }
      param.birthday = param.birthday
        ? dayjs(param.birthday).format('YYYY-MM-DD')
        : ''
      param.id = initValue?.id
      const update = {
        ...param,
      }
      await updateStudent.mutateAsync(update);
      onClose();
    } else {
      //Thêm mới
      if (fileList && fileList.length > 0) {
        const data = new FormData()
        const fileName = fileList[0]?.originFileObj?.name ? Date.now() + fileList[0]?.originFileObj?.name : ""
        data.append("name", fileName)
        data.append("file", fileList[0]?.originFileObj || "")
        await axios.post(`http://localhost:6868/api/upload`, data)
        param.avatar = fileName
        param.birthday = param.birthday
          ? dayjs(param.birthday).format('YYYY-MM-DD')
          : ''

        const newStudent = {
          ...param,
          // idClass: classInfor?.id
        }
        await createStudent.mutateAsync(newStudent);
        onClose();
      } else {
        toast.error("Bạn chưa chọn ảnh đại diện !", toastOption);
      }
    }

  };
  const onReset = () => {
    formCreateUpdate.resetFields()
    setFileList([])
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải ảnh</div>
    </div>
  );


  return (
    <Drawer
      title={edit ? "Cập nhật thông tin sinh viên" : "Thêm mới sinh viên"}
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form layout="vertical" hideRequiredMark form={formCreateUpdate} onFinish={onFinish}>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Thuộc lớp" name="idClass" >
              <Select
                placeholder="Chọn lớp"
                allowClear
              >
                {listClass?.map((item) => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            {edit && <Image
              width={200}
              src={`${IMAGE_LINK}/${initValue?.avatar}`}
            />}
            <Form.Item
              name="avatar"
              label="Ảnh đại diện"
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                maxCount={1}
                customRequest={dummyRequest}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {uploadButton}

              </Upload>

            </Form.Item>
          </Col>
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
          <Col span={12}>
            <Form.Item
              name="code"
              label="Tài khoản"
              rules={[{ required: true, message: 'Bạn chưa nhập tài khoản' }]}
            >
              <Input placeholder="Nhập tài khoản" disabled={edit} />
            </Form.Item>
          </Col>
          <Col span={12}>
            {!edit && <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: 'Bạn chưa nhập mật khẩu' }]}
            >
              <Input placeholder="Nhập mật khẩu" />
            </Form.Item>}
          </Col>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Tên sinh viên"
              rules={[{ required: true, message: 'Bạn chưa nhập tên sinh viên' }]}
            >
              <Input placeholder="Nhập tên sinh viên" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Bạn chưa nhập email' }]}
            >
              <Input placeholder="Nhập email sinh viên" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[{ required: true, message: 'Bạn chưa nhập số điện thoại' }]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
          </Col>


          <Col span={12}>
            <Form.Item
              name="idCode"
              label="Số CMT/CCCD"
              rules={[{ required: true, message: 'Bạn chưa nhập số CMT/CCCD' }]}
            >
              <Input placeholder="Nhập số CMT/CCCD" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="birthday"
              label="Ngày sinh"
              rules={[{ required: true, message: 'Bạn chưa nhập ngày sinh' }]}
            >
              <DatePicker placeholder="Nhập ngày sinh" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, message: 'Bạn chưa nhập địa chỉ' }]}
            >
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>
          </Col>
          <Col span={12}>
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

        </Row>
        <Row gutter={16}>

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