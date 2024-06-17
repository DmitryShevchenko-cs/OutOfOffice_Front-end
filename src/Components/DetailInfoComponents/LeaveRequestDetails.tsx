import { Grid, Paper, Typography } from "@mui/material";
import { useGetLeaveRequestQuery } from "../../services/LeaveRequestService";


interface Props {
  id: string;
}

const LeaveRequestDetails: React.FC<Props> = ({ id }) => {

  const { data: request, isLoading } = useGetLeaveRequestQuery(Number(id));
  
  return (
    <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
      <Typography variant="h5" gutterBottom>
        <strong>Leave Request Details - ID: {request?.id}</strong>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Employee:</strong> {request?.employee.fullName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Absence Reason:</strong> {request?.absenceReason.reasonDescription}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Start Date:</strong> {new Date(request!.startDate).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>End Date:</strong> {new Date(request!.endDate).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Status:</strong> {request?.status}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Comment:</strong> {request?.comment}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LeaveRequestDetails;