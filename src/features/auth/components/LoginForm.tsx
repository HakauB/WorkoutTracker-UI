import { Button, Form, Input, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../lib/auth';
import { formLayout } from './formLayout';

type LoginFormProps = {
    onSubmit: (values: any) => void;
}

export const LoginForm = (props: LoginFormProps) => {
    const { login, isLoggingIn } = useAuth();

    const handleSubmit = (values: any) => {
        props.onSubmit(values);
    }

    return (
        <Space
            direction="vertical"
            size="large"
            style={{
                width: '100%',
                maxWidth: '600px',
                margin: '0 auto',
            }}
        >
            <h1>Login</h1>
            <Form
                {...formLayout}
                name="login"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={async (values: any) => {
                    await login(values);
                    handleSubmit(values);
                }}
                autoComplete="off"
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                            validator(rule, value, callback) {
                                if (!value) {
                                    callback('Please input your email!');
                                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                                    callback('Please input a valid email!');
                                } else {
                                    callback();
                                }
                            },
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        }
                    ]}
                >
                    <Input type='password' />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" loading={isLoggingIn}>
                        Log in
                    </Button>
                    <Link to="../register" style={{
                        float: 'right',
                    }}>
                        Register
                    </Link>
                </Form.Item>
            </Form>
        </Space>
    )
}