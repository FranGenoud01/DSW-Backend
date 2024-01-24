import { pool } from "../shared/conn.js";
export class PatientRepository {
    async findAll() {
        try {
            const [patients] = await pool.query('SELECT * FROM patients');
            return patients;
        }
        catch (error) {
            console.error('Error al buscar pacientes:', error);
            throw error;
        }
    }
    async findOne(item) {
        try {
            const DNI = Number.parseInt(item.id);
            const [patients] = await pool.query('SELECT * FROM patients WHERE dni = ?', [DNI]);
            if (patients.length === 0) {
                return undefined;
            }
            const patient = patients[0];
            return patient;
        }
        catch (error) {
            console.error('Error al buscar paciente por DNI:', error);
            throw error;
        }
    }
    async add(patientInput) {
        try {
            const { DNI, nombre, ...patientRow } = patientInput;
            const [result] = await pool.query('INSERT INTO patients SET ?', [patientRow]);
            patientInput.DNI = result.insertId;
            return patientInput;
        }
        catch (error) {
            console.error('Error al generar el paciente:', error);
            throw error;
        }
    }
    async update(id, patientInput) {
        try {
            const DNI = Number.parseInt(id);
            const { nombre, ...patientRow } = patientInput;
            await pool.query('UPDATE patients SET ? where dni = ?', [patientRow, DNI]);
            return await this.findOne({ id });
        }
        catch (error) {
            console.error('Error al actualizar el paciente:', error);
            throw error;
        }
    }
    async delete(item) {
        try {
            const patientToDelete = await this.findOne(item);
            const DNI = Number.parseInt(item.id);
            await pool.query('DELETE FROM patients WHERE dni=?', DNI);
            return patientToDelete;
        }
        catch (error) {
            console.error('Error al eliminar el paciente:', error);
            throw error;
        }
    }
}
//# sourceMappingURL=patient.repository.js.map