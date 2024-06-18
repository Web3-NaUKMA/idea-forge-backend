import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IResponse } from '../../utils/types/response.interface';

@Entity()
export class LLMResponse implements IResponse {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    stageId: number;

    @Column({ type: 'varchar' })
    content: string;

    @Column({ type: 'varchar' })
    prompt: string;

}
