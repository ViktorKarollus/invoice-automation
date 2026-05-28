export function renderInvoices(invoices) {

  const container =
    document.getElementById("invoiceContainer");

  invoices.forEach(invoice => {

    const priorityClass =
      invoice.priority.toLowerCase();

    container.innerHTML += `
      <div class="invoice-card">

        <h3>${invoice.company}</h3>

        <p>
          <strong>Invoice:</strong>
          ${invoice.invoice_number}
        </p>

        <p>
          <strong>Amount:</strong>
          ${invoice.amount} ${invoice.currency}
        </p>

        <p>
          <strong>Status:</strong>
          ${invoice.status}
        </p>

        <span class="badge ${priorityClass}">
          ${invoice.priority}
        </span>

      </div>
    `;
  });
}