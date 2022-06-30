import { Calendar, momentLocalizer, Navigate } from 'react-big-calendar';
import moment from 'moment';
import { useWorkouts, Workout } from '../../data';
import { Card, Spin } from 'antd';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { WorkoutInfoModal } from './WorkoutInfoModal';
import { useModalStore } from '../../../stores/modals';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigationStore } from '../../../stores/navigation';

const localizer = momentLocalizer(moment);

type WorkoutCalendarProps = {
    // workouts: Workout[];
}

export const WorkoutCalendar = (props: WorkoutCalendarProps) => {
    // const { workouts } = props;
    const navigate = useNavigate();
    const { data: workouts, isLoading } = useWorkouts();
    const { isCalendarWorkoutInfoModalVisible, showCalendarWorkoutInfoModal } = useModalStore();
    const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

    if (isLoading) {
        return <Spin />;
    }

    if (!workouts) {
        return null;
    }

    const events = workouts.map(workout => {
        return {
            title: workout.name,
            start: workout.date_performed,
            end: workout.date_performed,
            allDay: true,
            workout: workout
        }
    });

    return (
        <Card
            style={{
                width: '100%',
                borderRadius: '8px',
            }}
        >
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={(event: any, start: any, end: any, isSelected: any) => {
                    return {
                        style: {
                            backgroundColor: event.workout.color,
                            borderColor: event.workout.color,
                            color: 'white'
                        }
                    }
                }}
                selectable={true}
                onSelectEvent={(event: any) => {
                    setSelectedWorkout(event.workout);
                    showCalendarWorkoutInfoModal();
                }}
                onSelectSlot={(slotInfo: any) => {
                    navigate(`./tracker/${slotInfo.start}`);
                }}
                style={{
                    height: '85vh',
                }}
                views={['month']}
                view="month"
            />
            {selectedWorkout && <WorkoutInfoModal workout={selectedWorkout} />}
        </Card>
    );
}