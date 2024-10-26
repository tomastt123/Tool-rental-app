// _tests_/Tools.test.ts
import { toolData } from '../utilities/utils'; // Adjust path

describe('Tools JSON Structure', () => {
  it('should match the expected tools structure', () => {
    const expectedTools = [
      { type: 'chainsaw', code: 'CHNS', brand: 'Stihl' },
      { type: 'ladder', code: 'LADW', brand: 'Werner' },
      { type: 'jackhammer', code: 'JAKD', brand: 'DeWalt' },
      { type: 'jackhammer', code: 'JAKR', brand: 'Ridgid' },
    ];

    const actualTools = [
      { type: toolData.CHNS.type, code: 'CHNS', brand: toolData.CHNS.brand },
      { type: toolData.LADW.type, code: 'LADW', brand: toolData.LADW.brand },
      { type: toolData.JAKD.type, code: 'JAKD', brand: toolData.JAKD.brand },
      { type: toolData.JAKR.type, code: 'JAKR', brand: toolData.JAKR.brand },
    ];

    expect(actualTools).toEqual(expectedTools);
  });
});
