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
<!--for，一个独特的as语法，并且支持sep指令来指定非末尾行的数-->
<ul>
<#list cars as car>
    <li>name为${car.name}<#sep>，<#sep></li>
</#list>
</ul>

<!--for的另外一种写法，当cars为空的时候，连ul标签都不输出。我们还能额外用else标签来输出-->
<#list cars >
    <ul>
    <#items as car>
        <li>name2为${car.name}<#sep>，</#sep></li>
    </#items>
    </ul>
    <#else>
        <p>Nothing</p>
</#list>

<#--注释标签，不会输出到前端-->
<#include "/footer.ftl">
<body>
</html>