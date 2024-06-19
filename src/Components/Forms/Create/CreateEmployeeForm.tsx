import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateEmployeeMutation } from "../../../services/EmployeeService";
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import styles from "../../../scss/updateForm.module.scss";
import { CreateEmployee } from "../../../types/Emloyees";
import { useGetPositionsQuery, useGetSubdivisionsQuery } from "../../../services/GetSelectionService";

const CreateUserForm: React.FC = () => {
  const { handleSubmit, register, setValue, formState: { errors }  } = useForm<CreateEmployee>();
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
              {...register('login', { required: 'Login is required' })}
              className={styles.field}
              label="Login"
              fullWidth
              error={Boolean(errors.login)}
              helperText={errors.login?.message}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters long' } })}
              className={styles.field}
              label="Password"
              type="password"
              fullWidth
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('fullName', { required: 'Full Name is required' })}
              className={styles.field}
              label="Full Name"
              fullWidth
              error={Boolean(errors.fullName)}
              helperText={errors.fullName?.message}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={Boolean(errors.subdivisionId)}>
              <InputLabel>Subdivision</InputLabel>
              <Select
                {...register('subdivisionId', { required: 'Subdivision is required' })}
                className={styles.field}
                label="Subdivision ID"
                type="number"
                fullWidth
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
              {errors.subdivisionId && <Typography variant="caption" color="error">{errors.subdivisionId.message}</Typography>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={Boolean(errors.positionId)}>
              <InputLabel>Position</InputLabel>
              <Select
                {...register('positionId', { required: 'Position is required' })}
                className={styles.field}
                label="Position ID"
                type="number"
                fullWidth
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
              {errors.positionId && <Typography variant="caption" color="error">{errors.positionId.message}</Typography>}
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
              {...register('outOfOfficeBalance', { required: 'Out of Office Balance is required' })}
              className={styles.field}
              label="Out of Office Balance"
              type="number"
              fullWidth
              error={Boolean(errors.outOfOfficeBalance)}
              helperText={errors.outOfOfficeBalance?.message}
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
