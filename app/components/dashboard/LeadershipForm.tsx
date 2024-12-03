"use client"

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Paper, Stack, Alert, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useDropzone } from 'react-dropzone'
import { positions, provinces, cabinets, cabinetPeriod, kpDistricts } from '../../lib/Data';
import { useState } from 'react';

interface LeadershipFormData {
    name: string;
    province: string;
    position: string;
    cabinet: string;
    period: string;
    imageUrl: string;
    socialMedia: { platform: string; url: string }[];
}

export default function LeadershipForm() {

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<LeadershipFormData>({
        defaultValues: {
            name: '',
            province: '',
            position: '',
            cabinet: '',
            period: '',
            imageUrl: '',
            socialMedia: []
        }
    });
    const [submitError, setSubmitError] = React.useState<string | null>(null);
    const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
    const [cabinet, setCabinet] = useState("")

    const handleCabinet = () => {
        setCabinet(cabinet)
    }

    const onSubmit = async (data: LeadershipFormData) => {
        try {

            setSubmitError(null);
            const response = await fetch('/api/leadership/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });


            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Please log in to create leadership entries');
                }
                const errorData = await response.json().catch(() => null);
                throw new Error(
                    errorData?.message ||
                    `Failed to create leadership entry (${response.status}: ${response.statusText})`
                );
            }

            reset(
                {
                    name: '',
                    province: '',
                    position: '',
                    cabinet: '',
                    period: '',
                    imageUrl: '',
                    socialMedia: [],
                }
            );
            setUploadedImage(null);

        } catch (error) {
            console.error('Error creating leadership entry:', error);
            setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setUploadedImage(imageUrl);
                setValue('imageUrl', imageUrl);
            }
        }
    });

    return (
        <>
            <Paper sx={{ p: 4, maxWidth: 600, margin: '0 auto' }}>
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
                            rules={{ required: 'Name is required' }}
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
                            name="province"
                            control={control}
                            rules={{ required: 'Province is required' }}
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
                                            <MenuItem key={index} value={province}>{province}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />

                        <Controller
                            name="position"
                            control={control}
                            rules={{ required: 'Position is required' }}
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
                                            <MenuItem key={position} value={position}>{position}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                        <Controller
                            name="cabinet"
                            control={control}
                            rules={{ required: 'Cabinet is required' }}
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
                                            <MenuItem key={cabinet} value={cabinet}>{cabinet}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />

                        {/* Display this districts dropdown if selected cabinet === district and add their values as cabinet */}

                        {cabinet === "District" && (
                            <Controller
                                name="cabinet"
                                control={control}
                                rules={{ required: 'District is required' }}
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <InputLabel>District</InputLabel>
                                        <Select
                                            {...field}
                                            label="District"
                                            fullWidth
                                            error={!!errors.cabinet}
                                        >
                                            {kpDistricts.map((cabinet) => (
                                                <MenuItem key={cabinet} value={cabinet}>{cabinet}</MenuItem>
                                            ))}
                                            onChange={handleCabinet()}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        )}

                        <Controller
                            name="period"
                            control={control}
                            rules={{ required: 'Period is required' }}
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
                                            <MenuItem key={period} value={period}>{period}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                        <div {...getRootProps()} style={{
                            border: '2px dashed #ccc',
                            padding: '20px',
                            textAlign: 'center'
                        }}>
                            <input {...getInputProps()} />
                            <p>Drag & drop an image here, or click to select one</p>
                        </div>

                        <h4 className='font-bold text-2xl text-gray-400 text-center'>OR</h4>

                        <Controller
                            name="imageUrl"
                            control={control}
                            rules={{ required: 'Image URL is required' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Image URL"
                                    error={!!errors.imageUrl}
                                    helperText={errors.imageUrl?.message}
                                    fullWidth
                                    disabled={!!uploadedImage}
                                    placeholder={uploadedImage || ''}
                                />
                            )}
                        />

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
                                                        { platform: value, url: '' }
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

                                    {field.value && field.value.map((social, index) => (
                                        <div key={index} className="flex gap-4 items-center">
                                            <div className="font-medium w-24">{social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}</div>
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
                                                    field.onChange(currentValue.filter((_: any, i: number) => i !== index));
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
        </>
    );
}
