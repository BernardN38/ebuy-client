import axios, { AxiosResponse } from 'axios';
import { serverUrl } from '../config';

export interface HealthCheckResponseData {
    name: string;
    status: string;
}

export interface UserPayload {
    name: string;
    description: string;
    price: number;
}
export interface LoginPayload {
    email: string;
    password: string;
}
export interface UserCreationResponse {
    userId: number
}

export interface AuthServiceAPI {
    checkHealth(): Promise<HealthCheckResponse>;
    createProduct(arg0: UserPayload): Promise<UserCreationResponse>;
}

export interface HealthCheckResponse extends AxiosResponse<HealthCheckResponseData> { }

export class AuthServiceAPI implements AuthServiceAPI {
    private static instance: AuthServiceAPI;
    private baseURL: string;

    private constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    public static getInstance(baseURL: string = serverUrl): AuthServiceAPI {
        if (!AuthServiceAPI.instance) {
            AuthServiceAPI.instance = new AuthServiceAPI(baseURL);
        }

        return AuthServiceAPI.instance;
    }

    public async checkHealth(): Promise<HealthCheckResponse> {
        const endpoint = '/api/v1/auth/health';
        const url = `${this.baseURL}${endpoint}`;

        try {
            const response = await axios.get<HealthCheckResponseData>(url);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async registerUser(userPayload: UserPayload): Promise<UserCreationResponse> {
        const endpoint = '/api/v1/auth/users';
        const url = `${this.baseURL}${endpoint}`;

        try {
            const response = await axios.post<UserCreationResponse, AxiosResponse<UserCreationResponse>>(url, userPayload);
            return response.data; // Extract the data property from the AxiosResponse
        } catch (error) {
            throw error;
        }
    }

    public async loginUser(loginPayload: LoginPayload): Promise<AxiosResponse> {
        const endpoint = '/api/v1/auth/users/login';
        const url = `${this.baseURL}${endpoint}`;

        try {
            const response = await axios.post<UserCreationResponse, AxiosResponse<AxiosResponse>>(url, loginPayload, { withCredentials: true });
            return response; // Extract the data property from the AxiosResponse
        } catch (error) {
            throw error;
        }
    }
}

export default AuthServiceAPI;
