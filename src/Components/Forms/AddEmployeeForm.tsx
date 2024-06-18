import { Button, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { useGetAllEmployeesQuery } from "../../services/EmployeeService";
import { useAddEmployeesMutation, useGetProjectQuery } from "../../services/ProjectService";
import { Employee } from "../../types/Emloyees";
import { AddEmployees } from "../../types/Project";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

interface Props {
    id: string;
}

const AddEmployeesForm: React.FC<Props> = ({ id }) =>{

    const {data: project, isLoading:isLoadingProject} = useGetProjectQuery(Number(id));
    const {data: employees, isLoading:isLoadingEmployees} = useGetAllEmployeesQuery(null);
    const [updateProject] = useAddEmployeesMutation();

    const { handleSubmit, setValue, watch, reset } = useForm<AddEmployees>({
        defaultValues: {
            projectId: Number(id),
            employeesIds: project?.employees.map((e: Employee) => e.id) || []
        }
    });

    useEffect(() => {
        if (project) {
            reset({
                projectId: Number(id),
                employeesIds: project.employees.map((e: Employee) => e.id)
            });
        }
    }, [project, reset, id]);

    const employeesIds = watch('employeesIds');

    const handleEmployeeChange = (employeeId: number) => {
        setValue(
            'employeesIds',
            employeesIds.includes(employeeId)
                ? employeesIds.filter(id => id !== employeeId)
                : [...employeesIds, employeeId]
        );
    };

    const onSubmit: SubmitHandler<AddEmployees> = async (data: AddEmployees) => {
        try {
            await updateProject(data).unwrap();
            console.log(data);
        } catch (error) {
            console.error('Failed to update project:', error);
        }
    };

    if (isLoadingProject || isLoadingEmployees) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Typography variant="h4">Edit Employees for Project: {project?.projectType.name}</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    {employees?.map((employee: Employee) => (
                        <FormControlLabel
                            key={employee.id}
                            control={
                                <Checkbox
                                    checked={employeesIds.includes(employee.id)}
                                    onChange={() => handleEmployeeChange(employee.id)}
                                />
                            }
                            label={employee.fullName}
                        />
                    ))}
                </FormGroup>
                <Button variant="contained" color="primary" type="submit">
                    Edit Employees
                </Button>
            </form>
        </div>
    );
}

export default AddEmployeesForm;