import { Button, Divider, Modal, Table, Tag } from "antd"
import Search from "./components/search"
import { PlusOutlined } from '@ant-design/icons';
import { ClassSectionContextProps, IClassSection } from "./types";
import { useState } from "react";
import type { ColumnsType } from 'antd/es/table';
import CreateUpdate from "./components/formCreateUpdate";
import { useNavigate } from "react-router-dom";
import { ClassSectionProvider, useClass } from "./hooks/ClassSectionContext";
import { useDeleteClassSection, useSearchClassSection } from "~/services";
import { listStatus } from "~/contants";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
const ClassSectionManager = () => {
  const { initSearch, listSubject, listTeacher, form, setEdit, setInitValue } = useClass() as ClassSectionContextProps;
  const [selected, setSelected] = useState<IClassSection[]>([])
  const [openCreateUpdate, setOpenCreateUpdate] = useState<boolean>(false)
  const navigate = useNavigate();


  const { listClassSection } = useSearchClassSection(initSearch)

  //id	subject_id	max	current	teacher_id	time status	
  //delete
  const [openModel, setOpenModel] = useState<boolean>(false);
  const deleteClassSection = useDeleteClassSection();
  const [listIdDelete, setListIdDelete] = useState<any[]>([]);

  const handleClickDelete = (record: IClassSection) => {
    setOpenModel(true)
    setListIdDelete([record.id])
  }

  //Edit
  const handleClickEdit = (record: IClassSection) => {
    setEdit(true)
    setInitValue(record)
    form.setFieldsValue(record)
    setOpenCreateUpdate(true);
  }
  const handleOk = () => {
    setOpenModel(false);
    deleteClassSection.mutateAsync({ ids: listIdDelete })
  };
  const handleCancel = () => {
    setOpenModel(false);
  };
  const columns: ColumnsType<IClassSection> = [
    {
      title: 'Mã lớp',
      dataIndex: 'id',
    },
    {
      title: 'Môn học',
      dataIndex: 'subject_id',
      render: (field: string | any, record: IClassSection) => {
        return (
          <p>
            {listSubject.find((i: any) => i.id == record.subject_id)?.name ?? ''}
          </p>
        )
      },
    },
    {
      title: 'Giáo viên',
      dataIndex: 'teacher_id',
      render: (field: string | any, record: IClassSection) => {
        return (
          <p>
            {listTeacher.find((i: any) => i.id == record.teacher_id)?.name ?? ''}
          </p>
        )
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'max',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (field: string | any, record: IClassSection) => {
        return (
          <Tag icon={record.status ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={record.status ? 'success' : 'error'}>
            {listStatus.find((i: any) => i.value == record.status)?.label ?? ''}
          </Tag>
        )
      },
    },
    {
      key: "action",
      render: (field: string | any, record: IClassSection) => (
        <div style={{ display: "flex", gap: 10 }}>
          <Button onClick={() => navigate(`/class-section-detail/${record.id}`, { state: { classSection: record } })}>Xem</Button>
          <Button type="primary" ghost onClick={() => handleClickEdit(record)}>Sửa</Button>
          <Button danger disabled={record.status == 0} onClick={() => handleClickDelete(record)}>Xóa</Button>
        </div>
      )
    }
  ];
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IClassSection[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelected(selectedRows)
    },
  };
  return (
    <div>
      <Search />
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
        dataSource={listClassSection}

      />
      <CreateUpdate open={openCreateUpdate} setOpen={setOpenCreateUpdate} />
      <Modal
        title="Xóa bản ghi"
        open={openModel}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Sau khi xóa sẽ chuyển trạng thái về không hoạt động. Bạn có muốn xóa ?</p>
      </Modal>
    </div>
  )
}

const ClassSectionRoot = () => {
  return (
    <ClassSectionProvider>
      <ClassSectionManager />
    </ClassSectionProvider>
  )
}

export default ClassSectionRoot
