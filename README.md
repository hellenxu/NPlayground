# NPlayground

### 20190828
***
#### No.1 A note about require and synchronous I/O
require is one of the few synchronous I/O operations available in Node. Because modules are used often and are typically included at the top of a file, having require be synchronous helps keep code clean, ordered, and readable.

But avoid using require in I/O-intensive parts of your application. Any synchronous call will block Node from doing anything until the call has finished. For example, if you're running an HTTP server, you would take a performance hit if you used require on each incoming request. This is typically why require and other synchronous operations are used only when the application initially loads.

#### No.2 What really gets exported
If you create a module that populates both `exports` and `module.exports`, `module.exports` will be returned and `exports` will be ignored.

What ultimately gets exported in your application is `module.exports`. `exports` is set up simply as a global reference to `module.exports`, which initially is defined as an empty object that you can add properties to. So for example, `exports.myFunc` is just shorthand for `module.exports.myFunc`.

As a result, if `exports` is set to anything else, it breaks the reference between `module.exports` and `exports`. Because `module.exports` is what really gets exported, `exports` will no longer work as expected -- it doesn't reference module.exports anymore. If you want to maintain that link, you can make `module.exports` reference `exports` again as follows:

```javascript
module.exports = exports = Currency;
```
Beside from that, `exports` is inaccessible from outside, please see examples in [Sample.js](./basics/Sample.js)
