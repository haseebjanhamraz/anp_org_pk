"use client"

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Paper, Stack, Alert } from '@mui/material';


interface LeadershipFormData {
    name: string;
    position: string;
    period: string;
    description: string;
    imageUrl: string;
    socialMedia: { platform: string; url: string }[];
}

export default function LeadershipForm() {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<LeadershipFormData>();
    const [submitError, setSubmitError] = React.useState<string | null>(null);

    const onSubmit = async (data: LeadershipFormData) => {
        try {
            setSubmitError(null);
            const response = await fetch('/api/leadership/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
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
                    position: '',
                    period: '',
                    description: '',
                    imageUrl: '',
                    socialMedia: [],
                }
            );
            console.log('Leadership entry created successfully');


        } catch (error) {
            console.error('Error creating leadership entry:', error);
            setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    };

    return (
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
                        name="position"
                        control={control}
                        rules={{ required: 'Position is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Position"
                                error={!!errors.position}
                                helperText={errors.position?.message}
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="period"
                        control={control}
                        rules={{ required: 'Period is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Period"
                                error={!!errors.period}
                                helperText={errors.period?.message}
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: 'Description is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Description"
                                multiline
                                rows={4}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                                fullWidth
                            />
                        )}
                    />

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
                            />
                        )}
                    />

                    // Select social media accounts from dropdown, add link and add them to the form data. Use tailwind css for styling.
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
                                        <div className="font-medium w-24">{social.platform}</div>
                                        <TextField
                                            value={social.url}
                                            onChange={(e) => {
                                                const currentValue = [...field.value];
                                                currentValue[index].url = e.target.value;
                                                field.onChange(currentValue);
                                            }}
                                            placeholder="Enter URL"
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
    );
}
