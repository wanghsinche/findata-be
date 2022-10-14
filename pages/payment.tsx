import type { NextPage, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import { MyBanner } from '../component/banner'
import styles from '../styles/Home.module.css'
import { stripeServer } from '../utils/stripe'

const isTest = process.env.NODE_ENV === 'development'

interface IPriceCardProps {
  price: Stripe.Price;
  email: string;
}
const PriceCard = (p: IPriceCardProps) => {
  const el = p.price
  const product = p.price.product as Stripe.Product
  const isDefault = el.id === product.default_price
  const extraClassName = isDefault ? 'rounded-lg gradient' : 'rounded-none bg-white';
  const extraTextColor = isDefault ? 'text-white' : 'text-gray-600';
  return <div className={"flex flex-col mx-auto lg:mx-0  mt-4 " + extraClassName}>
    <div className={"flex-1  rounded-t rounded-b-none overflow-hidden shadow " + extraTextColor}>
      <div className="p-8 text-3xl font-bold text-center border-b-4">
        {el.metadata?.title}
      </div>
      <ul className="w-full text-center text-sm">
        <li className="border-b py-4">{el.metadata?.desc}</li>
      </ul>
    </div>
    <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
      <div className="w-full pt-6 text-3xl text-gray-600 font-bold text-center">
        {el.currency} {toMoney(el.unit_amount)} <span className="text-base"> {el.recurring ? `/ ${el.recurring.interval}` : ''}</span>
      </div>
      <div className="flex items-center justify-center">
        <a className="mx-auto lg:mx-0 hover:underline gradient2 text-gray-800 font-bold rounded my-6 py-4 px-8 shadow-lg" href={getCheckout(el.id, p.email)} target="_blank" >
          Purchase
        </a>
      </div>
    </div>
  </div>
}


function getCheckout(priceId: string, email: string) {
  const query = new URLSearchParams()
  if (priceId) query.set('priceId', priceId)
  if (email) query.set('email', email)
  return `/api/stripe-checkout?${query.toString()}`
}

function toMoney(num: number | null) {
  if (!num) return '--'
  return (num / 100).toFixed(2)
}

interface IProps {
  priceList: Stripe.Price[]
}

const Page: NextPage<IProps> = ({ priceList }) => {
  const router = useRouter()
  const email = router.query.email as string;

  const firstSection = <section className="container mx-auto">
    <MyBanner />
  </section>;

  const myTable = priceList.filter(el => el.active).map(el => <PriceCard key={el.id} price={el} email={email} />)

  return (
    <div >
      {firstSection}

      <section className="flex container m-auto mb-20 justify-center">
        {myTable}
      </section>
    </div>
  )
}

// This gets called on every request
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const productId = ctx.query.product as string || 'prod_Max8KnDwRMwu9l'; // default product
  if (!productId) return { props: { priceList: [] } }
  // Fetch data from external API
  const priceData = await stripeServer.prices.search({ query: `product: '${productId}' AND active:'true'`, expand: ['data.product'] })

  // Pass data to the page via props
  return { props: { priceList: priceData.data } }
}



export default Page
