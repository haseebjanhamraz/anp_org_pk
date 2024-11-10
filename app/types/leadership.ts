export interface LeadershipData {
    _id: string;
    name: string;
    position: string;
    cabinet: string;
    period: string;
    description: string;
    imageUrl: string;
    socialMedia: {
        platform: string;
        url: string;
    }[];
} 