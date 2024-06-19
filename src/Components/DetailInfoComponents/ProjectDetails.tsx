import { Grid, Paper, Typography } from "@mui/material";
import { useGetProjectQuery } from "../../services/ProjectService";


interface Props {
  id: string;
}

const ProjectDetails: React.FC<Props> = ({ id }) => {

  const { data: projects, isLoading } = useGetProjectQuery(Number(id));

  console.log(projects?.employees)
  console.log(projects)

  if (!projects) {
    return <div>Project data not found</div>;
  }
  if (isLoading)
    return <div>Loading...</div>
  return (
    <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
      <Typography variant="h5" gutterBottom>
        <strong>Project Details - ID: {projects.id}</strong>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Project manager:</strong> {projects.projectManager.fullName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Project type:</strong> {projects.projectType.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Start Date:</strong> {new Date(projects.startDate).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>End Date:</strong> {new Date(projects.endDate).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Status:</strong> {projects.status ? "Active" : "Inactive"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Comment:</strong> {projects.comment}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Employees:</strong>
          </Typography>
          {projects.employees && projects.employees.length > 0 ? (
            <ul>
              {projects.employees.map((employee) => (
                <li key={employee.id}>{employee.fullName} - {employee.status ? "Active" : "Inactive"}</li>
              ))}
            </ul>
          ) : (
            <Typography variant="body2">No employees assigned to this project.</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProjectDetails;