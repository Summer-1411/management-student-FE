
import Filter from './components/filter';
import React, { useState } from 'react';
import { Divider, Table, Button, Tag, Form, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import CreateUpdate from './components/formCreateUpdate';
import { PlusOutlined } from '@ant-design/icons';
import { IDepartment } from '~/types';
import { useDeleteDepartment, useGetTeacher, useSearchDepartment } from '~/services';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { listStatus } from '~/contants';



const DepartmentManager = () => {
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IDepartment[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };
  const [initSearch, setInitSearch] = useState<IDepartment>({
    status: 1
  })
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false)
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [listIdDelete, setListIdDelete] = useState<any[]>([]);
  const [initValue, setInitValue] = useState<IDepartment>()
  const showDrawer = () => {
    setInitValue(undefined)
    setOpen(true);
  };
  const { listTeacher } = useGetTeacher({
    level: 1
  });
  const handleOk = () => {
    setOpenModel(false);
    deleteDepartment.mutateAsync({ ids: listIdDelete })
  };

  const handleCancel = () => {
    setOpenModel(false);
  };
  console.log({ listTeacher });

  const { listDepartment } = useSearchDepartment(initSearch);
  const deleteDepartment = useDeleteDepartment();

  const handleClickDelete = (record: IDepartment) => {
    setOpenModel(true)
    setListIdDelete([record.id])
  }
  const handleClickEdit = (record: IDepartment) => {
    form.setFieldsValue(record)
    setInitValue(record)
    setIsEdit(true);
    setOpen(true);
  }
  const columns: ColumnsType<IDepartment> = [
    {
      title: 'Mã khoa',
      dataIndex: 'id',
    },
    {
      title: 'Tên khoa',
      dataIndex: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Trưởng khoa',
      dataIndex: 'lead',
      render: (field: string | any, record: IDepartment) => {
        return (
          <p>
            {listTeacher.find((i: any) => i.id == record.lead)?.name ?? ''}
          </p>
        )
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      render: (field: string | any, record: IDepartment) => {
        return (
          <p>
            {listTeacher.find((i: any) => i.id == record.lead)?.phone ?? ''}
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
      render: (field: string | any, record: IDepartment) => {
        return (
          <Tag icon={record.status ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={record.status ? 'success' : 'error'}>
            {listStatus.find((i: any) => i.value == record.status)?.label ?? ''}
          </Tag>
        )
      },
    },
    {
      key: "action",
      render: (field: string | any, record: IDepartment) => (
        <div style={{ display: "flex", gap: 10 }}>
          <Button type="primary" ghost onClick={() => handleClickEdit(record)}>Sửa</Button>
          <Button danger disabled={record.status == 0} onClick={() => handleClickDelete(record)}>Xóa</Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <Filter setInitSearch={setInitSearch} />

      <Divider />
      <Button type="primary" style={{ marginBottom: 16 }} onClick={showDrawer} icon={<PlusOutlined />}>
        Thêm mới khoa
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
        dataSource={listDepartment}

      />
      <Modal
        title="Xóa bản ghi"
        open={openModel}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Sau khi xóa sẽ chuyển trạng thái về không hoạt động. Bạn có muốn xóa ?</p>
      </Modal>
      <CreateUpdate form={form} open={open} setOpen={setOpen} isEdit={isEdit} setIsEdit={setIsEdit} listTeacher={listTeacher} initValue={initValue} />
    </div>
  )
}

export default DepartmentManager