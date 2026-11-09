# CobaltCore Documentation

## About this project

This is the official CobaltCore documentation.

## Requirements and Setup

Use **Local** if you have Node.js installed — it's faster and simpler.
Use **Docker** if you'd rather not install Node.js locally.

### Local

Requires [Node.js](https://nodejs.org/) 22.18 or newer, and git. The build
loads a TypeScript module of C5C3/cobaltcore with Node's built-in type
stripping (see [The OpenStack section](#the-openstack-section)).

```sh
npm install
npm run docs:dev
```

### Docker

```sh
docker compose up
```

In both cases the documentation is accessible at [http://localhost:5173/](http://localhost:5173/).

### The OpenStack section

The pages under `/openstack/` are the documentation of
[C5C3/cobaltcore](https://github.com/C5C3/cobaltcore). Before `docs:dev` and
`docs:build`, npm runs `npm run docs:sync`, which clones C5C3/cobaltcore into
`docs/_upstream/cobaltcore` unless a checkout is already there. The directory is
ignored by git; delete it to fetch a fresh copy.

To preview changes in a local C5C3/cobaltcore checkout, copy it in and start the
development server:

```sh
COBALTCORE_SRC=../cobaltcore npm run docs:sync
npm run docs:dev
```

Run `docs:sync` with `COBALTCORE_SRC` again after each change; copying needs
rsync. [Publishing to cobaltcore.dev](https://c5c3.github.io/cobaltcore/contributing/publishing-to-cobaltcore-dev.html)
describes which pages are published and how their links resolve.

## Support, Feedback, Contributing

This project is open to feature requests and suggestions, bug reports etc. via
[GitHub issues](https://github.com/cobaltcore-dev/docs/issues). Contribution
and feedback are encouraged and always welcome. For more information about how
to contribute, the project structure, as well as additional contribution
information, see our [Contribution Guidelines](CONTRIBUTING.md).

## Security / Disclosure
If you find any bug that may be a security problem, please follow our
instructions at [in our security
policy](https://github.com/cobaltcore-dev/.github/blob/main/SECURITY.md) on how
to report it. Please do not create GitHub issues for security-related doubts or
problems.

## Code of Conduct

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone. By participating in this
project, you agree to abide by its [Code of
Conduct](https://github.com/cobaltcore-dev/.github/blob/main/CODE_OF_CONDUCT.md)
at all times.

## Licensing

Copyright 2025 CobaltCore contributors.
Please see our [LICENSE](LICENSE) for copyright and license information.
