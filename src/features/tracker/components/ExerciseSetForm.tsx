import { Form, Button, Space, Input, FormListFieldData } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

type ExerciseSetFormProps = {
    field: FormListFieldData;
    // fieldKey: number;
    // fieldName: number;
    //onSubmit: (values: any) => void;
}

export const ExerciseSetForm = (props: ExerciseSetFormProps) => {
    return (
        <>
            <Form.List
                name={[props.field.name, "exercise_sets"]}
            >
                {
                    (exerciseSets, { add, remove }) => {
                        return (
                            <Space
                                direction="vertical"
                            >
                                {exerciseSets.map((exerciseSet, index) => (
                                    <Space
                                        key={exerciseSet.key}
                                        align="start"
                                    >
                                        <Form.Item
                                            {...exerciseSet}
                                            name={[exerciseSet.name, "reps"]}
                                            fieldKey={[exerciseSet.key, "reps"]}
                                            key={2 * index + 0}
                                            rules={[{ required: true, message: "Please enter reps" }]}
                                        >
                                            <Input placeholder="Reps" />
                                        </Form.Item>

                                        <Form.Item
                                            {...exerciseSet}
                                            name={[exerciseSet.name, "weight"]}
                                            fieldKey={[exerciseSet.key, "weight"]}
                                            key={2 * index + 1}
                                            rules={[{ required: true, message: "Please enter weight" }]}
                                        >
                                            <Input placeholder="Weight" />
                                        </Form.Item>

                                        <Form.Item
                                            {...exerciseSet}
                                            name={[exerciseSet.name, "percentage"]}
                                            fieldKey={[exerciseSet.key, "percentage"]}
                                            key={2 * index + 2}
                                            rules={[{ required: false, }]}
                                        >
                                            <Input placeholder="Percentage" />
                                        </Form.Item>

                                        <MinusCircleOutlined
                                            onClick={() => {
                                                remove(exerciseSet.name)
                                            }}
                                        />
                                    </Space>
                                ))}
                                <Form.Item
                                    style={{
                                        marginBottom: 0,
                                    }}
                                >
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        // style={{
                                            // float: "right",
                                            // width: '100%',
                                        // }}
                                    >
                                        <PlusOutlined /> Add exercise set
                                    </Button>
                                </Form.Item>
                            </Space>
                        )
                    }
                }
            </Form.List>
        </>
    )
}