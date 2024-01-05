# Redirect Cloud Function for Amazon Ratings

This repository contains a Firebase Cloud Function designed to perform geographical redirection based on the user's IP address. It's particularly useful for redirecting users to domain-specific pages or services, ensuring that they reach the most relevant content based on their location.

You can deploy this function and once a user, who bought a book on Amazon clicks on the link, they will be reidrected to the correct Amazon Store (US, DE, FR, ...) based on their IP address or langauge. Default always forwards to amazon.com

Tip: Use a QR code so the user can scan even easier.

## Functionality

The `geoRedirect` function:

- Checks if the domain making the request is allowed.
- Retrieves the user's IP address.
- Determines the user's geographical location using the `geoip-lite` library.
- Redirects the user to a specific URL based on their country, with a fallback to a default domain.

## Setup

### Prerequisites

- Node.js
- Firebase CLI
- A Firebase project

### Installation

1. Clone the repository:

   ```bash
   git clone [Your Repository URL]
   cd [Your Repository Directory]
   ```

2. Navigate to the functions directory:

```bash
   cd functions
```

3. Istall dependencies:

```bash
   npm install

```

### Configuration

- Update the `allowedDomains` array in the `index.js` file to include the domains that are allowed to access this function.
- Modify the `countryDomainMapping` object to map countries to specific domains as needed.

## Deployment

Deploy the function to Firebase using the following command:

```bash
firebase deploy --only functions
```

## Usage

Make a request to the deployed function's URL with the appropriate headers and query parameters:

- `x-forwarded-for`: User's IP address.
- `asin`: The Amazon Standard Identification Number.
- `language`: (Optional) Fallback language parameter.

## Disclaimer

This project is not affiliated with or endorsed by Amazon or any other domain-specific services used in the function.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [Issues](https://github.com/bjoentrepreneur/amazon-review-redirect/issues) if you want to contribute.

## License

MIT

## Contact

For any queries or contributions, please contact [Björn](https://github.com/bjoentrepreneur)
