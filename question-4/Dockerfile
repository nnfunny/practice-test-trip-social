# pull official base image
FROM ubuntu:20.04

# Set work directory
WORKDIR /usr/src/app

# replace shell with bash so we can source files
RUN rm /bin/sh \
	&& ln -s /bin/bash /bin/sh \
	&& mkdir -p /usr/local/nvm

# update the repository sources list
# and install dependencies
RUN apt-get update --fix-missing \
  && apt-get install --no-install-recommends -y curl npm \
  && apt-get -y autoclean

# # nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 0.10.26

# # install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# install node and npm
RUN source $NVM_DIR/nvm.sh \
  && nvm install $NODE_VERSION \
  && nvm alias default $NODE_VERSION \
  && nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Alias
RUN echo 'alias nodejs=node' >> ~/.bashrc

# Copy project
COPY . .

# Install app dependencies
RUN npm install 