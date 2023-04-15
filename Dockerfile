# Stage 1: Compile TypeScript
FROM node:16 AS builder

WORKDIR /build

COPY packages/package.json ./
RUN yarn install --frozen-lockfile

COPY . .
COPY packages/tsconfig.json ./
RUN yarn tsc -p packages -jsx react

# Stage 2: Create the final image
FROM ubuntu:latest

WORKDIR /server

# Copy files from the builder stage
COPY --from=builder /build /server

# Delete all TypeScript files
RUN find /server -type f -name "*.ts" -exec rm {} +

# Copy other necessary files
COPY ./ragemp-srv /server
COPY conf.json /server/ragemp-srv

RUN chmod +x ./ragemp-server

CMD ["./ragemp-server"]
