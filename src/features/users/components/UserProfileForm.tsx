import { Col, Form, Input, Row, Space } from 'antd';
import { useEffect } from 'react';
import { useUser } from '../api/getUser';
import { useThemeStore } from '../../../stores/theme';
import { User } from '../types';

type UserProfileFormProps = {
    user: User;
}

export const UserProfileForm = (props: UserProfileFormProps) => {
    const { theme } = useThemeStore();

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
        >

            <Form.Item
                label="Email"
                name="email"
                initialValue={props.user.email}
            >
                <Input disabled />
            </Form.Item>

        </Form>
    )
}