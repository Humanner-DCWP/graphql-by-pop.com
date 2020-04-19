# (*) Converting from GQL to PQL

All [GraphQL queries](https://graphql.org/learn/queries/) are supported (click on the links below to try them out in [GraphiQL](https://newapi.getpop.org/graphiql/)):

- <a href="https://newapi.getpop.org/graphiql/?query=query%20%7B%0A%20%20posts%20%7B%0A%20%20%20%20id%0A%20%20%20%20url%0A%20%20%20%20title%0A%20%20%20%20excerpt%0A%20%20%20%20date%0A%20%20%20%20tags%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20comments%20%7B%0A%20%20%20%20%20%20content%0A%20%20%20%20%20%20author%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D" target="leoloso-graphiql">Fields</a>
- <a href="https://newapi.getpop.org/graphiql/?query=query%20%7B%0A%20%20posts(limit%3A2)%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%20%20author%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20posts(limit%3A3)%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20date(format%3A%22d%2Fm%2FY%22)%0A%20%20%20%20%20%20%20%20tags%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20featuredimage%20%7B%0A%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%20%20src%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D" target="leoloso-graphiql">Field arguments</a>
- <a href="https://newapi.getpop.org/graphiql/?query=query%20%7B%0A%20%20rootPosts%3A%20posts(limit%3A2)%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%20%20author%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20nestedPosts%3A%20posts(limit%3A3)%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20date%0A%20%20%20%20%20%20%20%20formattedDate%3A%20date(format%3A%22d%2Fm%2FY%22)%0A%20%20%20%20%20%20%20%20tags%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20featuredimage%20%7B%0A%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%20%20src%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7Dhttps://newapi.getpop.org/graphiql/?query=query%20%7B%0A%20%20rootPosts%3A%20posts(limit%3A2)%20%7B%0A%20%20%20%20...postProperties%0A%20%20%20%20author%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20nestedPosts%3A%20posts(limit%3A3)%20%7B%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20...postProperties%0A%20%20%20%20%20%20%20%20formattedDate%3A%20date(format%3A%22d%2Fm%2FY%22)%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0Afragment%20postProperties%20on%20Post%20%7B%0A%20%20id%0A%20%20title%0A%20%20tags%20%7B%0A%20%20%20%20name%0A%20%20%7D%0A%7D" target="leoloso-graphiql">Aliases</a>
- <a href="https://newapi.getpop.org/graphiql/?query=query%20%7B%0A%20%20rootPosts%3A%20posts(limit%3A2)%20%7B%0A%20%20%20%20...postProperties%0A%20%20%20%20author%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20nestedPosts%3A%20posts(limit%3A3)%20%7B%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20...postProperties%0A%20%20%20%20%20%20%20%20formattedDate%3A%20date(format%3A%22d%2Fm%2FY%22)%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0Afragment%20postProperties%20on%20Post%20%7B%0A%20%20id%0A%20%20title%0A%20%20tags%20%7B%0A%20%20%20%20name%0A%20%20%7D%0A%7D" target="leoloso-graphiql">Fragments</a>
- <a href="https://newapi.getpop.org/graphiql/?query=query%20GetPosts%20%7B%0A%20%20rootPosts%3A%20posts(limit%3A2)%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%20%20author%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&operationName=GetPosts" target="leoloso-graphiql">Operation name</a>
- <a href="https://newapi.getpop.org/graphiql/?query=query%20GetPosts(%24rootLimit%3A%20Int%2C%20%24nestedLimit%3A%20Int%2C%20%24dateFormat%3A%20String)%20%7B%0A%20%20rootPosts%3A%20posts(limit%3A%24rootLimit)%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%20%20author%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20nestedPosts%3A%20posts(limit%3A%24nestedLimit)%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20date%0A%20%20%20%20%20%20%20%20formattedDate%3A%20date(format%3A%24dateFormat)%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&operationName=GetPosts&variables=%7B%0A%20%20%22rootLimit%22%3A%203%2C%0A%20%20%22nestedLimit%22%3A%202%2C%0A%20%20%22dateFormat%22%3A%20%22d%2Fm%2FY%22%0A%7D" target="leoloso-graphiql">Variables</a>
- <a href="https://newapi.getpop.org/graphiql/?query=query%20GetPosts(%24tagsLimit%3A%20Int)%20%7B%0A%20%20rootPosts%3A%20posts(limit%3A2)%20%7B%0A%20%20%20%20...postProperties%0A%20%20%20%20author%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20nestedPosts%3A%20posts(limit%3A3)%20%7B%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20...postProperties%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0Afragment%20postProperties%20on%20Post%20%7B%0A%20%20id%0A%20%20title%0A%20%20tags(limit%3A%24tagsLimit)%20%7B%0A%20%20%20%20name%0A%20%20%7D%0A%7D&operationName=GetPosts&variables=%7B%0A%20%20%22tagsLimit%22%3A%203%0A%7D" target="leoloso-graphiql">Variables inside fragments</a>
- <a href="https://newapi.getpop.org/graphiql/?query=query%20GetPosts(%24rootLimit%3A%20Int%20%3D%203%2C%20%24nestedLimit%3A%20Int%20%3D%202%2C%20%24dateFormat%3A%20String%20%3D%20%22d%2Fm%2FY%22)%20%7B%0A%20%20rootPosts%3A%20posts(limit%3A%24rootLimit)%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%20%20author%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20nestedPosts%3A%20posts(limit%3A%24nestedLimit)%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20date%0A%20%20%20%20%20%20%20%20formattedDate%3A%20date(format%3A%24dateFormat)%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&operationName=GetPosts" target="leoloso-graphiql">Default variables</a>
- <a href="https://newapi.getpop.org/graphiql/?query=query%20GetPosts(%24includeAuthor%3A%20Boolean!%2C%20%24rootLimit%3A%20Int%20%3D%203%2C%20%24nestedLimit%3A%20Int%20%3D%202)%20%7B%0A%20%20rootPosts%3A%20posts(limit%3A%24rootLimit)%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%20%20author%20%40include(if%3A%20%24includeAuthor)%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20nestedPosts%3A%20posts(limit%3A%24nestedLimit)%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20date%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&operationName=GetPosts&variables=%7B%0A%20%20%22includeAuthor%22%3A%20true%0A%7D" target="leoloso-graphiql">Directives</a>
- <a href="https://newapi.getpop.org/graphiql/?query=query%20GetPosts(%24includeAuthor%3A%20Boolean!%2C%20%24rootLimit%3A%20Int%20%3D%203%2C%20%24nestedLimit%3A%20Int%20%3D%202)%20%7B%0A%20%20rootPosts%3A%20posts(limit%3A%24rootLimit)%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%20%20...postProperties%0A%20%20%7D%0A%7D%0Afragment%20postProperties%20on%20Post%20%7B%0A%20%20author%20%40include(if%3A%20%24includeAuthor)%20%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20nestedPosts%3A%20posts(limit%3A%24nestedLimit)%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20url%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20date%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&operationName=GetPosts&variables=%7B%0A%20%20%22includeAuthor%22%3A%20true%0A%7D" target="leoloso-graphiql">Fragments with directives</a>
- <a href="https://newapi.getpop.org/graphiql/?query=query%20GetPosts(%24rootLimit%3A%20Int%20%3D%203%2C%20%24nestedLimit%3A%20Int%20%3D%202)%20%7B%0A%20%20rootPosts%3A%20posts(limit%3A%24rootLimit)%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%20%20author%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20content(limit%3A%24nestedLimit)%20%7B%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20...%20on%20Post%20%7B%0A%20%20%20%20%20%20%20%20%20%20excerpt%0A%20%20%20%20%20%20%20%20%20%20tags%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20...%20on%20Media%20%7B%0A%20%20%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&operationName=GetPosts" target="leoloso-graphiql">Inline fragments</a>