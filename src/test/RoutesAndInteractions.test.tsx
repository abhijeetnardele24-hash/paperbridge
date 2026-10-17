import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { JourneyProvider } from '../state/JourneyContext';
import { Complete } from '../routes/Complete';
import { BeforeYouStart } from '../routes/BeforeYouStart';
import { Home } from '../routes/Home';

describe('Additional Routes and User Interactions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders Complete route, interacts with portal simulation, print, and handles reset', () => {
    const alertSpy = vi.fn();
    window.alert = alertSpy;
    const printSpy = vi.fn();
    window.print = printSpy;
    const confirmSpy = vi.fn().mockReturnValue(true);
    window.confirm = confirmSpy;

    render(
      <JourneyProvider>
        <MemoryRouter>
          <Complete />
        </MemoryRouter>
      </JourneyProvider>
    );

    expect(screen.getByText(/Your PaperBridge preparation is complete/i)).toBeInTheDocument();
    expect(screen.getByText(/PREPARED ANSWERS/i)).toBeInTheDocument();

    // Click portal simulated CTA
    const portalBtn = screen.getByRole('button', { name: /Continue to Official Portal/i });
    fireEvent.click(portalBtn);
    expect(alertSpy).toHaveBeenCalled();

    // Click print dossier button
    const printBtn = screen.getByRole('button', { name: /Print Complete Dossier/i });
    fireEvent.click(printBtn);
    expect(printSpy).toHaveBeenCalled();

    // Click Reset Journey button
    const resetBtn = screen.getByRole('button', { name: /Clear and Reset Demo Journey/i });
    fireEvent.click(resetBtn);
    expect(confirmSpy).toHaveBeenCalled();
  });

  it('renders BeforeYouStart guidance with pillars and disclaimer', () => {
    render(
      <JourneyProvider>
        <MemoryRouter>
          <BeforeYouStart />
        </MemoryRouter>
      </JourneyProvider>
    );

    expect(screen.getByText(/Before You Start: Preparation Contract/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^What PaperBridge Does$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^What PaperBridge Does Not Do$/i })).toBeInTheDocument();
    expect(screen.getByText(/Local-First Guarantee/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Continue to Eligibility Check/i })).toBeInTheDocument();
  });

  it('renders Home page with primary value proposition and call to actions', () => {
    render(
      <JourneyProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </JourneyProvider>
    );

    expect(screen.getByText(/A scholarship form you can understand before you submit/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Guided Application/i)).toBeInTheDocument();
    expect(screen.getByText(/See How PaperBridge Works/i)).toBeInTheDocument();
  });
});
