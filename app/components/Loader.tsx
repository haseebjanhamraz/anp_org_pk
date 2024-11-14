import { CircularProgress } from '@mui/material';

interface LoaderProps {
    size?: number;
    color?: string;
}

const Loader = ({ size = 40, color = 'primary' }: LoaderProps) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <CircularProgress size={size} color={color as any} />
        </div>
    );
};

export default Loader;
