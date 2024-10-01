import { Router } from "express";
import {register, login, userInfo} from "@/controllers/user";
import {protect} from "@/middlewares/auth";
const router = Router();

router.route('/api/register').post(register);
router.route('/api/login').post(login);
router.route('/api/userInformation').get(protect,userInfo);
export default router;