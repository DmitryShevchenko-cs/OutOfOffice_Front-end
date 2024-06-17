import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { LeaveRequestStatus, UpdateLeaveRequest } from "../../types/LeaveRequest";
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useGetLeaveRequestQuery } from "../../services/LeaveRequestService";
import styles from "../../scss/updateForm.module.scss";
import { formatDate } from "../../Helpers/FormatDateHelper";
import { useGetApproversQuery } from "../../services/ManagerService";

interface Props {
    id: string;
}



const UpdateLeaveRequestForm: React.FC<Props> = ({ id }) => {

    const { data: leaveRequest, isLoading: isLoadingRequests } = useGetLeaveRequestQuery(Number(id));
    const { data: approvers, isLoading: isLoadingApprovers } = useGetApproversQuery(null);

    console.log(leaveRequest);
    console.log(approvers);

    const { handleSubmit, register, reset, setValue } = useForm<UpdateLeaveRequest>();

    useEffect(() => {
        if (leaveRequest) {
            reset({
                id: leaveRequest.id,
                absenceReasonId: leaveRequest.absenceReason.id,
                approverId: leaveRequest.approvalRequest.id,
                startDate: formatDate(leaveRequest.startDate),
                endDate: formatDate(leaveRequest.endDate),
                status: leaveRequest.status,
                comment: leaveRequest.comment || '',
            });
        }
    }, [leaveRequest, reset]);

    const onSubmit: SubmitHandler<UpdateLeaveRequest> = async (data: UpdateLeaveRequest) => {
        // Handle form submission
        console.log(data);
    };

    if (isLoadingRequests && isLoadingApprovers) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <Paper elevation={4} classes={{ root: styles.root }}>
                <Typography sx={{marginBottom:"20px"}} classes={{ root: styles.title }} variant='h5'>
                    Update Leave Request
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container  spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                {...register('absenceReasonId')}
                                className={styles.field}
                                label="Absence Reason Id"
                                type="number"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Approver</InputLabel>
                                <Select
                                    {...register('approverId')}
                                    label="Approver"
                                    className={styles.field}
                                    fullWidth
                                    defaultValue={leaveRequest?.approvalRequest.id || ""}
                                    onChange={(e) => {
                                        setValue('approverId', e.target.value as number);
                                    }}
                                >
                                    {approvers!.map((approver) => (
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
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    {...register('status')}
                                    label="Status"
                                    className={styles.field}
                                    fullWidth
                                    defaultValue={leaveRequest?.status || ""}
                                    onChange={(e) => {
                                        setValue('status', e.target.value as LeaveRequestStatus);
                                    }}
                                >
                                    {Object.values(LeaveRequestStatus).map((status) => (
                                        <MenuItem key={status} value={status}>
                                            {status}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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