import fs from 'fs';
import { parse } from 'csv-parse/sync';
import path from 'path';
// import XLSX from 'xlsx';
export class FileReaderUtil {
    static async readCSV(fileName: string): Promise<any[]> {
        const filePath = path.join(__dirname, '../test-data/e2e', `${fileName}.csv`);
        return parse(fs.readFileSync(filePath), {
            columns: true,
            skip_empty_lines: true
          });
    }

    // static readExcel(fileName: string, name?: string, index?: number): any {
    //     const filePath = path.join(__dirname, '../test-data/e2e', `${fileName}.xlsx`);
    //     const workbook = XLSX.readFile(filePath);
    //     const sheetName = workbook.SheetNames[index || 0];
    //     const sheet = workbook.Sheets[name || sheetName];
    //     return XLSX.utils.sheet_to_json(sheet);
    // }
}
