import axios from 'axios';

export const API_URL = 'http://192.168.1.8:30088/api/wedahamine/v1';

// Fetch all products
export const fetchProducts = async ({
    page = 0,
    per_page = 10,
    search = "",
    sort = "productId",
    direction = "asc",
}: {
    page?: number;
    per_page?: number;
    search?: string;
    sort?: string;
    direction?: string;
}) => {
    try {
        const response = await axios.get(`${API_URL}/product`, {
            params: {
                page,
                per_page,
                search,
                sort,
                direction,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Fetch product by id
export const fetchProductById = async (productId: number) => {
    try {
        const response = await axios.get(`${API_URL}/product/${productId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return {};
    }
}

// Create new product
export const createProduct = async ({
    product,
}: {
    product: {
        item: string;
        description?: string;
        unitPrice?: number;
        discount?: number;
        qty?: number;
        unit: string;
        categoryId: number;
    };
}) => {
    try {
        const response = await axios.post(`${API_URL}/product`, product);
        return response.data;
    } catch (e) {
        console.error(e);
        return {};
    }
}

// Update product
export const updateProduct = async ({
    productId,
    product,
}: {
    productId: number;
    product: {
        productId: number;
        item: string;
        description?: string;
        unitPrice?: number;
        discount?: number;
        qty?: number;
        unit: string;
        categoryId: number;
    };
}) => {
    try {
        const response = await axios.put(`${API_URL}/product/${productId}`, product);
        return response.data;
    } catch (e) {
        console.error(e);
        return {};
    }
}

// Delete product
export const deleteProduct = async (productId: number) => {
    try {
        const response = await axios.delete(`${API_URL}/product/${productId}`);
        return response.data;
    } catch (e) {
        console.error(e);
        return {};
    }
}