import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { messageTreatmentStatusType, messageTreatmentStatuses } from './types';

@Entity()
export class MessageTreatment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    messageExternalId: string;

    @Column('enum', { enum: messageTreatmentStatuses })
    kind: messageTreatmentStatusType;
}
