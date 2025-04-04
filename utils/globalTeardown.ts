import fs from 'fs';
import path from 'path';
import { encryptEnv } from '../utils/cryptoUtils';

export default async function globalTeardown() {
  const fileName = `../config/.env.${process.env.ENVIRONMENT || 'qa'}`;
  const filePath = path.resolve(__dirname, fileName);
  await encryptEnv(filePath);
  const testResultsPath = path.resolve(__dirname, '../test-results');
  const allureReportPath = path.resolve(__dirname, '../allure-results');
  const reportsPath = path.resolve(__dirname, '../reports');
  const date = new Date().toISOString().replace(/[.:]/g, '-');
  const outputDir = path.join(reportsPath, date);
  const environmentFile = path.join(outputDir, 'environment.properties');
  const environmentDetails = `
     Environment=${process.env.ENVIRONMENT || 'qa'}
     OS=Windows 10
     `;

  if (!fs.existsSync(reportsPath))
    fs.mkdirSync(reportsPath, { recursive: true });
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(environmentFile, environmentDetails.trim());
  if (fs.existsSync(testResultsPath)) {
    fs.renameSync(testResultsPath, path.join(outputDir, 'test-results'));
  }
  if (fs.existsSync(allureReportPath)) {
    fs.renameSync(allureReportPath, path.join(outputDir, 'allure-results'));
  }
}
