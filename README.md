# Holidation

![Screenshot](https://kimrm.github.io/venue-booking-app/images/screenshot.png)

## A venue booking app

A fictive booking app made, Airbnb style, for a student project exam.

## Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Postgres](https://www.postgresql.org/)

## Dependencies

- [SWR](https://swr.vercel.app/)
- [Zod](https://zod.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Playwright](https://playwright.dev/)
- [Jest](https://jestjs.io/)
- [react-datepicker](https://www.npmjs.com/package/react-date-picker)
- [vercel/postgres](https://www.npmjs.com/package/@vercel/postgres)
- [mapbox](https://docs.mapbox.com/api/maps/)

## Demo deployment

A demo deployment can be viewed here: [https://venue-booking-app.vercel.app](https://venue-booking-app.vercel.app)

## Running this project locally

1. Clone the repo:

```bash
git clone git@github.com:kimrm/venue-booking-app.git
```

2. Install dependencies:

```bash
npm install
```

3. Run project:

```bash
npm run dev
```

This project needs a Postgres database for the <em>featured venues</em> and <em>rating</em> features to work.
It also needs a <em>public Mapbox key</em>, `NEXT_PUBLIC_MAP_KEY` in the .env file, and a <em>API-Key for the Noroff API</em>, `API_KEY` in the .env file.
Check the `.env.example` file for configuration.

## Contributing

As this is a student, project contributions is not requested.

## Contact

[My website](https://kimrune.dev)

## License

No license required. Project is free to clone for example or educational purposes.
