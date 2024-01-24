import express from 'express';
import { patientRouter } from './patient/patient.routes.js';
const app = express();
app.use(express.json());
app.use('/patients', patientRouter);
app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' });
});
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/');
});
//# sourceMappingURL=app.js.map