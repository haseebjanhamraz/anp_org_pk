'use client'

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { TextField, Button, Paper, Stack, Alert, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { positions, provinces, cabinets, cabinetPeriod, kpDistricts } from '../../lib/Data';

interface LeadershipFormData {
    name: string;
    province: string;
    district?: string;
    position: string;
    cabinet: string;
    period: string;
    imageUrl: string;
    socialMedia: { platform: string; url: string }[];
}

export default function LeadershipEditForm() {
    const params = useParams();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isDirty, setIsDirty] = React.useState(false);
    const { control, handleSubmit, formState: { errors, isDirty: formIsDirty }, reset, setValue, watch } = useForm<LeadershipFormData>({
        defaultValues: {
            name: '',
            province: '',
            position: '',
            cabinet: '',
            district: '',
            period: '',
            imageUrl: '',
            socialMedia: []
        }
    });
    const [submitError, setSubmitError] = React.useState<string | null>(null);
    const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);
    const selectedCabinet = watch('cabinet');

    React.useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty || formIsDirty) {
                e.preventDefault();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isDirty, formIsDirty]);

    React.useEffect(() => {
        const fetchLeadershipData = async () => {
            try {
                const response = await fetch(`/api/leadership/${params.id}`);
                if (response.status === 404) {
                    router.push('/dashboard/leadership');
                    return;
                }
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                
                const transformedData = {
                    ...data,
                    cabinet: cabinets.includes(data.cabinet) ? data.cabinet : '',
                    period: cabinetPeriod.includes(data.period) 
                        ? data.period 
                        : cabinetPeriod.find(p => p.startsWith(data.period)) || '',
                };
                
                reset(transformedData);
                setIsDirty(false);
            } catch (error) {
                console.error('Error fetching leadership data:', error);
                setSubmitError(error instanceof Error ? error.message : 'Failed to fetch leadership data');
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchLeadershipData();
        } else {
            router.push('/dashboard/leadership');
        }
    }, [params.id, reset, router]);

    const onSubmit = async (data: LeadershipFormData) => {
        try {
            setIsSubmitting(true);
            setSubmitError(null);

            const submissionData = {
                ...data,
                cabinet: data.cabinet === 'District' && data.district 
                    ? `District - ${data.district}` 
                    : data.cabinet
            };

            const response = await fetch(`/api/leadership/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                credentials: 'include',
                body: JSON.stringify(submissionData),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Please log in to update leadership entries');
                }
                const errorData = await response.json().catch(() => null);
                throw new Error(
                    errorData?.message ||
                    `Failed to update leadership entry (${response.status}: ${response.statusText})`
                );
            }

            setIsDirty(false);
            router.push('/dashboard/leadership');
            router.refresh();

        } catch (error) {
            console.error('Error updating leadership entry:', error);
            setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setUploadedImage(imageUrl);
                setValue('imageUrl', imageUrl);
                setIsDirty(true);
            }
        }
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

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
                                onChange={(e) => {
                                    field.onChange(e);
                                    setIsDirty(true);
                                }}
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
                                    error={!!errors.province}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setIsDirty(true);
                                    }}
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
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setIsDirty(true);
                                    }}
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
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setIsDirty(true);
                                    }}
                                >
                                    {cabinets.map((cabinet) => (
                                        <MenuItem key={cabinet} value={cabinet}>{cabinet}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />

                    {selectedCabinet === 'District' && (
                        <Controller
                            name="district"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'District is required' }}
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel>District</InputLabel>
                                    <Select
                                        {...field}
                                        value={field.value || ''}
                                        label="District"
                                        fullWidth
                                        error={!!errors.district}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setIsDirty(true);
                                        }}
                                    >
                                        {kpDistricts.map((district) => (
                                            <MenuItem key={district} value={district}>{district}</MenuItem>
                                        ))}
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
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setIsDirty(true);
                                    }}
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
                                onChange={(e) => {
                                    field.onChange(e);
                                    setIsDirty(true);
                                }}
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
                                                setIsDirty(true);
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
                                                setIsDirty(true);
                                            }}
                                            placeholder="Enter Username"
                                            fullWidth
                                            size="small"
                                        />
                                        <Button
                                            onClick={() => {
                                                const currentValue = [...field.value];
                                                field.onChange(currentValue.filter((_: any, i: number) => i !== index));
                                                setIsDirty(true);
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

                    <div className="flex justify-end space-x-4">
                        <Button
                            onClick={() => {
                                if (isDirty || formIsDirty) {
                                    if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
                                        router.push('/dashboard/leadership');
                                    }
                                } else {
                                    router.push('/dashboard/leadership');
                                }
                            }}
                            variant="outlined"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Updating...' : 'Update'}
                        </Button>
                    </div>
                </Stack>
            </form>
        </Paper>
    );
}
