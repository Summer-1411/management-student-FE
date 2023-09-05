import { Button, Divider, Form, Modal, Table, Tag } from "antd"
import Search from "./components/search"
import { PlusOutlined } from '@ant-design/icons';
import { ITeacher } from "../../types/index";
import { useState } from "react";
import type { ColumnsType } from 'antd/es/table';
import CreateUpdate from "./components/formCreateUpdate";
import DetailTeacher from "./components/detail";
import { useDeleteTeacher, useGetTeacher } from "~/services";
import { listPosition, listStatus } from "~/contants";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import dayjs from "dayjs";
const TeacherManager = () => {
  const [form] = Form.useForm();
  const [selected, setSelected] = useState<ITeacher[]>([])
  const [detailTeacher, setDetailTeacher] = useState<ITeacher>()
  const [openCreateUpdate, setOpenCreateUpdate] = useState<boolean>(false)
  const [openDetailTeacher, setOpenDetailTeacher] = useState<boolean>(false)
  const [search, setSearch] = useState<ITeacher>({
    code: "",
    name: "",
    email: "",
    phone: "",
    status: 1,
    level: 0
  })
  const { listTeacher } = useGetTeacher(search);
  const handleClickView = (record: ITeacher) => {
    setDetailTeacher(record)
    setOpenDetailTeacher(true)
  }

  //delete
  const [openModel, setOpenModel] = useState<boolean>(false);

  const [listIdDelete, setListIdDelete] = useState<any[]>([]);
  const deleteTeacher = useDeleteTeacher();
  const handleClickDelete = (record: ITeacher) => {
    setOpenModel(true)
    setListIdDelete([record.id])
  }

  //edit
  const [edit, setEdit] = useState<boolean>(false);
  const [initValue, setInitValue] = useState<ITeacher>()
  const handleClickEdit = (record: ITeacher) => {
    form.setFieldValue("birthday", dayjs(record.birthday))
    form.setFieldValue("level", record.level)
    delete record.birthday
    form.setFieldsValue(record)
    setOpenCreateUpdate(true);
    setEdit(true)
    setInitValue(record)
  }


  const handleOk = () => {
    setOpenModel(false);
    deleteTeacher.mutateAsync({ ids: listIdDelete })
  };
  const handleCancel = () => {
    setOpenModel(false);
  };
  const columns: ColumnsType<ITeacher> = [
    {
      title: 'Mã giáo viên',
      dataIndex: 'id',
    },
    {
      title: 'Tên giáo viên',
      dataIndex: 'name',
      render: (field: string | any, record: ITeacher) => <a onClick={() => handleClickView(record)}>{field}</a>,
    },
    {
      title: 'Chức vụ',
      dataIndex: 'level',
      render: (field: string | any, record: ITeacher) => {
        return (
          <p>
            {listPosition.find((i: any) => i.value == record.level)?.label ?? ''}
          </p>
        )
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (field: string | any, record: ITeacher) => {
        return (
          <Tag icon={record.status ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={record.status ? 'success' : 'error'}>
            {listStatus.find((i: any) => i.value == record.status)?.label ?? ''}
          </Tag>
        )
      },
    },
    {
      key: "action",
      render: (field: string | any, record: ITeacher) => (
        <div style={{ display: "flex", gap: 10 }}>
          <Button onClick={() => handleClickView(record)}>Xem</Button>
          <Button type="primary" ghost onClick={() => handleClickEdit(record)}>Sửa</Button>
          <Button danger disabled={record.status == 0} onClick={() => handleClickDelete(record)}>Xóa</Button>
        </div>
      )
    }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: ITeacher[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelected(selectedRows)
    },
  };
  return (
    <div>
      <Search setSearch={setSearch} />
      <Divider />
      <Button type="primary" style={{ marginBottom: 16 }} onClick={() => setOpenCreateUpdate(true)} icon={<PlusOutlined />}>
        Thêm mới
      </Button>
      <Table
        title={() => <>
          <h3>Danh sách kết quả</h3>
          {selected.length > 0 && <p>Đã chọn {selected.length} bản ghi</p>}
        </>}
        rowSelection={{
          ...rowSelection,
        }}
        rowKey={'id'}
        onRow={(record) => {
          return {
            // onClick: () => { console.log(record);
            //  }, // click row

          };
        }}
        columns={columns}
        dataSource={listTeacher}

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
        open={openCreateUpdate}
        setOpen={setOpenCreateUpdate}
        form={form}
        setEdit={setEdit}
        edit={edit}
        setInitValue={setInitValue}
        initValue={initValue}
      />
      <DetailTeacher open={openDetailTeacher} setOpen={setOpenDetailTeacher} detailTeacher={detailTeacher} />
    </div>
  )
}
export default TeacherManager