
/**
 * Handles read and write operations on files.
 *
 * 
 *
 */

// Reads the contents of a file and passes it to a callback function
export function readFile(file, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
        callback(event.target.result);
    };
    reader.readAsText(file);
}