import { response } from '../../config/response.js';
import { status } from '../../config/response.status.js';
import { addReview as addReviewService } from '../services/review.service.js';

export const addReview = async (req, res, next) => {
    try {
        const { rating_star, content, review_img, store_id, mission_id, user_id } = req.body;

        // 유효성 검사 등 필요한 로직 추가 가능

        const result = await addReviewService({ rating_star, content, review_img, store_id, mission_id, user_id });

        res.status(200).send(response(status.SUCCESS, result));
    } catch (err) {
        next(err);
    }
};
