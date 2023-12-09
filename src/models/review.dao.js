import { pool } from '../../config/db.config.js';
import { BaseError } from '../../config/error.js';
import { status } from '../../config/response.status.js';
import { insertReviewSql, checkStoreExistenceSql } from './review.sql.js';

export const addReview = async ({ rating_star, content, review_img, store_id, mission_id, user_id }) => {
    try {
        const conn = await pool.getConnection();

        // 가게의 존재 여부 확인
        const isStoreExist = await checkStoreExistence(conn, store_id);

        if (!isStoreExist) {
            conn.release();
            throw new BaseError(status.INVALID_OPERATION, '가게가 존재하지 않습니다.');
        }

        // 리뷰 데이터 삽입
        const [result] = await pool.query(insertReviewSql, [rating_star, content, review_img, store_id, mission_id, user_id]);

        conn.release();
        return result.insertId;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG, '리뷰를 추가하는데 실패했습니다.');
    }
};

export const checkStoreExistence = async (conn, store_id) => {
    try {
        // 가게의 존재 여부 확인
        const [store] = await conn.query(checkStoreExistenceSql, [store_id]);

        return store.length > 0;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG, '가게 존재 여부 확인에 실패했습니다.');
    }
};
