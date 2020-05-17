export class DataPoint {
    date: Date;
    cases: number;


    constructor(date: Date, cases: number) {
        this.date = new Date(date);
        this.cases = cases;
    }

    getParsedTime(): Date {
        return new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate())
    }
}