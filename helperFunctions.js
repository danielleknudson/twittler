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
	console.log('refresh the stream');
	// clear feed
	var feed = $('#feed');
	var refreshButton = $('#refresh-container');
	feed.html('');	

	feed.append(createElement('a', 'Check for new messages', ['button'], 'update-stream'));
	feed.append(createElement('h3', 'All messages', ['feed-heading']));

	for (var i = streams.home.length -1; i >= 0; i--){
		// create tweet to append to stream
		// create element contains a link, a span, and a paragraph
		var link = createElement('a', streams.home[i].user, ["link"], streams.home[i].user);
		var span = createElement('span', jQuery.format.prettyDate(streams.home[i].created_at), ["timestamp"]);
		var message = createElement('p', streams.home[i].message, ["message"]);
		var tweet = createElement('div', [link, span, message], ["tweet"]);

		tweet.appendTo(feed);
	} // end of for loop

	$('#home-link').on('click', refreshStream);
	$('#update-stream').on('click', refreshStream);
	$('.tweet').on('click', 'a', function(event){
					console.log('listen for user name click');
          event.stopPropagation();
          event.preventDefault();
          var userFeed = $('#user-feed');
          var user = $(this).text();
          displayUsersTweets(user);
          userFeed.addClass('transition');
          feed.toggleClass('hide');
          refreshButton.toggleClass('hide');
        });
} // end of refreshStream

displayUsersTweets = function(user){
	
	var userFeed = $('#user-feed');
	userFeed.html('');
	userFeed.append(createElement('a', 'Back to stream', ['link'], 'back-to-stream'));
	userFeed.append(createElement('h3', user + '\'s messages', ['feed-heading']));

	for (var i = streams.users[user].length - 1; i >= 0 ; i--) {
		var obj = streams.users[user][i];
		var link = createElement('a', obj.user, ["link"], obj.user);
		var span = createElement('span', jQuery.format.prettyDate(obj.created_at), ["timestamp"]);
		var message = createElement('p', obj.message, ["message"]);
		var tweet = createElement('div', [link, span, message], ["tweet"]);

		tweet.appendTo(userFeed);
	}

	// add event listener to user's name to load new messages for this user
	$('.tweet').on('click', 'a', function(event) {
    var user = $(this).text();
    displayUsersTweets(user);
  });
}
