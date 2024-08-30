export class AthleteInfo {
    constructor(
        public athleteName: string,
        public country: string,
        public flagUrl: string,
        public goldCount: number,
        public silverCount: number,
        public bronzeCount: number
    ) {}
}

export class Medal {
    constructor(
        public medalDate: string,
        public athleteName: string,
        public eventName: string,
        public eventID: number,
        public medalEmoji: string
    ) {}
}