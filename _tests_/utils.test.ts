import { formatDate, formatCurrency } from '../utilities/utils';

describe('Utility Functions', () => {
  it('should format date correctly', () => {
    const date = '2024-10-25';
    const formatted = formatDate(date);
    expect(formatted).toBe('10/25/24');
  });

  it('should format currency correctly', () => {
    const value = '29.99';
    const formatted = formatCurrency(value);
    expect(formatted).toBe('$29.99');
  });
});
