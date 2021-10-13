# TCP和UDP的区别

 ## 1. 对比

|              | UDP                                        | TCP                                    |
| ------------ | ------------------------------------------ | -------------------------------------- |
| 是否连接     | 无连接                                     | 面向连接                               |
| 是否可靠     | 不可靠传输，不使用流量控制和拥塞控制       | 可靠传输，使用流量控制和拥塞控制       |
| 连接对象个数 | 支持一对一，一对多，多对一和多对多交互通信 | 只能是一对一通信                       |
| 传输方式     | 面向报文                                   | 面向字节流                             |
| 首部开销     | 首部开销小，仅8字节                        | 首部最小20字节，最大60字节             |
| 适用场景     | 适用于实时应用（IP电话、视频会议、直播等） | 适用于要求可靠传输的应用，例如文件传输 |

## 2.应用场景

**UDP**的应用场景：即时通信。面向数据报方式；网络数据大多为短消息；拥有大量客户端；对数据安全性无特殊要求；网络负担重但对响应速度要求高的场景。eg: IP电话、实时视频会议等。

**TCP**的应用场景：对数据准确性要求高，速度可以相对较慢的。eg: 文件传输、邮件的发送与接收等。

## 3.运行在TCP 或UDP的应用层协议分析

运行在TCP协议上的协议：

- HTTP（Hypertext Transfer Protocol，超文本传输协议），主要用于普通浏览。
- HTTPS（HTTP over SSL，安全超文本传输协议）,HTTP协议的安全版本。
- FTP（File Transfer Protocol，文件传输协议），用于文件传输。
- POP3（Post Office Protocol, version 3，邮局协议），收邮件用。
- SMTP（Simple Mail Transfer Protocol，简单邮件传输协议），用来发送电子邮件。
- TELNET（Teletype over the Network，网络电传），通过一个终端（terminal）登陆到网络。
- SSH（Secure Shell，用于替代安全性差的TELNET），用于加密安全登陆用。

运行在UDP协议上的协议：

- BOOTP（Boot Protocol，启动协议），应用于无盘设备。
- NTP（Network Time Protocol，网络时间协议），用于网络同步。
- DHCP（Dynamic Host Configuration Protocol，动态主机配置协议），动态配置IP地址。

运行在TCP和UDP协议上：

- DNS（Domain Name Service，域名服务），用于完成地址查找，邮件转发等工作。
- ECHO（Echo Protocol，回绕协议），用于查错及测量应答时间（运行在[TCP](https://link.juejin.cn?target=http%3A%2F%2Fzh.wikipedia.org%2Fzh-cn%2FTCP)和[UDP](https://link.juejin.cn?target=http%3A%2F%2Fzh.wikipedia.org%2Fzh-cn%2FUDP)协议上）。
- SNMP（Simple Network Management Protocol，简单网络管理协议），用于网络信息的收集和网络管理。
- DHCP（Dynamic Host Configuration Protocol，动态主机配置协议），动态配置IP地址。
- ARP（Address Resolution Protocol，地址解析协议），用于动态解析以太网硬件的地址。


参考：https://juejin.cn/post/6992743999756845087


