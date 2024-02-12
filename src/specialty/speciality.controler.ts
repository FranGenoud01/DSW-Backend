import { NextFunction, Response, Request } from 'express';
import { orm } from '../shared/orm.js';
import SpecialityService from './speciality.service.js';

const entityManager = orm.em;
const specialityService = new SpecialityService(entityManager);

function sanitizedSpecialityInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    description: req.body.description,
  };
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findall(req: Request, res: Response) {
  try {
    const specialities = await specialityService.findAllSpecialities();
    res
      .status(200)
      .json({ message: 'Found all specialities', data: specialities });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const speciality = await specialityService.findOneSpeciality(id);
    res.status(200).json({ message: 'Found speciality', data: speciality });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const speciality = await specialityService.createSpeciality(req.body);
    res.status(201).json({ message: 'Speciality created', data: speciality });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const specialityToUpdate = await specialityService.updateSpeciality(
      id,
      req.body
    );
    res
      .status(200)
      .json({ message: 'Speciality updated', data: specialityToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    await specialityService.removeSpeciality(id);
    res.status(200).json({ message: 'Speciality removed successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizedSpecialityInput, findall, findOne, add, update, remove };
