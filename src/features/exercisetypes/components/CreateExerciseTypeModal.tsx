import { Modal, Form, Input, Button } from "antd";
import { useCreateExerciseType } from "../api/createExerciseType";
import { useModalStore } from "../../../stores/modals";

type CreateExerciseTypeModalProps = {
    onSubmit: (values: any) => void;
}

export const CreateExerciseTypeModal = (props: CreateExerciseTypeModalProps) => {
    const [form] = Form.useForm();
    const { mutateAsync, isLoading } = useCreateExerciseType();
    const { isCreateExerciseTypeModalVisible, hideCreateExerciseTypeModal } = useModalStore();

    const handleSubmit = (values: any) => {
        hideCreateExerciseTypeModal();
        props.onSubmit(values);
    }

    const handleCancel = () => {
        hideCreateExerciseTypeModal();
    }

    return (
        <Modal
            title="Create Exercise Type"
            visible={isCreateExerciseTypeModalVisible}
            onCancel={handleCancel}
            footer={null}
            confirmLoading={isLoading}
        >
            <Form
                form={form}
                onFinish={async (values: any) => {
                    await mutateAsync({data: values});
                    form.resetFields();
                    handleSubmit(values);
                }}
            >
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 10,
                        span: 14,
                    }}
                >
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}