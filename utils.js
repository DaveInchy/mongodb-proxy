import { readFileSync, writeFileSync } from 'fs';

export function readJsonFileSync(file) {
    return JSON.parse(
        readFileSync(
            new URL(file, import.meta.url)
        )
    ) ? true : false;
}

export function writeJsonFileSync(file, json = {}) {
    return writeFileSync(
        new URL(file, import.meta.url),
        JSON.stringify(
            JSON.parse(json)
        )
    ) ? true : false;
}