export function parseCSV(csvData) {
    const rows = csvData.split("\n").map(row => row.trim());
    const headers = rows[0].split(",").map(header => header.trim());
    const data = [];

    for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(",").map(value => value.trim());
        if (values.length === headers.length) {
            let entry = {};
            headers.forEach((header, index) => {
                entry[header] = values[index];
            });
            data.push(entry);
        } else {
            console.warn(`Skipping row ${i} due to mismatched columns`);
        }
    }
    return data;
}