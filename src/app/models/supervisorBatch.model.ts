import { Supervisor } from './supervisor.model';

export class SupervisorBatch {
    Batch: String;
    Supervisors: Supervisor[];

    constructor() {
        this.Batch = '';
        this.Supervisors = new Array<Supervisor>();
    }
}