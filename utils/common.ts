export type TCell = string|number|Date

const placeHolder = 'Only For Paid User'

export function coverSomething(arr:TCell[][], rowPos = 2, colPos = 2){
    const rowMid = Math.floor(arr.length * (1 - 1/rowPos))
    const colMid = Math.floor(arr[0].length * (1 - 1/colPos))
    const rowEnd = arr.length 
    const colEnd = arr[0].length 

    for (let i = rowMid; i < rowEnd; i++){
        for (let j = colMid; j < colEnd; j++){
            arr[i][j] = placeHolder
        }   
    }
    return arr
}


type TEntity = Record<string, unknown>

export function primitiveData(value:unknown){
    if (value === null || value === undefined) return ''
	if (value instanceof Date) return value
    if (typeof value !== 'object') return value as TCell
    return String(value)
}

export function tabularData(data: TEntity[]):TCell[][]{
    if (data.length === 0) return []
    const xTicker = Object.keys(data[0])

    const res = data.map(el=>xTicker.map(k=>primitiveData(el[k])))

    // insert the header
    return [xTicker, ...res]
}

export function get(obj:Record<string, unknown>, pathRaw: string, def: unknown) {

	/**
	 * If the path is a string, convert it to an array
	 * @param  {String} pathRaw The path
	 * @return {Array}             The path array
	 */
	function stringToPath(path: string) {
		// Create new array
		const output:string[] = [];

		// Split to an array with dot notation
		path.split('.').forEach(function (item, index) {

			// Split to an array with bracket notation
			item.split(/\[([^}]+)\]/g).forEach(function (key) {

				// Push to the new array
				if (key.length > 0) {
					output.push(key);
				}

			});

		});

		return output;

	};

	// Get the path as an array
	const path = stringToPath(pathRaw);

	// Cache the current object
	let current: Record<string, unknown> = obj;

	// For each item in the path, dig into the object
	for (var i = 0; i < path.length; i++) {

		// If the item isn't found, return the default (or null)
		if (!current[path[i]]) return def;

		// Otherwise, update the current  value
		current = current[path[i]] as Record<string, unknown>;

	}

	return current;

};
