<html>
<head>
    <title>Welcome!</title>
</head>
<body>
<#--默认是没有转义的-->
<p>${user}</p>
<#--使用指定转义-->
<p>${user?html}</p>
<#--放入escape块的变量，指定默认使用x?html的语法来转义-->
<#escape x as x?html>
    <p>${user}</p>
    <#--我们用noescape来指定部分变量不转义-->
    <p><#noescape>${user}</#noescape></p>
</#escape>

<#--默认数字输出有分割符-->
<p>${assets}</p>
<p>${assets2}</p>


<#--默认数字输出有分割符，需要用?c来避免这个问题-->
<p>${assets?c}</p>
<p>${assets2?c}</p>

<#--字符串组合-->
<p>${"hello ${assets}"}</p>
<p>${"hello ${user[0..1]}"}</p>
</body>
</html>