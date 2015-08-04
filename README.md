Website for Myanmar Flood 2015 07/08
===================

This is the community driven development repo for http://www.myanmarflood.info which is accompanied by the FloodInfo Android application. 

Recently(July / August, 2015), a flood disaster has been fallen upon the Sagaing and Rakhine divisions of Myanmar. This web site is an emergency information website for providing flood related information, news as well as a site for connecting donor groups, charity communities and the public.

Credits
--------

- Modal box is inspire on [http://materializecss.com/modals.html](http://materializecss.com/modals.html)
- Material Design Loading Spinner [http://codepen.io/jczimm/pen/vEBpoL](http://codepen.io/jczimm/pen/vEBpoL)


Development
-----------

Before start, We use gulp to handle automate

```bash
$ npm install gulp -g
```

Install ruby with [rvm](http://rvm.io), if you haven't.

```bash
$ git clone https://github.com/MMAUG/flood-website
$ cd flood-website
$ bundle install
$ npm install
$ gulp
$ ruby app.rb
```

The app should be running at `http://localhost:4567`


Contributing
------------

1. Fork it ( https://github.com/MMAUG/flood-website )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request


LICENSE
-------
MIT
