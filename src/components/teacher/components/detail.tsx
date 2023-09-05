import { Col, Divider, Drawer, Image, Row } from 'antd'
import DescriptionItem from '~/components/ui/components/descriptionItem'
import { DetailTeacherProps } from '../types'
import { IMAGE_LINK, listStatus } from '~/contants'

const DetailTeacher = (props: DetailTeacherProps) => {
  const { open, setOpen, detailTeacher } = props
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Drawer title='Chi tiết giáo viên' width={720} onClose={onClose} placement='right' open={open}>
      <p className='site-description-item-profile-p'>Thông tin chi tiết giáo viên</p>
      <Row>
        <Col span={24}>
          <Image
            width={200}
            src={`${IMAGE_LINK}/${detailTeacher?.avatar}`}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem title='Họ tên' content={`${detailTeacher?.name}`} />
        </Col>
        <Col span={12}>
          <DescriptionItem title='Tài khoản' content={`${detailTeacher?.code}`} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title='Chức vụ' content={detailTeacher?.level === 1 ? "Trưởng khoa" : "Giáo viên"} />
        </Col>
        <Col span={12}>
          <DescriptionItem title='Số CMT/CCCD' content={`${detailTeacher?.idCode}`} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title='Ngày sinh' content={`${detailTeacher?.birthday}`} />
        </Col>

      </Row>

      <Divider />
      <p className='site-description-item-profile-p'>Liên hệ</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title='Email' content={`${detailTeacher?.email}`} />
        </Col>
        <Col span={12}>
          <DescriptionItem title='Số điện thoại' content={`${detailTeacher?.phone}`} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title='Địa chỉ' content={`${detailTeacher?.address}`} />
        </Col>
        <Col span={12}>
          <DescriptionItem title='Trạng thái' content={`${listStatus?.find((i: any) => i.value == detailTeacher?.status)?.label ?? ''}`} />
        </Col>
      </Row>
    </Drawer >
  )
}


export default DetailTeacher