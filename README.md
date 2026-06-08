# AI Invoice Processing Dashboard

## Overview

The AI Invoice Processing Dashboard is a web-based application that automates the analysis of unstructured invoice data using Large Language Models (LLMs).

The system transforms raw invoice information into structured JSON, identifies missing information, detects inconsistencies and duplicates, assigns priorities, and provides export functionality for further processing.

The project was developed as part of a Design Science Research (DSR) seminar focusing on AI-supported process automation.

Without a valid VPN connection, requests to the LLM endpoint cannot be processed and invoice analysis functionality will be unavailable.
---

## Features

### Invoice Analysis

* Upload unstructured invoice data
* AI-powered invoice extraction
* Automatic JSON and CSV generation

### Validation

* Missing information detection
* Duplicate invoice detection
* Inconsistency detection
* Rule-based priority assignment

### Dashboard

* Invoice summary cards
* Priority badges
* Analysis log

### Export

* JSON export
* CSV export

### Persistence

* LocalStorage support
* Chat history persistence
* Invoice card persistence

---

## Architecture

```text
File Upload
    ↓
Invoice Content Extraction
    ↓
LLM Analysis
    ↓
Structured JSON Output
    ↓
Dashboard Visualization
    ↓
JSON / CSV Export
```

---

## JSON Schema

The system extracts the following information:

```json
{
  "summary": "",
  "invoices": [
    {
      "invoice_number": "",
      "company": "",
      "amount": 0,
      "currency": "",
      "date": "",
      "status": "",
      "priority": "",
      "possible_errors": [],
      "missing_information": [],
      "duplicates": false,
      "inconsistencies": []
    }
  ]
}
```

---

## Example Workflow

### Input

```text
Company: NexaSoft Solutions

Invoice Number: NS-2026-778A

Date: 2026-06-03

Amount: 3850 EUR

Status: OPEN
```

### Output

```json
{
  "summary": "Invoice NS-2026-778A from NexaSoft Solutions for 3850 EUR dated 2026-06-03 with OPEN status.",
  "invoices": [
    {
      "invoice_number": "NS-2026-778A",
      "company": "NexaSoft Solutions",
      "amount": 3850,
      "currency": "EUR",
      "date": "2026-06-03",
      "status": "OPEN",
      "priority": "HIGH",
      "possible_errors": [],
      "missing_information": [],
      "duplicates": false,
      "inconsistencies": []
    }
  ]
}
```

---

## Technologies

* HTML5
* CSS3
* JavaScript 
* LocalStorage
* REST API Integration
* Large Language Models (LLMs)

---

## Future Work

* Multi-file upload
* Queue-based invoice processing
* Dashboard statistics
* Search and filtering
* Database integration
* Cloud deployment


