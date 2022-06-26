import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Card, Row, Col, Input, Button, Space, Select, DatePicker, Spin } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import { ExerciseSetForm } from './ExerciseSetForm';
import { useExerciseTypes } from '../../exercisetypes/api/getExerciseTypes';

import { WorkoutNested } from '../../data';

export const WorkoutTrackerForm = () => {
    const { control } = useForm();
    const { data: exerciseTypes, isLoading: isLoadingExerciseTypes } = useExerciseTypes();

    const onSubmit = (values: any) => {
        console.log(values);
    }

    if (isLoadingExerciseTypes) {
        return <Spin />;
    }

    if (!exerciseTypes) {
        return null;
    }

    return (
        <Form 
            onFinish={onSubmit}
        >
            <Form.Item
                name="name"
                label="Workout Name"
                rules={[{ required: true, message: "Please enter workout name" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="date_performed"
                label="Date Performed"
                rules={[{ required: true, message: "Please enter date performed" }]}
            >
                <DatePicker />
            </Form.Item>

            <Form.List name="exercises">
                {(fields, { add, remove }) => {
                    return (
                        <Card
                            //direction="vertical"
                            style={{
                                backgroundColor: '#f1f3f9',
                            }}
                        >
                            {fields.map((field, index) => (
                                <Card
                                    key={field.key}
                                    title={`Exercise ${index + 1}`}
                                    extra={<MinusCircleOutlined onClick={() => remove([field.name])} />}
                                    style={{ 
                                        marginBottom: 8,
                                        border: '1px solid #e8e8e8',
                                        borderRadius: 6, 
                                    }}
                                    //align="start"
                                    //direction='vertical'
                                >
                                    <Form.Item
                                        {...field}
                                        name={[field.name, "exercise_type"]}
                                        fieldKey={[field.key, "exercise_type"]}
                                        rules={[{ required: true, message: "Please enter exercise type" }]}
                                    >
                                        <Select
                                            placeholder="Exercise Type"
                                            //defaultValue={exerciseTypes[0].id}
                                        >
                                            {exerciseTypes.map((exerciseType) => (
                                                <Select.Option key={exerciseType.id} value={exerciseType.id}>
                                                    {exerciseType.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item>
                                        <ExerciseSetForm
                                            field={field} 
                                            // fieldKey={field.key} fieldName={field.name} 
                                        />
                                    </Form.Item>

                                    {
                                        // <MinusCircleOutlined
                                        //     onClick={() => remove(field.name)}
                                        // />
                                    }

                                </Card>
                            ))}

                            <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                            >
                                <PlusOutlined /> Add Exercise
                            </Button>
                        </Card>
                    )
                }}
            </Form.List>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}