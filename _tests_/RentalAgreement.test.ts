/**
 * @jest-environment node
 */


import { createRentalAgreement } from '../app/api/checkout/route';

describe('Rental Agreement Logic', () => {
  it('creates a valid rental agreement', () => {
    const mockData: {
      toolCode: 'LADW' | 'CHNS' | 'JAKD' | 'JAKR',  // Explicit type union here
      checkoutDate: string;
      returnDate: string;
      discountPercent: number;
    } = {
      toolCode: 'LADW', // This must be one of the valid tool codes
      checkoutDate: '2024-10-10',
      returnDate: '2024-10-15',
      discountPercent: 10,
    };

    const result = createRentalAgreement(mockData);

    // Check that the status is 200 (success)
    expect(result.status).toBe(200);

    // Check if the result contains valid data
    if (result.data) {
      expect(result.data.toolCode).toBe('LADW');
      expect(result.data.finalAmount).toBeDefined();
    }
  });

  it('returns error for invalid tool code', () => {
    const mockData = {
      toolCode: 'INVALID' as any, // Use 'any' here because 'INVALID' is not part of the expected types
      checkoutDate: '2024-10-10',
      returnDate: '2024-10-15',
      discountPercent: 10,
    };

    const result = createRentalAgreement(mockData);

    // Check that the status is 400 (error)
    expect(result.status).toBe(400);
    expect(result.error).toBe('Invalid tool code entered. Please provide a valid tool code.');
  });
});
