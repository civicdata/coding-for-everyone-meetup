# Coding For Everyone Meetup API Wrapper

## Issue
Coding For Everyone is a [meetup](https://www.meetup.com/founderscoders/) event run by [Founders and Coders](http://www.foundersandcoders.com/). Some of the attendees have been working on a separate website for the meetup for practice and to share information about the meetup more effectively, such as a code of conduct or best practices.

One of the desired features was a tie in with the Meetup API, but despite the [API docs](https://www.meetup.com/meetup_api/) claiming to support cross-browser requests, there were still issues sending requests from the front-end they had built.

https://github.com/codingforeveryone/codingforeveryone.github.io

## Solution
I have a built a Meetup API Wrapper hosted on Heroku which can process Meetup API GET requests. The process is as follows:
* Send your Meetup API GET requests to https://cfe-meetup-api.herokuapp.com/ using exactly the same query string as you would if you were accessing the Meetup API.
* The heroku app receives these requests, adds access token data to the request and queries the Meetup API.
* Once it has received the data from Meetup, the heroku app sends that back to the maker of the original request.

## How it works
I have annotated the tests if you are interested in seeing how it works.

## How to use it
Make your requests to `https://cfe-meetup-api.herokuapp.com/` with the same query string you would use for the Meetup API. So for example, looking for a group with the ID of 18356664 would require a query string of `find/groups?id=18356664` - [Meetup API docs](https://www.meetup.com/meetup_api/).

The response to a GET request at this URL should contain the exactly the same data as if you had accessed the Meetup API with a valid access token. Please make an issue in the repo if there is something you don't understand or something that could be improved.
