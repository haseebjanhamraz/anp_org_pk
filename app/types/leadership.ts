export interface LeadershipData {
    _id: string;
    name: string;
    province: string;
    position: string;
    cabinet: string;
    period: string;
    imageUrl: string;
    socialMedia: {
        platform: string;
        url: string;
    }[];
} 