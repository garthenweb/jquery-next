# jquery-next [![Build Status](https://travis-ci.org/garthenweb/jquery-next.svg)](https://travis-ci.org/garthenweb/jquery-next)

Lean implementation of a jQuery like DOM library with native APIs.

At the moment this is a fun sideproject and not intended to be used in
production. At a later point this may or may not change.


For a list of missing features see the issues with label 'enhancement'.


## Available methods

### Utility
 * each
 * forEach
 * $next.extend

### DOM

#### traversal
 * find
 * parent
 * next
 * nextAll
 * prev
 * prevAll
 * parents
 * siblings

#### manipulation
 * html
 * remove
 * empty

#### attributes
 * attr
 * removeAttr
 * data
 * val
 * css
 * addClass
 * removeClass
 * hasClass
 * toggleClass
 * width
 * outerWidth
 * height
 * outerHeight

#### other
 * is


## Contributing

Contributions are very welcome.

We are using Karma with Phantomjs and Jasmine as testing runner/frameworks,
so please write tests if you submit a pull-request.


## License
MIT
