import { Form, Input } from 'antd';
import { User } from '../types';

type UserProfileFormProps = {
    user: User;
}

export const UserProfileForm = (props: UserProfileFormProps) => {
    
    return (
        <Form
            name="basic"
            // labelCol={{
            //     span: 8,
            // }}
            // wrapperCol={{
            //     span: 16,
            // }}
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