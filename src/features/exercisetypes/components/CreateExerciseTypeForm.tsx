import { Button, Form, Input } from 'antd';
import { useCreateExerciseType } from '../api/createExerciseType';

type CreateExerciseTypeFormProps = {
    onSubmit: (values: any) => void;
}

export const CreateExerciseTypeForm = (props: CreateExerciseTypeFormProps) => {
    const [form] = Form.useForm();
    const { mutateAsync, isLoading } = useCreateExerciseType();

    const handleSubmit = (values: any) => {
        props.onSubmit(values);
    }

    return (
        <Form
            form={form}
            onFinish={async (values: any) => {
                await mutateAsync({data: values});
                handleSubmit(values);
            }}
        >
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Create
                </Button>
            </Form.Item>
        </Form>
    )
}