import * as Yup from "yup";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Stack } from "@mui/material";
import { User } from "../../../core/models";
import { FormProvider, RHFTextField } from "../../../components/hook-form";

// ----------------------------------------------------------------------

type FormValuesProps = User;

type props = {
  isEdit?: boolean;
  user?: User;
  onSubmit: (user: User) => void;
  onCancle: () => void;
};

export const NewEditUserForm: React.FC<props> = ({ isEdit, user, onSubmit, onCancle }) => {
  // const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    username: Yup.string().required("Usnername is required"),
    email: Yup.string().required("Email is required").email(),
    company: Yup.string().required("Company is required"),
  });

  const defaultValues = useMemo(
    () => ({
      userId: user?.userId || "",
      username: user?.username || "",
      email: user?.email || "",
      company: user?.company || "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && user) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, user]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} pt={1}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "grid",
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" },
            }}>
            <RHFTextField name="username" label="User Name" />
            <RHFTextField name="email" label="Email Address" />

            <RHFTextField name="company" label="Company" />
          </Box>

          <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
            <LoadingButton onClick={onCancle} loading={isSubmitting}>
              Cancel
            </LoadingButton>
            <LoadingButton type="submit" loading={isSubmitting}>
              {!isEdit ? "Create" : "Edit"}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
