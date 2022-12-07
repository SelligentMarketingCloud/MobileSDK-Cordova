package com.selligent;

import android.content.Intent;

import com.selligent.sdk.SMManager;
import com.selligent.sdk.SMNotificationButton;

import org.json.JSONException;
import org.json.JSONObject;

class ButtonBroadcastEventDataParser implements BroadcastEventDataParser {
    @Override
    public JSONObject parse(Intent intent) throws JSONException {
        final JSONObject resultingJSONObject = new JSONObject();

        SMNotificationButton button = (SMNotificationButton)intent.getSerializableExtra(SMManager.BROADCAST_DATA_BUTTON);
        resultingJSONObject.put("id", button.id);
        resultingJSONObject.put("type", button.type);
        resultingJSONObject.put("value", button.value);
        resultingJSONObject.put("label", button.label);
        resultingJSONObject.put("action", button.action.getValue());
        if (button.data != null) {
            final JSONObject buttonData = new JSONObject();
            for(String dataKey : button.data.keySet()) {
                buttonData.put(dataKey, button.data.get(dataKey));
            }

            if (buttonData.length() > 0) {
                resultingJSONObject.put("data", buttonData);
            } else {
                resultingJSONObject.put("data", JSONObject.NULL);
            }
        }

        return resultingJSONObject;
    }
}
