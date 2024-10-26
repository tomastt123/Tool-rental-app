import { render, screen, fireEvent } from '@testing-library/react';
import Page from '../app/page';
import '@testing-library/jest-dom';

// Mock the fetch API to simulate a successful form submission response
global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          toolCode: 'LADW',
          toolType: 'Ladder',
          toolBrand: 'Werner',
          checkoutDate: '2024-10-10',
          returnDate: '2024-10-15',
          dailyCharge: '1.99',
          chargeableDays: 3,
          discountPercent: 10,
          discountAmount: '0.60',
          prediscountAmount: '5.97',
          finalAmount: '5.37',
        }),
    })
  ) as jest.Mock;

describe('Tool Rental Application', () => {
  it('renders the form and submits rental data', async () => {
    render(<Page />);

    // Ensure the form elements are rendered
    expect(screen.getByLabelText(/Tool Code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Checkout Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Return Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Discount Percent/i)).toBeInTheDocument();

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Tool Code/i), { target: { value: 'LADW' } });
    fireEvent.change(screen.getByLabelText(/Checkout Date/i), { target: { value: '2024-10-10' } });
    fireEvent.change(screen.getByLabelText(/Return Date/i), { target: { value: '2024-10-15' } });
    fireEvent.change(screen.getByLabelText(/Discount Percent/i), { target: { value: '10' } });

    // Submit the form
    fireEvent.click(screen.getByText(/Submit Rental/i));

    // Wait for the Rental Agreement section to appear
    await screen.findByText(/Rental Agreement/i);

    // Check that the Rental Agreement details are displayed
    expect(screen.getByText(/Tool Code: LADW/i)).toBeInTheDocument();
    expect(screen.getByText(/Chargeable Days:/i)).toBeInTheDocument();
  });

  it('displays error message when checkout date is after return date', async () => {
    render(<Page />);

    // Simulate an invalid date input
    fireEvent.change(screen.getByLabelText(/Tool Code/i), { target: { value: 'LADW' } });
    fireEvent.change(screen.getByLabelText(/Checkout Date/i), { target: { value: '2024-10-15' } });
    fireEvent.change(screen.getByLabelText(/Return Date/i), { target: { value: '2024-10-10' } });
    fireEvent.change(screen.getByLabelText(/Discount Percent/i), { target: { value: '10' } });

    // Submit the form
    fireEvent.click(screen.getByText(/Submit Rental/i));

    // Verify that an error message is displayed
    expect(screen.getByText(/Checkout date must be before the return date./i)).toBeInTheDocument();
  });
});
