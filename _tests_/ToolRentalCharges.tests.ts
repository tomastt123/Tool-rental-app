// _tests_/ToolRentalCharges.test.ts
import { toolData } from '../utilities/utils'; // Adjust path

describe('ToolRentalCharges JSON Structure', () => {
  it('should match the expected tool rental charges', () => {
    const expectedRentalCharges = [
      { type: 'ladder', dailyCharge: 1.99 },
      { type: 'chainsaw', dailyCharge: 1.49 },
      { type: 'jackhammer', dailyCharge: 2.99 },
    ];

    const actualRentalCharges = [
      { type: toolData.LADW.type, dailyCharge: toolData.LADW.dailyCharge },
      { type: toolData.CHNS.type, dailyCharge: toolData.CHNS.dailyCharge },
      { type: toolData.JAKD.type, dailyCharge: toolData.JAKD.dailyCharge },
    ];

    expect(actualRentalCharges).toEqual(expectedRentalCharges);
  });
});
