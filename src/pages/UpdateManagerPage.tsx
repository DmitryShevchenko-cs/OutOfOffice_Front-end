import { useParams } from "react-router-dom";
import UpdateManagerForm from "../Components/Forms/UpdateManagerForm";

const UpdateManagerPage: React.FC = () => {
    const { id } = useParams<string>();

    return (
        <>
            <UpdateManagerForm id={id!}  />
        </>
    );
};

export default UpdateManagerPage;