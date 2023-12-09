import { BaseError } from '../../config/error.js';
import { status } from '../../config/response.status.js';
import { addReview as addReviewDao, checkStoreExistence } from '../models/review.dao.js';

export const addReview = async ({ rating_star, content, review_img, store_id, mission_id, user_id }) => {
    try {
        // Check if the store exists
        const isStoreExist = await checkStoreExistence(store_id);

        if (!isStoreExist) {
            throw new BaseError(status.NOT_FOUND, 'Store not found');
        }
        const result = await addReviewDao({ rating_star, content, review_img, store_id, mission_id, user_id });

        return result;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG, 'Failed to add review');
    }
};
