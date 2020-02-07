import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TaskStatus } from "./task.model";

@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: "enum",
        enum: TaskStatus,
        default: TaskStatus.OPEN
    })
    status: TaskStatus;
}