// @ts-nocheck
import { readFileSync, writeFileSync } from 'fs';

// @ts-ignore
export function readJsonFileSync(file) {
    return JSON.parse(
        // @ts-ignore
        readFileSync(
            // @ts-ignore
            new URL(file, `file://${process.env.PWD}/`)
        )
    ) ? true : false;
}

// @ts-ignore
export function writeJsonFileSync(file: string, json: any = {}) {
    // @ts-ignore
    return writeFileSync(
        new URL(file, `file://${process.env.PWD}/`),
        JSON.stringify(
            JSON.parse(json)
        )
    );
}

// @ts-ignore
export function getFileSync(file) {
    return readFileSync(
        // @ts-ignore
        new URL(file, `file://${process.env.PWD}/`)
    );
}