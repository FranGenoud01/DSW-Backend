import { Entity, ManyToOne, PrimaryKey, Property, Rel } from '@mikro-orm/core';
import { HealthInsurance } from '../health insurance/healthInsurance.entity.js';

@Entity()
export class Patient {
  @PrimaryKey({ nullable: false, unique: true })
  public DNI!: string;

  @Property({ nullable: false })
  public name!: string;

  @Property({ nullable: false })
  public surname!: string;

  @Property({ nullable: false })
  public birthdate!: string;

  @ManyToOne(() => HealthInsurance, { nullable: true, unique: false })
  healthInsurance!: Rel<HealthInsurance>;

  @Property({ nullable: false })
  public adress!: string;

  @Property({ nullable: false })
  public phoneNumber!: string;

  @Property({ nullable: false })
  public sex!: string;

  @Property({ nullable: false })
  public email!: string;

  @Property({ nullable: false })
  public password!: string;

  @Property({ nullable: false })
  public role!: string;
}
