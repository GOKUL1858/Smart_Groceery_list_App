import api from './api';

export const getGroceries = async () => {
    const response = await api.get('/grocery');
    return response.data;
};

export const addGrocery = async (formData) => {
    const response = await api.post('/grocery', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateGrocery = async (id, data) => {
    const response = await api.put(`/grocery/${id}`, data);
    return response.data;
};

export const deleteGrocery = async (id) => {
    const response = await api.delete(`/grocery/${id}`);
    return response.data;
};
