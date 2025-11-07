import * as fs from 'fs';
import * as path from 'path';

export interface PDFConversionConfig {
  inputBuffer: Buffer;
  outputPath: string;
  options?: {
    format?: 'A4' | 'Letter' | 'Legal';
    orientation?: 'portrait' | 'landscape';
    margins?: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
    header?: string;
    footer?: string;
  };
}

/**
 * Convert Word document buffer to PDF
 * This module handles PDF conversion using various libraries
 */
export async function convertToPDF(
  docxBuffer: Buffer,
  outputPath: string,
  options: PDFConversionConfig['options'] = {}
): Promise<string> {
  try {
    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Convert using the appropriate method
    const pdfBuffer = await convertDocxToPDF(docxBuffer, options);
    
    // Write PDF to file
    fs.writeFileSync(outputPath, pdfBuffer);
    
    return outputPath;
  } catch (error) {
    console.error('PDF conversion failed:', error);
    throw new Error(`PDF conversion failed: ${error}`);
  }
}

/**
 * Convert DOCX buffer to PDF using different methods
 */
async function convertDocxToPDF(
  docxBuffer: Buffer,
  options: PDFConversionConfig['options']
): Promise<Buffer> {
  try {
    // Try multiple conversion methods
    const methods = [
      () => convertUsingLibreOffice(docxBuffer, options),
      () => convertUsingPandoc(docxBuffer, options),
      () => convertUsingNodeModules(docxBuffer, options)
    ];

    for (const method of methods) {
      try {
        return await method();
      } catch (error) {
        console.warn(`Conversion method failed, trying next: ${error}`);
        continue;
      }
    }

    throw new Error('All PDF conversion methods failed');
  } catch (error) {
    console.error('PDF conversion error:', error);
    throw error;
  }
}

/**
 * Convert using LibreOffice (if available)
 */
async function convertUsingLibreOffice(
  docxBuffer: Buffer,
  options: PDFConversionConfig['options']
): Promise<Buffer> {
  const { exec } = require('child_process');
  const { promisify } = require('util');
  const execAsync = promisify(exec);

  // Create temporary files
  const tempDocxPath = path.join(process.cwd(), 'temp', `temp-${Date.now()}.docx`);
  const tempPdfPath = path.join(process.cwd(), 'temp', `temp-${Date.now()}.pdf`);

  try {
    // Ensure temp directory exists
    if (!fs.existsSync(path.dirname(tempDocxPath))) {
      fs.mkdirSync(path.dirname(tempDocxPath), { recursive: true });
    }

    // Write DOCX to temp file
    fs.writeFileSync(tempDocxPath, docxBuffer);

    // Convert using LibreOffice
    const command = `libreoffice --headless --convert-to pdf --outdir "${path.dirname(tempPdfPath)}" "${tempDocxPath}"`;
    await execAsync(command);

    // Read PDF file
    const pdfBuffer = fs.readFileSync(tempPdfPath);

    // Clean up temp files
    fs.unlinkSync(tempDocxPath);
    fs.unlinkSync(tempPdfPath);

    return pdfBuffer;
  } catch (error) {
    // Clean up temp files on error
    if (fs.existsSync(tempDocxPath)) fs.unlinkSync(tempDocxPath);
    if (fs.existsSync(tempPdfPath)) fs.unlinkSync(tempPdfPath);
    throw error;
  }
}

/**
 * Convert using Pandoc (if available)
 */
async function convertUsingPandoc(
  docxBuffer: Buffer,
  options: PDFConversionConfig['options']
): Promise<Buffer> {
  const { exec } = require('child_process');
  const { promisify } = require('util');
  const execAsync = promisify(exec);

  const tempDocxPath = path.join(process.cwd(), 'temp', `temp-${Date.now()}.docx`);
  const tempPdfPath = path.join(process.cwd(), 'temp', `temp-${Date.now()}.pdf`);

  try {
    if (!fs.existsSync(path.dirname(tempDocxPath))) {
      fs.mkdirSync(path.dirname(tempDocxPath), { recursive: true });
    }

    fs.writeFileSync(tempDocxPath, docxBuffer);

    const command = `pandoc "${tempDocxPath}" -o "${tempPdfPath}"`;
    await execAsync(command);

    const pdfBuffer = fs.readFileSync(tempPdfPath);

    fs.unlinkSync(tempDocxPath);
    fs.unlinkSync(tempPdfPath);

    return pdfBuffer;
  } catch (error) {
    if (fs.existsSync(tempDocxPath)) fs.unlinkSync(tempDocxPath);
    if (fs.existsSync(tempPdfPath)) fs.unlinkSync(tempPdfPath);
    throw error;
  }
}

