import { Button, List, Space, Spin } from "antd";
import { useModalStore } from "../../../stores/modals";
import { useExerciseTypes } from "../api/getExerciseTypes";
import { CreateExerciseTypeModal } from "./CreateExerciseTypeModal";

type ListExerciseTypesProps = {
    //exerciseTypes: ExerciseType[];
}

export const ListExerciseTypes = (props: ListExerciseTypesProps) => {
    const exerciseTypesQuery = useExerciseTypes();
    const { showCreateExerciseTypeModal } = useModalStore();

    if (exerciseTypesQuery.isLoading) {
        return (
            <Spin
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    margin: "0 auto",
                }}
            />
        )
    }

    if (!exerciseTypesQuery.data) return null;

    return (
        <Space
            direction="vertical"
            size="large"
            style={{
                width: "100%",
                maxWidth: "600px",
                margin: "0 auto",
            }}
        >
            <h1>Exercise Types</h1>
            <List
                dataSource={exerciseTypesQuery.data}
                renderItem={(exerciseType) => (
                    <List.Item>
                        <List.Item.Meta
                            title={exerciseType.name}
                        />
                    </List.Item>
                )}
            />
            <CreateExerciseTypeModal onSubmit={() => {}} />
            <Button 
                type="primary"
                style={{
                    marginTop: "20px",
                }}
                onClick={showCreateExerciseTypeModal}
            >
                Add new Exercise Type
            </Button>
        </Space>
    )
}