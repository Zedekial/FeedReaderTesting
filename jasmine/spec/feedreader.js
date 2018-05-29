/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
        * in the allFeeds object and ensures it has a URL defined
        * and that the URL is not empty.
        */
        it('should have a URL defined and it should not be empty', function () {
          allFeeds.forEach(function (feed) {
              expect(feed.hasOwnProperty('url')).toBe(true);
              expect(feed.url).toContain('http://');
              expect(feed.url).toContain('.com');
              expect(feed.url).not.toBe('');
            });
          });

          /* TODO: Write a test that loops through each feed
          * in the allFeeds object and ensures it has a name defined
          * and that the name is not empty.
          */
          it('should have a Name defined and it should not be empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.hasOwnProperty('name')).toBe(true);
                expect(feed.name).not.toBe('');
              });
            });
        });



    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function () {
      let bodyClass = document.querySelectorAll('body')[0].className;
      let menuIcon = document.querySelector('.menu-icon-link');
      /* TODO: Write a test that ensures the menu element is
      * hidden by default. You'll have to analyze the HTML and
      * the CSS to determine how we're performing the
      * hiding/showing of the menu element.
      */
      it('should be hidden by default', function () {
        expect(bodyClass).toContain('menu-hidden');
      });

      /* TODO: Write a test that ensures the menu changes
      * visibility when the menu icon is clicked. This test
      * should have two expectations: does the menu display when
      * clicked and does it hide when clicked again.
      */
      it('should toggle between displayed and hidden when the menu icon is clicked', function () {
          menuIcon.click();
          expect($('body')[0].className).not.toContain('menu-hidden');
          menuIcon.click();
          expect($('body')[0].className).toContain('menu-hidden');
      });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
      let entry;

      beforeEach(function (done) {
        loadFeed(0, done);
      });
      /* TODO: Write a test that ensures when the loadFeed
      * function is called and completes its work, there is at least
      * a single .entry element within the .feed container.
      * Remember, loadFeed() is asynchronous so this test will require
      * the use of Jasmine's beforeEach and asynchronous done() function.
      */
      it('should have at least a single entry element within the feed container', function (done) {
        entry = document.getElementsByClassName('entry').length;
        expect(entry).not.toBe(0);
        expect(entry).not.toBe(undefined);
        done();
      });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
      let currentFeed;
      beforeEach(function(done) {
        loadFeed(0, function() {
          currentFeed = document.querySelector('.feed').textContent;

          loadFeed(1, done);
        });
      });
      /* TODO: Write a test that ensures when a new feed is loaded
      * by the loadFeed function that the content actually changes.
      * Remember, loadFeed() is asynchronous.
      */
      it('content should change when a new feed is loaded', function (done) {
        let newFeed = document.querySelector('.feed').textContent;
        expect(currentFeed).not.toEqual(newFeed);
        done();
      });
    });
}());
