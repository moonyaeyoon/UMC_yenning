// models/user.dao.js

import { pool } from '../../config/db.config.js';
import { BaseError } from '../../config/error.js';
import { status } from '../../config/response.status.js';
import { confirmEmail, insertUserSql, getUserID, connectFoodCategory, getPreferToUserID } from './user.sql.js';

// User 데이터 삽입
export const addUser = async (data) => {
    try {
        const conn = await pool.getConnection();

        // 이메일 중복 확인
        const [confirm] = await pool.query(confirmEmail, data.email);

        if (confirm[0].isExistEmail) {
            conn.release();
            return -1; // 이미 존재하는 이메일인 경우 -1 반환
        }

        // 유저 데이터 삽입
        const [result] = await pool.query(insertUserSql, [data.email, data.name, data.gender, data.birth, data.address, data.email]);

        conn.release();
        return result.insertId;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const [user] = await pool.query(getUserID, userId);

        if (user.length === 0) {
            return -1; // 해당하는 사용자가 없는 경우 -1 반환
        }

        conn.release();
        return user;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};

// 음식 선호 카테고리 매핑
export const setPrefer = async (userId, foodCategoryId) => {
    try {
        const conn = await pool.getConnection();

        // 사용자의 음식 선호 카테고리 매핑
        await pool.query(connectFoodCategory, [foodCategoryId, userId]);

        conn.release();

        return;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};

// 사용자 선호 카테고리 반환
export const getUserPreferToUserID = async (userID) => {
    try {
        const conn = await pool.getConnection();
        const prefer = await pool.query(getPreferToUserID, userID);

        conn.release();

        return prefer;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};

//
