import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Alert {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    roomId: string;

    @Column()
    url: string;
}
