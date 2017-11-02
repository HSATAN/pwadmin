//设置左侧导航栏颜色
var url = window.location.href;
console.log(url);
var bases = url.split('/');
var index = $.inArray('pwadmin', bases);
console.log(index);
var base = bases[index + 1];
var list = document.getElementById('list-group');
var aes = list.getElementsByTagName('a');
var targets = [];
for (var dex = 0; dex < aes.length; dex++) {
    if (aes[dex].href.indexOf(base) !== -1) {
        targets.push(aes[dex]);
    }
}
var len = targets.length;
var target_a = targets[len - 1];
var target_li = $(target_a).parent('li');
console.log(target_a.href);
target_a.style.color = 'white';
target_li.css('background-color', '#02a1c9');