// store.dao.js

import { pool } from '../../config/db.config.js';

export const addStoreToRegion = async (regionId, storeId) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Add store to the region_store table
        const query = 'INSERT INTO region_store (region_id, store_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';
        const [result] = await connection.query(query, [regionId, storeId]);

        await connection.commit();
        return result;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};
