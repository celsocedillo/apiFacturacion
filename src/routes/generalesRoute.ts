import { Router  } from "express";
import { getBodegas, getClienteByRuc, create } from "../controllers/generalesController" 

const router = Router();

router.get('/bodegas', getBodegas);
router.post('/cliente', create);
router.get('/cliente/:documento', getClienteByRuc);


export default router;