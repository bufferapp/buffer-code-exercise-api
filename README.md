# buffer-code-exercise-api

This is a small api server which will be used in the Buffer interview code exercise.
The api is available at `http://code-exercise-api.buffer.com`.

## Endpoints

### `/getTweets`

Parameters

- `ids` - a comma-delineated list of tweet ids

Example request
```
http://code-exercise-api.buffer.com/getTweets?ids=989720051677741057,989479247084388353
```

Example response
```json
[
  {
    "id": "989720051677741057",
    "screen_name": "buffer",
    "text": "Here Are The Science-Backed Reasons You Shouldn't Share Your Goals 👉 via @trello https://buff.ly/2F7Lor1",
    "retweet_count": 20,
    "favorite_count": 38,
    "click_count": 169
  },
  {
    "id": "989479247084388353",
    "screen_name": "buffer",
    "text": "It takes less than 2/10 of a second for someone to form a first opinion of your brand based on your website or social media profile.\n\nWe're chatting personal branding this week and why it's the most important asset you own! #BufferPodcast\n\n✨ https://buffer.com/podcast",
    "retweet_count": 21,
    "favorite_count": 54,
    "click_count": 20
  }
]
```

## License

MIT
