import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PlainOfficialCard } from '../components/PlainOfficialCard';
import { JourneyProvider } from '../state/JourneyContext';
import { APPLICATION_QUESTIONS } from '../content/scheme';

const testQuestion = APPLICATION_QUESTIONS[0]; // Legal name

describe('PlainOfficialCard Signature Component', () => {
  it('renders question in plain meaning mode by default', () => {
    const onChange = vi.fn();
    const onOpenUncertainModal = vi.fn();

    render(
      <JourneyProvider>
        <PlainOfficialCard
          question={testQuestion}
          value="Riya Shinde"
          isUncertain={false}
          onChange={onChange}
          onOpenUncertainModal={onOpenUncertainModal}
        />
      </JourneyProvider>
    );

    expect(screen.getByText('What is your full legal name?')).toBeInTheDocument();
    expect(screen.getByText(/What this means/i)).toBeInTheDocument();
    expect(screen.getByText(/Official wording/i)).toBeInTheDocument();
  });

  it('switches to official wording layer and displays source clause pointer', () => {
    const onChange = vi.fn();
    const onOpenUncertainModal = vi.fn();

    render(
      <JourneyProvider>
        <PlainOfficialCard
          question={testQuestion}
          value="Riya Shinde"
          isUncertain={false}
          onChange={onChange}
          onOpenUncertainModal={onOpenUncertainModal}
        />
      </JourneyProvider>
    );

    const officialTab = screen.getByRole('tab', { name: /Official wording/i });
    fireEvent.click(officialTab);

    expect(screen.getByText(/candidate nomenclature must strictly correspond/i)).toBeInTheDocument();
    expect(screen.getByText(/BrightSteps Guidelines § 3.1\(a\)/i)).toBeInTheDocument();
  });

  it('triggers uncertainty modal when clicking "I am not sure"', () => {
    const onChange = vi.fn();
    const onOpenUncertainModal = vi.fn();

    render(
      <JourneyProvider>
        <PlainOfficialCard
          question={testQuestion}
          value=""
          isUncertain={false}
          onChange={onChange}
          onOpenUncertainModal={onOpenUncertainModal}
        />
      </JourneyProvider>
    );

    const uncertainBtn = screen.getByRole('button', { name: /I am not sure/i });
    fireEvent.click(uncertainBtn);

    expect(onOpenUncertainModal).toHaveBeenCalledTimes(1);
  });

  it('reveals "Why we ask this" disclosure on click', () => {
    const onChange = vi.fn();
    const onOpenUncertainModal = vi.fn();

    render(
      <JourneyProvider>
        <PlainOfficialCard
          question={testQuestion}
          value="Riya Shinde"
          isUncertain={false}
          onChange={onChange}
          onOpenUncertainModal={onOpenUncertainModal}
        />
      </JourneyProvider>
    );

    const whyBtn = screen.getByRole('button', { name: /Why we ask this/i });
    fireEvent.click(whyBtn);

    expect(screen.getByText(/scholarship payment is linked directly to your school record/i)).toBeInTheDocument();
  });
});
