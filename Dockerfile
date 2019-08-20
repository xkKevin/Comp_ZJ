# Python3.7官网镜像
FROM python:3.7.3

# 设置工作目录
WORKDIR /comp

# 复制当前目录下的文件到工作目录
COPY . /comp

# 安装pip库
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple networkx python-louvain

# 安装node
RUN wget https://nodejs.org/dist/v10.16.0/node-v10.16.0-linux-x64.tar.xz &&\
    tar xf node-v10.16.0-linux-x64.tar.xz -C /opt/
ENV PATH=$PATH:/opt/node-v10.16.0-linux-x64/bin

RUN npm install
EXPOSE 80

# 容器启动后执行命令, 运行
CMD ["node", "app.js"]

