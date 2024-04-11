import { FORMULA_REGEX } from '../../constants/Config'
import { SpreadSheetType } from '../../store/store'
import { ICell } from '../../@types'

/**
 * Check cell if it's a formula or just a raw value;
 * - add error param if it has circle reference A1:A3 -> A2:A1 -> A3:A1
 * @param value
 * @param cellId
 * @param spreadsheet
 */
export const getCellValue = (
	value: string,
	cellId: string,
	spreadsheet: SpreadSheetType
): ICell => {
	const valueMatch = value.match(FORMULA_REGEX) || []
	const reference = valueMatch[0]?.slice(1, valueMatch[0].length)

	let cellValue: ICell = {
		id: cellId,
		value,
		formula: '',
		reference: '',
		status: 'default',
	}

	if (value.startsWith('=')) {
		/**
		 * This should be another function
		 * It should be outside component
		 */
		let firstKey = reference
		while (
			spreadsheet[firstKey]?.reference !== '' ||
			!spreadsheet[firstKey]
		) {
			if (spreadsheet[firstKey]?.reference === cellId) {
				return {
					...cellValue,
					value: '#ERROR',
					formula: value,
					error: true,
				}
			}
			firstKey = spreadsheet[firstKey].reference || ''
		}

		if (reference) {
			cellValue = {
				...cellValue,
				reference,
				formula: value,
				value: spreadsheet[reference]?.value || value,
			}
		}
	}
	return cellValue
}
