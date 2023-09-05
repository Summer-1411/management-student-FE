import React from 'react';
import { Carousel } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

const contentStyle: React.CSSProperties = {
  height: '330px',
  objectFit: "contain"
};

const Dashboard = () => {
  return (
    <>
      <Carousel autoplay>
        <div>
          <img style={contentStyle} src="https://www.haui.edu.vn/media/2/ufi2779.jpg" />
        </div>
        <div>
          <img style={contentStyle} src="https://www.haui.edu.vn/media/2/ufi2780.jpg" />
        </div>
        <div>
          <img style={contentStyle} src="https://tac.haui.edu.vn/media/2/ufi2599.webp" />
        </div>
        <div>
          <img style={contentStyle} src="https://tac.haui.edu.vn/media/2/ufi2606.webp" />
        </div>
        <div>
          <img style={contentStyle} src=" https://tac.haui.edu.vn/media/2/ufi2597.webp" />
        </div>
        <div>
          <img style={contentStyle} src="https://tac.haui.edu.vn/media/2/ufi2606.webp" />
        </div>
        <div>
          <img style={contentStyle} src="https://cpa.haui.edu.vn/media//10/ufi10563.jpg" />
        </div>

      </Carousel>
      <Row gutter={16} style={{ marginTop: 20 }}>

        <Col span={12}>
          <Card style={{ marginBottom: 10, fontSize: 20, color: "black", fontWeight: "bold" }} bordered={false}>
            <Statistic
              title="Số lượng khoa"
              value={5}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ marginBottom: 10, fontSize: 20, color: "black", fontWeight: "bold" }} bordered={false}>
            <Statistic
              title="Số lượng ngành"
              value={34}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ marginBottom: 10, fontSize: 20, color: "black", fontWeight: "bold" }} bordered={false}>
            <Statistic
              title="Số lượng lớp"
              value={115}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ marginBottom: 10, fontSize: 20, color: "black", fontWeight: "bold" }} bordered={false}>
            <Statistic
              title="Số lượng sinh viên"
              value={6500}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard