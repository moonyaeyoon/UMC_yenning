import { BaseError } from '../../config/error.js';
import { status } from '../../config/response.status.js';
import { signinResponseDTO } from '../dtos/user.dto.js';
import { addUser, getUser, getUserPreferToUserID, setPrefer } from '../models/user.dao.js';

export const joinUser = async (body) => {
    const birth = new Date(body.birthYear, body.birthMonth, body.birthDay);
    const prefer = body.prefer;

    const joinUserData = await addUser({
        id: undefined,
        name: body.name,
        gender: body.gender,
        birth: birth,
        address: body.address,
        email: body.email,
        created_at: body.created_at,
        deleted_at: null,
        updated_at: null,
    });

    if (joinUserData == -1) {
        throw new BaseError(status.EMAIL_ALREADY_EXIST);
    } else {
        for (let i = 0; i < prefer.length; i++) {
            await setPrefer(joinUserData, prefer[i]);
        }
        return signinResponseDTO(await getUser(joinUserData), await getUserPreferToUserID(joinUserData));
    }
};
