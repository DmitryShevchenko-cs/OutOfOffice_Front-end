import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../../../scss/updateForm.module.scss";
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useCreateProjectMutation } from "../../../services/ProjectService";
import { CreateProject } from "../../../types/Project";
import { useGetProjectTypeQuery } from "../../../services/GetSelectionService";


const CreateLeaveRequestForm: React.FC = () => {
    const { data: types, isLoading: isLoadingTypes } = useGetProjectTypeQuery(null);
    const [createProject] = useCreateProjectMutation();

    const { handleSubmit, register, setValue, formState: { errors } } = useForm<CreateProject>();


    const onSubmit: SubmitHandler<CreateProject> = async (data: CreateProject) => {
        try {
            await createProject(data).unwrap();
            console.log(data);
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };
    
    if (isLoadingTypes) {
        return <div>Loading...</div>;
    }
    return (
        <div className={styles.container}>
            <Paper elevation={4} classes={{ root: styles.root }}>
                <Typography sx={{ marginBottom: '20px' }} classes={{ root: styles.title }} variant='h5'>
                    Create Project
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={!!errors.projectTypeId}>
                                <InputLabel>Project Type</InputLabel>
                                <Select
                                    {...register('projectTypeId', { required: 'Project Type is required' })}
                                    label="Project Type"
                                    className={styles.field}
                                    fullWidth
                                    onChange={(e) => {
                                        setValue('projectTypeId', e.target.value as number);
                                    }}
                                >
                                    {types && types.map((type) => (
                                        <MenuItem key={type.id} value={type.id}>
                                            {type.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Typography variant="caption" color="error">{errors.projectTypeId && errors.projectTypeId.message}</Typography>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register('startDate', { required: 'Start Date is required' })}
                                className={styles.field}
                                label="Start Date"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.startDate}
                                helperText={errors.startDate && errors.startDate.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register('endDate', { required: 'End Date is required' })}
                                className={styles.field}
                                label="End Date"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.endDate}
                                helperText={errors.endDate && errors.endDate.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register('comment')}
                                className={styles.field}
                                label="Comment"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    {...register('status')}
                                    label="Status"
                                    className={styles.field}
                                    fullWidth
                                >
                                    <MenuItem value="true">Active</MenuItem>
                                    <MenuItem value="false">Inactive</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" size="large" variant="contained" fullWidth>
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
};
export default CreateLeaveRequestForm;