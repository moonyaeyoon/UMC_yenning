export const insertUserSql =
    'INSERT INTO User (email, name, gender, birth, address, created_at, deleted_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), null, null);';

export const getUserID = 'SELECT * FROM User WHERE id = ?';

export const connectFoodCategory = 'INSERT INTO preference (preference_item, user_id) VALUES (?, ?);';

export const confirmEmail = 'SELECT EXISTS(SELECT 1 FROM User WHERE email = ?) as isExistEmail';

export const getPreferToUserID =
    'SELECT p.id, p.preference_item, p.user_id FROM preference p JOIN User u ON p.user_id = u.id WHERE u.id = ?;';
