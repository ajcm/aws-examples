

/**
 * Format bytes as human-readable text.
 * 
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use 
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 * 
 * @return Formatted string.
 */
export function humanFileSize(bytes, si = false, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return bytes.toFixed(dp) + ' ' + units[u];
}

export function padTwoDigits(num) {
    return num.toString().padStart(2, "0");
}

export function formatDate(date, dateDiveder = "-") {
    // :::: Exmple Usage ::::
    // The function takes a Date object as a parameter and formats the date as YYYY-MM-DD hh:mm:ss.
    // 👇️ 2023-04-11 16:21:23 (yyyy-mm-dd hh:mm:ss)
    //console.log(dateInYyyyMmDdHhMmSs(new Date()));

    //  👇️️ 2025-05-04 05:24:07 (yyyy-mm-dd hh:mm:ss)
    // console.log(dateInYyyyMmDdHhMmSs(new Date('May 04, 2025 05:24:07')));
    // Date divider
    // 👇️ 01/04/2023 10:20:07 (MM/DD/YYYY hh:mm:ss)
    // console.log(dateInYyyyMmDdHhMmSs(new Date(), "/"));
    return (
        [
            date.getFullYear(),
            padTwoDigits(date.getMonth() + 1),
            padTwoDigits(date.getDate()),
        ].join(dateDiveder) +
        " " +
        [
            padTwoDigits(date.getHours()),
            padTwoDigits(date.getMinutes()),
            padTwoDigits(date.getSeconds()),
        ].join(":")
    );
}

