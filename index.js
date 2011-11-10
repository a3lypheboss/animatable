function
$
(
expression
,
con
)
{
return (con || document).querySelector(expression)
}
;
function
$$
(
expression
,
con
)
{
return [].slice.call
(
(
con
||
document
)
.querySelectorAll
(
expression
)
)
}
;
var
css
=
[]
;
$$('A[DATA-property]')
.forEach
(
function(el, i)
{
var
property
=
el.getAttribute('DATA-property')
,
from
=
el.getAttribute('DATA-from')
,
to
=
el.getAttribute('DATA-to')
;
var
id
=
property
,
i
=
1
;
while
(
document.getElementById(id)
)
{
id
=
property
+
'/'
+
++i
}
;
el.id
=
id
;
el.href
=
'#'
+
id
;
el.title
=
property
+
' from '
+
from
+
' to '
+
to
;
var
selector
=
'#'
+
id.replace
(
/([^\w-])/g
,
'\\$1'
)
,
ident
=
id.replace
(
/([^\w-])/g
,
'-'
)
;
css.push
(
'@keyframes '
+
ident
+
'{'
,
'from{'
+
property
+
':'
+
from
+
'}'
,
'to{'
+
property
+
':'
+
to
+
'}}'
,
selector
+
' { animation: '
+
ident
+
' 1s infinite alternate;'
+
property
+
':'
+
from
+
'}'
)
}
)
;

var style = document.createElement('style');
style.textContent = css.join('\r\n');
StyleFix.styleElement(style);
document.head.appendChild(style);

setTimeout(onhashchange = function() {
var target = location.hash? $(location.hash.replace(/([^\w-#])/g, '\\$1')) : null;

if(!target) {
document.body.className = 'home';
return;
}

document.body.className = 'in-page';

var info = $('#info'),
previous = target.previousElementSibling,
next = target.nextElementSibling,
author = target.getAttribute('DATA-author') || 'leaverou';

$('H1', info).innerHTML = target.getAttribute('DATA-property');
$('dd:first-of-type', info).innerHTML = target.getAttribute('DATA-from');
$('dd:nth-of-type(2)', info).innerHTML = target.getAttribute('DATA-to');
$('dd:nth-of-type(3)', info).innerHTML = '<A href="http://twitter.com/' + author + '" target="_blank"><IMG src="http://twitter.com//api/users/profile_image?screen_name=' + author + '&size=mini"/>@' + author + '</A>';

$('A[title="Previous"]', info).setAttribute('href', '#' + (previous? previous.id : ''));
$('A[title="Next"]', info).setAttribute('href', '#' + (next? next.id : ''));

setTimeout(function() {
if(2*target.offsetLeft + target.offsetWidth < innerWidth) {
info.style.left = target.offsetLeft + target.offsetWidth + 30 + 'px';
}
else {
info.style.left = target.offsetLeft - info.offsetWidth - 30 + 'px';
}

info.style.top = target.offsetTop + 'px';
}, 10);
}, 50);

onkeyup = function(evt) {
var key = evt.keyCode;

switch (key) {
case 27:
location.hash = '';
break;
case 37:
case 38:
location.hash = location.hash? $('A[title="Previous"]').hash : $('A[DATA-property]:last-child').hash;
break;
case 39:
case 40:
location.hash = location.hash? $('A[title="Next"]').hash : $('A[DATA-property]:first-child').hash;
}
};
