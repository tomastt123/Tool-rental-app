import { NextResponse } from 'next/server';
import { toolData, isHoliday, calculateChargeableDays } from '../../../utilities/utils';

interface CheckoutRequest {
  toolCode: keyof typeof toolData;
  checkoutDate: string;
  returnDate: string;
  discountPercent: number;
}

// Validate inputs function
export function validateInputs(checkoutDate: string, returnDate: string, discountPercent: number): string | null {
  const start = new Date(checkoutDate);
  const end = new Date(returnDate);
  if (start >= end) {
    return "Checkout date must be before return date";
  }
  if (discountPercent < 0 || discountPercent > 100) {
    return "Discount percent must be between 0 and 100";
  }
  return null;
}

// Core function to handle rental agreement logic, separated for easier testing
export function createRentalAgreement(requestData: CheckoutRequest) {
  const { toolCode, checkoutDate, returnDate, discountPercent } = requestData;

  const tool = toolData[toolCode];
  if (!tool) {
    return { error: "Invalid tool code entered. Please provide a valid tool code.", status: 400 };
  }

  const validationError = validateInputs(checkoutDate, returnDate, discountPercent);
  if (validationError) {
    return { error: validationError, status: 400 };
  }

  const chargeableDays = calculateChargeableDays(checkoutDate, returnDate, toolCode);
  const prediscountAmount = chargeableDays * tool.dailyCharge;
  const discountAmount = (discountPercent / 100) * prediscountAmount;
  const finalAmount = prediscountAmount - discountAmount;

  const rentalAgreement = {
    toolCode,
    toolType: tool.type,
    toolBrand: tool.brand,
    checkoutDate,
    returnDate,
    dailyCharge: tool.dailyCharge,
    chargeableDays,
    prediscountAmount: prediscountAmount.toFixed(2),
    discountPercent,
    discountAmount: discountAmount.toFixed(2),
    finalAmount: finalAmount.toFixed(2),
  };

  return { data: rentalAgreement, status: 200 };
}

// POST API route handler
export async function POST(req: any) { // Change Request to any to avoid issues in test environments
  const requestData = await req.json(); // This line is part of Next.js API, but won't be needed in tests
  const { data, error, status } = createRentalAgreement(requestData);

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  return NextResponse.json(data, { status });
}
