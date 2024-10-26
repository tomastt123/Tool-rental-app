import { NextResponse } from 'next/server';
import { toolData } from '../../../utilities/utils';

// GET API route handler
export async function GET() {
  const rentalCharges = Object.values(toolData).map(tool => ({
    type: tool.type,
    dailyCharge: tool.dailyCharge
  }));

  return NextResponse.json(rentalCharges);
}
