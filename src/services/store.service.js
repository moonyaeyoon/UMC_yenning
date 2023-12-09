// store.service.js

import { BaseError } from '../../config/error.js';
import { status } from '../../config/response.status.js';
import { addStoreToRegion } from '../models/store.dao.js';

export const addStoreToRegionService = async (regionId, storeId) => {
    // Check if the store is already added to the region (Handle this based on your business logic)
    // ...

    const result = await addStoreToRegion(regionId, storeId);

    if (!result) {
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }

    return result;
};
