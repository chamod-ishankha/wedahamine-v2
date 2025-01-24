import axios from 'axios';

export const API_URL = 'http://192.168.1.8:30088/api/wedahamine/v1';

// Fetch all product categories
export const fetchProductCategories = async ({
    page = 0,
    per_page = 10,
    search = "",
    sort = "categoryId",
    direction = "asc",
}: {
    page?: number;
    per_page?: number;
    search?: string;
    sort?: string;
    direction?: string;
}) => {
    try {
        const response = await axios.get(`${API_URL}/reference/category`, {
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

// Fetch category by id
export const fetchCategoryById = async (categoryId: number) => {
    try {
        const response = await axios.get(`${API_URL}/reference/category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return {};
    }
}

// Create new category
export const createCategory = async ({
    category,
}: {
    category: {
        categoryName: string;
        categoryDescription?: string;
    };
}) => {
    try {
        const response = await axios.post(`${API_URL}/reference/category`, category);
        return response.data;
    } catch (e) {
        console.error(e);
        return { error: true, msg: (e as any).response.data.message }
    }
}

// Update category
export const updateCategory = async ({
    categoryId,
    category,
}: {
    categoryId: number;
    category: {
        categoryId: number;
        categoryName: string;
        categoryDescription?: string;
    };
}) => {
    try {
        const response = await axios.put(`${API_URL}/reference/category/${categoryId}`, category);
        return response.data;
    } catch (e) {
        console.error(e);
        return { error: true, msg: (e as any).response.data.message }
    }
}

// Delete category
export const deleteCategory = async (categoryId: number) => {
    try {
        const response = await axios.delete(`${API_URL}/reference/category/${categoryId}`);
        return response.data;
    } catch (e) {
        console.error(e);
        return { error: true, msg: (e as any).response.data.message }
    }
}