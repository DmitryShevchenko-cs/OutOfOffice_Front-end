import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useActions } from "../Hooks/storeHook";
import { ILoginData } from "../types/User";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../services/authService";
import { IAuthInformation } from "../types/AuthInfo";
import styles from "../scss/authPage.module.scss";
import { Alert, Button, Checkbox, CircularProgress, Paper, TextField, Typography } from "@mui/material";

const AuthPage = () => {
    const [isLoginError, setIsLoginError] = useState(false);
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();
    const { userLogin } = useActions();
  
    const {
      register,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm<ILoginData>({
      defaultValues: {
        login: "",
        password: "",
        isNeedToRemember: false,
      }, 
      mode: "onChange",
    });
  
    const [login, { isLoading }] = useLoginMutation();
  
    const onSubmit: SubmitHandler<ILoginData> = async (dataS: ILoginData) => {
      setIsLoginError(false);
  
      await login(dataS)
        .unwrap()
        .then((payload : IAuthInformation) => {
          userLogin(payload);
          
          navigate("/");
        })
        .catch((error) => {
          if (error.status === 400) {
            setIsLoginError(true);
            setLoginError(error.data.Error);
          }
        });
    };
  
    const loginLabel = "Login";
    const passwordLabel = "Password";
    const rememberMeLabel = "Remember me";
    const loginButtonLabel = "Login";
    const auth = "Auth";
  
    const requiredLoginLabel = "Set login";
    const requiredPasswordLabel = "Set password";

    return (
      <div className={styles.container}>
        {isLoading ? (
          <CircularProgress classes={{ root: styles.progress }} />
        ) : (
          <Paper elevation={4} classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant='h5'>
              {auth}
            </Typography>
  
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                error={Boolean(errors.login?.message)}
                helperText={errors.login?.message}
                {...register("login", { required: requiredLoginLabel })}
                className={styles.field}
                label = {loginLabel}
                fullWidth
              />
  
              <TextField
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                type='password'
                {...register("password", { required: requiredPasswordLabel })}
                className={styles.field}
                label={passwordLabel}
                fullWidth
              />
              <div className={styles.isRemember}>
                <Checkbox {...register("isNeedToRemember")} />
                <p>{rememberMeLabel}</p>
              </div>
              <Button
                disabled={!isValid}
                type='submit'
                size='large'
                variant='contained'
                fullWidth
              >
                {loginButtonLabel}
              </Button>
            </form>
            {isLoginError && (
              <Alert severity='error' onClose={() => setIsLoginError(false)}>
                {loginError}
              </Alert>
            )}
          </Paper>
        )}
      </div>
    );
  };
  
  export default AuthPage;
  