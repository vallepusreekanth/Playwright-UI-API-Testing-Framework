import { test } from "../../fixtures/fixtures";
import users from "../../test-data/e2e/users.json";
import { FileReaderUtil } from "../../utils/fileReader";

test.describe('Data Driven Tests JSON', () => {
    for (const user of users) {
        test.skip(`Windows ${user.id}`, { tag: ['@Smoke'] }, async ({ homePage, alertWindowsPage }) => {
            test.step('Goto Windows', async () => {
                await homePage.clickOnAlertsWindowsFrames();
                await alertWindowsPage.clickOnBrowserWindows();
            });
        });
    }
});

test.describe('Data Driven Tests CSV', async() => {
    for( const user of await FileReaderUtil.readCSV('users')) {
        test.skip(`Windows ${user.Id}`, { tag: ['@Smoke'] }, async ({ homePage, alertWindowsPage }) => {
            test.step('Goto Windows', async () => {
                await homePage.clickOnAlertsWindowsFrames();
                await alertWindowsPage.clickOnBrowserWindows();
            });
        });
    }
});

// test.describe('Data Driven Tests Excel', async() => {
//     for( const user of await FileReaderUtil.readExcel('users')) {
//         test.skip(`Windows ${user.Id}`, { tag: ['@Smoke'] }, async ({ homePage, alertWindowsPage }) => {
//             test.step('Goto Windows', async () => {
//                 await homePage.clickOnAlertsWindowsFrames();
//                 await alertWindowsPage.clickOnBrowserWindows();
//             });
//         });
//     }
// });