export const toolData = {
    LADW: { type: "ladder", brand: "Werner", dailyCharge: 1.99, weekendCharge: true, holidayCharge: false },
    CHNS: { type: "chainsaw", brand: "Stihl", dailyCharge: 1.49, weekendCharge: false, holidayCharge: true },
    JAKD: { type: "jackhammer", brand: "DeWalt", dailyCharge: 2.99, weekendCharge: false, holidayCharge: false },
    JAKR: { type: "jackhammer", brand: "Ridgid", dailyCharge: 2.99, weekendCharge: false, holidayCharge: false },
  };
  
  // List of holidays
  export const holidays = ['07/04', '09/06']; // Independence Day and Labor Day
  
  // Helper function to check if a date is a holiday
  export function isHoliday(date: Date): boolean {
    const formattedDate = date.toISOString().slice(5, 10); // Extract MM/DD
    return holidays.includes(formattedDate);
  }
  
  // Function to calculate chargeable days excluding weekends and holidays
  export function calculateChargeableDays(checkoutDate: string, returnDate: string, toolCode: keyof typeof toolData): number {
    const start = new Date(checkoutDate);
    const end = new Date(returnDate);
    let chargeableDays = 0;
  
    const tool = toolData[toolCode];
  
    for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // 0 = Sunday, 6 = Saturday
      const isHolidayDay = isHoliday(d);
  
      if ((!isWeekend || tool.weekendCharge) && (!isHolidayDay || tool.holidayCharge)) {
        chargeableDays++;
      }
    }
  
    return chargeableDays;
  }

export function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { year: '2-digit', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  
  export function formatCurrency(amount: string): string {
    const value = parseFloat(amount);
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
  