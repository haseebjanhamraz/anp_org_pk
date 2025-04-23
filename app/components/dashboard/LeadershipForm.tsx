"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import {
  TextField,
  Button,
  Paper,
  Stack,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import {
  positions,
  provinces,
  cabinets,
  cabinetPeriod,
  kpDistricts,
} from "../../../lib/Data";

interface LeadershipFormData {
  name: string;
  province: string;
  email: string;
  phone: string;
  district?: string;
  position: string;
  cabinet: string;
  period: string;
  imageUrl: string;
  socialMedia: { platform: string; url: string }[];
}

export default function LeadershipForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<LeadershipFormData>({
    defaultValues: {
      name: "",
      province: "",
      email: "",
      phone: "",
      position: "",
      cabinet: "",
      district: "",
      period: "",
      imageUrl: "",
      socialMedia: [],
    },
  });
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
  const selectedCabinet = watch("cabinet");

  const onSubmit = async (data: LeadershipFormData) => {
    try {
      // Ensure the image is not uploaded again if it has already been uploaded
      const submissionData = {
        ...data,
        cabinet:
          data.cabinet === "District" && data.district
            ? `District - ${data.district}`
            : data.cabinet,
        imageUrl: uploadedImage || data.imageUrl, // Use the uploaded image URL if available
      };

      setSubmitError(null);
      const response = await fetch("/api/leadership/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Please log in to create leadership entries");
        }
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message ||
            `Failed to create leadership entry (${response.status}: ${response.statusText})`
        );
      }

      reset({
        name: "",
        province: "",
        email: "",
        phone: "",
        position: "",
        cabinet: "",
        district: "",
        period: "",
        imageUrl: "",
        socialMedia: [],
      });
      setUploadedImage(null);
      toast.success("Leadership entry created successfully");
    } catch (error) {
      console.error("Error creating leadership entry:", error);
      setSubmitError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: 5242880, // 5MB
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        try {
          const formData = new FormData();
          formData.append("file", file);
          console.log("Uploading file:", file.name, file.size);
          const response = await fetch("/api/upload", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error("Upload error response:", {
              status: response.status,
              statusText: response.statusText,
              errorData,
            });
            throw new Error(
              errorData?.message ||
                `Upload failed with status ${response.status}: ${response.statusText}`
            );
          }

          const data = await response.json();
          setUploadedImage(data.url);
          setValue("imageUrl", data.url);
          toast.success("Image uploaded successfully");
        } catch (error) {
          console.error("Error uploading image:", error);
          setSubmitError(
            error instanceof Error ? error.message : "Failed to upload image"
          );
          setUploadedImage(null);
          setValue("imageUrl", "");
        }
      }
    },
  });

  return (
    <>
      <Paper sx={{ p: 4, maxWidth: 600, margin: "0 auto" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {submitError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {submitError}
              </Alert>
            )}

            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  fullWidth
                />
              )}
            />

            <Controller
              name="province"
              control={control}
              rules={{ required: "Province is required" }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Province</InputLabel>
                  <Select
                    {...field}
                    label="Province"
                    fullWidth
                    error={!!errors.position}
                  >
                    {provinces.map((province, index) => (
                      <MenuItem key={index} value={province}>
                        {province}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="position"
              control={control}
              rules={{ required: "Position is required" }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Position</InputLabel>
                  <Select
                    {...field}
                    label="Position"
                    fullWidth
                    error={!!errors.position}
                  >
                    {positions.map((position) => (
                      <MenuItem key={position} value={position}>
                        {position}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="cabinet"
              control={control}
              rules={{ required: "Cabinet is required" }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Cabinet</InputLabel>
                  <Select
                    {...field}
                    label="Cabinet"
                    fullWidth
                    error={!!errors.cabinet}
                  >
                    {cabinets.map((cabinet) => (
                      <MenuItem key={cabinet} value={cabinet}>
                        {cabinet}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            {selectedCabinet === "District" && (
              <Controller
                name="district"
                control={control}
                defaultValue=""
                rules={{ required: "District is required" }}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>District</InputLabel>
                    <Select
                      {...field}
                      value={field.value || ""}
                      label="District"
                      fullWidth
                      error={!!errors.district}
                    >
                      {kpDistricts.map((district) => (
                        <MenuItem key={district} value={district}>
                          {district}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            )}

            <Controller
              name="period"
              control={control}
              rules={{ required: "Period is required" }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Period</InputLabel>
                  <Select
                    {...field}
                    label="Period"
                    fullWidth
                    error={!!errors.period}
                  >
                    {cabinetPeriod.map((period) => (
                      <MenuItem key={period} value={period}>
                        {period}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <input {...getInputProps()} />
              <p>Drag & drop an image here, or click to select one</p>
            </div>

            <h4 className="font-bold text-2xl text-gray-400 text-center">OR</h4>
            <div className="flex items-center justify-center">
              {uploadedImage && (
                <Image
                  src={uploadedImage || ""}
                  width={200}
                  height={200}
                  alt="image"
                  className="rounded-lg shadow-xl"
                />
              )}
            </div>
            <Controller
              name="imageUrl"
              control={control}
              rules={{ required: "Image URL is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Image URL"
                  error={!!errors.imageUrl}
                  helperText={errors.imageUrl?.message}
                  fullWidth
                  disabled={!!uploadedImage}
                  placeholder={uploadedImage || ""}
                />
              )}
            />

            <h4 className="font-bold text-2xl text-slate-600 text-left">
              Social Media
            </h4>

            <Controller
              name="socialMedia"
              control={control}
              render={({ field }) => (
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <select
                      className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value) {
                          const currentValue = field.value || [];
                          field.onChange([
                            ...currentValue,
                            { platform: value, url: "" },
                          ]);
                        }
                      }}
                    >
                      <option value="">Select Platform</option>
                      <option value="facebook">Facebook</option>
                      <option value="twitter">Twitter</option>
                      <option value="instagram">Instagram</option>
                    </select>
                  </div>

                  {field.value &&
                    field.value.map((social, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <div className="font-medium w-24">
                          {social.platform.charAt(0).toUpperCase() +
                            social.platform.slice(1)}
                        </div>
                        <TextField
                          value={social.url}
                          onChange={(e) => {
                            const currentValue = [...field.value];
                            currentValue[index].url = e.target.value;
                            field.onChange(currentValue);
                          }}
                          placeholder="Enter Username"
                          fullWidth
                          size="small"
                        />
                        <Button
                          onClick={() => {
                            const currentValue = [...field.value];
                            field.onChange(
                              currentValue.filter(
                                (_: any, i: number) => i !== index
                              )
                            );
                          }}
                          color="error"
                          variant="outlined"
                          size="small"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                </div>
              )}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Create Leadership Entry
            </Button>
          </Stack>
        </form>
      </Paper>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
