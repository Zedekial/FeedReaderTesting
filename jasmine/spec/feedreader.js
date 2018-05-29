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
    // The first test suite will test the RSS Feeds by checking 'allfeeds'
    describe('RSS Feeds', function() {
        // The first test checks to make sure that the allFeeds array is defined
        // And that it is not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // This next test loops through the allFeeds array and confirms that
        // A URL is defined and not empty.
        it('should have a URL defined and it should not be empty', function () {
          allFeeds.forEach(function (feed) {
              expect(feed.hasOwnProperty('url')).toBe(true);
              expect(feed.url).toContain('http://');
              expect(feed.url).toContain('.com');
              expect(feed.url).not.toBe('');
            });
          });

          // This test is similar to the URL test however checks for a name
          it('should have a Name defined and it should not be empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.hasOwnProperty('name')).toBe(true);
                expect(feed.name).not.toBe('');
              });
            });
        });

    // This test suite is checking the menu
    describe('The Menu', function () {
      let bodyClass = document.querySelectorAll('body')[0].className;
      let menuIcon = document.querySelector('.menu-icon-link');

      // Is the menu hidden by default. The menu is hidden by assigning
      // A class to it which matches CSS.
      it('should be hidden by default', function () {
        expect(bodyClass).toContain('menu-hidden');
      });

      // Does the menu toggle between hidden and displayed when the icon is clicked
      // Again this checks the menu-hidden class.
      it('should toggle between displayed and hidden when the menu icon is clicked', function () {
          menuIcon.click();
          expect($('body')[0].className).not.toContain('menu-hidden');
          menuIcon.click();
          expect($('body')[0].className).toContain('menu-hidden');
      });

    });

    // This suite is for the initial entries into the feed.
    describe('Initial Entries', function () {
      let entry;

      beforeEach(function (done) {
        loadFeed(0, done);
      });
      // The first test will check that once the loadFeed function has complete
      // There is at least a single entry in the feed.
      it('should have at least a single entry element within the feed container', function (done) {
        entry = document.getElementsByClassName('entry').length;
        expect(entry).not.toBe(0);
        expect(entry).not.toBe(undefined);
        done();
      });
    });

    // The New Feed Selection suite
    describe('New Feed Selection', function () {
      let currentFeed;
      // For this to work, before each test the feed is loaded at the first index
      // After that the second feed is loaded.
      beforeEach(function(done) {
        loadFeed(0, function() {
          // After the first feed is loaded a variable is created as the current feed
          currentFeed = document.querySelector('.feed').textContent;

          loadFeed(1, done);
        });
      });
      // This last test will check that the first feed loaded 'currentFeed' is different
      // To the new feed loaded 'newFeed'.
      it('content should change when a new feed is loaded', function (done) {
        let newFeed = document.querySelector('.feed').textContent;
        expect(currentFeed).not.toEqual(newFeed);
        done();
      });
    });
}());
