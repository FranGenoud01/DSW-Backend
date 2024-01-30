import { Entity, ManyToOne, Property, Rel } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Patient } from "../patient/patient.entity.js";
import { Professional } from "../professional/professional.entity.js";

@Entity()
export class Shift extends BaseEntity{
  @Property({nullable:false})
  public dateShift!: string;  //Debería ser de tipo date

  @Property({nullable:false})
  public hourShift!: string;  //Debería ser de tipo hour

  @Property({nullable:false})
  public status!: string;  

  @Property({nullable:false})
  public price!: number;

  @ManyToOne(() => Patient, { nullable: true, unique:false})
  dniPatient!: Rel<Patient>

  @ManyToOne(() => Professional, { nullable: false, unique:false})
  licenseProfessional!: Rel<Professional>
}