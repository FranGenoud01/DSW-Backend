import { Patient } from "./patient.entity.js";
import { Repository } from "../shared/repository.js";
import { pool } from "../shared/conn.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class PatientRepository implements Repository<Patient> {
  public async findAll(): Promise<Patient[] | undefined> {
  try {
    const [patients] = await pool.query('SELECT * FROM patients');
    return patients as Patient[];
  } catch (error) {
    console.error('Error al buscar pacientes:', error);
    throw error;
  }
  }
  public async findOne(item: {id: string}): Promise<Patient | undefined>{
    try {
      const DNI = Number.parseInt(item.id)
      const [patients] = await pool.query<RowDataPacket[]>('SELECT * FROM patients WHERE dni = ?', [DNI]);
      if (patients.length === 0) {
      return undefined;
      }
      const patient = patients[0] as Patient;
      return patient;
    } catch (error) {
      console.error('Error al buscar paciente por DNI:', error);
      throw error;
    }
  }
  public async add(patientInput: Patient): Promise<Patient | undefined>{
    try {
      const { DNI, nombre, ...patientRow } = patientInput
      const [result]= await pool.query<ResultSetHeader>('INSERT INTO patients SET ?', [patientRow])
      patientInput.DNI=result.insertId
      return patientInput
    } catch (error) {
      console.error('Error al generar el paciente:', error)
      throw error
    }
  }
  public async update(id: string, patientInput: Patient): Promise<Patient | undefined> {
    try{
      const DNI = Number.parseInt(id)
      const { nombre, ...patientRow } = patientInput
      await pool.query('UPDATE patients SET ? where dni = ?', [patientRow,DNI])
      return await this.findOne({id})
    }catch (error) {
      console.error('Error al actualizar el paciente:', error);
      throw error;
    }
  }
  public async delete(item: { id: string; }): Promise<Patient | undefined> {
   try {const patientToDelete = await this.findOne(item)
    const DNI = Number.parseInt(item.id)
    await pool.query('DELETE FROM patients WHERE dni=?', DNI)
    return patientToDelete
  } catch (error) {
      console.error('Error al eliminar el paciente:', error);
      throw error;
    }

  }

}