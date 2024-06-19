import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetDetailsManagerQuery } from "../../services/ManagerService";


interface Props {
  id: string;
}

const ManagerDetails: React.FC<Props> = ({ id }) => {

  const { data: manager, isLoading } = useGetDetailsManagerQuery(Number(id));
  if (!manager) {
    return <div>Manager data not found</div>;
  }

  if(isLoading)
    return<div>Loading...</div>
  
  return (
    <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
      <Typography variant="h5" gutterBottom>
        <strong>Manager Details - ID: {manager?.id}</strong>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Full name:</strong> {manager.fullName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <strong>Role:</strong> {manager.role}
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          {manager.partners && manager.partners.length > 0 ? (
            manager.partners.map((partner) => (
              <Grid item xs={12} sm={6} md={4} key={partner.id}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      component={Link}
                      to={`/project/${partner.id}`}
                      style={{ color: 'inherit' }}
                    >
                      {partner.fullName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Position: {partner.position.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Status: {partner.status ? "Active" : "Inactive"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Out Of Office balence: {partner.outOfOfficeBalance}
                    </Typography>
                    
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : ( null )}
        </Grid>
        <Grid container spacing={2}>
          {manager.projects && manager.projects.length > 0 ? (
            manager.projects.map((project) => (
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
          ) : ( null )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ManagerDetails;