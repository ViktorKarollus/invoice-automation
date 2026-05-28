export function downloadResult(result) {
  if (!result) return;

  const blob = new Blob(
    [JSON.stringify(result, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "invoice-analysis.json";

  a.click();

  URL.revokeObjectURL(url);
}


export function downloadCSV(result) {

  if (!result || !result.invoices) return;

  const invoices = result.invoices;

  const headers = Object.keys(invoices[0]);

  const rows = invoices.map(invoice =>
    headers.map(header =>
      JSON.stringify(invoice[header] ?? "")
    ).join(",")
  );

  const csvContent =
    headers.join(",") + "\n" + rows.join("\n");

  const blob = new Blob(
    [csvContent],
    { type: "text/csv" }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "invoice-analysis.csv";

  a.click();

  URL.revokeObjectURL(url);
}