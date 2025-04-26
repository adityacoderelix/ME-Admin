export const convertJSONToCSV = (jsonData) => {
  if (jsonData.length === 0) {
    return "";
  }

  const headers = Object.keys(jsonData[0]);
  const csvRows = [];

  // Add header row
  csvRows.push(headers.join(","));

  // Add data rows
  for (const row of jsonData) {
    const values = headers.map((header) => {
      const value = row[header];
      const escapedValue =
        value !== null && value !== undefined
          ? String(value).replace(/"/g, '""')
          : "";
      return `"${escapedValue}"`;
    });
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
};
