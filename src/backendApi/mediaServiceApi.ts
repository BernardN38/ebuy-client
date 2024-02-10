import axios, { AxiosResponse } from 'axios';
import { serverUrl } from '../config';
import { UUID } from 'crypto';

export interface HealthCheckResponseData {
    name: string;
    status: string;
}

export interface UploadMediaResponseData {
    mediaId: UUID;
}

export interface UploadMediaPayload {
    image: File;
}

export interface MediaServiceAPI {
    checkHealth(): Promise<HealthCheckResponse>;
    uploadMedia(file: File): Promise<UploadMediaResponseData>
}

export interface HealthCheckResponse extends AxiosResponse<HealthCheckResponseData> { }

export class MediaServiceAPI implements MediaServiceAPI {
    private static instance: MediaServiceAPI;
    private baseURL: string;

    private constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    public static getInstance(baseURL: string = serverUrl): MediaServiceAPI {
        if (!MediaServiceAPI.instance) {
            MediaServiceAPI.instance = new MediaServiceAPI(baseURL);
        }

        return MediaServiceAPI.instance;
    }

    public async checkHealth(): Promise<HealthCheckResponse> {
        const endpoint = '/api/v1/media/health';
        const url = `${this.baseURL}${endpoint}`;

        try {
            const response = await axios.get<HealthCheckResponseData>(url);
            return response;
        } catch (error) {
            throw error;
        }
    }
    public async uploadMedia(file: File): Promise<UploadMediaResponseData> {
        console.log(file)
        const endpoint = '/api/v1/media';
        const url = `${this.baseURL}${endpoint}`;
        const data: FormData = new FormData();
        data.append("image", file)
        // console.log(data.get("image").)
        try {
            const response = await axios.post<UploadMediaResponseData, AxiosResponse<UploadMediaResponseData>>(url, data, { withCredentials: true });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    public async getMedia(mediaId: Number): Promise<ArrayBuffer> {
        const endpoint = `/api/v1/media/${mediaId}`;
        const url = `${this.baseURL}${endpoint}`;
        try {
            const response = await axios.get<ArrayBuffer, AxiosResponse<ArrayBuffer>>(url, { withCredentials: true });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default MediaServiceAPI;
