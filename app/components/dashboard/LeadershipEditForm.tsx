'use client'

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

interface LeadershipFormData {
    name: string;
    position: string;
    period: string;
    description: string;
    imageUrl: string;
    socialMedia: { platform: string; url: string }[];
}

export default function LeadershipEditForm() {
    const params = useParams();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isDirty, setIsDirty] = React.useState(false);
    const { control, handleSubmit, formState: { errors, isDirty: formIsDirty }, reset, setValue } = useForm<LeadershipFormData>({
        defaultValues: {
            name: '',
            position: '',
            period: '',
            description: '',
            imageUrl: '',
            socialMedia: []
        },
        mode: 'onBlur',
    });
    const [submitError, setSubmitError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);

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
                reset(data);
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

    const validateImageUrl = async (url: string): Promise<boolean> => {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            const contentType = response.headers.get('content-type');
            return contentType?.startsWith('image/') ?? false;
        } catch {
            return false;
        }
    };

    const onSubmit = async (data: LeadershipFormData) => {
        try {
            setIsSubmitting(true);
            setSubmitError(null);

            const imageUrlValid = await validateImageUrl(data.imageUrl);
            if (!imageUrlValid) {
                setSubmitError('Please provide a valid image URL');
                return;
            }

            const response = await fetch(`/api/leadership/${params.id}`, {

                method: 'PUT',
                headers: {

                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                credentials: 'include',
                body: JSON.stringify(data),
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {submitError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {submitError}
                    </div>
                )}

                <div className="space-y-4">
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            required: 'Name is required',
                            minLength: { value: 2, message: 'Name must be at least 2 characters' },
                            maxLength: { value: 100, message: 'Name must be less than 100 characters' }
                        }}
                        render={({ field }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    {...field}
                                    type="text"
                                    className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setIsDirty(true);
                                    }}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                )}
                            </div>
                        )}
                    />

                    <Controller
                        name="position"
                        control={control}
                        rules={{ required: 'Position is required' }}
                        render={({ field }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Position</label>
                                <input
                                    {...field}
                                    type="text"
                                    placeholder="Enter Party Position"
                                    className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setIsDirty(true);
                                    }}
                                />
                                {errors.position && (
                                    <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
                                )}
                            </div>
                        )}
                    />

                    <Controller
                        name="period"
                        control={control}
                        rules={{ required: 'Period is required' }}
                        render={({ field }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Period</label>
                                <input
                                    {...field}
                                    type="text"
                                    className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setIsDirty(true);
                                    }}
                                />
                                {errors.period && (
                                    <p className="mt-1 text-sm text-red-600">{errors.period.message}</p>
                                )}
                            </div>
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: 'Description is required' }}
                        render={({ field }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    {...field}
                                    rows={4}
                                    className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setIsDirty(true);
                                    }}
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                                )}
                            </div>
                        )}
                    />

                    <Controller
                        name="imageUrl"
                        control={control}
                        rules={{
                            required: 'Image URL is required',
                            pattern: {
                                value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
                                message: 'Please enter a valid image URL'
                            }
                        }}
                        render={({ field }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input
                                    {...field}
                                    type="text"
                                    className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setIsDirty(true);
                                    }}
                                />
                                {field.value && (
                                    <Image
                                        src={field.value}
                                        alt="Preview"
                                        className="mt-2 h-32 w-32 object-cover rounded-lg"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                        height={100}
                                        width={100}
                                    />
                                )}
                                {errors.imageUrl && (
                                    <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
                                )}
                            </div>
                        )}
                    />
                    <Controller
                        name="socialMedia"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Social Media Links</label>
                                {field.value.map((social: { platform: string; url: string }, index: number) => (
                                    <div key={index} className="flex gap-4 mt-2">
                                        <input
                                            type="text"
                                            placeholder="Platform (e.g. Twitter, LinkedIn)"
                                            value={social.platform}
                                            onChange={(e) => {
                                                const newSocialMedia = [...field.value];
                                                newSocialMedia[index].platform = e.target.value;
                                                field.onChange(newSocialMedia);
                                                setIsDirty(true);
                                            }}
                                            className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        <input
                                            type="url"
                                            placeholder="URL"
                                            value={social.url}
                                            onChange={(e) => {
                                                const newSocialMedia = [...field.value];
                                                newSocialMedia[index].url = e.target.value;
                                                field.onChange(newSocialMedia);
                                                setIsDirty(true);
                                            }}
                                            className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newSocialMedia = field.value.filter((_, i) => i !== index);
                                                field.onChange(newSocialMedia);
                                                setIsDirty(true);
                                            }}
                                            className="mt-1 px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => {
                                        field.onChange([...field.value, { platform: '', url: '' }]);
                                        setIsDirty(true);
                                    }}
                                    className="mt-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Add Social Media Link
                                </button>
                            </div>
                        )}
                    />

                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => {
                            if (isDirty || formIsDirty) {
                                if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
                                    router.push('/dashboard/leadership');
                                }
                            } else {
                                router.push('/dashboard/leadership');
                            }
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </form>
        </div>
    );
}
