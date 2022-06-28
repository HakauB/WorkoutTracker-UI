import { Card, DatePicker, Divider, Select, Spin } from "antd";
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { Line } from "react-chartjs-2";
import { ExerciseType } from '../../exercisetypes';
import { useState } from "react";
import { useExerciseTypes } from "../../exercisetypes/api/getExerciseTypes";
import { useExerciseSetsForExerciseType } from "../../data/api/exercisesets/getExerciseSetsForExerciseType";
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

export const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Exercise Type Chart',
        }
    }
}

type ResponsiveLineChartProps = {
    exerciseType: ExerciseType;
    startDate: string;
    endDate: string;
    calculation: string;
}

const ResponsiveLineChart = (props: ResponsiveLineChartProps) => {
    // const { data: exerciseSets, isLoading: isLoadingExerciseSets } = useExerciseSetsForExerciseType({ exerciseTypeId: props.exerciseType.id });

    const { data: exerciseSets, isLoading: isLoadingExerciseSets } = useExerciseSetsWithParams(
        { exercise_type: [props.exerciseType.id], start_date: props.startDate, end_date: props.endDate }
    )

    if (isLoadingExerciseSets) {
        return <Spin />;
    }

    if (!exerciseSets) {
        return null;
    }

    const getDayDates = (startDate: string, endDate: string) => {
        const startDateMoment = startDate !== '' ? moment(startDate) : moment(exerciseSets[0].date_performed);
        const endDateMoment = endDate !== '' ? moment(endDate) : moment(exerciseSets[exerciseSets.length - 1].date_performed);
        const dayDates = [];
        while (startDateMoment.isSameOrBefore(endDateMoment)) {
            dayDates.push(startDateMoment.format('YYYY-MM-DD'));
            startDateMoment.add(1, 'days');
        }
        return dayDates;
    }

    // console.log(exerciseSets);
    const dayDates = getDayDates(props.startDate, props.endDate);

    const data = {
        labels: dayDates,
        // datasets: [
        //     {
        //         label: props.exerciseType.name,
        //         data: exerciseSets.map(exerciseSet => {
        //             if (props.calculation === 'average') {
        //                 return exerciseSet.average_weight;
        //             }
        //         }),
        //         backgroundColor: 'rgba(255, 99, 132, 0.2)',
        //         borderColor: 'rgba(255, 99, 132, 1)',
        //     }
        // ]
        datasets: [
            {
                label: props.exerciseType.name,
                data: dayDates.map(dayDate => {
                    const currExerciseSets = exerciseSets.filter(exerciseSet => exerciseSet.date_performed === dayDate && exerciseSet.exercise_type === props.exerciseType.id);
                    if (props.calculation === 'average') {
                        const averageWeight = currExerciseSets.reduce((acc, curr) => {
                            return acc + curr.weight;
                        }, 0) / currExerciseSets.length;
                        return averageWeight;
                    }
                    else if (props.calculation === 'sum') {
                        const sumWeight = currExerciseSets.reduce((acc, curr) => {
                            return acc + curr.weight;
                        }, 0);
                        return sumWeight;
                    }
                    else {
                        return currExerciseSets.reduce((acc, exerciseSet) => Math.max(acc, exerciseSet.weight), 0);
                    }
                })
            }
        ]
    }

    console.log(data);

    return (
        <Line
            style={{
                height: '100%',
            }}
            data={data}
            options={lineChartOptions}
        />
    );
}

type LineChartCardProps = {

}

export const LineChartCard = (props: LineChartCardProps) => {
    const [exerciseType, setExerciseType] = useState<ExerciseType | null>(null);
    const [ startDate, setStartDate ] = useState<string>("");
    const [ endDate, setEndDate ] = useState<string>("");
    const [ calculation, setCalculation ] = useState<string>("max");
    const { data: exerciseTypes, isLoading: isLoadingExerciseTypes } = useExerciseTypes();

    if (isLoadingExerciseTypes) {
        return <Spin />;
    }

    if (!exerciseTypes) {
        return null;
    }

    return (
        <Card
            title="Line Chart"
            style={{
                minHeight: '200px',
                borderRadius: '8px',
            }}
        >
            <Select
                placeholder="Select an exercise type"
                onChange={(value: string) => {
                    const et = exerciseTypes.find((exerciseType: ExerciseType) => exerciseType.id === value);
                    setExerciseType(et!);
                }}
            >
                {exerciseTypes.map((exerciseType: ExerciseType) => (
                    <Select.Option key={exerciseType.id} value={exerciseType.id}>
                        {exerciseType.name}
                    </Select.Option>
                ))}
            </Select>

            <DatePicker
                placeholder="Start Date"
                onChange={(date, dateString) => {
                    setStartDate((moment(dateString).format('YYYY-MM-DD')));
                }}
            />

            <DatePicker
                placeholder="End Date"
                onChange={(date, dateString) => {
                    setEndDate(moment(dateString).format('YYYY-MM-DD'));
                }}
            />

            <Select
                placeholder="Calculation"
                onChange={(value) => {
                    setCalculation(value);
                }}
            >
                <Select.Option value="sum">Sum</Select.Option>
                <Select.Option value="average">Average</Select.Option>
                <Select.Option value="max">Max</Select.Option>
            </Select>

            <Divider />


            {/* {exerciseType && <ResponsiveLineChart exerciseType={exerciseType} />} */}

            { exerciseType && <ResponsiveLineChart exerciseType={exerciseType!} startDate={startDate} endDate={endDate} calculation={calculation} /> }
        </Card>
    )
}