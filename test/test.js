'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _xlsx = require('xlsx');

var _xlsx2 = _interopRequireDefault(_xlsx);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _schwanken = require('../lib/schwanken');

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
            it('should be properly transformed into the Schwanken IMR (Intermedia representation)', function () {

                  var demo = _xlsx2.default.readFileSync('demo.xlsx');
                  var table = demo.Sheets[demo.SheetNames[0]];

                  var ref = (0, _schwanken.sheetref2structref)(table['!ref']);
                  _assert2.default.deepEqual({ width: 3, height: 4 }, ref);

                  // check conversion of Excell Alfabetic column indcators to numbers
                  _assert2.default.equal(702, (0, _schwanken.alfa2num)('ZZ'));
                  _assert2.default.equal(703, (0, _schwanken.alfa2num)('AAA'));
                  _assert2.default.equal(28, (0, _schwanken.alfa2num)('AB'));

                  _assert2.default.deepEqual({ x: 702, y: 3 }, (0, _schwanken.alfanum2struct)('ZZ3'));
                  _assert2.default.deepEqual({ x: 703, y: 70 }, (0, _schwanken.alfanum2struct)('AAA70'));
                  _assert2.default.deepEqual({ x: 28, y: 20 }, (0, _schwanken.alfanum2struct)('AB20'));

                  /*let imr = xslx2imr(table);
                  assert.deepEqual([{text:'Tables'}, {text:'Are'}, {text:'Cool'}], imr.tables[0].headers);
                  assert.deepEqual([{text:'col 3 is'}, {text:'right-aligned'}, {text:'$1600'} ], tables[0].rows[0]);
                  assert.deepEqual([{text:'col 2 is'}, {text:'centered'}, {text:'$12'} ], tables[0].rows[1]);
                  assert.deepEqual([{text:'`zebra` *stripes*'}, {text:'are neat'}, {text:'$1'}], tables[0].rows[2]);
                  */
            });
      });
});