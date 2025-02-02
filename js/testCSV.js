function parseCSV2(csvData) {
    // Split the CSV into rows (assuming \n as line separator)
    const lines = csvData.split("\n").filter(line => line.trim() !== '');
    
    // Use the first row as the header row.
    const headerRow = lines[0].split(",");
    
    // Find the index where "Course code" appears.
    // (Adjust the header text if needed to match exactly.)
    const splitIndex = headerRow.indexOf("Course code");
    
    if (splitIndex === -1) {
      throw new Error('"Course code" column not found in header row.');
    }
    
    // Slice headers into two parts:
    const mainHeaders = headerRow.slice(0, splitIndex);
    const additionalHeaders = headerRow.slice(splitIndex);
    
    // Arrays to hold the parsed rows for each table.
    const mainData = [];
    const additionalData = [];
    
    // Process each row (starting at index 1 to skip the header row).
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",");
      
      // Optionally, you can check for the right number of columns or handle missing columns.
      // Extract the main data (from column 0 up to but not including splitIndex)
      const mainRow = row.slice(0, splitIndex);
      
      // Extract the additional data (from column splitIndex to end)
      const additionalRow = row.slice(splitIndex);
      
      mainData.push(mainRow);
      additionalData.push(additionalRow);
    }
    
    // Return an object containing both arrays and their headers.
    return {
      mainHeaders,
      mainData,
      additionalHeaders,
      additionalData
    };
  }

// Example usage:
const csvString = `course,class,day,start,end,location,lecturer,type,,Course code,Course name,Credit hours,Level,program
AAT111,Lec 01,MON,10:40,11:30,A006,Habiba Abdelslam Tawfik Abdelgawad,LEC,,CET111,Intro to programming,4,1,CS`;

const parsed = parseCSV2(csvString);

console.log("Main Headers:", parsed.mainHeaders);
console.log("Main Data:", parsed.mainData);
console.log("Additional Headers:", parsed.additionalHeaders);
console.log("Additional Data:", parsed.additionalData);