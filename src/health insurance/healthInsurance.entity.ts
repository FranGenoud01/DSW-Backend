import { Cascade, Collection, Entity, ManyToMany, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Patient } from "../patient/patient.entity.js";
import { Professional } from "../professional/professional.entity.js";

@Entity()
export class HealthInsurance extends BaseEntity{
  @Property({nullable:false, unique:true})
  public description!: string;

  @OneToMany(()=> Patient, (patient)=>patient.healthInsurance,{
    cascade:[Cascade.ALL]
  })
  patients = new Collection<Patient>(this)

  @ManyToMany(() => Professional, (professional) => professional.healthInsurances)
  professionals = new Collection<Professional>(this)
}