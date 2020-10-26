export class SupervisorView {
    Active: Boolean;
    FullName: String;
    Designation: String;
	FYP_I: Number;
	FYP_II: Number;
	FYP_III: Number;

    constructor(active: Boolean, FullName: String, designation: String, FYP_I: Number, FYP_II: Number, FYP_III: Number) {
        this.Active = active;
        this.FullName = FullName;
        this.Designation = designation;
        this.FYP_I = FYP_I;
        this.FYP_II = FYP_II;
        this.FYP_III = FYP_III;
    }
}