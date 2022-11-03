import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { getBySlug } from '../../utils/markdown'


interface IProps {
    content: string;
    menu: string;
}

export default function Doc({ content, menu }:IProps) {
    return <div className='prose my-10 mx-auto'>
        <div className='font-extrabold text-4xl text-center'>Document</div>
        <div dangerouslySetInnerHTML={{__html: menu}}></div>
        <div className='flex-auto' dangerouslySetInnerHTML={{__html: content}}></div>
    </div>;
}


interface IParams extends ParsedUrlQuery {
    slug: string
}


export const getStaticPaths: GetStaticPaths = async () => {
    const arr: string[] = ['historical']
    const paths = arr.map((slug) => {
        return {
            params: { slug },
        }
    })
    return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params as IParams // no longer causes error
    const content = await getBySlug(slug)
    const menu = await getBySlug('catalogue')
    return { props:{content, menu} }
}
