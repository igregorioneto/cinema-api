import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import bcrypt from "bcryptjs";
import Employee from "./Employee";

@Entity('movie-authorized')
class MovieAuthorized {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    category: string;

    @Column({ default: false })
    authorized: boolean;

    // @CreateDateColumn({ 
    //    name: 'remove_poster', 
    //    type: "timestamp", 
    //    default: () => "CURRENT_TIMESTAMP"
    // })
    // removePoster: Date;

    @Column({ name: 'employee_id' })
    employeeId: string;

    @ManyToOne(() => Employee, employee => employee.moviesConnection, {
        primary: true,
    })
    @JoinColumn({ name: 'employee_id' })
    employeeConnection: Employee;

}

export default MovieAuthorized;