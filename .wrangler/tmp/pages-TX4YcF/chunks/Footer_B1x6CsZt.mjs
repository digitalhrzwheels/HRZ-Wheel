globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as createAstro, c as createComponent, b as addAttribute, a as renderTemplate, s as spreadAttributes, u as unescapeHTML, e as renderComponent, g as renderSlot, r as renderHead, m as maybeRenderHead, f as renderScript } from './astro/server_BAcFCBYa.mjs';
/* empty css                          */
import { $ as $$Image } from './_astro_assets_DaCf3njr.mjs';

const $$Astro$8 = createAstro("https://hrzwheel.com");
const $$OpenGraphArticleTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$OpenGraphArticleTags;
  const { publishedTime, modifiedTime, expirationTime, authors, section, tags } = Astro2.props.openGraph.article;
  return renderTemplate`${publishedTime ? renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>` : null}${modifiedTime ? renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>` : null}${expirationTime ? renderTemplate`<meta property="article:expiration_time"${addAttribute(expirationTime, "content")}>` : null}${authors ? authors.map((author) => renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`) : null}${section ? renderTemplate`<meta property="article:section"${addAttribute(section, "content")}>` : null}${tags ? tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`) : null}`;
}, "H:/WEBS/HRZ Wheels/node_modules/astro-seo/src/components/OpenGraphArticleTags.astro", void 0);

const $$Astro$7 = createAstro("https://hrzwheel.com");
const $$OpenGraphBasicTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$OpenGraphBasicTags;
  const { openGraph } = Astro2.props;
  return renderTemplate`<meta property="og:title"${addAttribute(openGraph.basic.title, "content")}><meta property="og:type"${addAttribute(openGraph.basic.type, "content")}><meta property="og:image"${addAttribute(openGraph.basic.image, "content")}><meta property="og:url"${addAttribute(openGraph.basic.url || Astro2.url.href, "content")}>`;
}, "H:/WEBS/HRZ Wheels/node_modules/astro-seo/src/components/OpenGraphBasicTags.astro", void 0);

const $$Astro$6 = createAstro("https://hrzwheel.com");
const $$OpenGraphImageTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$OpenGraphImageTags;
  const { image } = Astro2.props.openGraph.basic;
  const { secureUrl, type, width, height, alt } = Astro2.props.openGraph.image;
  return renderTemplate`<meta property="og:image:url"${addAttribute(image, "content")}>${secureUrl ? renderTemplate`<meta property="og:image:secure_url"${addAttribute(secureUrl, "content")}>` : null}${type ? renderTemplate`<meta property="og:image:type"${addAttribute(type, "content")}>` : null}${width ? renderTemplate`<meta property="og:image:width"${addAttribute(width, "content")}>` : null}${height ? renderTemplate`<meta property="og:image:height"${addAttribute(height, "content")}>` : null}${alt ? renderTemplate`<meta property="og:image:alt"${addAttribute(alt, "content")}>` : null}`;
}, "H:/WEBS/HRZ Wheels/node_modules/astro-seo/src/components/OpenGraphImageTags.astro", void 0);

const $$Astro$5 = createAstro("https://hrzwheel.com");
const $$OpenGraphOptionalTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$OpenGraphOptionalTags;
  const { optional } = Astro2.props.openGraph;
  return renderTemplate`${optional.audio ? renderTemplate`<meta property="og:audio"${addAttribute(optional.audio, "content")}>` : null}${optional.description ? renderTemplate`<meta property="og:description"${addAttribute(optional.description, "content")}>` : null}${optional.determiner ? renderTemplate`<meta property="og:determiner"${addAttribute(optional.determiner, "content")}>` : null}${optional.locale ? renderTemplate`<meta property="og:locale"${addAttribute(optional.locale, "content")}>` : null}${optional.localeAlternate?.map((locale) => renderTemplate`<meta property="og:locale:alternate"${addAttribute(locale, "content")}>`)}${optional.siteName ? renderTemplate`<meta property="og:site_name"${addAttribute(optional.siteName, "content")}>` : null}${optional.video ? renderTemplate`<meta property="og:video"${addAttribute(optional.video, "content")}>` : null}`;
}, "H:/WEBS/HRZ Wheels/node_modules/astro-seo/src/components/OpenGraphOptionalTags.astro", void 0);

