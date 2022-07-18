export type CellContentType = 'raw' | 'reference';
export interface ICell {
    row: string,
    col: string,
    value: string,
    formula: string,
    type: CellContentType,
    references: string[]
}