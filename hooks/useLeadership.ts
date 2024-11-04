import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getErrorMessage } from '../utils/errorUtils';


// Interface for the update DTO
interface UpdateLeadershipDto {
    id: string;
    name: string;
    position: string;
    period: string;
    description?: string;
    imageUrl?: string;
    socialMedia?: Array<{
        platform: string;
        url: string;
    }>;
}

export const useUpdateLeadership = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateLeadershipDto) => {
            const response = await fetch(`/api/leadership/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to update leadership record');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leadership'] });
            toast.success('Leadership record updated successfully');
        },
        onError: (error: any) => {
            toast.error(getErrorMessage(error));
        },
    });
};

export const useDeleteLeadership = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/leadership/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete leadership record');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leadership'] });
            toast.success('Leadership record deleted successfully');
        },
        onError: (error: any) => {
            toast.error(getErrorMessage(error));
        },
    });
}; 