import * as XLSX from 'xlsx';

/**
 * Hook that returns an exportToExcel function.
 * Pass the array of student rows to download as students.xlsx.
 * If a search is active, pass filtered rows; otherwise pass all students.
 */
export function useExcelExport() {
    function exportToExcel(rows, isFiltered = false) {
        // Build worksheet-friendly data
        const data = rows.map((s, i) => ({
            '#': i + 1,
            'Name': s.name,
            'Email': s.email,
            'Age': s.age,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);

        // Set column widths
        worksheet['!cols'] = [
            { wch: 5 },   // #
            { wch: 22 },  // Name
            { wch: 28 },  // Email
            { wch: 8 },   // Age
        ];

        const workbook = XLSX.utils.book_new();
        const sheetName = isFiltered ? 'Filtered Students' : 'All Students';
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

        XLSX.writeFile(workbook, 'students.xlsx');
    }

    return { exportToExcel };
}
