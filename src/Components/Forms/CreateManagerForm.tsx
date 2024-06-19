import { useForm, SubmitHandler } from "react-hook-form";
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import styles from "../../scss/updateForm.module.scss";
import { CreateManager } from "../../types/Emloyees";
import { useCreateHrManagerMutation, useCreateProjectManagerMutation } from "../../services/ManagerService";
import { UserType } from "../../types/User";

interface FormModel {
    manager: CreateManager
    role: UserType
}

const CreateManagerForm: React.FC = () => {
    const { handleSubmit, register, setValue } = useForm<FormModel>();
    const [createProjectManager] = useCreateProjectManagerMutation();
    const [createHrManager] = useCreateHrManagerMutation();

    const onSubmit: SubmitHandler<FormModel> = async (data: FormModel) => {
        try {
            if (data.role === UserType.HrManager) {
                await createHrManager(data.manager).unwrap()
            }
            if (data.role === UserType.ProjectManager) {
                await createProjectManager(data.manager).unwrap()
            }

            console.log("User created successfully");
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

    return (
        <div className={styles.container}>
            <Paper elevation={4} classes={{ root: styles.root }}>
                <Typography sx={{ marginBottom: "20px" }} classes={{ root: styles.title }} variant='h5'>
                    Create manager
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                {...register('manager.login')}
                                className={styles.field}
                                label="Login"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register('manager.password')}
                                className={styles.field}
                                label="Password"
                                type="password"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register('manager.fullName')}
                                className={styles.field}
                                label="Full Name"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    {...register('role')}
                                    label="Role"
                                    className={styles.field}
                                    fullWidth
                                >
                                    <MenuItem value={UserType.HrManager}>Hr manager</MenuItem>
                                    <MenuItem value={UserType.ProjectManager}>Project manager</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" size="large" variant="contained" fullWidth>
                                Create manager
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
};
export default CreateManagerForm;
