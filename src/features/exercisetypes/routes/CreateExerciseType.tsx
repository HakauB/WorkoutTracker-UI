import { CreateExerciseTypeForm } from "../components/CreateExerciseTypeForm";
import { useNavigate } from "react-router-dom";

export const CreateExerciseType = () => {
    const navigate = useNavigate();

    return (
        <CreateExerciseTypeForm onSubmit={() => navigate('..')} />
    );
}