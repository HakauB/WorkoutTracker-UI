import { Button, Form, Input, Space } from 'antd';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../../../components/Layout/PublicLayout';
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
                <h1>Register</h1>
                <Form
                    {...formLayout}
                    name="register"
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
                                        // TODO: callback() deprecated
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
                        labelCol= {{
                            xs: { span: 24 },
                            sm: { span: 6 },
                            md: { span: 6 },
                            lg: { span: 6 },
                        }}
                        wrapperCol= {{
                            xs: { span: 24 },
                            sm: {span: 18 },
                            md: {span: 18 },
                            lg: {span: 18 },
                        }}
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
                            to="../login"
                        >
                            Login
                        </Link>

                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isRegistering}
                        >
                            Register
                        </Button>
                    </Space>
                </Form>
            </Space>
        </PublicLayout>
    )
}