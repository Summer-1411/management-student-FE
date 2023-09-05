import { Col, Divider, Drawer, Row, Image } from 'antd'
import DescriptionItem from '~/components/ui/components/descriptionItem'
import { ClassContextProps } from '../types'
import { IMAGE_LINK, listStatus } from '~/contants'
import { useClass } from '../hooks/ClassContext'



const ViewInfor = () => {
  const { detailStudent, listClass, openView, setOpenView } = useClass() as ClassContextProps
  const onClose = () => {
    setOpenView(false);
  };

  // console.log('detailStudent', detailStudent);


  return (
    <Drawer title='Chi tiết sinh viên' width={720} onClose={onClose} placement='right' open={openView}>
      <p className='site-description-item-profile-p'>Thông tin chi tiết sinh viên</p>
      <Row>
        <Col span={24}>
          <Image
            width={200}
            src={`${IMAGE_LINK}/${detailStudent?.avatar}`}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem title='Họ tên' content={`${detailStudent?.name}`} />
        </Col>
        <Col span={12}>
          <DescriptionItem title='Tài khoản' content={`${detailStudent?.code}`} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title='Lớp' content={`${listClass?.find((i: any) => i.id == detailStudent?.id_class)?.name ?? ''}`} />
        </Col>
        <Col span={12}>
          <DescriptionItem title='Số CMT/CCCD' content={`${detailStudent?.idCode}`} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title='Ngày sinh' content={`${detailStudent?.birthday}`} />
        </Col>

      </Row>

      <Divider />
      <p className='site-description-item-profile-p'>Liên hệ</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title='Email' content={`${detailStudent?.email}`} />
        </Col>
        <Col span={12}>
          <DescriptionItem title='Số điện thoại' content={`${detailStudent?.phone}`} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title='Địa chỉ' content={`${detailStudent?.address}`} />
        </Col>
        <Col span={12}>
          <DescriptionItem title='Trạng thái' content={`${listStatus?.find((i: any) => i.value == detailStudent?.status)?.label ?? ''}`} />
        </Col>
      </Row>
    </Drawer >
  )
}


export default ViewInfor
