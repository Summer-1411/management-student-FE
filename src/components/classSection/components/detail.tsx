import { Layout, Button, Divider, Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IClassSection, IStudent } from '~/types';
import { ClassSectionProvider, useClass } from '../hooks/ClassSectionContext';
import { ClassSectionContextProps } from '../types';
import { AddStudent } from './addStudent';
import { PlusOutlined } from '@ant-design/icons';
import { listStatus } from '~/contants';
const { Content } = Layout;

import Table, { ColumnsType } from "antd/es/table";





const ClassSectionDetail = () => {
  const location = useLocation();
  const { listSubject, listTeacher } = useClass() as ClassSectionContextProps;
  const [classSectionInfor, setClassSectionInfor] = useState<IClassSection>()
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

    },
    {
      width: 300,
      key: "action",
    }
  ];

  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (location && location.state) {
      setClassSectionInfor(location?.state?.classSection)
    }
  }, [location])
  const handleAddStudent = () => {
    setOpen(true)
  }
  return (
    <Content style={{
      padding: 24,
      marginTop: 20,
      background: '#fff',
    }}>
      <Descriptions title="Thông tin chi tiết lớp học phần">
        <Descriptions.Item label="Mã lớp">{classSectionInfor?.id}</Descriptions.Item>
        <Descriptions.Item label="Môn học">
          {listSubject?.find((i: any) => i.id == classSectionInfor?.subject_id)?.name ?? ''}
        </Descriptions.Item>
        <Descriptions.Item label="Giáo viên">
          {listTeacher?.find((i: any) => i.id == classSectionInfor?.teacher_id)?.name ?? ''}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thọai giáo viên">
          {listTeacher?.find((i: any) => i.id == classSectionInfor?.teacher_id)?.phone ?? ''}
        </Descriptions.Item>
        <Descriptions.Item label="Số lượng">{classSectionInfor?.current + "/" + classSectionInfor?.max}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Button type="primary" style={{ marginBottom: 16 }} onClick={handleAddStudent} icon={<PlusOutlined />}>
        Thêm mới sinh viên
      </Button>
      <Table
        title={() => 'Danh sách sinh viên'}

        rowKey={'id'}
        onRow={(record) => {
          return {
            onClick: () => {

            }, // click row

          };
        }}
        // scroll={{ x: 2016 }}
        columns={columns}
        dataSource={[]}
      />
      <AddStudent open={open} setOpen={setOpen} />
    </Content>
  )
}



const ClassSectionDetailRoot = () => {
  return <ClassSectionProvider>
    <ClassSectionDetail />
  </ClassSectionProvider>
}


export default ClassSectionDetailRoot