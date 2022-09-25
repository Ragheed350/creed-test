import * as Yup from "yup";
import { useState } from "react";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Stack, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../components/Iconify";
import { FormProvider, RHFTextField } from "../../components/hook-form";
import { useAppDispatch, useAppSelector } from "../../core/hooks";
import { LoginAsync } from "../../core/redux/auth";
import { Login_Req } from "../../core/models/auth";
import { toast } from "../../utils/helpers/ToastConfigurator";

//.....

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.Auth);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Email must be a valid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "hello@hello.com",
    password: "hello1234",
  };

  const methods = useForm<Login_Req>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = async (data: Login_Req) => {
    if (JSON.stringify(data) !== JSON.stringify(defaultValues)) toast.error("Email or password is wrong");
    try {
      dispatch(LoginAsync(data));
    } catch (error: any) {
      toast.error(error.message);
      reset();
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* {!!errors && <Alert severity="error">{errors.email?.message + "&" + errors.password?.message}</Alert>} */}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={status === "loading"} sx={{ my: 1 }}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
