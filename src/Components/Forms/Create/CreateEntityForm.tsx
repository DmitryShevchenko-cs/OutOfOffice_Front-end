import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { EntityType } from "../../../types/Selection";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../../../scss/updateForm.module.scss";
import { useCreateEntityMutation } from "../../../Hooks/mutatuionMap";

interface FormModel {
    name: string;
    reasonDescription?: string; // Only for AbsenceReason
}

interface CreateEntityFormProps {
    entityType: EntityType;
}

const CreateEntityForm: React.FC<CreateEntityFormProps> = ({ entityType }) => {
    const { handleSubmit, register } = useForm<FormModel>();
    const [createEntity] = useCreateEntityMutation(entityType);

    const onSubmit: SubmitHandler<FormModel> = async (data: FormModel) => {
        try {
            await createEntity(data).unwrap();
            console.log(`${entityType} created successfully`);
        } catch (error) {
            console.error(`Failed to create ${entityType}:`, error);
        }
    };

    const getTitle = () => {
        switch (entityType) {
            case 'Subdivision': return 'Create Subdivision';
            case 'Position': return 'Create Position';
            case 'ProjectType': return 'Create Project Type';
            case 'AbsenceReason': return 'Create Absence Reason';
            default: return 'Create Entity';
        }
    };

    return (
        <div className={styles.container}>
            <Paper elevation={4} classes={{ root: styles.root }}>
                <Typography sx={{ marginBottom: "20px" }} classes={{ root: styles.title }} variant='h5'>
                    {getTitle()}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        {entityType !== 'AbsenceReason' && (
                            <Grid item xs={12}>
                                <TextField
                                    {...register('name')}
                                    className={styles.field}
                                    label="Name"
                                    fullWidth
                                    required
                                />
                            </Grid>
                        )}
                        {entityType === 'AbsenceReason' && (
                            <Grid item xs={12}>
                                <TextField
                                    {...register('reasonDescription')}
                                    className={styles.field}
                                    label="Reason Description"
                                    fullWidth
                                    required
                                />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Button type="submit" size="large" variant="contained" fullWidth>
                                {getTitle()}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
};

export default CreateEntityForm;