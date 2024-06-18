import { useEffect } from "react";
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../../scss/updateForm.module.scss";
import { formatDate } from "../../Helpers/FormatDateHelper";
import { useGetProjectManagersQuery } from "../../services/ManagerService";
import { useGetProjectTypeQuery } from "../../services/SelectionService";
import { useGetProjetQuery, useUpdateProjectMutation } from "../../services/ProjectService";
import { UpdateProject } from "../../types/Project";

interface Props {
    id: string;
}

const UpdateLeaveRequestForm: React.FC<Props> = ({ id }) => {

    const { data: project, isLoading: isLoadingProjects } = useGetProjetQuery(Number(id));
    const { data: projectManagers, isLoading: isLoadingManagers } = useGetProjectManagersQuery(null);
    const { data: types, isLoading: isLoadingTypes } = useGetProjectTypeQuery(null);

    const [updateProject] = useUpdateProjectMutation();
    const { handleSubmit, register, reset, setValue } = useForm<UpdateProject>();

    useEffect(() => {
        if (project) {
            reset({
                id: project.id,
                projectManagerId: project.projectManager?.id ?? 0,
                projectTypeId: project.projectType?.id ?? 0,
                startDate: formatDate(project.startDate),
                endDate: formatDate(project.endDate),
                comment: project.comment || '',
                status: project.status,
            });
        }
    }, [project, reset]);

    const onSubmit: SubmitHandler<UpdateProject> = async (data: UpdateProject) => {
        try {
            await updateProject(data).unwrap();
            console.log(data);
        } catch (error) {
            console.error('Failed to update project detail:', error);
        }
    };

    if (isLoadingProjects || isLoadingManagers || isLoadingTypes) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <Paper elevation={4} classes={{ root: styles.root }}>
                <Typography sx={{ marginBottom: "20px" }} classes={{ root: styles.title }} variant='h5'>
                    Update Project Detail
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Project Manager</InputLabel>
                                <Select
                                    {...register('projectManagerId')}
                                    label="Project Manager"
                                    className={styles.field}
                                    fullWidth
                                    defaultValue={project?.projectManager?.id || ""}
                                    onChange={(e) => {
                                        setValue('projectManagerId', e.target.value as number);
                                    }}
                                >
                                    {projectManagers && projectManagers.map((manager) => (
                                        <MenuItem key={manager.id} value={manager.id}>
                                            {manager.fullName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Project Type</InputLabel>
                                <Select
                                    {...register('projectTypeId')}
                                    label="Project Type"
                                    className={styles.field}
                                    fullWidth
                                    defaultValue={project?.projectType?.id || ""}
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
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register('startDate')}
                                className={styles.field}
                                label="Start Date"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register('endDate')}
                                className={styles.field}
                                label="End Date"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
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
                                    defaultValue={project?.status ? "true" : "false"}
                                    onChange={(e) => {
                                        setValue('status', e.target.value === "true");
                                    }}
                                >
                                    <MenuItem value="true">Active</MenuItem>
                                    <MenuItem value="false">Inactive</MenuItem>
                                </Select>
                            </FormControl>
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
export default UpdateLeaveRequestForm;