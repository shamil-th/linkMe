import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SuccessModal from "./SuccessModal";

const validationSchema = yup.object({
  doctor: yup.string().trim().required("Doctor is required"),
  hospital: yup.string().trim().required("Hospital is required"),
  relative: yup.string().trim().required("Relative is required"),
  admin: yup.string().trim().required("Admin is required"),
});

export default function ContactForm() {
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    handleClickOpen();
    reset();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1 }}
    >
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>

      <Controller
        name="doctor"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Doctor"
            error={!!errors.doctor}
            helperText={errors.doctor ? errors.doctor.message : ""}
            {...field}
          />
        )}
      />

      <Controller
        name="hospital"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Hospital"
            error={!!errors.hospital}
            helperText={errors.hospital ? errors.hospital.message : ""}
            {...field}
          />
        )}
      />

      <Controller
        name="relative"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Relative"
            error={!!errors.relative}
            helperText={errors.relative ? errors.relative.message : ""}
            {...field}
          />
        )}
      />

      <Controller
        name="admin"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Admin"
            error={!!errors.admin}
            helperText={errors.admin ? errors.admin.message : ""}
            {...field}
          />
        )}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
      <SuccessModal open={open} setOpen={setOpen} />
    </Box>
  );
}
