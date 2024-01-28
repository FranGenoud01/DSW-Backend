import  express from 'express';
import 'reflect-metadata';
import { patientRouter } from './patient/patient.routes.js';
import { RequestContext } from '@mikro-orm/core';
import { orm, syncSchema } from './shared/orm.js';
import { healthInsuranceRouter } from './health insurance/healthInsurance.routes.js';

const app= express()
app.use(express.json())

app.use((req,res,next)=>{
  RequestContext.create(orm.em,next)
})

await syncSchema().then(()=>{
  console.log('db conectada')
}).catch((e)=>{
  console.log(e)
})

app.use('/patients', patientRouter)
app.use('/healthInsurance', healthInsuranceRouter)

app.use((_, res)=> {
  return res.status(404).send({message: 'Resource not found'})
})

app.listen(3000, ()=> {
  console.log('Server running on http://localhost:3000/')
})