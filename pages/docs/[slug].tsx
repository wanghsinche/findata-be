import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useEffect, useRef } from 'react';

import { getBySlug } from '../../utils/markdown'


interface IProps {
    content: string;
    menu: string;
    slug: string;
}

export default function Doc({ content, menu, slug }: IProps) {
    const catalogueRef = useRef<HTMLDivElement>(null)
    const lowerCaseSlug = slug.toLowerCase();
    useEffect(()=>{
        if (catalogueRef.current) {
            catalogueRef.current.querySelectorAll('li').forEach((el)=>{
                if (el.textContent?.toLowerCase()===lowerCaseSlug){
                    el.classList.add('bg-gray-800')
                    el.classList.add('text-white')
                    return
                } 
                el.classList.remove('bg-gray-800', 'text-white')
            })
        }
    }, [catalogueRef.current])

    return <div className='md:flex items-start sm:mx-1 py-2 gap-2'>
        <div className='md:h-screen md:overflow-auto md:basis-1/4 border-r-2 max-w-xs px-4' ref={catalogueRef} dangerouslySetInnerHTML={{ __html: menu }}></div>

        <div className='md:h-screen overflow-auto grow ' style={{background:'white', color:'black'}}>
            <article className='prose' dangerouslySetInnerHTML={{ __html: content }}>
            </article>
        </div>
    </div>;
}


interface IParams extends ParsedUrlQuery {
    slug: string
}

const availableSlugs = ['start', 'historical', 'quote','quotesummary', 'sample']
export const getStaticPaths: GetStaticPaths = async () => {
    const paths = availableSlugs.map((slug) => {
        return {
            params: { slug },
        }
    })
    return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async (context) => {
    let { slug } = context.params as IParams // no longer causes error
    if (!availableSlugs.includes(slug)){
        slug = availableSlugs[0]
    }
    const content = await getBySlug(slug)
    const menu = await getBySlug('catalogue')
    return { props: { content, menu, slug } }
}
