import { Button, Col, Drawer, Form, Input, InputNumber, Row, Select, Space } from 'antd';

interface AddStudentProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddStudent = (props: AddStudentProps) => {
  const { open, setOpen } = props
  const onClose = () => {
    setOpen(false)
  }
  return (
    <Drawer
      title="Thêm sinh viên"
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{ paddingBottom: 80 }}
    >

    </Drawer>
  )
}