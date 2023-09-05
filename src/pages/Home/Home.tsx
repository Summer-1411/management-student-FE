import React, { useState } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  ContactsOutlined,
  AuditOutlined,
  MediumOutlined,
  IdcardOutlined,
  ReadOutlined,
  WindowsOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom'
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Avatar, Tooltip } from 'antd';
import { Outlet } from 'react-router-dom';
import './index.scss'
import TeacherManager from '~/components/teacher';
import { useDispatch } from 'react-redux';
import { logout } from '~/redux/userRedux';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[] | null,

): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Trang chủ', '/', <PieChartOutlined />),
  getItem('Quản lý khoa', '/department', <DesktopOutlined />),
  getItem('Quản lý ngành', '/major', <WindowsOutlined />),
  getItem('Quản lý lớp', '/class', <ReadOutlined />),
  getItem('Quản lý sinh viên', '/student', <ContactsOutlined />),
  getItem('Quản lý giáo viên', '/teacher', <AuditOutlined />),
  getItem('Quản lý môn học', '/subject', <MediumOutlined />),
  getItem('Lớp học phần', '/class-section', <IdcardOutlined />),
];

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const dispatch = useDispatch()


  console.log('location', location);

  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const hanleClick = (tab: any) => {
    navigate(tab.key)
  }
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider style={{ position: "fixed", top: 10, left: 0, bottom: 0 }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu theme="dark" defaultSelectedKeys={[`${location}`]} mode="inline" onClick={hanleClick} items={items} />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ padding: '10px', background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 64 }}
              src="https://www.haui.edu.vn/media/63/t63269.jpg"
              shape="square"
              style={{ marginRight: 10 }}
            />
            <h2>Hệ thống quản lý sinh viên</h2>
          </div>
          <Tooltip title={<div onClick={handleLogout}>Thoát</div>}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p>Summer</p>
              <Avatar src={<img src="https://www.haui.edu.vn/media/63/t63269.jpg" alt="avatar" />} style={{ marginLeft: 10 }} />
            </div>
          </Tooltip>

        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Summer ©2023</Footer>
      </Layout>
    </Layout>
  );
};

export default Home;