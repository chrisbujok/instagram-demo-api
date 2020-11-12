export interface User {
    username: string;
    followed_by_count: number;
    follow_count: number;
    user_id: number;
    is_private: boolean;
    is_verified: boolean;
    is_business: boolean;
}
