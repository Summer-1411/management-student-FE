import { Button, Divider, Form, Modal, Table, Tag } from "antd";
import Search from "./components/search"
import { PlusOutlined } from '@ant-design/icons';
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import CreateUpdate from "./components/createUpdate";
import { ISubject } from "~/types";
import { useDeleteSubject, useSearchDepartment, useSearchSubject } from "~/services";
import { listStatus } from "~/contants";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
const SubjectManager = () => {
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: ISubject[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false)
  const showDrawer = () => {
    setOpen(true);
  };
  const { listDepartment } = useSearchDepartment({
    status: 1
  })
  const [initSearch, setInitSearch] = useState<ISubject>({
    status: 1
  })
  const { listSubject } = useSearchSubject(initSearch)


  //delete
  const [openModel, setOpenModel] = useState<boolean>(false);
  const deleteSubject = useDeleteSubject();
  const [listIdDelete, setListIdDelete] = useState<any[]>([]);
  const handleClickDelete = (record: ISubject) => {
    setOpenModel(true)
    setListIdDelete([record.id])
  }

  //edit
  const [edit, setEdit] = useState<boolean>(false)
  const [initValue, setInitValue] = useState<ISubject>()

  const handleClickEdit = (record: ISubject) => {
    console.log('record', record);

    setEdit(true)
    setInitValue(record)
    form.setFieldsValue(record)
    setOpen(true)
  }
  const handleOk = () => {
    setOpenModel(false);
    deleteSubject.mutateAsync({ ids: listIdDelete })
  };
  const handleCancel = () => {
    setOpenModel(false);
  };
  const columns: ColumnsType<ISubject> = [
    {
      title: 'Mã môn học',
      dataIndex: 'id',
    },
    {
      title: 'Tên môn học',
      dataIndex: 'name',
    },
    {
      title: 'Thuộc khoa',
      dataIndex: 'id_department',
      render: (field: string | any, record: ISubject) => {
        return (
          <p>
            {listDepartment.find((i: any) => i.id == record.id_department)?.name ?? ''}
          </p>
        )
      },
    },
    {
      title: 'Số tín chỉ',
      dataIndex: 'quantity',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (field: string | any, record: ISubject) => {
        return (
          <Tag icon={record.status ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={record.status ? 'success' : 'error'}>
            {listStatus.find((i: any) => i.value == record.status)?.label ?? ''}
          </Tag>
        )
      },
    },
    {
      key: "action",
      render: (field: string | any, record: ISubject) => (
        <div style={{ display: "flex", gap: 10 }}>
          <Button type="primary" ghost onClick={() => handleClickEdit(record)}>Sửa</Button>
          <Button danger disabled={record.status == 0} onClick={() => handleClickDelete(record)}>Xóa</Button>
        </div>
      )
    }
  ]



  return (
    <div>
      <Search listDepartment={listDepartment} setInitSearch={setInitSearch} />
      <Divider />
      <Button type="primary" style={{ marginBottom: 16 }} onClick={showDrawer} icon={<PlusOutlined />}>
        Thêm mới
      </Button>
      <Table
        title={() => 'Danh sách kết quả'}
        rowSelection={{
          ...rowSelection,
        }}
        rowKey={'id'}
        onRow={(record) => {
          return {
            onClick: () => {
              console.log(record);
            }, // click row

          };
        }}
        columns={columns}
        dataSource={listSubject}

      />
      <Modal
        title="Xóa bản ghi"
        open={openModel}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Sau khi xóa sẽ chuyển trạng thái về không hoạt động. Bạn có muốn xóa ?</p>
      </Modal>
      <CreateUpdate
        open={open}
        setOpen={setOpen}
        listDepartment={listDepartment}
        form={form}
        setEdit={setEdit}
        edit={edit}
        initValue={initValue}
        setInitValue={setInitValue}
      />
    </div>
  )
}

export default SubjectManager