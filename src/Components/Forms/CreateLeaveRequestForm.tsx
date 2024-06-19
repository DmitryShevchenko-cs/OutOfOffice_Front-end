import { useEffect } from "react";
import { useCreateLeaveRequestMutation } from "../../services/LeaveRequestService";
import { CreateLeaveRequest, LeaveRequestStatus } from "../../types/LeaveRequest";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../../scss/updateForm.module.scss";
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useGetApproversQuery } from "../../services/ManagerService";
import { useGetAbsenceReasonQuery } from "../../services/SelectionService";


const CreateLeaveRequestForm: React.FC = () => {
    const { data: approvers, isLoading: isLoadingApprovers } = useGetApproversQuery(null);
    const { data: reasons, isLoading: isLoadingReasons } = useGetAbsenceReasonQuery(null);
    const [createLeaveRequest] = useCreateLeaveRequestMutation();

    const { handleSubmit, register, setValue } = useForm<CreateLeaveRequest>();


    const onSubmit: SubmitHandler<CreateLeaveRequest> = async (data: CreateLeaveRequest) => {
        try {
            await createLeaveRequest(data).unwrap();
            console.log(data);
        } catch (error) {
            console.error('Failed to create leave request:', error);
        }
    };
    
    if (isLoadingApprovers || isLoadingReasons) {
        return <div>Loading...</div>;
    }
    return (
        <div className={styles.container}>
            <Paper elevation={4} classes={{ root: styles.root }}>
                <Typography sx={{ marginBottom: "20px" }} classes={{ root: styles.title }} variant='h5'>
                    Create Leave Request
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Absence reason</InputLabel>
                                <Select
                                    {...register('absenceReasonId')}
                                    label="Absence Reason Id"
                                    className={styles.field}
                                    fullWidth
                                    onChange={(e) => {
                                        setValue('absenceReasonId', e.target.value as number);
                                    }}
                                >
                                    {reasons && reasons.map((reason) => (
                                        <MenuItem key={reason.id} value={reason.id}>
                                            {reason.reasonDescription}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Approver</InputLabel>
                                <Select
                                    {...register('approverId')}
                                    label="Approver"
                                    className={styles.field}
                                    fullWidth
                                    onChange={(e) => {
                                        setValue('approverId', e.target.value as number);
                                    }}
                                >
                                    {approvers && approvers.map((approver) => (
                                        <MenuItem key={approver.id} value={approver.id}>
                                            {approver.fullName} - {approver.role}
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