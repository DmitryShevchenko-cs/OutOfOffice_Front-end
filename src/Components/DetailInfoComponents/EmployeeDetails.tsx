import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { useGetEmployeeQuery } from "../../services/EmployeeService";
import { Link } from "react-router-dom";


interface Props {
  id: string;
}

const LeaveRequestDetails: React.FC<Props> = ({ id }) => {

  const { data: employee, isLoading } = useGetEmployeeQuery(Number(id));
  if (!employee) {
    return <div>Employee data not found</div>;
  }

  if(isLoading)
    return<div>Loading...</div>
  
  return (
    <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
      <Typography variant="h5" gutterBottom>
        <strong>Employee Details - ID: {employee?.id}</strong>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Employee:</strong> {employee.fullName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Subdivision:</strong> {employee.subdivision.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Position:</strong> {employee.position.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Status:</strong> {employee.status ? "Active" : "Inactive"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>{"Out Of Office Balance:"}</strong> {employee.outOfOfficeBalance}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Hr manager:</strong> {employee.hrManager?.fullName}
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          {employee.projects && employee.projects.length > 0 ? (
            employee.projects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      component={Link}
                      to={`/project/${project.id}`}
                      style={{ color: 'inherit' }}
                    >
                      {project.projectType.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Manager: {project.projectManager.fullName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Start Date: {new Date(project.startDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      End Date: {new Date(project.endDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Comment: {project.comment}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Status: {project.status ? "Active" : "Inactive"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body2" style={{ marginTop: '16px' }}>
              No Projects assigned to this Employee.
            </Typography>
          )}
  </Grid>
      </Grid>
    </Paper>
  );
};

export default LeaveRequestDetails;