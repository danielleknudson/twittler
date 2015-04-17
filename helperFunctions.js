var createElement = function(type, innerContent, classes, id, data){
	// create jquery element object
	var el = $('<' + type + '></' + type + '>');

	// add classes to the element
	for (var i = 0; i < classes.length; i++) {
		el.addClass(classes[i]);
	}

	// add ID to the element if any
	if (id) {
		el.attr("id", id);
	}

	// put content into element
	if (Array.isArray(innerContent) === true) {
		for (var i = 0; i < innerContent.length; i++) {
			el.append(innerContent[i]);
		}
	} else {
		el.text(innerContent);
	}

	return el;

}; // end of createElement

function refreshStream(){
	// clear feed
	var feed = $('#feed');
	feed.html('');

	for (var i = streams.home.length -1; i >= 0; i--){
		// create tweet to append to stream
		// create element contains a link, a span, and a paragraph
		var link = createElement('a', streams.home[i].user, ["link"], streams.home[i].user);
		var span = createElement('span', jQuery.format.prettyDate(streams.home[i].created_at), ["timestamp"]);
		var message = createElement('p', streams.home[i].message, ["message"]);
		var tweet = createElement('div', [link, span, message], ["tweet"]);

		tweet.appendTo(feed);
	} // end of for loop
	$('.tweet').on('click', 'a', function(event){
          event.stopPropagation();
          event.preventDefault();
          var userFeed = $('#user-feed');
          var user = $(this).text();
          console.log(user);
          displayUsersTweets(user);
          userFeed.slideDown();
        });
} // end of refreshStream

displayUsersTweets = function(user){
	
	var userFeed = $('#user-feed');
	userFeed.html('<a class="link" id="close-user-feed">Hide User\'s Tweets</a>');

	for (var i = streams.users[user].length - 1; i >= 0 ; i--) {
		var obj = streams.users[user][i];
		var link = createElement('a', obj.user, ["link"], obj.user);
		var span = createElement('span', jQuery.format.prettyDate(obj.created_at), ["timestamp"]);
		var message = createElement('p', obj.message, ["message"]);
		var tweet = createElement('div', [link, span, message], ["tweet"]);

		tweet.appendTo(userFeed);
	}
	console.log(userFeed);
};
