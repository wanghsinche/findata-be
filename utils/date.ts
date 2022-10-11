export function formatDate(d:Date){
    const realMonth = d.getMonth()+1
    const month =  realMonth >= 10? String(realMonth): '0'+ realMonth;

    return `${d.getFullYear()}-${month}-${d.getDate()}`
}