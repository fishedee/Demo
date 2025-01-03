<html>
<head>
    <title>Welcome!</title>
</head>
<body>
<!--if与else，注意用等号，而不是equals-->
<#if sex == 'mm'>
    Welcome Lady ${user}
<#else>
    Welcome Man ${user}
</#if>
<!--for，一个独特的as语法，并且支持sep指令来指定非末尾行的数，index从0开始-->
<p>共有${cars?size}个车子</p>
<ul>
<#list cars as car>
    <li>${car?index} name为${car.name}<#sep>，<#sep></li>
</#list>
</ul>

<!--for的另外一种写法，当cars为空的时候，连ul标签都不输出。我们还能额外用else标签来输出，index从1开始-->
<#list cars >
    <ul>
    <#items as car>
        <li>${car?counter} name2为${car.name}<#sep>，</#sep></li>
    </#items>
    </ul>
    <#else>
        <p>Nothing</p>
</#list>

<!--for，访问哈希表-->
<#assign keys = brands?keys>
<p>共有${keys?size}个种类的袋子</p>
<ul>
    <#list keys as key>
        <li>${key} => ${brands[key]}</li>
    </#list>
</ul>

<#--注释标签，不会输出到前端-->
<#include "/footer.ftl">
<body>
</html>