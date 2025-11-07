import * as fs from 'fs';
import * as path from 'path';

export interface WordTemplateConfig {
  templatePath: string;
  outputPath?: string;
  data: Record<string, any>;
  options?: {
    preserveFormatting?: boolean;
    customPlaceholders?: Record<string, string>;
  };
}

/**
 * Process Word template with data binding
 * This module handles Word document processing using docxtemplater or similar library
 */
export async function processWordTemplate(
  templatePath: string,
  data: Record<string, any>,
  options: WordTemplateConfig['options'] = {}
): Promise<Buffer> {
  try {
    // Check if template file exists
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template file not found: ${templatePath}`);
    }

    // Read template file
    const templateBuffer = fs.readFileSync(templatePath);
    
    // Process template with data binding
    const processedBuffer = await processTemplateWithData(templateBuffer, data, options);
    
    return processedBuffer;
  } catch (error) {
    console.error('Word template processing failed:', error);
    throw new Error(`Word template processing failed: ${error}`);
  }
}

/**
 * Process template with data binding using docxtemplater
 */
async function processTemplateWithData(
  templateBuffer: Buffer,
  data: Record<string, any>,
  options: WordTemplateConfig['options']
): Promise<Buffer> {
  try {
    // Import docxtemplater dynamically to avoid SSR issues
    const PizZip = (await import('pizzip')).default;
    const Docxtemplater = (await import('docxtemplater')).default;
    
    // Load the template
    const zip = new PizZip(templateBuffer);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      ...options
    });

    // Set template data
    doc.setData(data);

    // Render the document
    doc.render();

    // Get the processed document
    const output = doc.getZip().generate({ type: 'nodebuffer' });
    
    return output;
  } catch (error) {
    console.error('Template processing error:', error);
    throw new Error(`Template processing error: ${error}`);
  }
}

/**
 * Create a basic Word template with placeholders
 */
export async function createBasicTemplate(outputPath: string): Promise<void> {
  const basicTemplate = `
    INVOICE
    
    From:
    {company_name}
    {company_address}
    {company_city}, {company_state} {company_zip}
    Phone: {company_phone}
    Email: {company_email}
    
    To:
    {client_name}
    {client_address}
    {client_city}, {client_state} {client_zip}
    Phone: {client_phone}
    Email: {client_email}
    
    Invoice Details:
    Invoice Number: {invoice_number}
    Date: {invoice_date}
    Due Date: {due_date}
    
    Items:
    {items_table}
    
    Summary:
    Subtotal: {subtotal}
    Discount: {discount_amount} ({discount_percentage})
    Net Total: {net_total}
    Grand Total: {grand_total}
  `;

  // This would create a proper Word document
  // For now, we'll create a text file as placeholder
  fs.writeFileSync(outputPath, basicTemplate);
}

/**
 * Validate template placeholders
 */
export function validateTemplatePlaceholders(
  templatePath: string,
  requiredFields: string[]
): { valid: boolean; missing: string[]; extra: string[] } {
  try {
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    const foundPlaceholders = extractPlaceholders(templateContent);
    
    const missing = requiredFields.filter(field => !foundPlaceholders.includes(field));
    const extra = foundPlaceholders.filter(field => !requiredFields.includes(field));
    
    return {
      valid: missing.length === 0,
      missing,
      extra
    };
  } catch (error) {
    console.error('Template validation failed:', error);
    return {
      valid: false,
      missing: requiredFields,
      extra: []
    };
  }
}

/**
 * Extract placeholders from template content
 */
function extractPlaceholders(content: string): string[] {
  const placeholderRegex = /\{([^}]+)\}/g;
  const placeholders: string[] = [];
  let match;
  
  while ((match = placeholderRegex.exec(content)) !== null) {
    placeholders.push(match[1]);
  }

  return Array.from(new Set(placeholders));
}

/**
 * Get template field mapping for a specific template
 */
export function getTemplateFieldMapping(templatePath: string): Record<string, string> {
  const defaultMapping = {
    'company_name': 'Company Name',
    'company_address': 'Company Address',
    'company_city': 'Company City',
    'company_state': 'Company State',
    'company_zip': 'Company ZIP',
    'company_phone': 'Company Phone',
    'company_email': 'Company Email',
    'client_name': 'Client Name',
    'client_address': 'Client Address',
    'client_city': 'Client City',
    'client_state': 'Client State',
    'client_zip': 'Client ZIP',
    'client_phone': 'Client Phone',
    'client_email': 'Client Email',
    'invoice_number': 'Invoice Number',
    'invoice_date': 'Invoice Date',
    'due_date': 'Due Date',
    'subtotal': 'Subtotal',
    'discount_amount': 'Discount Amount',
    'discount_percentage': 'Discount Percentage',
    'net_total': 'Net Total',
    'tax_amount': 'Tax Amount',
    'grand_total': 'Grand Total',
    'items_table': 'Items Table',
    'items_count': 'Items Count'
  };

  return defaultMapping;
}

/**
 * Custom template processor with advanced features
 */
export class AdvancedWordProcessor {
  private templatePath: string;
  private customProcessors: Map<string, (value: any) => string> = new Map();

  constructor(templatePath: string) {
    this.templatePath = templatePath;
  }

  /**
   * Add custom processor for specific fields
   */
  addCustomProcessor(fieldName: string, processor: (value: any) => string): void {
    this.customProcessors.set(fieldName, processor);
  }

  /**
   * Process template with custom processors
   */
  async processWithCustomProcessors(data: Record<string, any>): Promise<Buffer> {
    const processedData = { ...data };

    this.customProcessors.forEach((processor, fieldName) => {
      if (processedData[fieldName] !== undefined) {
        processedData[fieldName] = processor(processedData[fieldName]);
      }
    });

    return await processWordTemplate(this.templatePath, processedData);
  }

  /**
   * Get available custom processors
   */
  getCustomProcessors(): string[] {
    return Array.from(this.customProcessors.keys());
  }
} 