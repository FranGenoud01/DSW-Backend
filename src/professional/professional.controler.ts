import { NextFunction, Request, Response } from 'express';
import { orm } from '../shared/orm.js';
import ProfessionalService from './professional.service.js';

const entityManager = orm.em;
const professionalService = new ProfessionalService(entityManager);
function sanitizedProfessionalInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    licenseNumber: req.body.licenseNumber,
    speciality: req.body.speciality,
    name: req.body.name,
    surname: req.body.surname,
    healthInsurances: req.body.healthInsurances,
    price: req.body.price,
  };
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] == undefined)
      delete req.body.sanitizedInput[key];
  });
  next();
}

async function findall(req: Request, res: Response) {
  try {
    const professionals = await professionalService.findAllProfessionals();
    res
      .status(200)
      .json({ message: 'Found all professionals', data: professionals });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const licenseNumber = req.params.id;
    const professional = await professionalService.findOneProfessional(
      licenseNumber
    );
    res.status(200).json({ message: 'Found professional', data: professional });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const professional = await professionalService.createProfessional(req.body);
    res
      .status(201)
      .json({ message: 'Professional created', data: professional });
  } catch (error: any) {
    return res
      .status(400)
      .json({ message: `Ya existe un profesional con esa matrícula` });
  }
}

async function getProf(req: Request, res: Response) {
  try {
    const idSpeciality = parseInt(req.params.id);
    const professionals = await professionalService.getProfBySpeciality(
      idSpeciality
    );
    res
      .status(200)
      .json({ message: 'Found all professionals', data: professionals });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getProfByHealthInsurance(req: Request, res: Response) {
  try {
    const idHealthInsurance = parseInt(req.params.id);
    const professionals = await professionalService.getProfByHealthInsurance(
      idHealthInsurance
    );
    res
      .status(200)
      .json({ message: 'Found all professionals', data: professionals });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function getProfByHealthAndSpeciality(req: Request, res: Response) {
  try {
    const idHealthInsurance = parseInt(req.params.healthInsurance);
    const idSpeciality = parseInt(req.params.speciality);
    const professionals =
      await professionalService.getProfBySpecialityAndHealthInsurance(
        idSpeciality,
        idHealthInsurance
      );
    res
      .status(200)
      .json({ message: 'Found all professionals', data: professionals });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const licenseNumber = req.params.id;
    const professionalToUpdate = await professionalService.updateProfessional(
      licenseNumber,
      req.body
    );
    res
      .status(200)
      .json({ message: 'Professional updated', data: professionalToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const licenseNumber = req.params.id;
    await professionalService.removeProfessional(licenseNumber);
    res.status(200).json({ message: 'Professional removed successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {
  sanitizedProfessionalInput,
  findOne,
  findall,
  add,
  update,
  remove,
  getProf,
  getProfByHealthInsurance,
  getProfByHealthAndSpeciality,
};
