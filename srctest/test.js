
import fs from 'fs';
import marked from 'marked';
import xlsx from 'xlsx';
import assert from 'assert';

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
  });
});
