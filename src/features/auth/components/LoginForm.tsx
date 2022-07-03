import { Button, Form, Input, Space } from 'antd';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../../../components/Layout/PublicLayout';
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
        <PublicLayout>
            <Space
                direction="vertical"
                size="large"
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    margin: '0 auto',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <h1>Login</h1>

                <Form
                    {...formLayout}
                    name="login"
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
                                    // TODO: callback() deprecated
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

                    <Space
                        direction='horizontal'
                        size='large'
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Link
                            to="../register"
                        >
                            Register
                        </Link>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoggingIn}
                        >
                            Log in
                        </Button>
                    </Space>
                </Form>
            </Space>
        </PublicLayout>
    )
}