const $$Astro$4 = createAstro("https://hrzwheel.com");
const $$ExtendedTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ExtendedTags;
  const { props } = Astro2;
  return renderTemplate`${props.extend.link?.map((attributes) => renderTemplate`<link${spreadAttributes(attributes)}>`)}${props.extend.meta?.map(({ content, httpEquiv, media, name, property }) => renderTemplate`<meta${addAttribute(name, "name")}${addAttribute(property, "property")}${addAttribute(content, "content")}${addAttribute(httpEquiv, "http-equiv")}${addAttribute(media, "media")}>`)}`;
}, "H:/WEBS/HRZ Wheels/node_modules/astro-seo/src/components/ExtendedTags.astro", void 0);

const $$Astro$3 = createAstro("https://hrzwheel.com");
const $$TwitterTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$TwitterTags;
  const { card, site, title, creator, description, image, imageAlt } = Astro2.props.twitter;
  return renderTemplate`${card ? renderTemplate`<meta name="twitter:card"${addAttribute(card, "content")}>` : null}${site ? renderTemplate`<meta name="twitter:site"${addAttribute(site, "content")}>` : null}${title ? renderTemplate`<meta name="twitter:title"${addAttribute(title, "content")}>` : null}${image ? renderTemplate`<meta name="twitter:image"${addAttribute(image, "content")}>` : null}${imageAlt ? renderTemplate`<meta name="twitter:image:alt"${addAttribute(imageAlt, "content")}>` : null}${description ? renderTemplate`<meta name="twitter:description"${addAttribute(description, "content")}>` : null}${creator ? renderTemplate`<meta name="twitter:creator"${addAttribute(creator, "content")}>` : null}`;
}, "H:/WEBS/HRZ Wheels/node_modules/astro-seo/src/components/TwitterTags.astro", void 0);

const $$Astro$2 = createAstro("https://hrzwheel.com");
const $$LanguageAlternatesTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LanguageAlternatesTags;
  const { languageAlternates } = Astro2.props;
  return renderTemplate`${languageAlternates.map((alternate) => renderTemplate`<link rel="alternate"${addAttribute(alternate.hrefLang, "hreflang")}${addAttribute(alternate.href, "href")}>`)}`;
}, "H:/WEBS/HRZ Wheels/node_modules/astro-seo/src/components/LanguageAlternatesTags.astro", void 0);

