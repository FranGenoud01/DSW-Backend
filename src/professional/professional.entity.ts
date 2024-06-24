import {
  Cascade,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
  Rel,
} from '@mikro-orm/core';
import { Speciality } from '../specialty/speciality.entity.js';
import { HealthInsurance } from '../health insurance/healthInsurance.entity.js';

@Entity()
export class Professional {
  @PrimaryKey({ nullable: false, unique: true })
  public licenseNumber!: string;

  @ManyToOne(() => Speciality, { nullable: true, unique: false })
  speciality!: Rel<Speciality>;

  @Property({ nullable: false })
  public name!: string;

  @Property({ nullable: false })
  public surname!: string;

  @Property({ nullable: false })
  public price!: number;

  @ManyToMany(
    () => HealthInsurance,
    (healthInsurance) => healthInsurance.professionals,
    {
      cascade: [Cascade.ALL],
      owner: true,
    }
  )
  healthInsurances!: HealthInsurance[];
}
