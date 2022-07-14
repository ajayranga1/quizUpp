import express from 'express';
const Router = express.Router();

import { submitResponse } from './../controllers/responseController';

Router.route('/').post(submitResponse);

export default Router;
