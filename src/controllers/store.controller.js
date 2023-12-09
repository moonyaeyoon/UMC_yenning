// store.controller.js
import { status } from '../../config/response.status.js';
import { response } from '../../config/response.js';
import { addStoreToRegionService } from '../services/store.service.js';

export const addStoreToRegionController = async (req, res, next) => {
    const { regionId } = req.params;
    const { storeId } = req.body;

    try {
        const result = await addStoreToRegionService(regionId, storeId);
        res.status(200).send(response(status.SUCCESS, result));
    } catch (error) {
        next(error);
    }
};
