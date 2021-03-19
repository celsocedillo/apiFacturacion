import { Router  } from "express";
import { getBodegas, getClienteByRuc } from "../controllers/generalesController" 

const router = Router();

router.get('/bodegas', getBodegas);
router.get('/cliente/:documento', getClienteByRuc);

export default router;