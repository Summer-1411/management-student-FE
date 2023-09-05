import { Layout, Button, Divider, Descriptions, Form, Tag, Modal } from 'antd';

const { Content } = Layout;

import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { ClassContextProps, DataTypeTableStudent } from '../types/index';
import DetailStudent from '~/components/ui/components/detailStudent';
import ListStudent from '~/components/ui/components/listStudent';
import { useLocation } from 'react-router-dom';
import { ClassProvider, useClass } from '../hooks/ClassContext';
import { IClass, IStudent } from '~/types';
import CreateUpdateStudent from './createUpdateStudent';
import { useDeleteStudent, useSearchClass, useSearchStudent } from '~/services';
import { listStatus } from '~/contants';
import Table, { ColumnsType } from "antd/es/table";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import ViewInfor from './viewInfor';
import dayjs from 'dayjs';




const ClassDetail = () => {
  const { listTeacher, listMajor, setOpenView, setDetailStudent, setEdit, setInitValue } = useClass() as ClassContextProps
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IStudent[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };


  const [open, setOpen] = useState<boolean>(false)
  const location = useLocation();

  const [classInfor, setClassInfor] = useState<IClass>()

  const { listStudent } = useSearchStudent({
    idClass: classInfor?.id,
    status: 1
  });
  const { listClass } = useSearchClass({
    status: 1
  })
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [listIdDelete, setListIdDelete] = useState<any[]>([]);
  const deleteStudent = useDeleteStudent();
  const handleClickDelete = (record: IStudent) => {
    setOpenModel(true)
    setListIdDelete([record.id])
  }
  const handleOk = () => {
    setOpenModel(false);
    deleteStudent.mutateAsync({ ids: listIdDelete })
  };
  const handleCancel = () => {
    setOpenModel(false);
  };



  useEffect(() => {
    if (location && location.state) {
      setClassInfor(location?.state?.class)
    }
  }, [location])
  console.log(classInfor);
  const [formCreateUpdate] = Form.useForm();
  const showDrawer = () => {
    setOpen(true);
    formCreateUpdate.setFieldValue("className", classInfor?.name)
  };
  const handleClickStudent = (record: IStudent) => {
    setOpenView(true);
    setDetailStudent(record)
  }
  //Edit
  const handleClickEdit = (record: IStudent) => {
    formCreateUpdate.setFieldValue("birthday", dayjs(record.birthday))
    formCreateUpdate.setFieldValue("idClass", record.id_class)
    formCreateUpdate.setFieldValue("className", classInfor?.name)
    delete record.birthday
    formCreateUpdate.setFieldsValue(record)
    setOpen(true);
    setEdit(true)
    setInitValue(record)
  }
  const columns: ColumnsType<IStudent> = [
    {
      width: 200,
      title: 'Tài khoản',
      dataIndex: 'code',
    },
    {
      width: 200,
      title: 'Họ tên',
      dataIndex: 'name',
    },
    {
      width: 200,
      title: 'Lớp',
      dataIndex: 'id_class',
      render: (field: string | any, record: IStudent) => {
        return (
          <p>
            {listClass?.find((i: any) => i.id == record.id_class)?.name ?? ''}
          </p>
        )
      },
    },
    {
      width: 200,
      title: 'Email',
      dataIndex: 'email',
    },
    {
      width: 200,
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },
    {
      width: 200,
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (field: string | any, record: IStudent) => {
        return (
          <Tag icon={record.status ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={record.status ? 'success' : 'error'}>
            {listStatus.find((i: any) => i.value == record.status)?.label ?? ''}
          </Tag>
        )
      },
    },
    {
      width: 300,
      key: "action",
      render: (field: string | any, record: IStudent) => (
        <div style={{ display: "flex", gap: 10 }}>
          <Button onClick={() => handleClickStudent(record)}>Xem</Button>
          <Button type="primary" ghost onClick={() => handleClickEdit(record)}>Sửa</Button>
          <Button danger disabled={record.status == 0} onClick={() => handleClickDelete(record)}>Xóa</Button>
        </div>
      )
    }
  ];

  return (
    <Content style={{
      padding: 24,
      marginTop: 20,
      background: '#fff',
    }}>
      <Descriptions title="Thông tin chi tiết lớp">
        <Descriptions.Item label="Mã lớp">{classInfor?.id}</Descriptions.Item>
        <Descriptions.Item label="Tên lớp">{classInfor?.name}</Descriptions.Item>
        <Descriptions.Item label="Thuộc ngành">
          {listMajor?.find((i: any) => i.id == classInfor?.id_major)?.name ?? ''}
        </Descriptions.Item>
        <Descriptions.Item label="Giáo viên">
          {listTeacher?.find((i: any) => i.id == classInfor?.teacher)?.name ?? ''}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thọai giáo viên">
          {listTeacher?.find((i: any) => i.id == classInfor?.teacher)?.phone ?? ''}
        </Descriptions.Item>
        <Descriptions.Item label="Số lượng">{classInfor?.quantity}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Button type="primary" style={{ marginBottom: 16 }} onClick={showDrawer} icon={<PlusOutlined />}>
        Thêm mới sinh viên
      </Button>
      <Table
        title={() => 'Danh sách sinh viên'}
        rowSelection={{
          ...rowSelection,
        }}
        rowKey={'id'}
        onRow={(record) => {
          return {
            onClick: () => {

            }, // click row

          };
        }}
        // scroll={{ x: 2016 }}
        columns={columns}
        dataSource={listStudent}
      />
      <Modal
        title="Xóa bản ghi"
        open={openModel}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Sau khi xóa sẽ chuyển trạng thái về không hoạt động. Bạn có muốn xóa ?</p>
      </Modal>
      <CreateUpdateStudent open={open} setOpen={setOpen} classInfor={classInfor} formCreateUpdate={formCreateUpdate} />
      <ViewInfor />
    </Content>
  )
}

function ClassDetailRoot() {
  return <ClassProvider>
    <ClassDetail />
  </ClassProvider>
}


export default ClassDetailRoot