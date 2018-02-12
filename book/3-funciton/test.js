'use strict';
function* next_id() {
    var id = 1;
    while(true){
        yield id++;
    }
}


var
    x,
    pass = true,
    g = next_id();
for (x = 1; x < 100; x ++) {
    if (g.next().value !== x) {
        pass = false;
        console.log('测试失败!');
        break;
    }else {
        console.log(x);
    }
}
if (pass) {
    console.log('测试通过!');
}