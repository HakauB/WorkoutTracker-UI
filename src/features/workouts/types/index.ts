import { BaseEntity } from "../../../types";
import { ExerciseType } from "../../exercisetypes";

export type Workout = {
    name: string;
    date_performed: string;
} & BaseEntity;

export type Exercise = {
    date_performed: string;
    exercise_type: string;
    workout: string;
} & BaseEntity;

export type ExerciseSet = {
    date_performed: string;
    exercise_type: string;
    exercise: string;
    reps: number;
    weight: number;
    percentage?: number;
} & BaseEntity;
