type TCell = string|number

const placeHolder = 'Only For Paid User'

export function coverSomething(arr:TCell[][], rowPos = 3, colPos = 2){
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

