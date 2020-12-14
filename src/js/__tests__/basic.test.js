import { validateNumber, definePaymentSystem } from '../basic';

test.each([
  ['valid', '5105105105105100', true],
  ['valid', '4111111111111111', true],
  ['not valid', '4211111111111111', false],
  ['not valid', '4tt1111111111111', false],
  ['not valid', '5105 1051 0510', false],
  ['not valid', '', false],
])(
  ('should be s%'),
  (_, input, expected) => {
    expect(validateNumber(input)).toBe(expected);
  },
);

test.each([
  ['mir', '23456789', 'mir'],
  ['amexp', '3411111111111111', 'amexp'],
  ['amexp', '37111111111', 'amexp'],
  ['not defined', '3811111111111111', 'not defined'],
  ['visa', '4211111111111111', 'visa'],
  ['mastercard', '5211111111111111', 'mastercard'],
  ['mastercard', '5556677', 'mastercard'],
  ['maestro', '5011111111111111', 'maestro'],
  ['maestro', '5811111111111111', 'maestro'],
  ['maestro', '6311111111111111', 'maestro'],
  ['maestro', '6711111111111111', 'maestro'],
  ['not defined', '6611111111111111', 'not defined'],
  ['not defined', '7811111111111111', 'not defined'],
])(
  ('should be s%'),
  (_, input, expected) => {
    expect(definePaymentSystem(input)).toBe(expected);
  },
);

import puppeteer from 'puppeteer';
jest.setTimeout(30000);
describe('card number validator', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'https://localhost:9000';
  beforeAll(async () => {
    browser = await puppeteer.launch({
      //headless: false,
      //slowMo: 100,
      //devtools: true,
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
});
  describe('card number validator', () => {
    test('should validate card number', async () => {
      await page.goto(baseUrl);
      const form = await page.$('[id=validator-container]');
      const input = await form.$('[id=field]');
      await input.type('5105 1051 0510 5100');
      const submit = await form.$('[id=validate-button]');
      submit.click();
      //await page.waitForSelector('[data-id=innogrn-input].valid');
    });
  });
});
