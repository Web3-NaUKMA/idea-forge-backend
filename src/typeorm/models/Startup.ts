import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IStartup } from '../../utils/types/startup.interface';

@Entity()
export class Startup implements IStartup {

    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column({ type: 'varchar', length: 511 })
    title: string;

    @Column({ type: 'varchar' })
    description: String;

    @Column({ type: 'jsonb', default: [] })
    creators: String[];

    @Column({ type: 'timestamptz' })
    dateCreated: Date;

    @Column({ type: 'varchar' })
    stage: String;
}
