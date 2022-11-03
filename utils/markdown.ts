import { micromark } from 'micromark';
import { readFile } from 'fs/promises';
import {gfmTable, gfmTableHtml} from 'micromark-extension-gfm-table'

import path from 'path';

const postsDirectory = path.resolve(process.cwd(), '_posts')

export async function getBySlug(slug: string){
    const realFileName = slug.replace(/\.md$/, '')

    const fileName = path.resolve(postsDirectory, realFileName+'.md');

    const content = await readFile(fileName, "utf-8");

    const result = micromark(content, {
        extensions: [gfmTable],
        htmlExtensions: [gfmTableHtml]      
    })

    return result


}