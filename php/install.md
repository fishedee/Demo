# 1 安装php和php-fpm

```
brew install php
```

一个命令两个都安装了

```
php -v
```

启动一下

# 2 配置php-fpm

```
sudo cp /private/etc/php-fpm.conf.default /private/etc/php-fpm.conf
```

设置默认的php-fpm.conf

```
error_log=/usr/local/var/log/php-fpm.log
```

修改/private/etc/php-fpm.conf的error_log位置

```
cp /private/etc/php-fpm.d/www.conf.default /private/etc/php-fpm.d/www.conf
```

设置默认的www.conf

```
listen = 127.0.0.1:9999
```

修改/private/etc/php-fpm.d/www.conf的listen

```
sudo php-fpm -D
```

启动php-fpm