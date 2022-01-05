import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import bcrypt from "bcryptjs";
import Movie from "./Movie";

export enum EmployeeRoles {
    MANAGER = "manager",
    CREATOR = "creator",
    AUTHORIZER = "authorizer"
}

@Entity('employee')
class Employee {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: EmployeeRoles,
        default: EmployeeRoles.CREATOR
    })
    roles: string;

    @OneToMany(() => Movie, movie => movie.employeeConnection)
    moviesConnection: Movie[];

    @BeforeInsert()
    @BeforeUpdate()
    hasPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

}

export default Employee;