import { src, dest, series, TaskFunctionCallback } from 'gulp';
import { Transform } from 'stream';
import * as VinylFile from 'vinyl';
import * as path from 'path'
import { execSync } from 'child_process'

const destDir = path.resolve(__dirname, 'app-script-build/')

const testScriptId = '18AVHO17-GU-FM8-SX0E-q9uZgnn2euUEkpKwNIB-7-EWKW08rny97JqZ'

const replacer = new Transform({
    objectMode: true,
    async transform(chunk: VinylFile, encoding: string, callback) {
        console.log('processing file: ', chunk.basename)

        let utfContent = chunk.contents?.toString('utf-8');
        if (!utfContent) {
            callback(null, chunk)
            return
        }
        // replace process.env.NODE_ENV
        if (chunk.extname === '.js') {
            utfContent = utfContent?.replace(/process\.env\.NODE_ENV/g, JSON.stringify(process.env.NODE_ENV))
        }

        // replace the rootDir and projectID 
        if (chunk.basename === '.clasp.json') {
            const JSONContent = JSON.parse(utfContent)
            JSONContent.rootDir = destDir

            if (process.env.NODE_ENV === 'test') {
                JSONContent.scriptId = testScriptId
            }

            utfContent = JSON.stringify(JSONContent)
        }

        chunk.contents = Buffer.from(utfContent)
        callback(null, chunk);
    }
})



function preprocess() {
    return src(['app-script/*', 'app-script/.*'])
        .pipe(replacer)
        .pipe(dest(destDir));
}

function push(cb: TaskFunctionCallback) {
    try {
        const res = execSync(`npx @google/clasp -P ${destDir} push`, {
            cwd: __dirname,
            input: 'y'
        })
        console.log(res.toString())
        cb()
    } catch (err: unknown) {
        cb(err as Error)
    }
}

function cleanWorkplace(cb:TaskFunctionCallback){
    const res = execSync(`rm -fr ${destDir}`)
    console.log(res.toString())
    cb()
}

exports.default = series(preprocess, push)