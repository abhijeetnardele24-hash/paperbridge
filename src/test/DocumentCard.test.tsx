import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DocumentCard } from '../components/DocumentCard';
import { JourneyProvider } from '../state/JourneyContext';
import { INITIAL_DOCUMENTS } from '../content/scheme';

describe('DocumentCard Component', () => {
  it('renders document with status badge and synthetic issuer guidance', () => {
    const doc = INITIAL_DOCUMENTS['doc_identity'];

    render(
      <JourneyProvider>
        <DocumentCard doc={doc} />
      </JourneyProvider>
    );

    expect(screen.getByText('Identity Verification Card')).toBeInTheDocument();
    expect(screen.getByText(/Ready & Legible/i)).toBeInTheDocument();
    expect(screen.getByText(/UIDAI, State Election Commission/i)).toBeInTheDocument();
  });

  it('toggles specimen guide visibility', () => {
    const doc = INITIAL_DOCUMENTS['doc_income'];

    render(
      <JourneyProvider>
        <DocumentCard doc={doc} />
      </JourneyProvider>
    );

    const guideBtn = screen.getByRole('button', { name: /Specimen Guide/i });
    fireEvent.click(guideBtn);

    expect(screen.getByText(/Synthetic Specimen Checklist/i)).toBeInTheDocument();
    expect(screen.getByText(/Original government header with department emblem/i)).toBeInTheDocument();
  });

  it('simulates local document inspection on mock upload button click', async () => {
    const doc = INITIAL_DOCUMENTS['doc_bank']; // Missing status

    render(
      <JourneyProvider>
        <DocumentCard doc={doc} />
      </JourneyProvider>
    );

    const uploadBtn = screen.getByRole('button', { name: /Mock Upload/i });
    fireEvent.click(uploadBtn);

    await waitFor(
      () => {
        expect(screen.getByText(/Synthetic verification passed/i)).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
  });
});
