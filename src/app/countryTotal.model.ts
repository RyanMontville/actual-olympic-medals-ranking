export class CountryTotals {
    constructor(
        public countryCode: string,
        public flagURL: string,
        public gold: number,
        public silver: number,
        public bronze: number,
        public total: number,
        public originalRank: number,
        public actualRank: number
    ) {}
}