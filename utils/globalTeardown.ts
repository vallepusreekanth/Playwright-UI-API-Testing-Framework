import fs from "fs";
import path from "path";
import { encryptEnv } from '../utils/cryptoUtils';

export default async function globalTeardown() {
    const fileName = `../config/.env.${process.env.ENVIRONMENT || 'qa'}`;
    const filePath = path.resolve(__dirname, fileName);
    await encryptEnv(filePath);
    const testResultsPath = path.resolve(__dirname, '../test-results');
    const playwrightReportPath = path.resolve(__dirname, '../playwright-report');
    const reportsPath = path.resolve(__dirname, '../reports')
    const date = new Date().toISOString().replace(/[.:]/g, '-')
    const outputDir = path.join(reportsPath, date)

    if (!fs.existsSync(reportsPath))
        fs.mkdirSync(reportsPath, { recursive: true });
    fs.mkdirSync(outputDir, { recursive: true });
    if (fs.existsSync(testResultsPath) && fs.existsSync(playwrightReportPath)) {
        fs.renameSync(testResultsPath, path.join(outputDir, 'test-results'));
        fs.renameSync(playwrightReportPath, path.join(outputDir, 'playwright-report'));
    }
}