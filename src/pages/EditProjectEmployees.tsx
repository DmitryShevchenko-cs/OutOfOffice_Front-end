import { useParams } from "react-router-dom";
import AddEmployeesForm from "../Components/Forms/AddEmployeeForm";

const EditProjectEmployees: React.FC = () => {
    const { id } = useParams<string>(); // Получаем id из параметров маршрута

    return (
        <>
            <AddEmployeesForm id={id!}  />
        </>
    );
};

export default EditProjectEmployees;