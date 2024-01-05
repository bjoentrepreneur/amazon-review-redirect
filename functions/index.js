const functions = require("firebase-functions");
const geoip = require("geoip-lite");

exports.geoRedirect = functions
  .region("europe-west1")
  .https.onRequest((req, res) => {
    // All domains in this array are allowed to access the function
    const allowedDomains = ["yourdomain.com", "yourseconddomain.com"];

    const host = req.headers.host;

    // Check if the domain is allowed
    if (!allowedDomains.some((domain) => host.includes(domain))) {
      res.status(403).send("Forbidden");
      return;
    }

    // Get IP address
    let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    if (ip.substr(0, 7) === "::ffff:") {
      ip = ip.substr(7);
    }

    // Look up the IP using geoip-lite
    const geo = geoip.lookup(ip);

    if (geo) {
      country = geo.country.toLowerCase();
      console.log(`Visitor from Country: ${country}`);
    } else {
      console.error("Unable to determine location for IP:", ip);
      country = "us"; // default to US
    }

    const asin = req.query.asin;
    const language = req.query.language;

    // Mapping countries to Amazon domains
    // (this could be changed based on your specific needs)
    const countryDomainMapping = {
      us: "com",
      de: "de",
      uk: "co.uk",
      fr: "fr",
      es: "es",
      it: "it",
      jp: "co.jp",
      ca: "ca",
      au: "com.au",
    };

    // Choose domain based on country or language fallback
    const domain =
      countryDomainMapping[country] || countryDomainMapping[language] || "com";

    const amazonUrl = `https://www.amazon.${domain}/review/create-review?asin=${asin}`;

    res.redirect(amazonUrl);
  });
