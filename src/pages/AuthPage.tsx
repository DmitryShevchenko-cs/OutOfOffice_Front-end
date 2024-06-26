import { useNavigate } from "react-router-dom";
import { useActions } from "../Hooks/storeHook";
import { ILoginData } from "../types/User";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../services/authService";
import { IAuthInformation } from "../types/AuthInfo";
import styles from "../scss/authPage.module.scss";
import { Button, Checkbox,  FormHelperText,  Paper, TextField, Typography } from "@mui/material";


const AuthPage = () => {

  const navigate = useNavigate();
  const [authorize] = useLoginMutation();
  const { userLogin } = useActions();

  const { handleSubmit, register, formState: { errors }} = useForm<ILoginData>({
    defaultValues: {
      login: "",
      password: "",
      isNeedToRemember: false,
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ILoginData> = async (dataS: ILoginData) => {
    await authorize(dataS)
      .unwrap()
      .then((payload: IAuthInformation) => {
        userLogin(payload);

        navigate("/");
      })
      .catch((error: string) => {
        console.log(error)
      });
  };

  const loginLabel = "Login";
  const passwordLabel = "Password";
  const rememberMeLabel = "Remember me";
  const loginButtonLabel = "Login";
  const auth = "Auth";

  return (
    <div className={styles.container}>
      <Paper elevation={4} classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant='h5'>
          {auth}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("login", {
              required: "Login is required"
            })}
            className={styles.field}
            label={loginLabel}
            fullWidth
            error={!!errors.login}
            helperText={errors.login && <FormHelperText error>{errors.login.message}</FormHelperText>}
          />

          <TextField
            type='password'
            {...register("password", {
              required: "Password is required"
            })}
            className={styles.field}
            label={passwordLabel}
            fullWidth
            error={!!errors.password}
            helperText={errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
          />

          <div className={styles.isRemember}>
            <Checkbox {...register("isNeedToRemember")} />
            <p>{rememberMeLabel}</p>
          </div>

          <Button
            type='submit'
            size='large'
            variant='contained'
            fullWidth
          >
            {loginButtonLabel}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default AuthPage;
