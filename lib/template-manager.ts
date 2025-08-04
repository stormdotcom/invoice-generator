import * as fs from 'fs';
import * as path from 'path';

export interface TemplateConfig {
  name: string;
  description: string;
  category: 'invoice' | 'receipt' | 'quote' | 'custom';
  fields: TemplateField[];
  styles?: TemplateStyles;
  metadata?: Record<string, any>;
}

export interface TemplateField {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'currency' | 'email' | 'phone' | 'address' | 'table';
  required: boolean;
  defaultValue?: any;
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    custom?: (value: any) => boolean;
  };
}

export interface TemplateStyles {
  fontFamily?: string;
  fontSize?: number;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  layout?: 'modern' | 'classic' | 'minimal' | 'professional';
}

/**
 * Template Manager for handling invoice templates
 */
export class TemplateManager {
  private templatesDir: string;
  private templates: Map<string, TemplateConfig> = new Map();

  constructor(templatesDir: string = './templates') {
    this.templatesDir = templatesDir;
    this.ensureTemplatesDirectory();
    this.loadTemplates();
  }

  /**
   * Ensure templates directory exists
   */
  private ensureTemplatesDirectory(): void {
    if (!fs.existsSync(this.templatesDir)) {
      fs.mkdirSync(this.templatesDir, { recursive: true });
    }
  }

