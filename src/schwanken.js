

export let alfa2num = ref => {
  let num = 0;
  let chars = ref.toUpperCase();
  for(let i = 0; i < chars.length; i++){
      //=(POWER(26;1) * 6) + 1
      let c = chars[i].toUpperCase().charCodeAt(0) - 64; // A != 0, Excell column numbering is 1-based
      if ((chars.length - i) == 1){
        num += c;
      }else{
        num += Math.pow(26, chars.length - i - 1) * c;
      }
  }
  return num;
}

export let alfanum2struct = ref => {

  let a = '';
  let n = '';
  for(let i = 0; i < ref.length; i++){
    let c = ref.toUpperCase().charCodeAt(i);
    // if character 0--9
    if (c < 58){
      n += ref[i];
    } else {
      a += ref[i];
    }
  }
  return {x: alfa2num(a), y: Number(n)};
};

export let sheetref2structref = ref => {

  let [leftup, rightdown] = ref.split(':');
  let leftup_ = alfanum2struct(leftup);
  let rightdown_ = alfanum2struct(rightdown);

  return {width: rightdown_.x - leftup_.x + 1, height: rightdown_.y - leftup_.y + 1};
};

export let xslx2imr = xlsx => {

  return "Booh";


};
