import { Router  } from "express";
import { getFacturas, create, getFactura, getEmisorById } from "../controllers/facturaController" 

const router = Router();

router.get('/emisor/:id', getEmisorById);
router.get('/facturas', getFacturas);
router.get('/factura/:id', getFactura);
router.post('/factura', create);

export default router;