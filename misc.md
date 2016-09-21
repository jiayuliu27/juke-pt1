# Miscellaneous Tidbits

## The DOM
### addEventListener vs. onclick
Turns out there are two significant differences to `addEventListener` and `onclick`, the first one being that `addEventListener` will simply add more handlers, and `onclick` will only add one handler and then will override that handler if you try to add subsequent ones. 

However, `onclick` will always work, whereas `addEventListener` will not work for older version of Internet Explorer (<9)… you’ll want to use the `attachEvent` method instead. This is just if you’re adding event listeners with vanilla JS. If you’re already using jQuery or some other library, it should take care of cross-browser compatibility for you.

(Reference)[http://stackoverflow.com/questions/6348494/addeventlistener-vs-onclick]

## Libraries
### Lodash: Clone versus Clone Deep

## Express
### body-parser, the `urlencoded` `extended` option
This option specifies which of two libraries, `qs` or `querystring`, body-parser will use. When you specify `extended: true`, body-parser uses `qs`, which allows you to create nested objects within your query strings by surrounding the name of sub-keys with square brackets []. For example, `qs` will convert the string `foo[bar]=baz` to: 
```
{
  foo: {
    bar: 'baz'
  }
}
``` 

N.B. By default, when nesting objects, `qs` will only parse up to 5 children deep.
(Reference 1)[https://github.com/expressjs/body-parser#bodyparserurlencodedoptions],
(Reference 2)[https://www.npmjs.com/package/qs#readme]