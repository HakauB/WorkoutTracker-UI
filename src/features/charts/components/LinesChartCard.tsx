// TODO: Clearing start or end date clears data in chart

import { Card, DatePicker, Divider, Select, Space, Spin } from "antd";
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { Line } from "react-chartjs-2";
import { ExerciseType } from '../../exercisetypes';
import { useState } from "react";
import { useExerciseTypes } from "../../exercisetypes/api/getExerciseTypes";
import { useExerciseSetsForExerciseType } from "../../data/api/exercisesets/getExerciseSetsForExerciseType";
import { useExerciseSets } from "../../data/api/exercisesets";
import moment from "moment";
import { useExerciseSetsWithParams } from "../../data/api/exercisesets/getExerciseSetsWithParams";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)

const gapFillLine = (weights: number[]) => {
    if (weights.length < 3) {
        return weights;
    }
    return weights.map((weight, i) => {
        if (weight === 0) {
            return weight;
        }
        if (weights[i + 1] !== 0) {
            return weight;
        }
        let j = i + 1;
        let gaps = 0;
        while (weights[j] === 0) {
            gaps++;
            j++;
        }
        let difference = weights[j] - weights[i];
        let step = difference / (gaps + 1);
        for (let k = i; k <= j; k++) {
            weights[k] = weights[i] + step * (k - i);
        }
        return weight;
    });
}

const linesChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Exercise Types Chart',
        }
    },
    scales: {
        y: {
            min: 0,
        }
    }
}

type ResponsiveLinesChartProps = {
    exerciseTypes: ExerciseType[];
    startDate: string;
    endDate: string;
    calculation: string;
}

const ResponsiveLinesChart = (props: ResponsiveLinesChartProps) => {
    
    const { data: exerciseSets, isLoading: isLoadingExerciseSets } = useExerciseSetsWithParams({
        exercise_type: props.exerciseTypes.map((exerciseType) => exerciseType.id),
        start_date: props.startDate !== '' ? props.startDate : undefined,
        end_date: props.endDate !== '' ? props.endDate : undefined,
    });

    if (isLoadingExerciseSets) {
        return <Spin />;
    }

    if (!exerciseSets) {
        return null;
    }

    if (exerciseSets.length === 0) {
        return <h2>No data for these parameters.</h2>
    }

    const getDayDates = (startDate: string, endDate: string) => {
        const sortedExerciseSets = exerciseSets.sort((a, b) => moment(a.date_performed).diff(moment(b.date_performed)));
        const startDateMoment = startDate !== '' ? moment(startDate) : moment(sortedExerciseSets[0].date_performed);
        const endDateMoment = endDate !== '' ? moment(endDate) : moment(sortedExerciseSets[sortedExerciseSets.length - 1].date_performed);
        const dayDates = [];
        while (startDateMoment.isSameOrBefore(endDateMoment)) {
            dayDates.push(startDateMoment.format('YYYY-MM-DD'));
            startDateMoment.add(1, 'days');
        }
        return dayDates;
    }

    const dayDates = getDayDates(props.startDate, props.endDate);

    const data = {
        labels: dayDates,
        datasets: props.exerciseTypes.map(exerciseType => {
            const weights = dayDates.map(dayDate => {
                const currExerciseSets = exerciseSets.filter(exerciseSet => exerciseSet.date_performed === dayDate && exerciseSet.exercise_type === exerciseType.id);
                if (props.calculation === 'average') {
                    const averageWeight = currExerciseSets.reduce((acc, curr) => {
                        return acc + curr.weight;
                    }, 0) / currExerciseSets.length;
                    if (isNaN(averageWeight)) {
                        return 0;
                    }
                    else {
                        return averageWeight;
                    }
                }
                else if (props.calculation === 'sum') {
                    const sumWeight = currExerciseSets.reduce((acc, curr) => {
                        return acc + curr.weight;
                    }
                        , 0);
                    return sumWeight;
                }
                else {
                    return currExerciseSets.reduce((acc, exerciseSet) => Math.max(acc, exerciseSet.weight), 0);
                }
            });
            const backgroundColorValues = {
                red: Math.floor(Math.random() * 255),
                green: Math.floor(Math.random() * 255),
                blue: Math.floor(Math.random() * 255),
            }
            return {
                label: exerciseType.name,
                data: gapFillLine(weights),
                backgroundColor: `rgba(${backgroundColorValues.red}, ${backgroundColorValues.green}, ${backgroundColorValues.blue}, 0.2)`,
                borderColor: `rgba(${backgroundColorValues.red}, ${backgroundColorValues.green}, ${backgroundColorValues.blue}, 1)`,
            }
        })
    }

    // console.log('data', data);

    return (
        <Line
            data={data}
            options={linesChartOptions}
            style={{
                maxHeight: 'calc(100vh - 400px)',
            }}
        />
    )
}

type LinesChartCardProps = {

}

export const LinesChartCard = (props: LinesChartCardProps) => {
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
        console.log('Selector value', value);
        console.log('Exercise types', exerciseTypes);
        setSelectedExerciseTypes(exerciseTypes.filter(exerciseType => value.includes(exerciseType.id)));
        console.log(exerciseTypes.filter(exerciseType => value.includes(exerciseType.id)))
    }

    return (
        <Card
            title="Lines Chart"
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
                            if (date?.isValid()) {
                                setStartDate((moment(dateString).format('YYYY-MM-DD')));
                            } else {
                                setStartDate("");
                            }
                        }}
                    />
                    -
                    <DatePicker
                        placeholder="End Date"
                        onChange={(date, dateString) => {
                            if (date?.isValid()) {
                                setEndDate((moment(dateString).format('YYYY-MM-DD')));
                            } else {
                                setEndDate("");
                            }
                        }}
                    />
                </Space>
                <Space
                    direction="horizontal"
                >
                    Calculation: 
                    <Select
                        // placeholder="Calculation"
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

            {/* {startDate !=="" && endDate != "" && selectedExerciseTypes.length > 0 && <ResponsiveLinesChart exerciseTypes={selectedExerciseTypes} startDate={startDate} endDate={endDate} />} */}

            <ResponsiveLinesChart exerciseTypes={selectedExerciseTypes} startDate={startDate} endDate={endDate} calculation={calculation} />

        </Card>
    )
}