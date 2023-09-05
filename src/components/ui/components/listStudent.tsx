import { Button, Table, Tag } from "antd";
import { ListStudentProps } from "../types";
import { ColumnsType } from "antd/es/table";
import { IStudent } from "~/types";
import { useSearchClass } from "~/services";
import { listStatus } from "~/contants";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
const ListStudent = (props: ListStudentProps) => {
  const { setOpenView, data, setDetailStudent } = props
  const { listClass } = useSearchClass({
    status: 1
  })
  const handleClickStudent = (record: IStudent) => {
    setOpenView(true);
    console.log('222', setDetailStudent);
    console.log('record', record);

    setDetailStudent && setDetailStudent(record)

  }

  const columns: ColumnsType<IStudent> = [
    {
      title: 'Mã sinh viên',
      dataIndex: 'code',
    },
    {

      title: 'Họ tên',
      dataIndex: 'name',
      render: (field: string | any, record: IStudent) => <a onClick={() => handleClickStudent(record)}>{field}</a>,
    },
    {

      title: 'Lớp',
      dataIndex: 'id_class',
      render: (field: string | any, record: IStudent) => {
        return (
          <p>
            {listClass.find((i: any) => i.id == record.id_class)?.name ?? ''}
          </p>
        )
      },
    },
    {

      title: 'Email',
      dataIndex: 'email',
    },
    {

      title: 'Số điện thoại',
      dataIndex: 'phone',
    },
    {

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

      key: "action",
      render: (field: string | any, record: IStudent) => (
        <>
          <Button onClick={() => handleClickStudent(record)}>Xem</Button>
          <Button>Sửa</Button>
          <Button>Xóa</Button>
        </>
      )
    }
  ];
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IStudent[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  return (
    <Table
      title={() => 'Danh sách sinh viên'}
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
      // scroll={{ x: 2016 }}
      columns={columns}
      dataSource={data}
    />
  )
}

export default ListStudent