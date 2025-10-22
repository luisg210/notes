export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T | null;
    success: boolean;
    timestamp: Date;
}