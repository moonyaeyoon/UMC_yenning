import express from 'express';
import asyncHandler from 'express-async-handler';
import { addReview } from '../controllers/review.controller.js';

export const reviewRouter = express.Router();

reviewRouter.post('/:storeId/reviews', asyncHandler(addReview));
