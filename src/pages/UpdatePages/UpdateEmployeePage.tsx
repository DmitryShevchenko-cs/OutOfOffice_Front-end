import { useParams } from "react-router-dom";
import UpdateEmployeeForm from "../../Components/Forms/Update/UpdateEmployeeForm";

const UpdateEmployeePage: React.FC = () => {
    const { id } = useParams<string>(); 

    return (
        <>
            <UpdateEmployeeForm id={id!}  />
        </>
    );
};

export default UpdateEmployeePage;