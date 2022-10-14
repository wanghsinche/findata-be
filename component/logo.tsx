import { productName } from "../utils/constant";
interface IProps {
    color?: string
}
export function MyLogo(p:IProps){
    return <a className={"no-underline hover:no-underline font-bold text-2xl lg:text-4xl items-center inline-flex gap-1 " + p.color} href="/">
    <img src="/logo-small.svg" alt="logo"  className="h-8 w-8 inline-block fill-current"/>
    {productName}
</a>
}