import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateEmployeeMutation } from "../../../services/EmployeeService";
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import styles from "../../../scss/updateForm.module.scss";
import { CreateEmployee } from "../../../types/Emloyees";
import { useGetPositionsQuery, useGetSubdivisionsQuery } from "../../../services/GetSelectionService";

const CreateUserForm: React.FC = () => {
  const { handleSubmit, register, setValue } = useForm<CreateEmployee>();
  const [createUser] = useCreateEmployeeMutation(); 
  const { data: subdivisions, isLoading: isLoadingsubdivisions } = useGetSubdivisionsQuery(null);
  const { data: positions, isLoading: isLoadingpositions } = useGetPositionsQuery(null);

  const onSubmit: SubmitHandler<CreateEmployee> = async (data: CreateEmployee) => {
    try {
      await createUser(data).unwrap();
      console.log("User created successfully");
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  if (isLoadingsubdivisions || isLoadingpositions) {
    return <div>Loading...</div>;
}

  return (
    <div className={styles.container}>
      <Paper elevation={4} classes={{ root: styles.root }}>
        <Typography sx={{ marginBottom: "20px" }} classes={{ root: styles.title }} variant='h5'>
          Create employee
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register('login')}
                className={styles.field}
                label="Login"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('password')}
                className={styles.field}
                label="Password"
                type="password"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('fullName')}
                className={styles.field}
                label="Full Name"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Subdivision</InputLabel>
                <Select
                  {...register('subdivisionId')}
                  className={styles.field}
                  label="Subdivision ID"
                  type="number"
                  fullWidth
                  required
                  onChange={(e) => {
                    setValue('subdivisionId', e.target.value as number);
                  }}
                >
                  {subdivisions && subdivisions.map((subdivision) => (
                    <MenuItem key={subdivision.id} value={subdivision.id}>
                      {subdivision.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Position</InputLabel>
                <Select
                  {...register('positionId')}
                  className={styles.field}
                  label="Position ID"
                  type="number"
                  fullWidth
                  required
                  onChange={(e) => {
                    setValue('positionId', e.target.value as number);
                  }}
                >
                  {positions && positions.map((position) => (
                    <MenuItem key={position.id} value={position.id}>
                      {position.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  {...register('status')}
                  className={styles.field}
                  label="Status"
                  fullWidth
                >
                   <MenuItem value="true">Active</MenuItem>
                   <MenuItem value="false">Inactive</MenuItem>
                </Select>
              </FormControl> 
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('outOfOfficeBalance')}
                className={styles.field}
                label="Out of Office Balance"
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" size="large" variant="contained" fullWidth>
              Create employee
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};
export default CreateUserForm;
