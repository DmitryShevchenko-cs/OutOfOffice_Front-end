import { useParams } from "react-router-dom";
import ManagerDetails from "../../Components/DetailInfoComponents/ManagerDetails";

const ManagerDetailsPage: React.FC = () => {
    const { id } = useParams<string>(); 

    return (
        <>
            <ManagerDetails id={id!}  />
        </>
    );
};

export default ManagerDetailsPage;