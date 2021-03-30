import { Router  } from "express";
import { getFacturas, create, getFactura, getEmisorById, getTarifasIva } from "../controllers/facturaController" 

const router = Router();

router.get('/emisor/:id', getEmisorById);
router.get('/facturas', getFacturas);
router.get('/factura/:id', getFactura);
router.get('/tarifasIva', getTarifasIva);
router.post('/factura', create);

export default router;