import { Router } from "express";
import { generateShiftWeakly, remove, removeByProf, update } from "./shift.controler.js";
export const shiftRouter = Router();
shiftRouter.post('/:id/professional', generateShiftWeakly);
shiftRouter.put('/:id/:dni', update);
shiftRouter.delete('/:id', remove);
shiftRouter.delete('/:lic/prof', removeByProf);
//# sourceMappingURL=shift.route.js.map