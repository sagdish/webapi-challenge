## Self-Study/Essay Questions

- [x] Mention two parts of Express that you learned about this week.
 - For me, main two parts of Express is Routing and Middleware. By routing I understand endpoint at which certain resource is available. Middleware is 'middle-man' who check credentials, based on which whether allows to proceed further of aborts request.

- [x] Describe Middleware?
  As mentioned above, additionally middleware is not only about checking credentials, it can modify request, redirect to different endpoints.

- [x] Describe a Resource?
  In terms of API, resource is a data which is accessible at a certain endpoint, usually comes from external database or can be stored inside of API server itself.

- [x] What can the API return to help clients know if a request was successful?
 Response status codes.

- [x] How can we partition our application into sub-applications?
  using Routers, and keep their logic in separate files, this helps organize architecture of an API and make it more readable.
  p.s. Routers are middlewares too.
