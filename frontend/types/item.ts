export interface Item {
    id: number;
    name: string;
    sku: string;
    category: string;
    stockCount: number;
    updatedAt: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ItemResponse {
    success: boolean;
    message: string;
    data: Item[];
    pagination: Pagination;
}