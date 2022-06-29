import { Button, Form, Input, Modal } from "antd";
import { useModalStore } from "../../../stores/modals";
import { useDeleteExerciseType } from "../api/deleteExerciseType";
import { ExerciseType } from "../types";

type ConfirmDeleteExerciseTypeModalProps = {
    exerciseType: ExerciseType;
    onSubmit: (values: any) => void;
    onCancel: () => void;
}

export const ConfirmDeleteExerciseTypeModal = (props: ConfirmDeleteExerciseTypeModalProps) => {
    const { isConfirmDeleteExerciseTypeModalVisible, hideConfirmDeleteExerciseTypeModal } = useModalStore();

    const { mutateAsync, isLoading } = useDeleteExerciseType();

    const handleSubmit = (values: any) => {
        hideConfirmDeleteExerciseTypeModal();
        props.onSubmit(values);
    }

    const handleCancel = () => {
        hideConfirmDeleteExerciseTypeModal();
        props.onCancel();
    }

    console.log(props.exerciseType);

    return (
        <Modal
            title="Delete Exercise Type"
            visible={isConfirmDeleteExerciseTypeModalVisible}
            onCancel={handleCancel}
            footer={null}
            confirmLoading={isLoading}
        >
            <p>Are you sure you want to delete this exercise type?</p>
            <Form
                onFinish={async (values: any) => {
                    await mutateAsync({ exerciseTypeId: props.exerciseType.id });
                    handleSubmit(values);
                }}
            >
                <Form.Item name="name" rules={[{ required: true }]} initialValue={props.exerciseType.name}>
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Delete
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}