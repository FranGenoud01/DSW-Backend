export class Patient{
  constructor(
    public nombre: string, 
    public apellido: string, 
    public direccion: string, 
    public telefono: string, 
    public sexo:string, 
    public mail:string, 
    public usuario:string, 
    public password:string,
    public DNI?: number, 
  ){}
}