# NPlayground

#### 20190828
##### A note about require and synchronous I/O
require is one of the few synchronous I/O operations available in Node. Because modules are used often and are typically included at the top of a file, having require be synchronous helps keep code clean, ordered, and readable.

But avoid using require in I/O-intensive parts of your application. Any synchronous call will block Node from doing anything until the call has finished. For example, if you're running an HTTP server, you would take a performance hit if you used require on each incoming request. This is typically why require and other synchronous operations are used only when the application initially loads.

