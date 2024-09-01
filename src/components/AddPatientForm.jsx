import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SuccessModal from "./SuccessModal";

const validationSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  age: yup
    .number()
    .nullable() 
    .positive("Age must be a positive number")
    .required("Age is required"),
  address: yup.string().trim().required("Address is required"),
  contact: yup
    .string()
    .trim()
    .matches(/^[0-9]+$/, "Contact must be a number")
    .required("Contact is required"),
});

export default function AddPatientForm() {
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      age: null,
      address: "",
      contact: "",
    },
  });

  const onSubmit = (data) => {
    handleClickOpen();
    reset({ name: "", age: null, address: "", contact: "" }); 
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
        Add a new patient
      </Typography>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
            {...field}
          />
        )}
      />
      <Controller
        name="age"
        control={control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Age"
            type="number"
            error={!!errors.age}
            helperText={errors.age ? errors.age.message : ""}
            {...field}
            value={field.value === null ? "" : field.value} // Handle null as an empty string for input
          />
        )}
      />
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Address"
            error={!!errors.address}
            helperText={errors.address ? errors.address.message : ""}
            {...field}
          />
        )}
      />
      <Controller
        name="contact"
        control={control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Contact"
            error={!!errors.contact}
            helperText={errors.contact ? errors.contact.message : ""}
            {...field}
          />
        )}
      />
      <Button type="submit" fullWidth variant="contained" color="primary">
        Add Patient
      </Button>
      <SuccessModal open={open} setOpen={setOpen} />
    </Box>
  );
}
