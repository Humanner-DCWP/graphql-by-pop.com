export default ({
    Vue, // the version of Vue being used in the VuePress app
    options, // the options for the root Vue instance
    router, // the router instance for the app
    siteData // site metadata
}) => {

    // Redirect to latest docs
    router.addRoutes([
        {
            path: '/docs/getting-started/installation/',
            redirect: `/docs/getting-started/installation/wordpress.html`
        },
        {
            path: '/docs/',
            redirect: `/docs/getting-started/intro.html`
        },
        {
            path: '/guides/',
            redirect: `/guides/intro.html`
        },
    ])
}
