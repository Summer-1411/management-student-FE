
import Filter from './components/filter';
import React, { useState } from 'react';
import { Divider, Table, Space, Button, Tag, Modal, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import CreateUpdate from './components/formCreateUpdate';
import { PlusOutlined } from '@ant-design/icons';
import { DataTypeTable } from './types';
import { useDeleteMajor, useSearchDepartment, useSearchMajor } from '~/services';
import { IMajor } from '~/types';
import { listStatus } from '~/contants';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';




const MajorManager = () => {
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IMajor[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };
  const [initSearch, setInitSearch] = useState<IMajor>({
    id: undefined,
    name: '',
    idDepartment: undefined,
    status: 1
  })
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false)
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [initValue, setInitValue] = useState<IMajor>();
  const [listIdDelete, setListIdDelete] = useState<any[]>([]);
  const deleteMajor = useDeleteMajor()
  const showDrawer = () => {
    setOpen(true);
  };
  const { listDepartment } = useSearchDepartment({
    status: 1
  });
  const { listMajor } = useSearchMajor(initSearch)
  const handleClickDelete = (record: IMajor) => {
    setOpenModel(true)
    setListIdDelete([record.id])
  }

  const handleClickEdit = (record: IMajor) => {
    setOpen(true);
    setIsEdit(true)
    setInitValue(record)
    form.setFieldsValue(record)
    form.setFieldValue("idDepartment", record.id_department)

  }
  const handleOk = () => {
    setOpenModel(false);
    deleteMajor.mutateAsync({ ids: listIdDelete })
  };

  const handleCancel = () => {
    setOpenModel(false);
  };


  const columns: ColumnsType<IMajor> = [
    {
      title: 'Mã ngành',
      dataIndex: 'id',
    },
    {
      title: 'Tên ngành',
      dataIndex: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Thuộc khoa',
      dataIndex: 'idDepartment',
      render: (field: string | any, record: IMajor) => {
        return (
          <p>
            {listDepartment.find((i: any) => i.id == record.id_department)?.name ?? ''}
          </p>
        )
      },
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (field: string | any, record: IMajor) => {
        return (
          <Tag icon={record.status ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={record.status ? 'success' : 'error'}>
            {listStatus.find((i: any) => i.value == record.status)?.label ?? ''}
          </Tag>
        )
      },
    },
    {
      key: "action",
      render: (field: string | any, record: IMajor) => (
        <div style={{ display: "flex", gap: 10 }}>
          <Button type="primary" ghost onClick={() => handleClickEdit(record)}>Sửa</Button>
          <Button danger disabled={record.status == 0} onClick={() => handleClickDelete(record)}> Xóa</Button>
        </div>
      )
    }
  ];
  return (
    <div>
      <Filter listDepartment={listDepartment} setInitSearch={setInitSearch} />

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
        dataSource={listMajor}

      />
      <Modal
        title="Xóa bản ghi"
        open={openModel}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Sau khi xóa sẽ chuyển trạng thái về không hoạt động. Bạn có muốn xóa ?</p>
      </Modal>
      <CreateUpdate open={open} setOpen={setOpen} listDepartment={listDepartment} form={form} setIsEdit={setIsEdit} isEdit={isEdit} initValue={initValue} />
    </div>
  )
}

export default MajorManager