import { productName } from "../utils/constant";
interface IProps {
    color?: string
}
export function MyLogo(p:IProps){
    return <a className={"no-underline hover:no-underline font-bold text-2xl lg:text-4xl " + p.color} href="/">
    <svg className="h-6 w-6 inline-block fill-current text-yellow-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M13 8V0L8.11 5.87 3 12h4v8L17 8h-4z"></path>
    </svg>
    {productName}
</a>
}