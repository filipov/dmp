FROM node:14.11

RUN apt-get update && apt-get install -y git openssl ca-certificates curl gcc python3
RUN curl -L https://sh.rustup.rs | sh -s -- -y --default-toolchain=nightly
ENV PATH=$PATH:/root/.cargo/bin

RUN ~/.cargo/bin/rustup update
RUN ~/.cargo/bin/rustup target add wasm32-unknown-unknown
RUN ~/.cargo/bin/cargo install wasm-pack

EXPOSE 8080
