"use client";

import { useState } from "react";

interface RentalAgreement {
  toolCode: string;
  toolType: string;
  toolBrand: string;
  checkoutDate: string;
  returnDate: string;
  discountPercent: number;
  chargeableDays: number;
  dailyCharge: number;
  prediscountAmount: string;
  discountAmount: string;
  finalAmount: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { year: '2-digit', month: '2-digit', day: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

function formatCurrency(amount: string): string {
  const value = parseFloat(amount);
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export default function ToolRental() {
  const [toolCode, setToolCode] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [rentalAgreement, setRentalAgreement] = useState<RentalAgreement | null>(null);
  
  // State to handle error messages from server or validation
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous error messages before form submission
    setErrorMessage('');

    const startDate = new Date(checkoutDate);
    const endDate = new Date(returnDate);

    // Validation for dates: Checkout date must be before the return date
    if (startDate >= endDate) {
      setErrorMessage('Checkout date must be before the return date.');
      return;
    }

    // Validation for discount percent range
    if (discountPercent < 0 || discountPercent > 100) {
      setErrorMessage('Discount percent must be between 0 and 100.');
      return;
    }

    try {
      // Send data to the API route
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolCode,
          checkoutDate,
          returnDate,
          discountPercent,
        }),
      });

      const rentalAgreementData = await response.json() as RentalAgreement;

      // If the tool code is invalid or an error occurs, display an error message
      if (!response.ok) {
        const errorResponse = await response.json() as { error: string };
        // Set the error message from the server if tool code is invalid or other errors occur
        setErrorMessage(errorResponse.error || 'An error occurred during checkout.');
        return;
      }

      // If everything is okay, update the rental agreement state
      setRentalAgreement(rentalAgreementData);
    } catch (error) {
      // Catch and handle any other errors, display a general error message
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tool Rental Application</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <label htmlFor="toolCode" className="block text-sm font-medium">Tool Code</label>
          <input
            id="toolCode"
            type="text"
            value={toolCode}
            onChange={(e) => setToolCode(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <div>
        <label htmlFor="checkoutDate" className="block text-sm font-medium">Checkout Date</label>
          <input
            id="checkoutDate"
            type="date"
            value={checkoutDate}
            onChange={(e) => setCheckoutDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <div>
        <label htmlFor="returnDate" className="block text-sm font-medium">Return Date</label>
          <input
            id="returnDate"
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <div>
        <label htmlFor="discountPercent" className="block text-sm font-medium">Discount Percent</label>
          <input
            id="discountPercent"
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(parseInt(e.target.value))}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Submit Rental
        </button>
      </form>

      {/* Display validation error message for issues like invalid tool code */}
      {errorMessage && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
          {errorMessage}
        </div>
      )}

      {/* Display rental agreement details if the form submission was successful */}
      {rentalAgreement && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">Rental Agreement</h2>
          <p>Tool Code: {rentalAgreement.toolCode}</p>
          <p>Checkout Date: {formatDate(rentalAgreement.checkoutDate)}</p>
          <p>Return Date: {formatDate(rentalAgreement.returnDate)}</p>
          <p>Discount Percent: {rentalAgreement.discountPercent}%</p>
          <p>Chargeable Days: {rentalAgreement.chargeableDays}</p>
          <p>Daily Charge: {formatCurrency(rentalAgreement.dailyCharge.toString())}</p>
          <p>Pre-discount Amount: {formatCurrency(rentalAgreement.prediscountAmount)}</p>
          <p>Discount Amount: {formatCurrency(rentalAgreement.discountAmount)}</p>
          <p>Final Amount: {formatCurrency(rentalAgreement.finalAmount)}</p>
        </div>
      )}
    </div>
  );
}
