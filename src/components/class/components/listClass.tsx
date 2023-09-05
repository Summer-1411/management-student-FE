
import Search from './search';
import React, { useState } from 'react';
import { Divider, Table, Button, Tag, Modal, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import CreateUpdate from './formCreateUpdate';
import { useNavigate } from 'react-router-dom';
import { useDeleteClass, useSearchClass } from '~/services';
import { IClass } from '~/types';
import { listStatus } from '~/contants';
import { ClassProvider, useClass } from '../hooks/ClassContext';
import { ClassContextProps } from '../types';




const ListClass = () => {
  const [selected, setSelected] = useState<IClass[]>([])


  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IClass[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelected(selectedRows)
    },
  };
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false)

  const { listTeacher, listMajor } = useClass() as ClassContextProps

  const [initSearch, setInitSearch] = useState<IClass>({
    status: 1
  })
  const { listClass } = useSearchClass(initSearch)

  const [openModel, setOpenModel] = useState<boolean>(false);
  const [listIdDelete, setListIdDelete] = useState<any[]>([]);
  const deleteClass = useDeleteClass();
  const handleClickDelete = (record: IClass) => {
    setOpenModel(true)
    setListIdDelete([record.id])
  }
  const handleOk = () => {
    setOpenModel(false);
    deleteClass.mutateAsync({ ids: listIdDelete })
  };
  const handleCancel = () => {
    setOpenModel(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  //edit
  const [form] = Form.useForm();
  const [edit, setEdit] = useState<boolean>(false);
  const [initValue, setInitValue] = useState<IClass>();

  const handleClickEdit = (record: IClass) => {
    form.setFieldsValue(record)
    setEdit(true)
    setInitValue(record)
    setOpen(true);
  }



  const columns: ColumnsType<IClass> = [
    {
      title: 'Mã lớp',
      dataIndex: 'id',
    },
    {
      title: 'Tên lớp',
      dataIndex: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Thuộc ngành',
      dataIndex: 'id_major',
      render: (field: string | any, record: IClass) => {
        return (
          <p>
            {listMajor.find((i: any) => i.id == record.id_major)?.name ?? ''}
          </p>
        )
      },
    },
    {
      title: 'Khóa',
      dataIndex: 'schoolYear',
    },
    {
      title: 'Giáo viên',
      dataIndex: 'teacher',
      render: (field: string | any, record: IClass) => {
        return (
          <p>
            {listTeacher.find((i: any) => i.id == record.teacher)?.name ?? ''}
          </p>
        )
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      render: (field: string | any, record: IClass) => {
        return (
          <p>
            {listTeacher.find((i: any) => i.id == record.teacher)?.phone ?? ''}
          </p>
        )
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (field: string | any, record: IClass) => {
        return (
          <Tag icon={record.status ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={record.status ? 'success' : 'error'}>
            {listStatus.find((i: any) => i.value == record.status)?.label ?? ''}
          </Tag>
        )
      },
    },
    {
      key: "action",
      render: (field: string | any, record: IClass) => (
        <div style={{ display: "flex", gap: 10 }}>
          <Button onClick={() => navigate(`/class/detail/${record.id}`, { state: { class: record } })}>Xem</Button>
          <Button type="primary" ghost onClick={() => handleClickEdit(record)}>Sửa</Button>
          <Button danger disabled={record.status == 0} onClick={() => handleClickDelete(record)}>Xóa</Button>
        </div>
      )
    }
  ];
  return (
    <div>
      <Search setInitSearch={setInitSearch} />

      <Divider />
      <Button type="primary" style={{ marginBottom: 16 }} onClick={showDrawer} icon={<PlusOutlined />}>
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
        dataSource={listClass}

      />
      <Modal
        title="Xóa bản ghi"
        open={openModel}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Sau khi xóa sẽ chuyển trạng thái về không hoạt động. Bạn có muốn xóa ?</p>
      </Modal>
      <CreateUpdate open={open} setOpen={setOpen} setEdit={setEdit} edit={edit} initValue={initValue} form={form} />
    </div>
  )
}

const ListClassRoot = () => (
  <ClassProvider>
    <ListClass />
  </ClassProvider>
)

export default ListClassRoot