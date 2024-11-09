export interface LeadershipData {
    id: string;
    name: string;
    position: string;
    period: string;
    description: string;
    imageUrl: string;
    socialMedia: {
        platform: string;
        url: string;
    }[];
} 