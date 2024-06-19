import { useEffect} from "react";
import { LeaveRequestStatus, UpdateLeaveRequest } from "../../types/LeaveRequest";
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../../scss/updateForm.module.scss";
import { useGetPositionsQuery, useGetSubdivisionsQuery } from "../../services/SelectionService";
import { useGetEmployeeQuery, useUpdateEmployeeMutation } from "../../services/EmployeeService";
import { UpdateEmployee } from "../../types/Emloyees";
import { useGetHrManagersQuery } from "../../services/ManagerService";

interface Props {
    id: string;
}

const UpdateEmployeeForm: React.FC<Props> = ({ id }) => {

    const { data: employee, isLoading: isLoadingEmployee } = useGetEmployeeQuery(Number(id));
    const { data: subdivisions, isLoading: isLoadingSubdivisions } = useGetSubdivisionsQuery(null);
    const { data: positions, isLoading: isLoadingPositions } = useGetPositionsQuery(null);
    const { data: hrManagers, isLoading: isLoadinghrManagers } = useGetHrManagersQuery(null);
    const [updateEmployee] = useUpdateEmployeeMutation();
    const { handleSubmit, register, reset, setValue } = useForm<UpdateEmployee>();

    console.log(employee)

    useEffect(() => {
        if (employee) {
            reset({
                id: employee.id,
                fullName: employee.fullName,
                subdivisionId: employee.subdivision.id,
                positionId: employee.position.id,
                status: employee.status,
                outOfOfficeBalance: employee.outOfOfficeBalance,
            });
        }
    }, [employee, reset]);

    const onSubmit: SubmitHandler<UpdateEmployee> = async (data: UpdateEmployee) => {
        try {
            console.log(data);
            await updateEmployee(data).unwrap();
            
        } catch (error) {
            console.error('Failed to update leave request:', error);
        }
    };

    if (isLoadingEmployee || isLoadingSubdivisions || isLoadingPositions || isLoadinghrManagers) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <Paper elevation={4} classes={{ root: styles.root }}>
                <Typography sx={{ marginBottom: "20px" }} classes={{ root: styles.title }} variant='h5'>
                    Update Employee
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                            <TextField
                                {...register('login')}
                                className={styles.field}
                                label="Login"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register('password')}
                                className={styles.field}
                                label="Password"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register('fullName')}
                                className={styles.field}
                                label="Full Name"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Hr manager</InputLabel>
                                <Select
                                    {...register('hrManagerId')}
                                    label="HrManager"
                                    className={styles.field}
                                    fullWidth
                                    defaultValue={employee?.hrManager?.id || ""}
                                    onChange={(e) => {
                                        setValue('hrManagerId', e.target.value as number);
                                    }}
                                    required
                                >
                                    {hrManagers && hrManagers.map((hrManager) => (
                                        <MenuItem key={hrManager.id} value={hrManager.id}>
                                            {hrManager.fullName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Subdivision</InputLabel>
                                <Select
                                    {...register('subdivisionId')}
                                    label="Subdivision"
                                    className={styles.field}
                                    fullWidth
                                    defaultValue={employee?.subdivision.id || ""}
                                    onChange={(e) => {
                                        setValue('subdivisionId', e.target.value as number);
                                    }}
                                >
                                    {subdivisions && subdivisions.map((subdivision) => (
                                        <MenuItem key={subdivision.id} value={subdivision.id}>
                                            {subdivision.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Position</InputLabel>
                                <Select
                                    {...register('positionId')}
                                    label="Position"
                                    className={styles.field}
                                    fullWidth
                                    defaultValue={employee?.position.id || ""}
                                    onChange={(e) => {
                                        setValue('positionId', e.target.value as number);
                                    }}
                                >
                                    {positions && positions.map((position) => (
                                        <MenuItem key={position.id} value={position.id}>
                                            {position.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    {...register('status')}
                                    label="Status"
                                    className={styles.field}
                                    fullWidth
                                    defaultValue={employee?.status || false}
                                    onChange={(e) => {
                                        setValue('status', e.target.value as boolean);
                                    }}
                                >
                                     <MenuItem value="true">Active</MenuItem>
                                     <MenuItem value="false">Inactive</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register('outOfOfficeBalance')}
                                className={styles.field}
                                label="Out of Office Balance"
                                fullWidth
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" size="large" variant="contained" fullWidth>
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
};
export default UpdateEmployeeForm;