import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IStartup } from '../../utils/types/startup.interface';

@Entity()
export class Startup implements IStartup {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ type: 'varchar', length: 511 })
    name: string;

    @Column({ type: 'varchar', length: 511, default: null })
    walletId: string | null;

}
