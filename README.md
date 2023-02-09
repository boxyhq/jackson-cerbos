# Next.js + Enterprise SSO + Cerbos Example App

This is an example application that demonstrates how to use [Cerbos](https://cerbos.dev) with [SAML Jackson](https://boxyhq.com/docs/jackson/overview)

## Overview

```bash
cd cerbos
```

```bash
sh ./start.sh
```

```bash
docker-compose up
```

### Tech Stack

- [SAML Jackson](https://boxyhq.com/docs/jackson/overview)
- [Cerbos](https://cerbos.dev)
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)

## Run the Example App

### Clone the repository

```bash
git clone https://github.com/boxyhq/jackson-cerbos
```

Then `cd` into the project directory

```bash
cd jackson-cerbos
```

### Install dependencies

```bash
npm install
```

### Run SAML Jackson

This example comes with a SAML Jackson `docker-compose` file that you can use to run the SAML Jackson instance locally.

To start the server, run the following command:

```bash
docker-compose up
```

This will start the SAML Jackson server on port `5225`. The Jackson endpoint is available at `http://localhost:5225`.

### Run Cerbos

This example comes with a Cerbos `docker` file that you can use to run the Cerbos instance locally. See the folder `cerbos` for more details.

To start the server, run the following command:

```bash
cd cerbos && sh ./start.sh
```

This will start the Cerbos gRPC server on port `3593`. The Cerbos endpoint is available at `http://localhost:3593`.

To use a different Cerbos endpoint, update the file `/lib/cerbos.ts` with the new endpoint.

```javascript
import { GRPC } from "@cerbos/grpc";

export const cerbos = new GRPC("cerbos-instance-endpoint.app", {
  tls: false,
});
```

## Start the Example App

To start the Next.js app, run the following command:

```bash
npm run dev
```

This will start the Next.js app on port `3000`. The app is available at `http://localhost:3000`.

## How to test the Example App
