package com.selligent;

import android.content.Intent;

import org.json.JSONException;
import org.json.JSONObject;

interface BroadcastEventDataParser {
    JSONObject parse(Intent intent) throws JSONException;
}
