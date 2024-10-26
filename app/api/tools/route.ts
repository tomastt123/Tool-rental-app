import { NextResponse } from 'next/server';
import { toolData } from '../../../utilities/utils';

// GET API route handler
export async function GET() {
  const tools = Object.keys(toolData).map((key) => {
    const toolKey = key as keyof typeof toolData; // Type assertion
    return {
      type: toolData[toolKey].type,
      code: toolKey,
      brand: toolData[toolKey].brand,
    };
  });

  return NextResponse.json(tools);
}
