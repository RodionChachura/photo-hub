export interface IPaginated<T> {
    count: number,
    results : T[]
}