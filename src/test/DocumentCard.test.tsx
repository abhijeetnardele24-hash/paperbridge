import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DocumentCard } from '../components/DocumentCard';
import { JourneyProvider } from '../state/JourneyContext';
import { INITIAL_DOCUMENTS } from '../content/scheme';

describe('DocumentCard Component', () => {
  beforeEach(() => {
    localStorage.clear();
    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = vi.fn();
  });

  it('renders document with status badge and synthetic issuer guidance', () => {
    const doc = INITIAL_DOCUMENTS['doc_identity'];

    render(
      <JourneyProvider>
        <DocumentCard doc={doc} />
      </JourneyProvider>
    );

    expect(screen.getByText('Identity Verification Card')).toBeInTheDocument();
    expect(screen.getByText(/Technically Ready/i)).toBeInTheDocument();
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

  it('loads safe demo specimen on button click', async () => {
    const doc = INITIAL_DOCUMENTS['doc_bank'];

    render(
      <JourneyProvider>
        <DocumentCard doc={doc} />
      </JourneyProvider>
    );

    const demoBtn = screen.getByRole('button', { name: /Load safe demo specimen/i });
    fireEvent.click(demoBtn);

    await waitFor(() => {
      expect(screen.getByText(/Safe demo specimen loaded/i)).toBeInTheDocument();
    });
  });

  it('rejects oversized files exceeding 2MB limit', async () => {
    const doc = INITIAL_DOCUMENTS['doc_bank'];

    render(
      <JourneyProvider>
        <DocumentCard doc={doc} />
      </JourneyProvider>
    );

    const fileInput = screen.getByTestId(`file-input-${doc.id}`);
    const largeFile = new File([new Uint8Array(2.5 * 1024 * 1024)], 'large_passbook.pdf', {
      type: 'application/pdf',
    });

    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    await waitFor(() => {
      expect(screen.getByText(/exceeds 2MB limit/i)).toBeInTheDocument();
    });
  });

  it('rejects unsupported file formats', async () => {
    const doc = INITIAL_DOCUMENTS['doc_bank'];

    render(
      <JourneyProvider>
        <DocumentCard doc={doc} />
      </JourneyProvider>
    );

    const fileInput = screen.getByTestId(`file-input-${doc.id}`);
    const textFile = new File(['plain text'], 'document.txt', { type: 'text/plain' });

    fireEvent.change(fileInput, { target: { files: [textFile] } });

    await waitFor(() => {
      expect(screen.getByText(/Unsupported format/i)).toBeInTheDocument();
    });
  });

  it('inspects valid PDF header and verifies format', async () => {
    const doc = INITIAL_DOCUMENTS['doc_bank'];

    render(
      <JourneyProvider>
        <DocumentCard doc={doc} />
      </JourneyProvider>
    );

    const fileInput = screen.getByTestId(`file-input-${doc.id}`);
    // Create minimal valid PDF header %PDF-1.4
    const pdfData = new TextEncoder().encode('%PDF-1.4 mock content');
    const validPdf = new File([pdfData], 'student_passbook.pdf', { type: 'application/pdf' });

    fireEvent.change(fileInput, { target: { files: [validPdf] } });

    await waitFor(() => {
      expect(screen.getByText(/Valid PDF document structure confirmed/i)).toBeInTheDocument();
    });
  });

  it('allows removing an inspected file', async () => {
    const doc = INITIAL_DOCUMENTS['doc_identity'];

    render(
      <JourneyProvider>
        <DocumentCard doc={doc} />
      </JourneyProvider>
    );

    const removeBtn = screen.getByTitle(/Remove/i);
    fireEvent.click(removeBtn);

    await waitFor(() => {
      expect(screen.getByText(/Not Added/i)).toBeInTheDocument();
    });
  });

  it('rejects corrupted PDF headers', async () => {
    const doc = INITIAL_DOCUMENTS['doc_bank'];

    render(
      <JourneyProvider>
        <DocumentCard doc={doc} />
      </JourneyProvider>
    );

    const fileInput = screen.getByTestId(`file-input-${doc.id}`);
    const corruptPdf = new File([new TextEncoder().encode('NOT_A_PDF_HEADER')], 'corrupt.pdf', { type: 'application/pdf' });

    fireEvent.change(fileInput, { target: { files: [corruptPdf] } });

    await waitFor(() => {
      expect(screen.getByText(/Corrupted or non-standard PDF header/i)).toBeInTheDocument();
    });
  });

  it('inspects image dimensions and verifies high resolution', async () => {
    const doc = INITIAL_DOCUMENTS['doc_bank'];

    // Mock Image with onload
    const originalImage = global.Image;
    class MockImg {
      naturalWidth = 1200;
      naturalHeight = 1600;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(_val: string) {
        setTimeout(() => this.onload?.(), 10);
      }
    }
    global.Image = MockImg as unknown as typeof Image;

    render(
      <JourneyProvider>
        <DocumentCard doc={doc} />
      </JourneyProvider>
    );

    const fileInput = screen.getByTestId(`file-input-${doc.id}`);
    const imageFile = new File([new Uint8Array(5000)], 'student_photo.jpg', { type: 'image/jpeg' });

    fireEvent.change(fileInput, { target: { files: [imageFile] } });

    await waitFor(() => {
      expect(screen.getByText(/Resolution verified/i)).toBeInTheDocument();
    });

    global.Image = originalImage;
  });

  it('flags warning when image resolution is low', async () => {
    const doc = INITIAL_DOCUMENTS['doc_bank'];

    // Mock Image with low res
    const originalImage = global.Image;
    class MockImg {
      naturalWidth = 400;
      naturalHeight = 300;
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(_val: string) {
        setTimeout(() => this.onload?.(), 10);
      }
    }
    global.Image = MockImg as unknown as typeof Image;

    render(
      <JourneyProvider>
        <DocumentCard doc={doc} />
      </JourneyProvider>
    );

    const fileInput = screen.getByTestId(`file-input-${doc.id}`);
    const imageFile = new File([new Uint8Array(5000)], 'low_res_scan.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [imageFile] } });

    await waitFor(() => {
      expect(screen.getByText(/Low resolution/i)).toBeInTheDocument();
    });

    global.Image = originalImage;
  });

  it('triggers file selection when pressing Enter or Space on the upload label', () => {
    const doc = INITIAL_DOCUMENTS['doc_bank'];

    render(
      <JourneyProvider>
        <DocumentCard doc={doc} />
      </JourneyProvider>
    );

    const input = screen.getByTestId(`file-input-${doc.id}`);
    const clickSpy = vi.fn();
    input.click = clickSpy;

    const label = screen.getByText(/Select File/i).closest('label')!;
    fireEvent.keyDown(label, { key: 'Enter' });
    expect(clickSpy).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(label, { key: ' ' });
    expect(clickSpy).toHaveBeenCalledTimes(2);
  });
});
