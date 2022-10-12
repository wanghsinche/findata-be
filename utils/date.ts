export function paddingZero(t:string, bit:number){
    const zeros = Array(bit).fill('0').join('');
    const rest = Math.max(bit - t.length, 0);
    return zeros.slice(0, rest)+t
}
export function formatDate(d:Date){
    const realMonth = d.getMonth()+1
    const month =  paddingZero(String(realMonth), 2)
    const date = paddingZero(String(d.getDate()), 2);
    return `${d.getFullYear()}-${month}-${date}`
}

export function roundToDay(n:number){
    const reminder = n%(24*3600000)
    return n-reminder
}