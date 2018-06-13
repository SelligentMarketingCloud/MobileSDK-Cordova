package com.selligent;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Hashtable;
import java.util.Iterator;

class Event {

    private EventType type;
    private String email;
    private Hashtable<String, String> data;

    private Event() { }

    public EventType getType() {
        return type;
    }

    public String getEmail() {
        return email;
    }

    public Hashtable<String, String> getData() {
        return data;
    }

    public static Event fromJSONObject(JSONObject eventJSONObject) throws JSONException {
        final Integer typeIndex = eventJSONObject.getInt("type");
        final EventType type = EventType.valueOf(typeIndex);
        final String email = eventJSONObject.optString("email", null);
        final JSONObject dataJSONObject = eventJSONObject.optJSONObject("data");
        Hashtable<String, String> data = null;
        if(dataJSONObject != null) {
            data = new Hashtable<>();
            final Iterator<String> keyIterator = dataJSONObject.keys();
            while(keyIterator.hasNext()) {
                final String key = keyIterator.next();
                final String value = dataJSONObject.getString(key);
                data.put(key, value);
            }
        }

        final Event event = new Event();
        event.type = type;
        event.email = email;
        event.data = data;
        return event;
    }

}