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