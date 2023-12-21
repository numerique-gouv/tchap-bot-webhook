import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Habilitation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    userId: string;
}