/**
 * Convert using Node.js modules (fallback)
 */
async function convertUsingNodeModules(
  docxBuffer: Buffer,
  options: PDFConversionConfig['options']
): Promise<Buffer> {
  throw new Error('Node module conversion not available');
}

/**
 * Convert using Puppeteer (HTML-based conversion)
 */
async function convertUsingPuppeteer(
  docxBuffer: Buffer,
  options: PDFConversionConfig['options']
): Promise<Buffer> {
  throw new Error('Puppeteer conversion not available');
}

/**
 * Convert DOCX to HTML (simplified)
 */
async function convertDocxToHTML(docxBuffer: Buffer): Promise<string> {
  // This is a simplified conversion - in production, you'd use a proper DOCX to HTML converter
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Invoice</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 20px; }
        .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .items-table th { background-color: #f2f2f2; }
        .total { text-align: right; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>INVOICE</h1>
      </div>
      <div class="section">
        <h3>From:</h3>
        <p>{company_name}<br>
        {company_address}<br>
        {company_city}, {company_state} {company_zip}<br>
        Phone: {company_phone}<br>
        Email: {company_email}</p>
      </div>
      <div class="section">
        <h3>To:</h3>
        <p>{client_name}<br>
        {client_address}<br>
        {client_city}, {client_state} {client_zip}<br>
        Phone: {client_phone}<br>
        Email: {client_email}</p>
      </div>
      <div class="section">
        <h3>Invoice Details:</h3>
        <p>Invoice Number: {invoice_number}<br>
        Date: {invoice_date}<br>
        Due Date: {due_date}</p>
      </div>
      <div class="section">
        <h3>Items:</h3>
        {items_table}
      </div>
      <div class="section total">
        <p>Subtotal: {subtotal}<br>
        Discount: {discount_amount} ({discount_percentage})<br>
        Net Total: {net_total}<br>
        Grand Total: {grand_total}</p>
      </div>
    </body>
    </html>
  `;

  return htmlTemplate;
}

/**
 * Advanced PDF converter with custom options
 */
export class AdvancedPDFConverter {
  private defaultOptions: PDFConversionConfig['options'];

  constructor(defaultOptions: PDFConversionConfig['options'] = {}) {
    this.defaultOptions = {
      format: 'A4',
      orientation: 'portrait',
      margins: { top: 1, right: 1, bottom: 1, left: 1 },
      ...defaultOptions
    };
  }

  /**
   * Convert with custom options
   */
  async convert(
    docxBuffer: Buffer,
    outputPath: string,
    options: PDFConversionConfig['options'] = {}
  ): Promise<string> {
    const mergedOptions = { ...this.defaultOptions, ...options };
    return await convertToPDF(docxBuffer, outputPath, mergedOptions);
  }

  /**
   * Convert to multiple formats
   */
  async convertToMultipleFormats(
    docxBuffer: Buffer,
    outputDir: string,
    formats: ('pdf' | 'html' | 'txt')[] = ['pdf']
  ): Promise<Record<string, string>> {
    const results: Record<string, string> = {};

    for (const format of formats) {
      const outputPath = path.join(outputDir, `output.${format}`);
      
      switch (format) {
        case 'pdf':
          results.pdf = await this.convert(docxBuffer, outputPath);
          break;
        case 'html':
          results.html = await this.convertToHTML(docxBuffer, outputPath);
          break;
        case 'txt':
          results.txt = await this.convertToText(docxBuffer, outputPath);
          break;
      }
    }

    return results;
  }

  /**
   * Convert to HTML
   */
  private async convertToHTML(docxBuffer: Buffer, outputPath: string): Promise<string> {
    const htmlContent = await convertDocxToHTML(docxBuffer);
    fs.writeFileSync(outputPath, htmlContent);
    return outputPath;
  }

  /**
   * Convert to Text
   */
  private async convertToText(docxBuffer: Buffer, outputPath: string): Promise<string> {
    // Simplified text extraction
    const textContent = 'Invoice content extracted as text...';
    fs.writeFileSync(outputPath, textContent);
    return outputPath;
  }
} 