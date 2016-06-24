'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _xlsx = require('xlsx');

var _xlsx2 = _interopRequireDefault(_xlsx);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Markdown:', function () {
  describe('demo.md', function () {
    it('should be properly parsed by marked', function () {

      var txt = _fs2.default.readFileSync('demo.md').toString();
      var tokens = _marked2.default.lexer(txt);
      var tables = tokens.filter(function (e) {
        return e.type === 'table';
      });

      _assert2.default.deepEqual(['Tables', 'Are', 'Cool'], tables[0].header);
      _assert2.default.deepEqual(['col 3 is', 'right-aligned', '$1600'], tables[0].cells[0]);
      _assert2.default.deepEqual(['col 2 is', 'centered', '$12'], tables[0].cells[1]);
      _assert2.default.deepEqual(['`zebra` *stripes*', 'are neat', '$1'], tables[0].cells[2]);
    });
  });
});

describe('Excel:', function () {
  describe('demo.xlsx', function () {
    it('should be properly read by xlsx', function () {

      var demo = _xlsx2.default.readFileSync('demo.xlsx');
      var table = demo.Sheets[demo.SheetNames[0]];
      _assert2.default.deepEqual(['Tables', 'Are', 'Cool'], [table.A1.v, table.B1.v, table.C1.v]);
      _assert2.default.deepEqual(['col 3 is', 'right-aligned', '$1600'], [table.A2.v, table.B2.v, table.C2.v]);
      _assert2.default.deepEqual(['col 2 is', 'centered', '$12'], [table.A3.v, table.B3.v, table.C3.v]);
      _assert2.default.deepEqual(['zebra stripes', 'are neat', '$1'], [table.A4.v, table.B4.v, table.C4.v]);
    });
  });
});