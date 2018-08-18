# 1 配置gzip

```
gzip on;
gzip_disable "msie6";

gzip_vary on;
gzip_proxied any;
	gzip_comp_level 9;
gzip_buffers 16 8k;
gzip_http_version 1.1;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

# 2 配置http转发

```
server {
	listen   80;

	server_name yinghao.fishedee.com;

	location / {
		proxy_pass http://localhost:9595;
	}
}
```

# 3 配置fastcgi转发

```
server {
    listen       7000;
    server_name  localhost;
    root          /Users/fish/Test/135;

    location / {
        index  index.html index.htm;
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        fastcgi_pass   127.0.0.1:9999;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }
}
```

# 4 配置https

```
server {
	listen 443 ssl;
    listen [::]:443 ssl;
    ssl on;

    ssl_certificate   /etc/letsencrypt/live/fishedee.com/fullchain.pem;
    ssl_certificate_key  /etc/letsencrypt/live/fishedee.com/privkey.pem;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

	root /var/www/MyBlog;
	server_name fishedee.com www.fishedee.com;

	location / {
		index index.html;
		try_files $uri $uri/ =404;
	}
}

server {
    listen 80;
    listen [::]:80;

    server_name fishedee.com www.fishedee.com;
    rewrite ^(.*) https://$server_name$1 permanent;
}
```

# 5 配置websocket

```
server {
	listen   80;

	server_name push.fishedee.com;

	location / {
		proxy_pass http://localhost:8080;
		 # WebScoket Support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
	}
}
```