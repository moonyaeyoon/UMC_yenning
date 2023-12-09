// response.js

export const response = ({ isSuccess, code, message } = {}, result) => {
    return {
        isSuccess: isSuccess || false, // Provide a default value for isSuccess
        code: code || 500, // Provide a default value for code
        message: message || 'Internal Server Error', // Provide a default value for message
        result: result || null, // Provide a default value for result
    };
};
