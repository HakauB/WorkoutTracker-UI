import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Card, Row, Col, Input, Button, Space, Select, DatePicker, Spin, Divider } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import { ExerciseSetForm } from './ExerciseSetForm';
import { useExerciseTypes } from '../../exercisetypes/api/getExerciseTypes';

import { useCreateWorkoutNested, CreateWorkoutNestedDTO, WorkoutNested } from '../../data';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

const mapValuesToWorkoutNestedDTO = (values: any) => {
    const workoutNestedDTO = {
        name: values.name,
        date_performed: values.date_performed.format('YYYY-MM-DD'),
        exercises: values.exercises.map((exercise: any) => {
            return {
                date_performed: values.date_performed.format('YYYY-MM-DD'),
                exercise_type: exercise.exercise_type,
                exercise_sets: exercise.exercise_sets.map((exerciseSet: any) => {
                    return {
                        date_performed: values.date_performed.format('YYYY-MM-DD'),
                        reps: exerciseSet.reps,
                        weight: exerciseSet.weight,
                        percentage: exerciseSet.percentage,
                    }
                })
            }
        })
    }

    return workoutNestedDTO;
}

type WorkoutTrackerFormProps = {
    // initial_date?: string;
}

export const WorkoutTrackerForm = (props: WorkoutTrackerFormProps) => {
    const { control } = useForm();
    const params = useParams();
    const { data: exerciseTypes, isLoading: isLoadingExerciseTypes } = useExerciseTypes();
    const navigate = useNavigate();

    const { mutateAsync, isLoading } = useCreateWorkoutNested();

    const handleSubmit = (values: any) => {
        // console.log(values);
        navigate('/app');
    }

    if (isLoadingExerciseTypes) {
        return <Spin />;
    }

    if (!exerciseTypes) {
        return null;
    }

    return (
        <Card
            title="Track your workout"
            //extra={<Button type="primary" onClick={onSubmit}>Submit</Button>}
            style={{
                width: '100%',
                borderRadius: '8px',
            }}
        >
            <Form
                onFinish={async (values: any) => {
                    console.log(mapValuesToWorkoutNestedDTO(values));
                    await mutateAsync({ data: mapValuesToWorkoutNestedDTO(values) });
                    handleSubmit(values);
                }}
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
                    initialValue={params.initial_date ? moment(params.initial_date) : null}
                    rules={[{ required: true, message: "Please enter date performed" }]}
                >
                    <DatePicker />
                </Form.Item>

                <Divider
                    // orientation="left"
                    style={{ color: '#333', fontWeight: 'bold' }}
                >
                    <h2>Exercises</h2>
                </Divider>


                <Form.List name="exercises">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                <Row>
                                    {fields.map((field, index) => (
                                        <Col
                                            // span={8}
                                            xs={24}
                                            sm={24}
                                            md={12}
                                            lg={12}
                                            xl={8}
                                            style={{
                                                padding: '40px',
                                            }}
                                        >
                                            <Card
                                                key={field.key}
                                                title={`Exercise ${index + 1}`}
                                                extra={<MinusCircleOutlined onClick={() => remove([field.name])} />}
                                                style={{
                                                    borderRadius: '10px',
                                                    minHeight: '411px',
                                                }}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "exercise_type"]}
                                                    fieldKey={[field.key, "exercise_type"]}
                                                    rules={[{ required: true, message: "Please enter exercise type" }]}
                                                >
                                                    <Select
                                                        placeholder="Exercise Type"
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
                                                    />
                                                </Form.Item>
                                            </Card>
                                        </Col>
                                    ))}
                                    <Col
                                        xs={24}
                                        sm={24}
                                        md={12}
                                        lg={12}
                                        xl={8}
                                        style={{
                                            padding: '40px',
                                        }}
                                    >
                                        <Card
                                            style={{
                                                borderRadius: '10px',

                                            }}
                                        >
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                style={{
                                                    width: '100%',
                                                    minHeight: '361px',
                                                }}
                                            >
                                                <PlusOutlined /> Add Exercise
                                            </Button>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        )
                    }}
                </Form.List>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            width: '100%',
                            borderRadius: '8px',
                            // make the button light blue
                            //backgroundColor: '#6c63ff',
                            color: '#fff',
                            border: 'none',
                            // marginLeft: '32px',
                            // marginRight: 'auto',
                        }}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
