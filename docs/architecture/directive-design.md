# (*) Directive Design

Directives play an important role: they allow to implement those features which are not natively-supported by the [GraphQL spec](https://spec.graphql.org/) or by the GraphQL server itself. Directives can then help fill the void in terms of functionality, so that the API can satisfy its requirements, either known or unknown ones.

For this reason, directives are an extremely important element within the foundations of the GraphQL server. GraphQL by PoP relies on a sound and solid architectural design for directives, which enables it to become both extensible and powerful.

## Directive as Foundational Blocks

TODO

## The Directive Pipeline

TODO

## Efficient directive calls

Directives receive all their affected objects and fields together, for a single execution.

In the examples below, the Google Translate API is called the minimum possible amount of times to execute multiple translations.

In [this query](https://newapi.getpop.org/graphiql/?query=query%20%7B%0A%20%20posts(limit%3A5)%20%7B%0A%20%20%20%20title%0A%20%20%20%20excerpt%0A%20%20%20%20titleES%3A%20title%20%40translate(from%3A%22en%22%2C%20to%3A%22es%22)%0A%20%20%20%20excerptES%3Aexcerpt%20%40translate(from%3A%22en%22%2C%20to%3A%22es%22)%0A%20%20%7D%0A%7D), the Google Translate API is called once, containing 10 pieces of text to translate (2 fields, title and excerpt, for 5 posts):

```graphql
query {
  posts(limit:5) {
    title
    excerpt
    titleES: title @translate(from:"en", to:"es")
    excerptES:excerpt @translate(from:"en", to:"es")
  }
}
```

In [this query](https://newapi.getpop.org/graphiql/?query=query%20%7B%0A%20%20posts(limit%3A5)%20%7B%0A%20%20%20%20title%0A%20%20%20%20excerpt%0A%20%20%20%20titleES%3A%20title%20%40translate(from%3A%22en%22%2C%20to%3A%22es%22)%0A%20%20%20%20excerptES%3Aexcerpt%20%40translate(from%3A%22en%22%2C%20to%3A%22es%22)%0A%20%20%20%20titleDE%3A%20title%20%40translate(from%3A%22en%22%2C%20to%3A%22de%22)%0A%20%20%20%20excerptDE%3Aexcerpt%20%40translate(from%3A%22en%22%2C%20to%3A%22de%22)%0A%20%20%20%20titleFR%3A%20title%20%40translate(from%3A%22en%22%2C%20to%3A%22fr%22)%0A%20%20%20%20excerptFR%3Aexcerpt%20%40translate(from%3A%22en%22%2C%20to%3A%22fr%22)%0A%20%20%7D%0A%7D) there are 3 calls to the API, one for every language (Spanish, French and German), 10 strings each, all calls are concurrent:

```graphql
query {
  posts(limit:5) {
    title
    excerpt
    titleES: title @translate(from:"en", to:"es")
    excerptES:excerpt @translate(from:"en", to:"es")
    titleDE: title @translate(from:"en", to:"de")
    excerptDE:excerpt @translate(from:"en", to:"de")
    titleFR: title @translate(from:"en", to:"fr")
    excerptFR:excerpt @translate(from:"en", to:"fr")
  }
}
```

::: details View PQL queries

```less
// The Google Translate API is called once, containing 10 pieces of text to translate (2 fields, title and excerpt, for 5 posts)
/?query=
  posts(limit:5).
    --props|
    --props@spanish<
      translate(en,es)
    >&
props=
  title|
  excerpt

// Here there are 3 calls to the API, one for every language (Spanish, French and German), 10 strings each, all calls are concurrent
/?query=
  posts(limit:5).
    --props|
    --props@spanish<
      translate(en,es)
    >|
    --props@french<
      translate(en,fr)
    >|
    --props@german<
      translate(en,de)
    >&
props=
  title|
  excerpt
```

[View results: <a href="https://newapi.getpop.org/api/graphql/?query=posts(limit:5).--props%7C--props@spanish<translate(en,es)>&amp;props=title%7Cexcerpt">query #1</a>, <a href="https://newapi.getpop.org/api/graphql/?query=posts(limit:5).--props%7C--props@spanish%3Ctranslate(en,es)%3E%7C--props@french%3Ctranslate(en,fr)%3E%7C--props@german%3Ctranslate(en,de)%3E&amp;props=title%7Cexcerpt">query #2</a>]

:::
