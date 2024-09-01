import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import {
  AddPhotoAlternate as AddPhotoIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SuccessModal from "./SuccessModal";

const schema = yup
  .object({
    images: yup
      .array()
      .of(
        yup.object({
          name: yup.string().trim().required("Name is required"),
          relation: yup.string().trim().required("Relation is required"),
        })
      )
      .min(1, "At least one image must be added")
      .required("Images are required"),
  })
  .required();

export default function ImageUploaderForm() {
  const [open, setOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const { control, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      images: [],
    },
    resolver: yupResolver(schema),
  });

  const images = watch("images");

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: "",
      relation: "",
    }));

    setImageFiles((prevFiles) => [...prevFiles, ...newImages]);
    setValue("images", [...images, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImageFiles(updatedImages);
    setValue("images", updatedImages);
  };

  const onSubmit = (data) => {
    handleClickOpen();
    setImageFiles([]);
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
        Add Images and Details
      </Typography>

      <input
        accept="image/*"
        style={{ display: "none" }}
        id="image-upload"
        type="file"
        multiple
        capture="environment" // Prompt to use camera
        onChange={handleImageChange}
      />
      <label htmlFor="image-upload">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<AddPhotoIcon />}
        >
          Upload Images
        </Button>
      </label>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        {imageFiles.map((image, index) => (
          <Card
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <CardMedia
              component="img"
              sx={{ width: 100, height: 100, objectFit: "cover" }}
              image={image.url}
              alt={`Uploaded preview ${index}`}
            />
            <CardContent>
              <Controller
                name={`images.${index}.name`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Name"
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : ""
                    }
                  />
                )}
              />
              <Controller
                name={`images.${index}.relation`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Relation"
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : ""
                    }
                  />
                )}
              />
            </CardContent>
            <CardActions>
              <IconButton
                onClick={() => handleRemoveImage(index)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Box>
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
