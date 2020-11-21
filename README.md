# eventServer
This is an API built to query events.

# Endpoints
Default endpoint (http://127.0.0.1:8081/): Returns all events.

Search endpoint (http://127.0.0.1:8081/search/{data}): Returns all events with the provided term in the Title field.

Location endpoint (http://127.0.0.1:8081/location/{data}): Returns all events with the provided term in the Location field.

Date endpoint (http://127.0.0.1:8081/date/{data}): Returns all events that occurred on the provided date. Format for date is: YYYY-MM-DD.

Before Date endpoint (http://127.0.0.1:8081/date/before/{data}): Returns all events that occurred before the provided date and time. Format for date is: YYYY-MM-DDTHH:mm:ss.fffZ.

After Date endpoint (http://127.0.0.1:8081/date/after/{data}): Returns all events that occurred after the provided date and time. Format for date is: YYYY-MM-DDTHH:mm:ss.fffZ.