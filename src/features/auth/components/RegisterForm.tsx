import { Button, Form, Input, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../lib/auth';
import { formLayout } from './formLayout';

type RegisterFormProps = {
    onSubmit: (values: any) => void;
}

export const RegisterForm = (props: RegisterFormProps) => {
    const { register, isRegistering } = useAuth();

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
            <h1>Register</h1>
            <Form
                {...formLayout}
                name="register"
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
                    await register(values);
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
                    name="password1"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!'
                        }
                    ]}
                >
                    <Input type='password' />
                </Form.Item>

                <Form.Item
                    name="password2"
                    label="Confirm Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!'
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
                    <Button type="primary" htmlType="submit" loading={isRegistering}>
                        Register
                    </Button>
                    <Link to="../login" style={{
                        float: 'right',
                    }}>
                        Login
                    </Link>
                </Form.Item>
            </Form>
        </Space>
    )
}