
import Search from "./components/search"
import { useState } from 'react';
import { Divider, Button, Tag, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreateUpdate from "./components/formCreateUpdate";
import { IStudent } from "~/types";
import { useDeleteStudent, useSearchStudent } from "~/services";
import { StudentProvider, useStudent } from "./hooks/StudentContext";
import ViewInfor from "./components/viewInfor";
import { StudentContextProps } from "./types";
import { listStatus } from "~/contants";
import Table, { ColumnsType } from "antd/es/table";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import dayjs from "dayjs";


const StudentManager = () => {
  const { setDetailStudent, listClass, setOpenView, setEdit, formCreateUpdate, setInitValue } = useStudent() as StudentContextProps
  const [open, setOpen] = useState<boolean>(false)
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [initSearch, setInitSearch] = useState<IStudent>({
    status: 1
  })
  const { listStudent } = useSearchStudent(initSearch)

  const deleteStudent = useDeleteStudent();
  const [listIdDelete, setListIdDelete] = useState<any[]>([]);
  const handleClickDelete = (record: IStudent) => {
    setOpenModel(true)
    setListIdDelete([record.id])
  }
  const showDrawer = () => {
    setOpen(true);
  };
  const handleClickStudent = (record: IStudent) => {
    setOpenView(true);
    setDetailStudent(record)
  }
  const handleOk = () => {
    setOpenModel(false);
    deleteStudent.mutateAsync({ ids: listIdDelete })
  };
  const handleCancel = () => {
    setOpenModel(false);
  };

  //Edit
  const handleClickEdit = (record: IStudent) => {
    formCreateUpdate.setFieldValue("birthday", dayjs(record.birthday))
    formCreateUpdate.setFieldValue("idClass", record.id_class)
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
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IStudent[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };


  return (
    <div>
      <Search setInitSearch={setInitSearch} />

      <Divider />
      <Button type="primary" style={{ marginBottom: 16 }} onClick={showDrawer} icon={<PlusOutlined />}>
        Thêm mới
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
      <CreateUpdate open={open} setOpen={setOpen} />
      <ViewInfor />
    </div>
  )
}



const StudentRoot = () => (
  <StudentProvider>
    <StudentManager />
  </StudentProvider>
)

export default StudentRoot