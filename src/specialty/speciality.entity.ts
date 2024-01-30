import { Cascade, Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Professional } from "../professional/professional.entity.js";

@Entity()
export class Speciality extends BaseEntity{
  @Property({nullable:false, unique:true})
  public description!: string;

  @OneToMany(()=> Professional, (professional)=> professional.speciality,{
    cascade:[Cascade.ALL]
  })
  professionals= new Collection<Professional>(this)
}