// temp.service.js
import { BaseError } from '../../config/error.js';
import { status } from '../../config/response.status.js';
import { response } from '../../config/response.js';
import { tempResponseDTO, flagResponseDTO } from '../dtos/temp.response.dto.js';

//test
export const getTempData = () => {
    return tempResponseDTO('This is TEST! >.0');
};
//에러 핸들링
export function CheckFlag(flag) {
    if (flag == 1) throw new BaseError(status.BAD_REQUEST); // 에러 발생시키기!
    else {
        return flagResponseDTO(flag);
    }
}
