import React from 'react';
import { Button, Card, Form, Input } from 'antd';
import './index.scss'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API, KEY_LOCAL } from '~/contants';
import { loginFailure, loginSuccess } from '~/redux/userRedux';
type FieldType = {
  code?: string;
  password?: string;
};

const Login: React.FC = () => {
  const { Meta } = Card;
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const dispatch = useDispatch()
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    try {
      const res = await axios.post(`${API.ADMIN}/login`, values)
      console.log(res);
      localStorage.setItem(KEY_LOCAL, res.data.accessToken)

      // toast.success(res.data.message, toastOption);
      dispatch(loginSuccess(res.data.user))
    } catch (error) {
      // toast.error(error.response.data.message, toastOption);
      dispatch(loginFailure())
    }
  };



  console.log('currentUser', currentUser);

  return (
    <div className='wrapper-login'>

      <Card
        cover={
          <img
            alt="example"
            src="https://www.haui.edu.vn/media/63/t63269.jpg"
          />
        } bordered={false} style={{ padding: 30 }}
      >
        <Meta
          title="Trường Đại học Công nghiệp Hà Nội"
          description="Trang quản lý thông tin sinh viên"
        />
        <Form
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Tài khoản"
            name="code"
            rules={[{ required: true, message: 'Bạn chưa nhập tài khoản!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Bạn chưa nhập mật khẩu!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>

    </div>

  );
}

export default Login;