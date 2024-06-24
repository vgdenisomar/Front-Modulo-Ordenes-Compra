import api from './api';

export const fetchCreatePurchase = async () => {
    try {
        const response = await api.get('/create/purchase');
        return response.data;
    } catch (error) {
        console.error('Error fetching users', error);
        throw error;
    }
};

export const createPurchaseService = async (request) => {
    try {
        const response = await api.post('/create/purchase', request);
        return response.data;
    } catch (error) {
        console.error('Error fetching users', error);
        throw error;
    }
};