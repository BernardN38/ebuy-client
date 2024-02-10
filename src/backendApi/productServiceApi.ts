import axios, { AxiosResponse } from 'axios';
import { UUID } from 'crypto';
import { serverUrl } from '../config';

export interface HealthCheckResponseData {
    name: string;
    status: string;
}

export interface ProductPayload {
    name: string;
    description: string;
    price: number;
    productType: string;
    mediaId: UUID;
}
export interface ProductCreationResponse {
    productId: number;
    errorMessage: string;
}
export interface RecentProductsResponse {
    products: Array<Product>;
}
export interface ProductTypesResponse {
    productTypes: String[];
}
export interface Product {
    id: number;
    ownerId: number;
    name: string;
    description: string;
    price: number;
    productTypeId: number;
    mediaId: UUID;
    createdAt: Date;
}



export interface ProductServiceAPI {
    checkHealth(): Promise<HealthCheckResponse>;
    createProduct(arg0: ProductPayload): Promise<ProductCreationResponse>;
}

export interface HealthCheckResponse extends AxiosResponse<HealthCheckResponseData> { }

export class ProductServiceAPI implements ProductServiceAPI {
    private static instance: ProductServiceAPI;
    private baseURL: string;

    private constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    public static getInstance(baseURL: string = serverUrl): ProductServiceAPI {
        if (!ProductServiceAPI.instance) {
            ProductServiceAPI.instance = new ProductServiceAPI(baseURL);
        }

        return ProductServiceAPI.instance;
    }

    public async checkHealth(): Promise<HealthCheckResponse> {
        const endpoint = '/api/v1/products/health';
        const url = `${this.baseURL}${endpoint}`;

        try {
            const response = await axios.get<HealthCheckResponseData>(url);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async createProduct(productPayload: ProductPayload): Promise<ProductCreationResponse> {
        const endpoint = '/api/v1/products';
        const url = `${this.baseURL}${endpoint}`;

        try {
            const response = await axios.post<ProductCreationResponse, AxiosResponse<ProductCreationResponse>>(url, productPayload, { withCredentials: true });
            return response.data; // Extract the data property from the AxiosResponse
        } catch (error) {
            throw error;
        }
    }
    public async getRecentProducts(): Promise<RecentProductsResponse> {
        const endpoint = '/api/v1/products';
        const url = `${this.baseURL}${endpoint}`;

        try {
            const response = await axios.get<RecentProductsResponse, AxiosResponse<RecentProductsResponse>>(url);
            return response.data; // Extract the data property from the AxiosResponse
        } catch (error) {
            throw error;
        }
    }
    public async getProductTypes(): Promise<ProductTypesResponse> {
        const endpoint = '/api/v1/products/types/all';
        const url = `${this.baseURL}${endpoint}`;

        try {
            const response = await axios.get<ProductTypesResponse, AxiosResponse<ProductTypesResponse>>(url);
            return response.data; // Extract the data property from the AxiosResponse
        } catch (error) {
            throw error;
        }
    }
}

export default ProductServiceAPI;
