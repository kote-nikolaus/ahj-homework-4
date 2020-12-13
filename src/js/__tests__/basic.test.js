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
