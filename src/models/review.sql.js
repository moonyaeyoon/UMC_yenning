// review.sql.js

export const insertReviewSql =
    'INSERT INTO review (rating_star, content, review_img, store_id, mission_id, user_id, created_at, updated_at, deleted_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), null);';

export const checkStoreExistenceSql = 'SELECT id FROM store WHERE id = ?;';
