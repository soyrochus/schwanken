
import fs from 'fs';
import marked from 'marked';
import xlsx from 'xlsx';
import assert from 'assert';
import {alfa2num, alfanum2struct, xslx2imr, sheetref2structref} from '../lib/schwanken';

describe('Markdown:', () => {
  describe('demo.md', () =>  {
    it('should be properly parsed by marked', () => {

      let txt = fs.readFileSync('demo.md').toString();
      let tokens = marked.lexer(txt);
      let tables = tokens.filter(e => e.type === 'table');

      assert.deepEqual(['Tables', 'Are', 'Cool' ], tables[0].header);
      assert.deepEqual(['col 3 is', 'right-aligned', '$1600' ], tables[0].cells[0]);
      assert.deepEqual(['col 2 is', 'centered', '$12' ], tables[0].cells[1]);
      assert.deepEqual(['`zebra` *stripes*', 'are neat', '$1' ], tables[0].cells[2]);
    });
  });
});

describe('Excel:', () =>  {
  describe('demo.xlsx', () =>  {
    it('should be properly read by xlsx', () =>  {

      let demo = xlsx.readFileSync('demo.xlsx');
      let table = demo.Sheets[demo.SheetNames[0]];
      assert.deepEqual(['Tables', 'Are', 'Cool' ], [table.A1.v, table.B1.v, table.C1.v]);
      assert.deepEqual(['col 3 is', 'right-aligned', '$1600' ], [table.A2.v, table.B2.v, table.C2.v]);
      assert.deepEqual(['col 2 is', 'centered', '$12' ], [table.A3.v, table.B3.v, table.C3.v]);
      assert.deepEqual(['zebra stripes', 'are neat', '$1' ], [table.A4.v, table.B4.v, table.C4.v]);
    });
    it('should be properly transformed into the Schwanken IMR (Intermedia representation)', () =>  {

      let demo = xlsx.readFileSync('demo.xlsx');
      let table = demo.Sheets[demo.SheetNames[0]];

      let ref = sheetref2structref(table['!ref']);
      assert.deepEqual({width:3, height: 4}, ref);

      // check conversion of Excell Alfabetic column indcators to numbers
      assert.equal(702, alfa2num('ZZ'));
      assert.equal(703, alfa2num('AAA'));
      assert.equal(28, alfa2num('AB'));

      assert.deepEqual({x: 702, y: 3 }, alfanum2struct('ZZ3'));
      assert.deepEqual({x: 703, y: 70}, alfanum2struct('AAA70'));
      assert.deepEqual({x: 28, y: 20}, alfanum2struct('AB20'));

      /*let imr = xslx2imr(table);
      assert.deepEqual([{text:'Tables'}, {text:'Are'}, {text:'Cool'}], imr.tables[0].headers);
      assert.deepEqual([{text:'col 3 is'}, {text:'right-aligned'}, {text:'$1600'} ], tables[0].rows[0]);
      assert.deepEqual([{text:'col 2 is'}, {text:'centered'}, {text:'$12'} ], tables[0].rows[1]);
      assert.deepEqual([{text:'`zebra` *stripes*'}, {text:'are neat'}, {text:'$1'}], tables[0].rows[2]);
      */
    });

  });
});
