import { useState, useEffect } from 'react';

interface Document {
    name: string;
    publishYear: number;
    category: string;
    language: string;
    filepath: string;
    createdAt: Date;
    updatedAt: Date;
    loading: boolean;
}

const useDocument = (id: string) => {
    const [loading, setLoading] = useState(true);
    const [document, setDocument] = useState<Document>({
        name: '',
        publishYear: 0,
        category: '',
        language: '',
        filepath: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        loading: false,
    });

    useEffect(() => {

        setLoading(true);
        const fetchDocument = async () => {
            try {
                const response = await fetch(`/api/documents/${id}`);
                const data = await response.json();
                setDocument(data);
                setLoading(false);
                
            } catch (error) {
                console.error(error);
            }
        };
        fetchDocument();
    }, [id])


    return { document, loading };
};

export default useDocument; 