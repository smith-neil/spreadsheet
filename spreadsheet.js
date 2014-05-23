var sheeetz = (function () {
    return function init(config) {
        var rowCount = config.rows   || 10;
        var cols     = config.cols   || 10;
        var targetEl = config.target || '#spreadSheet';
        
        var table = $('<table></table>');

        var rows = [];
        var cells = [];

        for (var i = 0; i < rowCount; i++) {
            cells = [];

            for (var j = 0; j < cols; j++) {
                var id = getLetter(j) + i;
                // getting the table cell
                var content = getContent(id);
                var cell = "<td>" + content + "</td>";

                // pushing to in-memory DOM element
                cells.push(cell);
            }
            var cellHtml = '<tr>' + cells.join('') + '</ tr>';
            rows.push(cellHtml);
        }

        table = '<table>' + rows.join('') + '</table>';
        $(targetEl).append(table);

        function getLetter(num) {
            return String.fromCharCode("A".charCodeAt(0) + num - 1);
        }

        function getContent(id) {
            if (id.indexOf('@') === 0) return id.substring(1);
            else if (id.indexOf('0') === 1) return id.substring(0, 1);
            else return "<input id='" + id + "' type='text'></input>";
        }

        function changeFocus(cell, direction) {
            var dir = direction.toLowerCase();
            var el = $(cell.target);

            if (dir === 'up') {
                var colIdx = el.closest('td').index();
                var row = el.closest('tr');
                row.prev('tr').find('input').eq(colIdx - 1).focus();
            } else if (dir === 'right') {
                var rowIdx = el.closest('tr').index();
                var col = el.closest('td');
                col.next('td').find('input').focus();
            } else if (dir === 'down') {
                var colIdx = el.closest('td').index();
                var row = el.closest('tr');
                row.next('tr').find('input').eq(colIdx - 1).focus();
            } else if (dir === 'left') {
                var rowIdx = el.closest('tr').index();
                var col = el.closest('td');
                col.prev('td').find('input').focus();
            }
        }

        $(targetEl + ' > table').selectable({
            filter: 'input'
        });

        $(document).on('keydown', function (e) {
            if (e.which == 13) changeFocus(e, e.shiftKey ? 'up' : 'down');
            else if (e.which == 37) changeFocus(e, 'left');
            else if (e.which == 39) changeFocus(e, 'right');
            else if (e.which == 38) changeFocus(e, 'up');
            else if (e.which == 40) changeFocus(e, 'down');
        });
    }
})();