import { Card, DatePicker, Divider, Select, Space, Spin } from "antd";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, RadialLinearScale, Filler } from 'chart.js';
import { Radar } from "react-chartjs-2";
import { ExerciseType } from '../../exercisetypes';
import { useState } from "react";
import { useExerciseTypes } from "../../exercisetypes/api/getExerciseTypes";
import moment from "moment";
import { useExerciseSetsWithParams } from "../../data/api/exercisesets/getExerciseSetsWithParams";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
    Tooltip,
    Legend,
)

export const radarChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Exercise Types Chart',
        },
    },
    scales: {
        r: {
            min: 0,
        },
    }
}

type ResponsiveRadarChartProps = {
    exerciseTypes: ExerciseType[];
    startDate: string;
    endDate: string;
    calculation: string;
}

const ResponsiveRadarChart = (props: ResponsiveRadarChartProps) => {
    // const { data: exerciseSets, isLoading: isLoadingExerciseSets } = useExerciseSets();

    const { data: paramExerciseSets, isLoading: isLoadingParamExerciseSets } = useExerciseSetsWithParams({
        exercise_type: props.exerciseTypes.map(
            (exerciseType) => exerciseType.id), start_date: props.startDate, end_date: props.endDate
    });

    if (isLoadingParamExerciseSets) {
        return <Spin />;
    }

    if (!paramExerciseSets) {
        return null;
    }

    if (paramExerciseSets.length === 0) {
        return <h2>No data for these parameters.</h2>
    }

    console.log(paramExerciseSets);

    const data = {
        labels: props.exerciseTypes.map(exerciseType => exerciseType.name),
        datasets: [
            {
                label: 'Exercise Weights',
                data: props.exerciseTypes.map(exerciseType => {
                    const exerciseSets = paramExerciseSets.filter(exerciseSet => exerciseSet.exercise_type === exerciseType.id);
                    if (props.calculation === 'sum') {
                        return exerciseSets.reduce((acc, exerciseSet) => acc + exerciseSet.weight, 0);
                    }
                    else if (props.calculation === 'average') {
                        return exerciseSets.reduce((acc, exerciseSet) => acc + exerciseSet.weight, 0) / exerciseSets.length;
                    }
                    else {
                        return exerciseSets.reduce((acc, exerciseSet) => Math.max(acc, exerciseSet.weight), 0);
                    }
                })
            }
        ]
    }

    return (
        <Radar
            data={data}
            options={radarChartOptions}
            style={{
                maxHeight: 'calc(100vh - 400px)',
            }}
        />
    )
}

type RadarChartCardProps = {

}

export const RadarChartCard = (props: RadarChartCardProps) => {
    const [selectedExerciseTypes, setSelectedExerciseTypes] = useState<ExerciseType[]>([]);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [calculation, setCalculation] = useState<string>("max");

    const { data: exerciseTypes, isLoading: isLoadingExerciseTypes } = useExerciseTypes();

    if (isLoadingExerciseTypes) {
        return <Spin />;
    }

    if (!exerciseTypes) {
        return null;
    }

    const onChange = (value: string[]) => {
        setSelectedExerciseTypes(exerciseTypes.filter(exerciseType => value.includes(exerciseType.id)));
    }

    return (
        <Card
            title="Radar Chart"
            style={{
                minHeight: '200px',
                borderRadius: '8px',
            }}
        >
            <Space
                direction="vertical"
            >
                <Space
                    direction="horizontal"
                >
                    Exercise types: 
                    <Select
                        mode="multiple"
                        placeholder="Select exercise types"
                        onChange={onChange}
                        style={{
                            minWidth: '160px',
                        }}
                    >
                        {exerciseTypes.map((exerciseType: ExerciseType) => (
                            <Select.Option key={exerciseType.id} value={exerciseType.id}>
                                {exerciseType.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Space>

                <Space
                    direction="horizontal"
                >
                    Dates: 
                    <DatePicker
                        placeholder="Start Date"
                        onChange={(date, dateString) => {
                            setStartDate((moment(dateString).format('YYYY-MM-DD')));
                        }}
                    />
                    -
                    <DatePicker
                        placeholder="End Date"
                        onChange={(date, dateString) => {
                            setEndDate(moment(dateString).format('YYYY-MM-DD'));
                        }}
                    />
                </Space>
                <Space
                    direction="horizontal"
                >
                    Calculation: 
                    <Select
                        placeholder="Calculation"
                        onChange={(value) => {
                            setCalculation(value);
                        }}
                        defaultValue={calculation}
                        style={{
                            minWidth: '80px',
                        }}
                    >
                        <Select.Option value="average">Average</Select.Option>
                        <Select.Option value="max">Max</Select.Option>
                        <Select.Option value="sum">Sum</Select.Option>
                    </Select>
                </Space>
            </Space>

            <Divider />

            {/* {startDate !=="" && endDate != "" && selectedExerciseTypes.length > 0 && <ResponsiveRadarChart exerciseTypes={selectedExerciseTypes} startDate={startDate} endDate={endDate} />} */}

            <ResponsiveRadarChart exerciseTypes={selectedExerciseTypes} startDate={startDate} endDate={endDate} calculation={calculation} />

        </Card>
    )
}