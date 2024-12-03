export interface LeadershipData {
    _id: string;
    name: string;
    email: string;
    phone: string;
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