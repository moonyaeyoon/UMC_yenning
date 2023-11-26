// temp.route.js

import express from 'express';
import { tempTest, tempException } from '../controllers/temp.controller.js';

export const tempRouter = express.Router();

//test
tempRouter.get('/test', tempTest);
//에러 핸들링
tempRouter.get('/exception/:flag', tempException);
