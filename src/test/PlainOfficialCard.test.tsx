import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PlainOfficialCard } from '../components/PlainOfficialCard';
import { JourneyProvider } from '../state/JourneyContext';
import { APPLICATION_QUESTIONS } from '../content/scheme';

describe('PlainOfficialCard Signature Component', () => {
  const testQuestion = APPLICATION_QUESTIONS[0]; // q_legal_name (text)
  const choiceQuestion = APPLICATION_QUESTIONS[4]; // q_stream_class (choice)
  const dateQuestion = APPLICATION_QUESTIONS[1]; // q_dob (date)

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

    expect(screen.getByRole('heading', { name: /What is your full legal name\?/i })).toBeInTheDocument();
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

  it('reveals "Why we ask this" and evidence hint disclosures on click', () => {
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

    const evidenceBtn = screen.getByRole('button', { name: /Where to find this in your documents/i });
    fireEvent.click(evidenceBtn);

    expect(screen.getByText(/Line 1 of your Class 10 marksheet/i)).toBeInTheDocument();
  });

  it('renders choice inputs and calls onChange when selecting an option', () => {
    const onChange = vi.fn();
    const onOpenUncertainModal = vi.fn();

    render(
      <JourneyProvider>
        <PlainOfficialCard
          question={choiceQuestion}
          value="diploma_tech"
          isUncertain={false}
          onChange={onChange}
          onOpenUncertainModal={onOpenUncertainModal}
        />
      </JourneyProvider>
    );

    expect(screen.getByText(/Polytechnic Diploma/i)).toBeInTheDocument();
    const scienceRadio = screen.getByLabelText(/Science Stream/i);
    fireEvent.click(scienceRadio);

    expect(onChange).toHaveBeenCalledWith('science');
  });

  it('renders date inputs and displays formatted date example', () => {
    const onChange = vi.fn();
    const onOpenUncertainModal = vi.fn();

    render(
      <JourneyProvider>
        <PlainOfficialCard
          question={dateQuestion}
          value="2008-04-14"
          isUncertain={true}
          uncertainNote="Flagged for check"
          onChange={onChange}
          onOpenUncertainModal={onOpenUncertainModal}
        />
      </JourneyProvider>
    );

    expect(screen.getByText(/Needs Verification/i)).toBeInTheDocument();
    const dateInput = screen.getByLabelText(/What is your date of birth\?/i);
    expect(dateInput).toBeInTheDocument();
    fireEvent.change(dateInput, { target: { value: '2007-05-20' } });

    expect(onChange).toHaveBeenCalledWith('2007-05-20');
  });

  it('triggers speech synthesis when readAloud accessibility setting is enabled', () => {
    const onChange = vi.fn();
    const onOpenUncertainModal = vi.fn();
    const speakMock = vi.fn();
    const cancelMock = vi.fn();

    // Mock speechSynthesis
    window.speechSynthesis = {
      speak: speakMock,
      cancel: cancelMock,
      paused: false,
      pending: false,
      speaking: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      getVoices: () => [],
      pause: vi.fn(),
      resume: vi.fn(),
      onvoiceschanged: null,
    };
    class MockUtterance {
      text: string;
      lang = '';
      constructor(text: string) {
        this.text = text;
      }
    }
    global.SpeechSynthesisUtterance = MockUtterance as unknown as typeof SpeechSynthesisUtterance;

    localStorage.setItem(
      'paperbridge_journey_v1',
      JSON.stringify({
        locale: 'en',
        eligibilityAnswers: {},
        eligibilityStatus: 'not_started',
        answers: {},
        documents: {},
        accessibility: { focusMode: false, readingSupport: false, readAloud: true, highContrast: false },
        handoff: { selectedSections: [], includePersonalIdentifiers: false, recipientName: '', token: '', createdAt: '', expiresAt: '', isRevoked: false },
      })
    );

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

    const readAloudBtn = screen.getByRole('button', { name: /Read question aloud/i });
    fireEvent.click(readAloudBtn);

    expect(speakMock).toHaveBeenCalledTimes(1);
  });
});
