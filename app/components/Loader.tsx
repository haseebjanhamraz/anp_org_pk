import React from 'react';
import { CircularProgress } from '@mui/material';

interface LoaderProps {
    size?: number;
    color?: string;
}

const Loader = ({ size = 40, color = 'primary' }: LoaderProps) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <iframe src="https://giphy.com/embed/KB8MHRUq55wjXVwWyl" width="200" height="200" className="giphy-embed" allowFullScreen></iframe>
            <h3 className='text-2xl font-bold'>Loading...</h3>
        </div>
    );
};

export default Loader;