  /**
   * Load all templates from directory
   */
  private loadTemplates(): void {
    try {
      const files = fs.readdirSync(this.templatesDir);
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const templatePath = path.join(this.templatesDir, file);
          const templateData = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
          this.templates.set(templateData.name, templateData);
        }
      }
    } catch (error) {
      console.warn('No templates found, creating default templates');
      this.createDefaultTemplates();
    }
  }

  /**
   * Create default templates
   */
  private createDefaultTemplates(): void {
    const defaultTemplates = [
      this.createModernInvoiceTemplate(),
      this.createClassicInvoiceTemplate(),
      this.createMinimalInvoiceTemplate()
    ];

    defaultTemplates.forEach(template => {
      this.saveTemplate(template);
    });
  }

  /**
   * Create modern invoice template
   */
  private createModernInvoiceTemplate(): TemplateConfig {
    return {
      name: 'modern-invoice',
      description: 'Modern, clean invoice template with gradient accents',
      category: 'invoice',
      fields: [
        { key: 'company_name', label: 'Company Name', type: 'text', required: true },
        { key: 'company_address', label: 'Company Address', type: 'address', required: true },
        { key: 'company_phone', label: 'Company Phone', type: 'phone', required: false },
        { key: 'company_email', label: 'Company Email', type: 'email', required: false },
        { key: 'client_name', label: 'Client Name', type: 'text', required: true },
        { key: 'client_address', label: 'Client Address', type: 'address', required: true },
        { key: 'client_phone', label: 'Client Phone', type: 'phone', required: false },
        { key: 'client_email', label: 'Client Email', type: 'email', required: false },
        { key: 'invoice_number', label: 'Invoice Number', type: 'text', required: true },
        { key: 'invoice_date', label: 'Invoice Date', type: 'date', required: true },
        { key: 'due_date', label: 'Due Date', type: 'date', required: true },
        { key: 'items_table', label: 'Items Table', type: 'table', required: true },
        { key: 'subtotal', label: 'Subtotal', type: 'currency', required: true },
        { key: 'discount_amount', label: 'Discount Amount', type: 'currency', required: false },
        { key: 'discount_percentage', label: 'Discount Percentage', type: 'number', required: false },
        { key: 'net_total', label: 'Net Total', type: 'currency', required: true },
        { key: 'grand_total', label: 'Grand Total', type: 'currency', required: true }
      ],
      styles: {
        fontFamily: 'Inter, sans-serif',
        fontSize: 12,
        colors: {
          primary: '#6366f1',
          secondary: '#8b5cf6',
          accent: '#06b6d4'
        },
        layout: 'modern'
      }
    };
  }

  /**
   * Create classic invoice template
   */
  private createClassicInvoiceTemplate(): TemplateConfig {
    return {
      name: 'classic-invoice',
      description: 'Traditional invoice template with professional styling',
      category: 'invoice',
      fields: [
        { key: 'company_name', label: 'Company Name', type: 'text', required: true },
        { key: 'company_address', label: 'Company Address', type: 'address', required: true },
        { key: 'company_phone', label: 'Company Phone', type: 'phone', required: false },
        { key: 'company_email', label: 'Company Email', type: 'email', required: false },
        { key: 'client_name', label: 'Client Name', type: 'text', required: true },
        { key: 'client_address', label: 'Client Address', type: 'address', required: true },
        { key: 'client_phone', label: 'Client Phone', type: 'phone', required: false },
        { key: 'client_email', label: 'Client Email', type: 'email', required: false },
        { key: 'invoice_number', label: 'Invoice Number', type: 'text', required: true },
        { key: 'invoice_date', label: 'Invoice Date', type: 'date', required: true },
        { key: 'due_date', label: 'Due Date', type: 'date', required: true },
        { key: 'items_table', label: 'Items Table', type: 'table', required: true },
        { key: 'subtotal', label: 'Subtotal', type: 'currency', required: true },
        { key: 'discount_amount', label: 'Discount Amount', type: 'currency', required: false },
        { key: 'discount_percentage', label: 'Discount Percentage', type: 'number', required: false },
        { key: 'net_total', label: 'Net Total', type: 'currency', required: true },
        { key: 'grand_total', label: 'Grand Total', type: 'currency', required: true }
      ],
      styles: {
        fontFamily: 'Times New Roman, serif',
        fontSize: 11,
        colors: {
          primary: '#000000',
          secondary: '#333333',
          accent: '#666666'
        },
        layout: 'classic'
      }
    };
  }

  /**
   * Create minimal invoice template
   */
  private createMinimalInvoiceTemplate(): TemplateConfig {
    return {
      name: 'minimal-invoice',
      description: 'Minimalist invoice template with clean design',
      category: 'invoice',
      fields: [
        { key: 'company_name', label: 'Company Name', type: 'text', required: true },
        { key: 'company_address', label: 'Company Address', type: 'address', required: true },
        { key: 'company_email', label: 'Company Email', type: 'email', required: false },
        { key: 'client_name', label: 'Client Name', type: 'text', required: true },
        { key: 'client_address', label: 'Client Address', type: 'address', required: true },
        { key: 'client_email', label: 'Client Email', type: 'email', required: false },
        { key: 'invoice_number', label: 'Invoice Number', type: 'text', required: true },
        { key: 'invoice_date', label: 'Invoice Date', type: 'date', required: true },
        { key: 'items_table', label: 'Items Table', type: 'table', required: true },
        { key: 'subtotal', label: 'Subtotal', type: 'currency', required: true },
        { key: 'net_total', label: 'Net Total', type: 'currency', required: true }
      ],
      styles: {
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: 10,
        colors: {
          primary: '#000000',
          secondary: '#666666',
          accent: '#999999'
        },
        layout: 'minimal'
      }
    };
  }

  /**
   * Save template to file
   */
  saveTemplate(template: TemplateConfig): void {
    const templatePath = path.join(this.templatesDir, `${template.name}.json`);
    fs.writeFileSync(templatePath, JSON.stringify(template, null, 2));
    this.templates.set(template.name, template);
  }

  /**
   * Get template by name
   */
  getTemplate(name: string): TemplateConfig | undefined {
    return this.templates.get(name);
  }

  /**
   * Get all templates
   */
  getAllTemplates(): TemplateConfig[] {
    return Array.from(this.templates.values());
  }

  /**
   * Get templates by category
   */
  getTemplatesByCategory(category: string): TemplateConfig[] {
    return this.getAllTemplates().filter(template => template.category === category);
  }

  /**
   * Delete template
   */
  deleteTemplate(name: string): boolean {
    const template = this.templates.get(name);
    if (template) {
      const templatePath = path.join(this.templatesDir, `${name}.json`);
      if (fs.existsSync(templatePath)) {
        fs.unlinkSync(templatePath);
      }
      this.templates.delete(name);
      return true;
    }
    return false;
  }

  /**
   * Validate template data against template fields
   */
  validateTemplateData(templateName: string, data: Record<string, any>): {
    valid: boolean;
    errors: string[];
    missing: string[];
  } {
    const template = this.getTemplate(templateName);
    if (!template) {
      return {
        valid: false,
        errors: [`Template '${templateName}' not found`],
        missing: []
      };
    }

    const errors: string[] = [];
    const missing: string[] = [];

    for (const field of template.fields) {
      if (field.required && !data[field.key]) {
        missing.push(field.key);
        errors.push(`Required field '${field.label}' is missing`);
      }

      if (data[field.key] && field.validation) {
        const value = data[field.key];
        
        if (field.validation.pattern) {
          const regex = new RegExp(field.validation.pattern);
          if (!regex.test(String(value))) {
            errors.push(`Field '${field.label}' does not match required pattern`);
          }
        }

        if (field.validation.min !== undefined && value < field.validation.min) {
          errors.push(`Field '${field.label}' must be at least ${field.validation.min}`);
        }

        if (field.validation.max !== undefined && value > field.validation.max) {
          errors.push(`Field '${field.label}' must be at most ${field.validation.max}`);
        }

        if (field.validation.custom && !field.validation.custom(value)) {
          errors.push(`Field '${field.label}' failed custom validation`);
        }
      }
    }

    return {
      valid: errors.length === 0 && missing.length === 0,
      errors,
      missing
    };
  }

  /**
   * Create custom template
   */
  createCustomTemplate(
    name: string,
    description: string,
    fields: TemplateField[],
    styles?: TemplateStyles
  ): TemplateConfig {
    const template: TemplateConfig = {
      name,
      description,
      category: 'custom',
      fields,
      styles,
      metadata: {
        created: new Date().toISOString(),
        version: '1.0'
      }
    };

    this.saveTemplate(template);
    return template;
  }

  /**
   * Clone existing template
   */
  cloneTemplate(originalName: string, newName: string, description?: string): TemplateConfig | null {
    const original = this.getTemplate(originalName);
    if (!original) {
      return null;
    }

    const cloned: TemplateConfig = {
      ...original,
      name: newName,
      description: description || `Clone of ${original.description}`,
      metadata: {
        ...original.metadata,
        clonedFrom: originalName,
        created: new Date().toISOString(),
        version: '1.0'
      }
    };

    this.saveTemplate(cloned);
    return cloned;
  }

  /**
   * Export template to file
   */
  exportTemplate(name: string, exportPath: string): boolean {
    const template = this.getTemplate(name);
    if (!template) {
      return false;
    }

    try {
      fs.writeFileSync(exportPath, JSON.stringify(template, null, 2));
      return true;
    } catch (error) {
      console.error('Failed to export template:', error);
      return false;
    }
  }

  /**
   * Import template from file
   */
  importTemplate(importPath: string): TemplateConfig | null {
    try {
      const templateData = JSON.parse(fs.readFileSync(importPath, 'utf8'));
      const template: TemplateConfig = templateData;
      
      // Validate template structure
      if (!template.name || !template.fields) {
        throw new Error('Invalid template structure');
      }

      this.saveTemplate(template);
      return template;
    } catch (error) {
      console.error('Failed to import template:', error);
      return null;
    }
  }
} 
