//import { Builder, By, until, Key } from 'selenium-webdriver';
//import { expect } from 'chai';
//import chrome from 'selenium-webdriver/chrome';
const { Builder, By, until, Key } = require('selenium-webdriver');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');

const baseUrl = 'https://testing-replica-b9141.firebaseapp.com';

async function initializeDriver() {
    let options = new chrome.Options();
    options.addArguments('headless');
    options.addArguments('no-sandbox');
    options.addArguments('disable-dev-shm-usage');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    return driver;
}

// Test 1 - Delete Member With No Member Add
async function testDeleteMemberNoMembers() {
    let driver = await initializeDriver();

    try {
        await driver.get(baseUrl);

        let deleteButton = await driver.findElement(By.id('deleteMemberBtn'));
        await deleteButton.click();

        let alert = await driver.switchTo().alert();
        let alertText = await alert.getText();
	expect(alertText).to.equal("No members available to remove!");
	
        await alert.accept();
    } finally {
        await driver.quit();
    }
}

// Test 2 - Add Member "Due, John" and exclude him and verify the success message
async function testDeleteExistingMember() {
    let driver = await initializeDriver();

    try {
        await driver.get(baseUrl);

        let lastNameField = await driver.findElement(By.id('lastname'));
        await lastNameField.sendKeys('Due');

        let firstNameField = await driver.findElement(By.id('firstname'));
        await firstNameField.sendKeys('John');

        let groupSizeField = await driver.findElement(By.id('GroupSize'));
        await groupSizeField.sendKeys('5');

        let addButton = await driver.findElement(By.id('addMemberBtn'));
        await addButton.click();

        let membersSelect = await driver.wait(until.elementLocated(By.id('members')), 5000);
        await membersSelect.sendKeys('Due, John', Key.ENTER);

        let deleteButton = await driver.findElement(By.id('deleteMemberBtn'));
        await deleteButton.click();

        let alert = await driver.switchTo().alert();
        let alertText = await alert.getText();
        
	expect(alertText).to.equal("Member removed successfully!");
	
        await alert.accept();
    } finally {
        await driver.quit();
    }
}

//Test 3 - Add Member "John Mcclane" and verify if he appears in the members box
async function testAddMember() {
    let driver = await initializeDriver();

    try {
        await driver.get(baseUrl);

        let lastNameField = await driver.findElement(By.id('lastname'));
        await lastNameField.sendKeys('Mcclane');

        let firstNameField = await driver.findElement(By.id('firstname'));
        await firstNameField.sendKeys('John');

        let groupSizeField = await driver.findElement(By.id('GroupSize'));
        await groupSizeField.sendKeys('1');

        let addButton = await driver.findElement(By.id('addMemberBtn'));
        await addButton.click();

        let membersSelect = await driver.wait(until.elementLocated(By.id('members')), 5000);
        let options = await membersSelect.findElements(By.tagName('option'));
        let memberAdded = false;

        for (let option of options) {
            let optionText = await option.getText();
            if (optionText === 'Mcclane, John') {
                expect(optionText).to.equal('Mcclane, John', `Expected 'Mcclane, John', but got '${optionText}'`);
                memberAdded = true;
                break;
            }
        }
        if (!memberAdded) {
            throw new Error('Test failed! Member "Mcclane, John" was not added to the members list.');
        }
    } finally {
        await driver.quit();
    }
}

// Test 4 - Add Member Without Group Size defined
async function testAddMemberWithoutGroupSize() {
    let driver = await initializeDriver();

    try {
        await driver.get(baseUrl);

        let lastNameField = await driver.findElement(By.id('lastname'));
        await lastNameField.sendKeys('Due');

        let firstNameField = await driver.findElement(By.id('firstname'));
        await firstNameField.sendKeys('John');

        let addButton = await driver.findElement(By.id('addMemberBtn'));
        await addButton.click();

        let alert = await driver.switchTo().alert();
        let alertText = await alert.getText();
        expect(alertText).to.equal("Size must be greater than 0");
	
    } finally {
        await driver.quit();
    }
}
testDeleteMemberNoMembers();
testDeleteExistingMember();
testAddMember();
testAddMemberWithoutGroupSize();

