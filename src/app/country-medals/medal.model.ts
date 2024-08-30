export class Medal {
    constructor(
        public medalDate: string,
        public country: string,
        public medalistName: string,
        public fullEventName: string,
        public sport: string,
        public event: string,
        public eventID: number,
        public medalCode: string,
        public numAthletes: string) {
    }
}