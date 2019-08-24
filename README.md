## neo-front-end
个人主页前端使用react.js,material ui框架,typescript编写</br>
尝试不使用任何一键工具框架编写部署主页第n次试验</br>
生产环境和开发环境不一致,坑比设想中的要多得多,逐步完善中
## 部署
使用caddy转发，使用cloudflare颁发tls证书
```config
domain:443 {
gzip
tls /var/www/ca.pem /var/www/ca-key.pem
root /var/www/neo-front-end/build
proxy /api  localhost:8080
rewrite {
    if {path} not_match ^/api
    to {path} /
}
}
```

