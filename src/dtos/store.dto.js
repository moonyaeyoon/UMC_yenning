// store.dto.js

export const addStoreToRegionRequestDTO = {
    name: 'string',
    category: 'string',
    // Add other necessary fields
};

export const addStoreToRegionResponseDTO = {
    status: 'integer',
    isSuccess: 'boolean',
    code: 'integer',
    message: 'string',
    data: 'object', // You can define the structure based on your response
};
