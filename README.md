# Next.js + Enterprise SSO + Cerbos Example App

This is an example application that demonstrates how to use [Cerbos](https://cerbos.dev) with [SAML Jackson](https://boxyhq.com/docs/jackson/overview)

## Run the Example App

Follow the steps below to run the example app.

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

### Run SAML Jackson and Cerbos Instances

This example comes with a `docker-compose` file that you can use to run the SAML Jackson and Cerbos instances locally. See the `docker-compose.yml` file for more details.

To start the servers, run the following command:

```bash
docker-compose up --build
```

OR

```bash
sh ./start.sh
```

This will start the SAML Jackson server on port `5225` and the Cerbos gRPC server on port `3593`.

The Jackson endpoint is available at `http://localhost:5225`.

The Cerbos endpoint is available at `http://localhost:3593`.

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

Follow the steps below to test the example app.

### Add SAML Connection

The first step is to add a SAML connection to the app. To do this, click the menu `SAML Connection` from the top navigation bar.

In real world applications, the SAML connection is typically configured by the IT team and this page should be accessible only by the users with the appropriate access in the organization.

You can use any identity provider (IdP) that supports SAML 2.0. For this example, we will use [Okta](https://www.okta.com/).

Paste the `XML Metadata` and click `Create SAML Connection` button.

### Sign in

After the SAML connection is created, click the `Sign in` button from the top navigation bar.

Enter the work email you have configured in the SAML app and click the `Continue with SAML SSO` button.

After the SAML authentication is successful, you will be redirected to the home page.

### Home

You'll see the user profile of the authenticated user on the home page.

In addition to the user profile, you'll also see the list of policies that the user has access to. These are the policies that the user has access to based on the roles assigned to the user on the SAML app.

See `/api/resources.ts` for more details about how the policies are fetched from Cerbos.

## Tech Stack

- [SAML Jackson](https://boxyhq.com/docs/jackson/overview)
- [Cerbos](https://cerbos.dev)
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)

## Learn More

To learn more about SAML Jackson and Cerbos, take a look at the following resources:

- [BoxyHQ Website](https://boxyhq.com)
- [Cerbos Website](https://cerbos.dev)
- [SAML Jackson Documentation](https://boxyhq.com/docs/jackson/overview)
- [Cerbos Documentation](https://docs.cerbos.dev/cerbos/latest/index.html)

## Contributing

Thanks for taking the time to contribute! Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make will benefit everybody and are appreciated.

Please try to create bug reports that are:

- _Reproducible._ Include steps to reproduce the problem.
- _Specific._ Include as much detail as possible: which version, what environment, etc.
- _Unique._ Do not duplicate existing opened issues.
- _Scoped to a Single Bug._ One bug per report.

## Community

- [Discord](https://discord.gg/uyb7pYt4Pa) (For live discussion with the Open-Source Community and BoxyHQ team)
- [Twitter](https://twitter.com/BoxyHQ) (Follow us)
- [GitHub Issues](https://github.com/boxyhq/jackson-cerbos/issues) (Bug reports, Contributions)

## License

[Apache 2.0 License](https://github.com/boxyhq/jackson/blob/main/LICENSE)
