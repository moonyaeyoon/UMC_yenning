// routes/store.route.js
import express from 'express';
import asyncHandler from 'express-async-handler';
import { addStoreToRegionController } from '../controllers/store.controller.js';

export const storeRouter = express.Router();

storeRouter.post('/:regionId/store', asyncHandler(addStoreToRegionController));
