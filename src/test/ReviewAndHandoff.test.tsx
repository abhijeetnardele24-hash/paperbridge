import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { JourneyProvider } from '../state/JourneyContext';
import { Review } from '../routes/Review';
import { Handoff } from '../routes/Handoff';

describe('Review and Safe Handoff Integration', () => {
  it('renders review map with categorized complete and uncertain sections', () => {
    render(
      <JourneyProvider>
        <BrowserRouter>
          <Review />
        </BrowserRouter>
      </JourneyProvider>
    );

    expect(screen.getByText(/Review Your Prepared Answers/i)).toBeInTheDocument();
    expect(screen.getByText(/Needs Checking \(Uncertain\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Complete & Ready/i)).toBeInTheDocument();
  });

  it('generates expiring handoff packet and provides revoke action', () => {
    render(
      <JourneyProvider>
        <BrowserRouter>
          <Handoff />
        </BrowserRouter>
      </JourneyProvider>
    );

    const generateBtn = screen.getByRole('button', { name: /Generate Expiring Handoff Packet/i });
    fireEvent.click(generateBtn);

    expect(screen.getByText(/Packet Active/i)).toBeInTheDocument();
    expect(screen.getByText(/Time-Limited Handoff Token/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Revoke Packet Access Now/i })).toBeInTheDocument();
  });
});
