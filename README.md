# AI Invoice Processing Dashboard

## Overview

The AI Invoice Processing Dashboard is a web-based application for automated invoice analysis using Large Language Models (LLMs).

The system processes unstructured invoice documents and transforms them into structured JSON data. It detects missing information, identifies inconsistencies, assigns priorities, generates recommendations, and provides export functionality for further processing.

The project was developed as part of a Design Science Research (DSR) seminar focusing on AI-supported business process automation.

The application uses a multi-agent divide-and-conquer architecture to improve extraction quality and enable the processing of more complex invoices.

**Important:**
The LLM endpoint is hosted within the university network. A valid VPN connection is required to access the AI services. Without VPN access, invoice analysis functionality will not be available.

---

## Features

### Invoice Processing

* Upload unstructured invoice data
* Automated invoice analysis
* Structured JSON generation
* CSV export

### Multi-Agent Extraction

The invoice analysis is split into specialized AI agents:

* Metadata Agent
* Financial Agent
* Customer Agent
* Payment Agent

This divide-and-conquer approach reduces task complexity and improves extraction accuracy.

### Validation

* Missing information detection
* Inconsistency detection
* Priority assessment
* Invoice quality validation

### AI Assistance

* Automatic invoice summaries
* Actionable recommendations
* Risk-aware prioritization

### Dashboard

* Invoice cards
* Analysis history
* Priority indicators
* Local data persistence

### Export

* JSON export
* CSV export

---

## Architecture

```text
File Upload
      ↓
Invoice Parsing
      ↓

Metadata Agent
Financial Agent
Customer Agent
Payment Agent

      ↓
Structured Invoice Data

      ↓

Completeness Validation Agent
Consistency Validation Agent
Priority Assessment Agent

      ↓

Summary Agent
Recommendation Agent

      ↓

Dashboard Visualization

      ↓

JSON / CSV Export
```

---

## Extracted Fields

The system extracts the following invoice information:

### Metadata

* invoice_number
* company
* date
* status
* reference_number
* purchase_order_number

### Financial Information

* amount
* currency
* subtotal
* tax_amount
* vat_rate

### Customer Information

* customer_name
* customer_id
* customer_email
* billing_address

### Payment Information

* due_date
* payment_terms
* payment_method
* bank_account

### Validation Information

* missing_information
* inconsistencies
* possible_errors
* priority

---

## Example Output

```json
{
  "summary": "Open invoice NS-2026-778A from NexaSoft Solutions GmbH for 4760 EUR.",
  "recommendation": "Review and process the invoice according to standard workflow.",
  "invoices": [
    {
      "invoice_number": "NS-2026-778A",
      "company": "NexaSoft Solutions GmbH",
      "date": "2026-06-03",
      "status": "OPEN",
      "reference_number": "REF-99821",
      "purchase_order_number": "PO-2026-445",
      "amount": 4760,
      "currency": "EUR",
      "subtotal": 4000,
      "tax_amount": 760,
      "vat_rate": 19,
      "customer_name": "DigitalFlow Systems Ltd.",
      "customer_id": "CUST-1045",
      "customer_email": "accounting@digitalflow.com",
      "billing_address": "12 Innovation Street, London, UK",
      "due_date": "2026-07-03",
      "payment_terms": "Net 30 Days",
      "payment_method": "Bank Transfer",
      "bank_account": "DE12345678901234567890",
      "missing_information": [],
      "inconsistencies": [],
      "possible_errors": [],
      "priority": "HIGH"
    }
  ]
}
```

---

## Technologies

* HTML5
* CSS3
* JavaScript (ES6 Modules)
* LocalStorage
* REST API Integration
* Large Language Models (LLMs)

---

## Design Science Research Contribution

This project evaluates whether a divide-and-conquer multi-agent architecture can improve invoice information extraction compared to a single-prompt approach.

The system separates invoice processing into multiple specialized agents responsible for extraction, validation, summarization, and recommendation generation.

---
