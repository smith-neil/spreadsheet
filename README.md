Spreadsheet
===========

A simple spreadsheet in the browser.

Create a div, reference spreadsheet.js, and call sheeetz(). Optionally you can pass in an object to set the 'target', 'rows', and 'cols' properties. If a target is not provided, the div's id must be 'spreadSheet'.

    <div id="sheet"></div>

    sheeetz({
        target: '#sheet',
        rows: 20, 
        cols: 20
    });
