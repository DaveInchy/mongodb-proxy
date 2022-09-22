import { readFileSync, writeFileSync } from 'fs';

export function readJsonFileSync(filePath: string) {
    return JSON.parse(JSON.stringify(readFileSync(new URL(filePath, `file://${process.env['PWD']}/`))));
}

export function writeJsonFileSync(file: string, json: any = {}): void {
    return writeFileSync(new URL(file, `file://${process.env['PWD']}/`), JSON.stringify(JSON.parse(json)));
}

export function getFileSync(file): string {
    return readFileSync(new URL(file, `file://${process.env['PWD']}/`)).toString('utf8');
}

export function setFileSync(filePath: string, newText: string = "New Text"): void {
    return writeFileSync(new URL(filePath, `file://${process.env['PWD']}/`), newText);
}