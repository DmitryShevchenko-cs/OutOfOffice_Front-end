import { useEffect} from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../../scss/updateForm.module.scss";
import { UpdateManager } from "../../types/Emloyees";
import { useGetDetailsManagerQuery, useUpdateManagerMutation, } from "../../services/ManagerService";

interface Props {
    id: string;
}

const UpdateManagerForm: React.FC<Props> = ({ id }) => {

    const { data: manager, isLoading: isLoadingManager } = useGetDetailsManagerQuery(Number(id));
    const [updateManager] = useUpdateManagerMutation();
    const { handleSubmit, register, reset } = useForm<UpdateManager>();

    console.log(manager)

    useEffect(() => {
        if (manager) {
            reset({
                id: manager.id,
                fullName: manager.fullName,
            });
        }
    }, [manager, reset]);

    const onSubmit: SubmitHandler<UpdateManager> = async (data: UpdateManager) => {
        try {
            console.log(data);
            await updateManager(data).unwrap();
            
        } catch (error) {
            console.error('Failed to update leave request:', error);
        }
    };

    if (isLoadingManager) {
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
export default UpdateManagerForm;