const $$Astro$1 = createAstro("https://hrzwheel.com");
const $$SEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SEO;
  Astro2.props.surpressWarnings = true;
  function validateProps(props) {
    if (props.openGraph) {
      if (!props.openGraph.basic || (props.openGraph.basic.title ?? void 0) == void 0 || (props.openGraph.basic.type ?? void 0) == void 0 || (props.openGraph.basic.image ?? void 0) == void 0) {
        throw new Error(
          "If you pass the openGraph prop, you have to at least define the title, type, and image basic properties!"
        );
      }
    }
    if (props.title && props.openGraph?.basic.title) {
      if (props.title == props.openGraph.basic.title && !props.surpressWarnings) {
        console.warn(
          "WARNING(astro-seo): You passed the same value to `title` and `openGraph.optional.title`. This is most likely not what you want. See docs for more."
        );
      }
    }
    if (props.openGraph?.basic?.image && !props.openGraph?.image?.alt && !props.surpressWarnings) {
      console.warn(
        "WARNING(astro-seo): You defined `openGraph.basic.image`, but didn't define `openGraph.image.alt`. This is strongly discouraged.'"
      );
    }
  }
  validateProps(Astro2.props);
  let updatedTitle = "";
  if (Astro2.props.title) {
    updatedTitle = Astro2.props.title;
    if (Astro2.props.titleTemplate) {
      updatedTitle = Astro2.props.titleTemplate.replace(/%s/g, updatedTitle);
    }
  } else if (Astro2.props.titleDefault) {
    updatedTitle = Astro2.props.titleDefault;
  }
  const baseUrl = Astro2.site ?? Astro2.url;
  const defaultCanonicalUrl = new URL(Astro2.url.pathname + Astro2.url.search, baseUrl);
  return renderTemplate`${updatedTitle ? renderTemplate`<title>${unescapeHTML(updatedTitle)}</title>` : null}${Astro2.props.charset ? renderTemplate`<meta${addAttribute(Astro2.props.charset, "charset")}>` : null}<link rel="canonical"${addAttribute(Astro2.props.canonical || defaultCanonicalUrl.href, "href")}>${Astro2.props.description ? renderTemplate`<meta name="description"${addAttribute(Astro2.props.description, "content")}>` : null}<meta name="robots"${addAttribute(`${Astro2.props.noindex ? "noindex" : "index"}, ${Astro2.props.nofollow ? "nofollow" : "follow"}`, "content")}>${Astro2.props.openGraph && renderTemplate`${renderComponent($$result, "OpenGraphBasicTags", $$OpenGraphBasicTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.optional && renderTemplate`${renderComponent($$result, "OpenGraphOptionalTags", $$OpenGraphOptionalTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.image && renderTemplate`${renderComponent($$result, "OpenGraphImageTags", $$OpenGraphImageTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.article && renderTemplate`${renderComponent($$result, "OpenGraphArticleTags", $$OpenGraphArticleTags, { ...Astro2.props })}`}${Astro2.props.twitter && renderTemplate`${renderComponent($$result, "TwitterTags", $$TwitterTags, { ...Astro2.props })}`}${Astro2.props.extend && renderTemplate`${renderComponent($$result, "ExtendedTags", $$ExtendedTags, { ...Astro2.props })}`}${Astro2.props.languageAlternates && renderTemplate`${renderComponent($$result, "LanguageAlternatesTags", $$LanguageAlternatesTags, { ...Astro2.props })}`}`;
}, "H:/WEBS/HRZ Wheels/node_modules/astro-seo/src/SEO.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://hrzwheel.com");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "Expert mobile wheel repair service in Los Angeles & Orange County. Professional curb rash repair, alloy rim refinishing & bumper spot repair. Same-day service available. Call (626) 863-2885 for a free quote!"
  } = Astro2.props;
  const siteUrl = "https://hrzwheel.com";
  const currentUrl = new URL(Astro2.url.pathname, siteUrl).href;
  return renderTemplate(_a || (_a = __template(['<html lang="en" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', `><!-- Preconnect to Google Analytics for faster loading --><link rel="preconnect" href="https://www.googletagmanager.com"><link rel="dns-prefetch" href="https://www.googletagmanager.com"><!-- Google tag (gtag.js) - Deferred loading for better performance --><script type="text/partytown" async src="https://www.googletagmanager.com/gtag/js?id=G-CFXBMQPXLE"><\/script><script type="text/partytown">
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-CFXBMQPXLE');
        <\/script>`, '<!-- Schema.org Structured Data for Local Business --><script type="application/ld+json">', "<\/script>", '</head> <body class="bg-black text-gray-100 overflow-x-hidden selection:bg-gold-500 selection:text-black"> ', " </body></html>"])), addAttribute(Astro2.generator, "content"), renderComponent($$result, "SEO", $$SEO, { "title": title, "description": description, "canonical": currentUrl, "openGraph": {
    basic: {
      title: `${title} | Premium Mobile Wheel Repair`,
      type: "website",
      image: `${siteUrl}/og-image.png`,
      url: currentUrl
    },
    optional: {
      description,
      siteName: "HRZ Wheel Repair",
      locale: "en_US"
    },
    image: {
      url: `${siteUrl}/og-image.png`,
      secureUrl: `${siteUrl}/og-image.png`,
      type: "image/png",
      width: 1200,
      height: 630,
      alt: "HRZ Wheel Repair - Professional Mobile Wheel Repair in Los Angeles & Orange County"
    }
  }, "twitter": {
    card: "summary_large_image",
    site: "@hrzwheel",
    creator: "@hrzwheel",
    title,
    description,
    image: `${siteUrl}/og-image.png`,
    imageAlt: "HRZ Wheel Repair - Professional Mobile Wheel Repair"
  }, "extend": {
    meta: [
      { name: "keywords", content: "wheel repair Los Angeles, wheel repair Orange County, curb rash repair LA, mobile wheel repair, alloy wheel repair, rim repair Los Angeles, Tesla wheel repair, BMW wheel repair, luxury car wheel repair, mobile rim repair Orange County, same day wheel repair, professional wheel refinishing" },
      { name: "author", content: "HRZ Wheel Repair" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
      { name: "geo.region", content: "US-CA" },
      { name: "geo.placename", content: "Los Angeles, Orange County" },
      { name: "geo.position", content: "34.0522;-118.2437" },
      { name: "ICBM", content: "34.0522, -118.2437" },
      // Facebook Domain Verification (optional - add your verification code if you have one)
      // { name: "facebook-domain-verification", content: "your_verification_code" },
      // Mobile optimization
      { name: "theme-color", content: "#000000" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      // Business info
      { name: "business:contact_data:locality", content: "Los Angeles" },
      { name: "business:contact_data:region", content: "CA" },
      { name: "business:contact_data:country_name", content: "USA" },
      { name: "business:contact_data:phone_number", content: "+16268632885" }
    ],
    link: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" }
    ]
  } }), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "HRZ Wheel Repair",
    "image": `${siteUrl}/og-image.png`,
    "description": "Professional mobile wheel repair service specializing in curb rash repair, alloy wheel refinishing, and bumper spot repair in Los Angeles and Orange County.",
    "url": siteUrl,
    "telephone": "+16268632885",
    "email": "hector@hrzwheel.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "addressCountry": "US",
      "areaServed": [
        {
          "@type": "City",
          "name": "Los Angeles"
        },
        {
          "@type": "City",
          "name": "Orange County"
        }
      ]
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "34.0522",
      "longitude": "-118.2437"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, Debit Card",
    "currenciesAccepted": "USD",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120",
      "bestRating": "5",
      "worstRating": "1"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "34.0522",
        "longitude": "-118.2437"
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Wheel Repair Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Curb Rash Repair",
            "description": "Professional curb rash repair service to restore your wheels to factory condition"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Alloy Wheel Refinishing",
            "description": "Complete alloy wheel refinishing and restoration services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile Wheel Repair",
            "description": "Convenient mobile service - we come to your location in Los Angeles or Orange County"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.yelp.com/biz/hrz-wheel-repair-hacienda-heights-10",
      "http://YouTube.com/@HRZwheelofficial"
    ]
  })), renderHead(), renderSlot($$result, $$slots["default"]));
}, "H:/WEBS/HRZ Wheels/src/layouts/Layout.astro", void 0);

const logoImage = new Proxy({"src":"/_astro/HRZ WHEEL._dbAfSND.png","width":1920,"height":250,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "H:/WEBS/HRZ Wheels/src/assets/images/HRZ WHEEL.png";
							}
							
							return target[name];
						}
					});

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="fixed w-full top-0 z-50"> <!-- Header Background --> <div class="absolute inset-0 bg-black/90 backdrop-blur-md border-b border-white/10 z-0"></div> <div class="container mx-auto px-6 py-4 flex justify-between items-center relative z-10"> <a href="/" class="block"> ${renderComponent($$result, "Image", $$Image, { "src": logoImage, "alt": "HRZ Wheel Repair - Mobile Wheel Repair Los Angeles & Orange County", "title": "HRZ Wheel Repair - Professional Mobile Rim Repair Service", "class": "h-7 w-auto" })} </a> <nav class="hidden md:flex space-x-8 items-center"> <a href="/" class="text-sm font-medium text-gray-300 hover:text-gold-500 transition-colors">Home</a> <a href="/#about" class="text-sm font-medium text-gray-300 hover:text-gold-500 transition-colors">About Us</a> <a href="/#offer" class="text-sm font-medium text-gray-300 hover:text-gold-500 transition-colors">Offer</a> <a href="/#services" class="text-sm font-medium text-gray-300 hover:text-gold-500 transition-colors">Services</a> <a href="/#testimonials" class="text-sm font-medium text-gray-300 hover:text-gold-500 transition-colors">Testimonials</a> <a href="/blog" class="text-sm font-medium text-gray-300 hover:text-gold-500 transition-colors">Blog</a> <a href="/contact" class="bg-gold-500 hover:bg-gold-400 text-black px-5 py-2 rounded-full font-bold text-sm transition-all transform hover:scale-105">
Get a Quote
</a> </nav> <!-- Mobile Menu Button --> <button id="mobile-menu-btn" class="md:hidden text-white focus:outline-none min-w-[48px] min-h-[48px] flex items-center justify-center z-50 relative" aria-label="Toggle navigation menu" aria-expanded="false"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path> </svg> </button> </div> <!-- Mobile Menu Overlay --> <div id="mobile-menu" class="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col justify-center items-center space-y-8 md:hidden"> <!-- Close Button inside Menu --> <button id="mobile-menu-close" class="absolute top-6 right-6 text-white focus:outline-none p-2" aria-label="Close navigation menu"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"> <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> <a href="/" class="text-2xl font-medium text-white hover:text-gold-500 transition-colors mobile-link">Home</a> <a href="/#about" class="text-2xl font-medium text-white hover:text-gold-500 transition-colors mobile-link">About Us</a> <a href="/#offer" class="text-2xl font-medium text-white hover:text-gold-500 transition-colors mobile-link">Offer</a> <a href="/#services" class="text-2xl font-medium text-white hover:text-gold-500 transition-colors mobile-link">Services</a> <a href="/#testimonials" class="text-2xl font-medium text-white hover:text-gold-500 transition-colors mobile-link">Testimonials</a> <a href="/blog" class="text-2xl font-medium text-white hover:text-gold-500 transition-colors mobile-link">Blog</a> <a href="/contact" class="bg-gold-500 hover:bg-gold-400 text-black px-8 py-3 rounded-full font-bold text-xl transition-all transform hover:scale-105 mobile-link">
Get a Quote
</a> </div> </header> ${renderScript($$result, "H:/WEBS/HRZ Wheels/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "H:/WEBS/HRZ Wheels/src/components/Header.astro", void 0);

const logo = new Proxy({"src":"/_astro/Logotipo.CFu5EqkC.png","width":612,"height":792,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "H:/WEBS/HRZ Wheels/src/assets/images/Logotipo.png";
							}
							
							return target[name];
						}
					});

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="bg-zinc-950 border-t border-white/10 pt-16 pb-8"> <div class="container mx-auto px-6"> <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12 mb-12"> <div class="col-span-1 sm:col-span-2 md:col-span-2"> <a href="/" class="block mb-6"> ${renderComponent($$result, "Image", $$Image, { "src": logo, "alt": "HRZ Wheel Repair Logo - Expert Mobile Wheel Repair in Los Angeles & Orange County", "title": "HRZ Wheel Repair - Professional Curb Rash Repair & Alloy Wheel Refinishing", "class": "h-16 w-auto" })} </a> <p class="text-gray-300 text-sm leading-relaxed max-w-md mb-6">
Premier mobile wheel repair service in Los Angeles and
                    Orange County. Professional curb rash repair, alloy wheel
                    refinishing, and bumper spot repair. We restore the beauty
                    and value of your vehicle with precision and care. Same-day
                    service available.
</p> <div class="flex space-x-4"> <!-- YouTube --> <a href="http://YouTube.com/@HRZwheelofficial" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-gold-500 hover:text-black transition-all" aria-label="Visit our YouTube channel"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path> </svg> </a> <!-- Yelp --> <a href="https://www.yelp.com/biz/hrz-wheel-repair-hacienda-heights-10" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-gold-500 hover:text-black transition-all" aria-label="Read our Yelp reviews"> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path d="M21.111 18.226c-.141.969-2.119 3.483-3.029 3.847-.311.124-.611.094-.85-.09-.154-.12-2.894-2.291-3.076-2.583-.187-.296-.144-.62.09-.87.573-.609 3.223-3.428 3.578-3.583.354-.156.706-.11 1.005.09.297.199 2.471 2.559 2.282 3.189zm-3.764-9.222c-.141.969-2.119 3.483-3.029 3.847-.311.124-.611.094-.85-.09-.154-.12-2.894-2.291-3.076-2.583-.187-.296-.144-.62.09-.87.573-.609 3.223-3.428 3.578-3.583.354-.156.706-.11 1.005.09.297.199 2.471 2.559 2.282 3.189zM10.948 8.885c-.957-.128-3.568-1.946-3.976-2.8-.139-.291-.089-.595.103-.823.125-.148 2.482-2.743 2.786-2.907.308-.167.626-.122.867.119.587.589 3.307 3.301 3.45 3.672.143.372.065.717-.228.98-.715.642-3.003 1.759-3.002 1.759zm-2.886 9.593c.156-.354.127-.706-.073-1.003-.201-.296-2.557-2.471-3.188-2.282-.968.141-3.483 2.119-3.847 3.029-.124.311-.094.611.09.85.12.154 2.291 2.894 2.583 3.076.296.187.62.144.87-.09.609-.573 3.428-3.223 3.565-3.58z"></path> </svg> </a> </div> </div> <div> <h3 class="text-white font-bold mb-6">Services</h3> <ul class="space-y-3 text-sm text-gray-300"> <li> <a href="/#services" class="hover:text-gold-500 transition-colors">Curb Rash Repair</a> </li> <li> <a href="/#services" class="hover:text-gold-500 transition-colors">Alloy Wheel Repair</a> </li> <li> <a href="/#services" class="hover:text-gold-500 transition-colors">Rim Refinishing</a> </li> <li> <a href="/contact" class="hover:text-gold-500 transition-colors">Lease Return Fix</a> </li> </ul> </div> <div> <h3 class="text-white font-bold mb-6">Contact</h3> <ul class="space-y-3 text-sm text-gray-300"> <li class="flex items-start"> <span class="text-gold-500 mr-2">📍</span>
Serving Los Angeles & <br>Orange County
</li> <li class="flex items-center"> <span class="text-gold-500 mr-2">📞</span> <a href="tel:+16268632885" class="hover:text-white transition-colors">(626) 863-2885</a> </li> <li class="flex items-center"> <span class="text-gold-500 mr-2">✉️</span> <a href="mailto:hector@hrzwheel.com" class="hover:text-white transition-colors">hector@hrzwheel.com</a> </li> </ul> </div> <div> <h3 class="text-white font-bold mb-6">Business Hours</h3> <ul class="space-y-3 text-sm text-gray-300"> <li class="flex items-start"> <span class="text-gold-500 mr-2">🕒</span> <div> <div>Mon - Fri</div> <div class="text-gray-400">9:00 am - 5:00 pm</div> </div> </li> <li class="flex items-start"> <span class="text-gold-500 mr-2">🕒</span> <div> <div>Sat</div> <div class="text-gray-400">9:00 am - 2:00 pm</div> </div> </li> </ul> </div> </div> <div class="border-t border-white/5 pt-8 relative flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4"> <p class="order-1">
&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} HRZ Wheel Repair. All rights reserved.
</p> <p class="order-2 md:absolute md:left-1/2 md:-translate-x-1/2">
Website developed with <span class="text-red-500">❤️</span> by
<a href="https://vruju.com" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-gold-500 transition-colors font-medium">
Vruju
</a> </p> <div class="flex space-x-6 order-3"> <a href="/contact" class="hover:text-gray-200">Privacy Policy</a> <a href="/contact" class="hover:text-gray-200">Terms of Service</a> </div> </div> </div> </footer>`;
}, "H:/WEBS/HRZ Wheels/src/components/Footer.astro", void 0);

export { $$Layout as $, $$Header as a, $$Footer as b, logo as l };
