import express from 'express';
import 'reflect-metadata';
import { patientRouter } from './patient/patient.routes.js';
import { RequestContext } from '@mikro-orm/core';
import { orm, syncSchema } from './shared/orm.js';
import { healthInsuranceRouter } from './health insurance/healthInsurance.routes.js';
import { specialityRouter } from './specialty/speciality.route.js';
import { professionalRouter } from './professional/professional.route.js';
import { shiftRouter } from './shift/shift.route.js';
import { authRouter } from './auth/auth.route.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});

await syncSchema()
  .then(() => {
    console.log('db conectada');
  })
  .catch((e) => {
    console.log(e);
  });

app.use('/patients', patientRouter);
app.use('/healthInsurance', healthInsuranceRouter);
app.use('/speciality', specialityRouter);
app.use('/professional', professionalRouter);
app.use('/shift', shiftRouter);
app.use('/auth', authRouter);

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' });
});

app.listen(process.env.PORT, () => {
  console.log('Server running');
});
