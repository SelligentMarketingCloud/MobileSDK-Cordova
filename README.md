# Selligent Cordova Plugin (selligent-cordova)

This plugin defines a global `window.Selligent` object, which provides an API for the usage of the Selligent SDK in Cordova and Ionic.

## Supported platforms

* Android
* iOS

## Installation

### Cordova

Execute the following command: `cordova plugin add @selligent-marketing-cloud/selligent-cordova`

### Ionic

Execute the following command: `ionic cordova plugin add @selligent-marketing-cloud/selligent-cordova`

## Android Specific installation

> ### **Attention!**
> Version **2.x** of the plugin requires AndroidX in order to work. Therefore the plugin is only compatible with **Cordova Android 9.x and up**. Make sure you enable AndroidX by adding the following line to your `config.xml`:
>
>```<preference name="AndroidXEnabled" value="true" />```  
>
> If you are using a lower version of Cordova Android, please use a lower version of the plugin.

1. Add the **google-services** dependencies to the `./platforms/android/build.gradle` file:

  ```gradle
  buildscript {
  ...
      dependencies {
    ...
          classpath 'com.google.gms:google-services:3.2.0'
          ...
      }
      ...
  }
  ```

2. Follow section 3 **Creating a Google Application** of the **Android - Using the SDK** pdf, and place the `google-services.json` file in the `./platforms/android/app` folder.

3. Add the **android:name** property of the **application** tag in the `./platforms/android/app/src/main/AndroidManifest.xml` file:

  ```xml
  <application android:hardwareAccelerated="true"
               android:icon="@mipmap/icon"
               android:label="@string/app_name"
               android:supportsRtl="true"
               android:name="com.selligent.SelligentApplication">
  ```

#### Change default push notification icons

Add the following properties to the `selligent.json` file:

```
    "notificationSmallIcon": "ic_notification",
    "notificationLargeIcon": "ic_notification"
```

> _Note: only parse the name of the icon, without the path. The icon should reside in the res/drawable folder of the Android project, as explained in [Android's official guide](https://developer.android.com/guide/topics/resources/drawable-resource#BitmapFile)._

#### Third party plugins

The plugin has a cordova build hook for Android. The hook will rebuild the `ext.postBuildExtras` section of the  `build-extras.gradle` file. It will add various repositories and settings needed to build the plugin. You can customize this file yourself, but it's important to keep the `ext.postBuildExtras` section last.

All dependency verions of this plugin are preferences that can be customized. The preferences are the following: `MULTIDEX_VERSION, APP_COMPAT_VERSION, FIREBASE_VERSION, FIREBASE_JOB_DISPATCHER_VERSION, PLAY_SERVICES_VERSION, PLOT_PROJECTS_VERSION, GSON_VERSION, METADATA_EXTRACTOR_VERSION`

#### Upgrading the plugin to a new version

Execute the following steps:

- `$ cordova plugin rm selligent-cordova`
- `$ cordova platform rm android`
- `$ cordova plugin platform add android`
- `$ cordova plugin add @selligent-marketing-cloud/selligent-cordova`
- Follow the above installation steps again.

If for some reason you can't remove and rebuild the Android platform it's important to remove any references to the sdk in the `project.properties` and `build.gradle` files.

## iOS Specific installation

For remote push notifications, follow section 4 **Configure the APNS (Apple Push Notification Service)**, of the **IOS - Using the SDK** pdf.

If you want rich push notifications, follow section 6.9 **Notification Extensions** as well.  
Make sure you add your `appGroupId` to the `selligent.json`.

> **IMPORTANT!** make sure your `appGroupId` has the following structure or it will not work: `group.{MAIN_APP_BUNDLE_ID}`

For geolocation services, follow section 6.5 **Geolocation**, of the **IOS - Using the SDK** pdf. You also need to configure several permissions described in 5.3.3 **Permission for geo location**.

## Using the API

1. First, bootstrap the plugin
2. Create a **selligent.json** file (name is case sensitive) in the `www/assets` folder (create the assets folder if it's not there) using the following structure:

```json
{
    "url": "someMobilePushUrl",
    "clientId": "someClientId",
    "privateKey": "somePrivateKey",
    "fullyQualifiedNotificationActivityClassName": "com.some.project.MainActivity"
}
```
**Detailed overview:**

| Property                                    | Type                                                                                          | Required | Platform     |
| ------------------------------------------- | --------------------------------------------------------------------------------------------- | -------- | ------------ |
| url                                         | string                                                                                        | Yes      | Both         |
| clientId                                    | string                                                                                        | Yes      | Both         |
| privateKey                                  | string                                                                                        | Yes      | Both         |
| googleApplicationId                         | string                                                                                        | No       | Both         |
| clearCacheIntervalValue                     | enum [Selligent.ClearCacheIntervalValue](#selligentclearcacheintervalvalue)                   | No       | Both         |
| configureLocationServices                   | boolean                                                                                       | No       | Both         |
| inAppMessageRefreshType                     | enum [Selligent.InAppMessageRefreshType](#selligentinappmessagerefreshtype)                   | No       | Both         |
| addInAppMessageFromPushToInAppMessageList   | boolean                                                                                       | No       | Both         |
| appGroupId                                  | string                                                                                        | No       | iOS Only     |
| shouldClearBadge                            | boolean                                                                                       | No       | iOS Only     |
| shouldDisplayRemoteNotification             | boolean                                                                                       | No       | iOS Only     |
| shouldPerformBackgroundFetch                | boolean                                                                                       | No       | iOS Only     |
| doNotListenToThePush                        | boolean                                                                                       | No       | Android Only     |
| doNotFetchTheToken                          | boolean                                                                                       | No       | Android Only     |
|  loadCacheAsynchronously                    | boolean                                                                                       | No       | Android Only     |
| fullyQualifiedNotificationActivityClassName | string                                                                                        | No       | Android Only |
| remoteMessageDisplayType                    | enum [Selligent.AndroidRemoteMessagesDisplayType](#selligentAndroidRemoteMessagesDisplayType) | No       | Android Only |


3. Add a button for testing purposes

* For Cordova add the following in the `www/index.html` file:

  ```html
  <div class="app">
      ...
      <!-- Add this: -->
      <button id="get-version">
          Get version
      </button>
      ...
  </div>
  ```

* For Ionic add the following in the `src/pages/home/home.html` file:

  ```html
  <ion-content padding>
      ...
      <!-- Add this: -->
      <ion-content padding>
        <button ion-button round (click)="getVersionLib()">Get version</button>
      </ion-content>
      ...
  </ion-content>
  ```

4. Bind a callback to the button created above

* For Cordova add the following in your `www/js/index.js` file:

  ```javascript
  onDeviceReady: function () {
          ...
          // Bind getVersionLib to the button's onclick event:
          var getVersionButton = document.getElementById('get-version');
          getVersionButton.addEventListener('click', function () {
              window.Selligent.getVersionLib(
                  function (version) { // success callback
                      alert("Version: " + version);
                  },
                  function (error) { // error callback
                      alert("Error: " + JSON.stringify(error));
                  }
              );
          });
          ...
  }
  ```

* For Ionic add the following in your `src/pages/home/home.ts` file

  ```javascript
  declare var Selligent: any;
  ...

  export class HomePage {
    ...
    getVersionLib() {
      Selligent.getVersionLib((response) => {
        alert('getVersionLib response: ' + response);
      });
    }
    ...
  }
  ```

5. Build the iOS and Android project

* For Cordova:
  * `cordova build ios`
  * `cordova build android`

* For Ionic:
  * `ionic cordova build ios`
  * `ionic cordova build android`

6. Run the project and press the **Get Version** button, you should see a popup showing the currently installed Selligent SDK version.

### Deeplinking
You can catch the deeplinks 2 ways:

1. Native in AppDelegate.m, add the following (example code that logs the URL)
```
-(BOOL)application:(UIApplication*) application openURL:(NSURL*) url sourceApplication:(NSString*) sourceApplication annotation:(id) annotation
{
  NSLog(@"%@", [url absoluteString]);
  return YES;
}
```

2. In your Cordova codebase, https://www.npmjs.com/package/cordova-plugin-deeplinks

## API Reference

* [Methods](#methods)
  * [Selligent.getVersionLib(successCallback, errorCallback)](#selligentgetversionlibsuccesscallback--errorcallback)
    * [getVersionLib example](#getversionlib-example)
    * [loadSettings example](#loadsettings-example)
  * [Selligent.sendDeviceInfo(successCallback, errorCallback, options)](#selligentsenddeviceinfosuccesscallback--errorcallback--options)
    * [sendDeviceInfo example](#senddeviceinfo-example)
  * [Selligent.enableGeolocation(successCallback, errorCallback, enabled)](#selligentenablegeolocationsuccesscallback--errorcallback--enabled)
    * [enableGeolocation example](#enablegeolocation-example)
  * [Selligent.isGeolocationEnabled(successCallback, errorCallback)](#selligentisgeolocationenabledsuccesscallback--errorcallback)
    * [isGeolocationEnabled example](#isgeolocationenabled-example)
  * [Selligent.getDeviceId(successCallback)](#selligentgetdeviceidsuccesscallback)
    * [getDeviceId example](#getdeviceid-example)
  * [Selligent.enableNotifications(successCallback, errorCallback, enabled)](#selligentenablenotificationssuccesscallback--errorcallback--enabled)
    * [enableNotifications example](#enablenotifications-example)
  * [Selligent.displayLastReceivedRemotePushNotification(successCallback, errorCallback)](#selligentdisplaylastreceivedremotepushnotificationsuccesscallback--errorcallback)
    * [displayLastReceivedRemotePushNotification example](#displaylastreceivedremotepushnotification-example)
  * [Selligent.getLastRemotePushNotification(successCallback, errorCallback)](#selligentgetlastremotepushnotificationsuccesscallback--errorcallback)
    * [getLastRemotePushNotification Example](#getlastremotepushnotification-example)
  * [Selligent.enableInAppMessages(successCallback, errorCallback, options)](#selligentenableinappmessagessuccesscallback--errorcallback--options)
    * [enableInAppMessages example](#enableinappmessages-example)
  * [Selligent.getInAppMessages(successCallback, errorCallback)](#selligentgetinappmessagessuccesscallback--errorcallback)
    * [getInAppMessages example](#getinappmessages-example)
  * [Selligent.setInAppMessageAsSeen(successCallback, errorCallback, messageId)](#selligentsetinappmessageasseensuccesscallback--errorcallback--messageid)
    * [setInAppMessageAsSeen example](#setinappmessageasseen-example)
  * [Selligent.executeButtonAction(successCallback, errorCallback, buttonId, messageId)](#selligentexecutebuttonactionsuccesscallback--errorcallback--buttonid--messageid)
    * [executeButtonAction example](#executebuttonaction-example)
  * [Selligent.sendEvent(successCallback, errorCallback, event)](#selligentsendeventsuccesscallback--errorcallback--event)
    * [sendEvent example](#sendevent-example)
  * [Selligent.subscribeToEvents(successCallback, errorCallback)](#selligentsubscribetoeventssuccesscallback--errorcallback)
    * [subscribeToEvents example](#subscribetoevents-example)

* [Android Only/Specific Methods](#android-only-specific-methods)
  * [Selligent.setApplication(successCallback, errorCallback)](#selligentsetapplicationsuccesscallback--errorcallback)
    * [setApplication example](#setapplication-example)
  * [Selligent.areInAppMessagesEnabled(successCallback, errorCallback)](#selligentareinappmessagesenabledsuccesscallback--errorcallback)
    * [areInAppMessagesEnabled example](#areinappmessagesenabled-example)
  * [Selligent.enableAndroidLogging(successCallback, errorCallback, enabled)](#selligentenableandroidloggingsuccesscallback--errorcallback--enabled)
    * [enableAndroidLogging example](#enableandroidlogging-example)
  * [Selligent.displayMessage(successCallback, errorCallback, messageId)](#selligentdisplaymessagesuccesscallback--errorcallback--messageid)
    * [displayMessage example](#displaymessage-example)
  * [Selligent.areNotificationsEnabled(successCallback, errorCallback)](#selligentarenotificationsenabledsuccesscallback--errorcallback)
    * [areNotificationsEnabled example](#arenotificationsenabled-example)
  * [Selligent.setNotificationSmallIcon(successCallback, errorCallback, iconName)](#selligentsetnotificationsmalliconsuccesscallback--errorcallback--iconname)
    * [setNotificationSmallIcon example](#setnotificationsmallicon-example)
  * [Selligent.setNotificationLargeIcon(successCallback, errorCallback, iconName)](#selligentsetnotificationlargeiconsuccesscallback--errorcallback--iconname)
    * [setNotificationLargeIcon example](#setnotificationlargeicon-example)
  * [Selligent.getGCMToken(successCallback, errorCallback)](#selligentgetgcmtokensuccesscallback--errorcallback)
    * [getGCMToken Example](#getgcmtoken-example)
  * [Selligent.getRemoteMessagesDisplayType(successCallback, errorCallback)](#selligentgetremotemessagesdisplaytypesuccesscallback--errorcallback)
    * [getRemoteMessagesDisplayType Example](#getremotemessagesdisplaytype-example)
  * [Selligent.setFirebaseToken(successCallback, errorCallback, token)](#selligentsetfirebasetokensuccesscallback--errorcallback--token)
    * [setFirebaseToken Example](#setFirebaseToken-example)

* [iOS Only/Specific Methods](#ios-only-specific-methods)
  * [Selligent.enableiOSLogging(successCallback, errorCallback, logLevels)](#selligentenableiosloggingsuccesscallback--errorcallback--loglevels)
    * [enableiOSLogging example](#enableioslogging-example)
  * [Selligent.displayNotification(successCallback, errorCallback, notificationId)](#selligentdisplaynotificationsuccesscallback--errorcallback--notificationid)
    * [displayNotification Example](#displaynotification-example)
  * [Selligent.registerRemoteNotificationFetchCompletionHandler(successCallback, errorCallback)](#selligentregisterremotenotificationfetchcompletionhandlersuccesscallback--errorcallback)
    * [registerRemoteNotificationFetchCompletionHandler example](#registerremotenotificationfetchcompletionhandler-example)
  * [Selligent.forceRemoteNotificationBackgroundFetchResult(successCallback, errorCallback, iOSBackgroundFetchResult)](#selligentforceremotenotificationbackgroundfetchresultsuccesscallback--errorcallback--iosbackgroundfetchresult)
    * [forceRemoteNotificationBackgroundFetchResult example](#forceremotenotificationbackgroundfetchresult-example)

* [Constants](#constants)
  * [Selligent.ClearCacheIntervalValue](#selligentclearcacheintervalvalue)
  * [Selligent.InAppMessageType](#selligentinappmessagetype)
  * [Selligent.InAppMessageRefreshType](#selligentinappmessagerefreshtype)
  * [Selligent.AndroidRemoteMessagesDisplayType](#selligentandroidremotemessagesdisplaytype)
  * [Selligent.iOSLogLevel](#selligentiosloglevel)
  * [Selligent.iOSBackgroundFetchResult](#selligentiosbackgroundfetchresult)
  * [Selligent.iOSLocationAuthorisationStatus](#selligentioslocationauthorisationstatus)
  * [Selligent.iOSLocationAuthorisationType](#selligentioslocationauthorisationtype)
  * [Selligent.EventType](#selligenteventtype)
  * [Selligent.iOSNotificationButtonType](#selligentiosnotificationbuttontype)
  * [Selligent.BroadcastEventType](#selligentbroadcasteventtype)

### Methods

#### Selligent.getVersionLib(successCallback, errorCallback)

Returns the version of the installed Selligent SDK.

The response of the success callback is a string containing the version of the SDK.

##### getVersionLib example

```javascript
window.Selligent.getVersionLib(
  function (response) { // success callback
    alert('Selligent SDK Version: ' + response);
  },
  function (error) { // error callback
    ...
  }
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>


#### Selligent.loadSettings(successCallback, errorCallback)

Load the Selligent settings from `www/assets/selligent.json`.

The response of the success callback is a json-parsed object containing the settings from the file. 
For an overview of the settings object have a look at the detailed overview above.

##### loadSettings example

```javascript
window.Selligent.loadSettings(
  function (response) { // success callback
    ...
  },
  function (error) { // error callback
    ...
  }
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.sendDeviceInfo(successCallback, errorCallback, options)

Send the device's information.

The `options` parameter is an object which has a required `externalId` property where the external id should be placed.

**Detailed overview:**

| Property   | Type   | Required | Platform |
| ---------- | ------ | -------- | -------- |
| externalId | string | Yes      | Both     |

##### sendDeviceInfo example

```javascript
window.Selligent.sendDeviceInfo(
  function (response) { // success callback
    ...
  },
  function (error) { // error callback
    ...
  },
  {
    externalId: "an external id here"
  }
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.enableGeolocation(successCallback, errorCallback, enabled)

Enable or disable geolocation services.

The `enabled` parameter is a required boolean to enable or disable geolocation services.

##### enableGeolocation example

```javascript
window.Selligent.enableGeolocation(
  function (response) { // success callback
    ...
  },
  function (error) { // error callback
    ...
  },
  true
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.isGeolocationEnabled(successCallback, errorCallback)

Check if geolocation services are enabled or disabled.

The response of the success callback is a boolean stating geolocation services are enabled or disabled.

##### isGeolocationEnabled example

```javascript
window.Selligent.isGeolocationEnabled(
  function (response) { // success callback
    ...
  },
  function (error) { // error callback
    ...
  }
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.getDeviceId(successCallback)

Returns the device id.

The response of the success callback is a string containing the device id.

##### getDeviceId example

```javascript
Selligent.getDeviceId(
    function (deviceId) { // success callback
        ...
    }
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.enableNotifications(successCallback, errorCallback, enabled)

Enable or disable the usage of notifications.

The `enabled` parameter is a required boolean to enable or disable notifications.

##### enableNotifications example

```javascript
window.Selligent.enableNotifications(
  function (response) { // success callback
    ...
  },
  function (error) { // error callback
    ...
  },
  true
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.displayLastReceivedRemotePushNotification(successCallback, errorCallback)

Display the last received remote notification.

##### displayLastReceivedRemotePushNotification example

```javascript
window.Selligent.displayLastReceivedRemotePushNotification(
  function (response) { // success callback
    ...
  },
  function (error) { // error callback
    ...
  }
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.getLastRemotePushNotification(successCallback, errorCallback)

Get the id and the title of the last received remote push notification.

The response of the success callback is an object containing the information about the last received remote push notification, or `null` if there is no last received remote push notification.

**Detailed overview:**

| Property | Type   | Description                                |
| -------- | ------ | ------------------------------------------ |
| id       | string | Id of the last remote push notification    |
| title    | string | Title of the last remote push notification |

##### getLastRemotePushNotification Example

```javascript
window.Selligent.getLastRemotePushNotification(
  function (response) { // success callback
    ...
  },
  function (error) { // error callback
    ...
  }
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.enableInAppMessages(successCallback, errorCallback, options)

This method enables or disables the management of in-app messages.

The `options` parameter can be a boolean or a constant of the [InAppMessageRefreshType](#selligentinappmessagerefreshtype) enum.

In the case of a boolean set to `false`, the in-app messages will be disabled.
When the passed `options` parameter is an [InAppMessageRefreshType](#selligentinappmessagerefreshtype) constant, the in-app messages will be enabled and the refresh frequency will be set to the provided value.
The method will return an error if the parsed boolean is set to `true`, as to enable the in-app messages a refresh type is expected.

##### enableInAppMessages example

```javascript
// to enable in-app messages
window.Selligent.enableInAppMessages(
    function (response) { // success callback
      ...
    },
    function (error) { // error callback
      ...
    },
    Selligent.InAppMessageRefreshType.DAY
);
// to disable in-app messages
window.Selligent.enableInAppMessages(
    function (response) { // success callback
      ...
    },
    function (error) { // error callback
      ...
    },
    false
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.getInAppMessages(successCallback, errorCallback)

This method returns all the in app messages send to you.

The response of the success callback is an array of objects which contain the in app message(s) information.

**Detailed overview:**

| Property           | Type                                                          | Description                                                       | Platform     |
| ------------------ | ------------------------------------------------------------- | ----------------------------------------------------------------- | ------------ |
| id                 | string                                                        | Id of the in app message                                          | Both         |
| title              | string                                                        | Title of the in app message                                       | Both         |
| body               | string                                                        | Body of the in app message                                        | Both         |
| type               | enum [Selligent.InAppMessageType](#selligentinappmessagetype) | Type of the in app message                                        | Both         |
| creationDate       | number                                                        | Creation date of the in app message in unix time                  | Both         |
| expirationDate     | number                                                        | Expiration date of the in app message in unix time                | Both         |
| receptionDate      | number                                                        | Reception date of the in app message in unix time                 | Both         |
| hasBeenSeen        | boolean                                                       | Indication if the in app message is seen                          | Both         | 
| buttons            | array of objects                                              | Contains the buttons that are linked to the in app message        | Both         |

<br />

The `buttons` property is an array of button-objects which contain the information of a button linked to the in app message:

<br />

| Property           | Type                                                    | Description                                                       | Platform     |
| ------------------ | ------------------------------------------------------- | ----------------------------------------------------------------- | ------------ |
| id                 | string                                                  | Id of the button of the in app message                            | Both         |
| label              | string                                                  | Label of the button of the in app message                         | Both         |
| value              | string                                                  | Value of the button of the in app message                         | Both         |
| type               | number                                                  | Type of the button of the in app message                          | Both         |
| action             | number                                                  | Action of the button of the in app message                        | Android only |
<br />

##### getInAppMessages example

```javascript
window.Selligent.getInAppMessages(
    function (response) { // success callback
      ...
    },
    function (error) { // error callback
      ...
    }
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.setInAppMessageAsSeen(successCallback, errorCallback, messageId)

Possibility to mark an in app message as seen.

This method requires beside the callbacks another property to indicate the current in app message. To accomplish this behavior,&nbsp; `messageId` is required.

##### setInAppMessageAsSeen example

```javascript
window.Selligent.setInAppMessageAsSeen(
    function (response) { // success callback
      ...
    },
    function (error) { // error callback
      ...
    },
    "id-of-message"
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.executeButtonAction(successCallback, errorCallback, buttonId, messageId)

Execute the action linked to the button.

This method requires beside the callbacks another property to execute the action behind the button of the in app message. To accomplish this behavior,&nbsp; `buttonId` and `messageId` are required.

##### executeButtonAction example

```javascript
window.Selligent.executeButtonAction(
    function (response) { // success callback
      ...
    },
    function (error) { // error callback
      ...
    },
    "id-of-button",
    "id-of-message"
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.sendEvent(successCallback, errorCallback, event)

This method provides the functionality to send a specific or custom event.

The method accepts an `event` object which requires certain properties, depending on the type of the event.

**Detailed overview:**

| Property    | Type                                  | Required                                             | Platform | Default value |
| ----------- | ------------------------------------- | ---------------------------------------------------- | -------- | ------------- |
| type        | enum [EventType](#selligenteventtype) | Yes                                                  | Both     | N/A           |
| email       | string                                | Yes if event type is custom, ignored if non-custom | Both     | N/A           |
| data        | object                                | Yes if event type is non-custom, optional if custom  | Both     | N/A           |
| shouldCache | boolean                               | No                                                   | iOS Only | true          |

The `type` property is used to define the event as *custom* or *specific* event, using the [EventType](#selligenteventtype) constants.

To define it as a custom event, one should use the `Selligent.EventType.CUSTOM` constant. All other event types can be used to define the event as something specific.

When an event is a *custom* event type, the `event` object requires an `email` property containing a string, and has an optional property `data` which is an object that can contain other information.
When an event is a *specific* event type, the `event` object requires a `data` property containing an object which contains other information, and ignores the `email` property.

**iOS specific:**

On iOS the `event` object can contain an additional optional `shouldCache` property, which is a boolean that can be used to cache and retry sending events in situations where the event could not be delivered.

By default it is set to `true`, setting it to `false` will disable it.

##### sendEvent example

```javascript
// send specific event
window.Selligent.sendEvent(
    function (response) { // success callback
      ...
    },
    function (error) { // error callback
      ...
    },
    {
      type: Selligent.EventType.BUTTON_CLICKED // specific event
      data: { // required
        id: 1337,
        randomFlag: true,
        description: "this is some extra information concerning this event"
      }
      email: "someone@somedomain.com" // ignored
    },
    shouldCache: false // iOS only, optional
);
// send custom event
window.Selligent.sendEvent(
    function (response) { // success callback
       ...
    },
    function (error) { // error callback
      ...
    },
    {
      type: Selligent.EventType.CUSTOM  // custom event
      data: { // optional
        id: 1337,
        someFlag: true,
        description: "this is some extra information concerning this event"
      }
      email: "someone@somedomain.com" // required
    }
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.subscribeToEvents(successCallback, errorCallback)

This method is used to subscribe to events.

The response of the success callback is an object which contains information on the type of broadcast event and the data attached to it.

**Detailed overview:**

| Property           | Type                                                    | Description                                                       |
| ------------------ | ------------------------------------------------------- | ----------------------------------------------------------------- |
| broadcastEventType | enum [BroadcastEventType](#selligentbroadcasteventtype) | The type of broadcast event                                       |
| data               | object                                                  | Contains more information specific to the type of broadcast event |

The `data` property is an object itself containing more information specific to the type of the broadcast event:

In case of a broadcast event type _ButtonClicked_ the detailed overview for the `data` is as such:

| Property | Type                                                                       | Description                                       |
| -------- | -------------------------------------------------------------------------- | ------------------------------------------------- |
| type     | iOS: enum [iOSNotificationButtonType](#selligentiosnotificationbuttontype) | The type of notification button clicked           |
|          | Android: integer                                                           |                                                   |
| value    | string                                                                     | A certain value the broadcof ast event            |
| id       | string                                                                     | A certain id of the event                         |
| label    | string                                                                     | A certain label of the event                      |
| data     | object                                                                     | Specific additional data of the event |
| action   | integer                                                                    | Specific action of the event              |

In case of a broadcast event type _ReceivedInAppMessage_ the detailed overview for the `data` is as such:

| Property | Type  | Description      |
| -------- | ----- | ---------------- |
| messages | array | List of messages |

And the detailed overview for items in the `messages` array is as such:

| Property | Type   | Description        |
| -------- | ------ | ------------------ |
| id       | string | Id of a message    |
| title    | string | Title of a message |

In case of a broadcast event type _ReceivedDeviceId_ the detailed overview for the `data` is as such:

| Property | Type   | Description   |
| -------- | ------ | ------------- |
| deviceId | string | The device id |

In case of a broadcast event type _ReceivedGCMToken_ the detailed overview for the `data` is as such:

| Property | Type   | Description                     |
| -------- | ------ | ------------------------------- |
| token    | string | The token attached to the event |

In case of a broadcast event type _ReceivedRemoteNotification_ the detailed overview for the `data` is as such:

| Property | Type   | Description                                |
| -------- | ------ | ------------------------------------------ |
| pushId   | string | The id of the remote push notification     |
| name     | string | The name attached to the push notification |

In case of a broadcast event type _WillDisplayNotification_ or _WillDismissNotification_ the `data` prop is  `null`.

**Android specific:**

On the Android platform you can subscribe to custom events, by parsing an array of strings of these custom events. See the example for more information.

##### subscribeToEvents example

```javascript
window.Selligent.subscribeToEvents(
    function (response) { // success callback
      ...
    },
    function (error) { // error callback
      ...
    },
    ["some custom event x", "navigated to page y", "accepted request z"] // optional, android only
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>



### Android Only/Specific Methods

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.setApplication(successCallback, errorCallback)

Give a pointer of the Application instance to the SDK.

##### setApplication example

```javascript
window.Selligent.setApplication(
    function (response) { // success callback
      ...
    },
    function (error) { // error callback
      ...
    }
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.areInAppMessagesEnabled(successCallback, errorCallback)

Check if in-app messages are enabled or disabled.

The response of the success callback returns a boolean stating the in-app messages are enabled or disabled.

##### areInAppMessagesEnabled example

```javascript
window.Selligent.areInAppMessagesEnabled(
    function (response) { // success callback
      ...
    },
    function (error) { // error callback
      ...
    }
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.enableAndroidLogging(successCallback, errorCallback, enabled)

Display different actions and information logged by the SDK in the Android Studio logcat.

The `enabled` parameter is a boolean to effectively enable or disable logging.

##### enableAndroidLogging example

```javascript
window.Selligent.enableAndroidLogging(
    function (response) { // success callback
      ...
    },
    function (error) { // error callback
      ...
    },
    true
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.displayMessage(successCallback, errorCallback, messageId)

Display a specific in-app message.
The method accepts a parameter `messageId` which is a string containing the id of the in-app message to display.

##### displayMessage example

```javascript
window.Selligent.displayMessage(
    function (response) { // success callback
      ...
    },
    function (error) { // error callback
      ...
    },
    "some in-app message id"
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.areNotificationsEnabled(successCallback, errorCallback)

Check if notifications are enabled or disabled.

The response of the success callback returns a boolean stating the notifications are enabled or disabled.

##### areNotificationsEnabled example

```javascript
window.Selligent.areNotificationsEnabled(
    function (response) { // success callback
      ...
    },
    function (error) { // error callback
      ...
    }
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.setNotificationSmallIcon(successCallback, errorCallback, iconName)

Set the small icon of a notification on Android.

The method accepts an `iconName` parameter which is a string containing the name of the small icon. When the application is closed it will default back to the icons specified in `selligent.json`.
> _Note: only parse the name of the icon, without the path. The icon should reside in the res/drawable folder of the Android project, as explained in [Android's official guide](https://developer.android.com/guide/topics/resources/drawable-resource#BitmapFile)._

##### setNotificationSmallIcon example

```javascript
window.Selligent.setNotificationSmallIcon(
    function (response) { // success callback
      ...
    },
    function (error) { // error callback
      ...
    },
    "smallNotificationIcon"
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.setNotificationLargeIcon(successCallback, errorCallback, iconName)

Set the large icon of a notification on Android.

The method accepts an `iconName` parameter which is a string containing the name of the large icon. When the application is closed it will default back to the icons specified in `selligent.json`.
> _Note: only parse the name of the icon, without the path. The icon should reside in the res/drawable folder of the Android project, as explained in [Android's official guide](https://developer.android.com/guide/topics/resources/drawable-resource#BitmapFile)._

##### setNotificationLargeIcon example

```javascript
window.Selligent.setNotificationLargeIcon(
    function (response) { // success callback
      ...
    },
    function (error) { // error callback
      ...
    },
    "largeNotificationIcon"
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.getGCMToken(successCallback, errorCallback)

Get the GCM token being used.

The response of the success callback is a string containing the GCM token.

##### getGCMToken Example

```javascript
window.Selligent.getGCMToken(
  function (response) { // success callback
    ...
  },
  function (error) { // error callback
    ...
  }
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.getRemoteMessagesDisplayType(successCallback, errorCallback)

Get the type of the remote messages that are being displayed.

The response of the success callback is a number corresponding with a constant of the [AndroidRemoteMessagesDisplayType](#selligentinappmessagerefreshtype) enum.

##### getRemoteMessagesDisplayType Example

```javascript
window.Selligent.getRemoteMessagesDisplayType(
  function (response) { // success callback
    ...
  },
  function (error) { // error callback
    ...
  }
);
```

#### Selligent.setFirebaseToken(successCallback, errorCallback, token)

Set the firebase token manually.

##### setFirebaseToken example

```javascript
window.Selligent.setFirebaseToken(
    function (response) { // success callback
      ...
    },
    function (error) { // error callback
      ...
    },
    '123xyz'
);
```

### iOS Only/Specific Methods

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.enableiOSLogging(successCallback, errorCallback, logLevels)

Display different actions and information logged by the SDK in the Android Studio logcat.

The `logLevels` parameter is an array of logging levels that you want to enable, using the [Selligent.iOSLogLevel](#selligentiosloglevel) enum.

To disable a certain level, the existing array of the enabled logging level(s), minus the one you want to disable, should be passed to the method.
To disable all log levels you need to use the iOSLogLevel.NONE constant.
To enable all log levels use the iOSLogLevel.ALL constant.

##### enableiOSLogging example

```javascript
// to enable logging of info, warning and error statements
window.Selligent.enableiOSLogging(
    function (response) { // success callback
      ...
    },
    function (error) { // error callback
      ...
    },
    [Selligent.iOSLogLevel.INFO, Selligent.iOSLogLevel.WARNING, Selligent.iOSLogLevel.ERROR]
);
// to disable all logging
window.Selligent.enableiOSLogging(
    function (response) { // success callback
      ...
    },
    function (error) { // error callback
      ...
    },
    [Selligent.iOSLogLevel.NONE]
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.displayNotification(successCallback, errorCallback, notificationId)

Display a notification based on its id, which is a string that needs to be parsed in the method with the `notificationId` parameter.

##### displayNotification Example

```javascript
window.Selligent.displayNotification(
  function (response) { // success callback
    ...
  },
  function (error) { // error callback
    ...
  },
  "some notification id"
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.registerRemoteNotificationFetchCompletionHandler(successCallback, errorCallback)

Register a completion handler for successfully fetching remote notifications.

The success callback is completion handler to be set.

##### registerRemoteNotificationFetchCompletionHandler example

```javascript
window.Selligent.registerRemoteNotificationFetchCompletionHandler(
    function (response) { // success callback
      ...
    },
    function (error) { // error callback
      ...
    }
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.forceRemoteNotificationBackgroundFetchResult(successCallback, errorCallback, iOSBackgroundFetchResult)

Force the result of a remote notification fetch to be a specific value.

##### forceRemoteNotificationBackgroundFetchResult example

```javascript
window.Selligent.forceRemoteNotificationBackgroundFetchResult(
    function (response) { // success callback
      ...
    },
    function (error) { // error callback
      ...
    },
    Selligent.iOSBackgroundFetchResult.NEW_DATA
);
```

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

### Constants

#### Selligent.ClearCacheIntervalValue

Defines the interval value to clear the cache.

| Name        | Type   | Value | Description                                  |
| ----------- | ------ | ----- | -------------------------------------------- |
| AUTO        | number | 1     | Clear cache automatically (on startup?)      |
| NONE        | number | 2     | Don't clear cache                            |
| Android.DAY | number | 3     | Clear cache daily, only available on Android |
| WEEK        | number | 4     | Clear cache weekly                           |
| MONTH       | number | 5     | Clear cache monthly                          |
| QUARTER     | number | 6     | Clear cache quarterly                        |

_Note: `ClearCacheIntervalValue.Android.DAY` is only used on Android and can not be used on iOS._

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.InAppMessageType

Defines the type of the in-app messages.

| Name     | Type   | Value | Description                    |
| -------- | ------ | ----- | ------------------------------ |
| UNKNOWN  | number | -2    | In App message of unknown type |
| HIDDEN   | number | -1    | In App message of hidden type  |
| ALERT    | number | 0     |In App message of alert type    |
| HTML     | number | 1     |In App message of html type     |
| URL      | number | 2     |In App message of url type      |
| IMAGE    | number | 3     |In App message of image type    |
| MAP      | number | 4     |In App message of map type      |
| PASSBOOK | number | 5     |In App message of passbook type |

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.InAppMessageRefreshType

Defines how often the SDK must retrieve the in-app messages.

| Name           | Type   | Value | Description                        |
| -------------- | ------ | ----- | ---------------------------------- |
| NONE           | number | 10    | Don't refresh the in-app messages  |
| Android.MINUTE | number | 11    | Refresh minutely (only on Android) |
| HOUR           | number | 12    | Refresh hourly                     |
| DAY            | number | 13    | Refresh weekly                     |

_Note: `InAppMessageRefreshType.Android.MINUTE` is only used on Android and can not be used on iOS._

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.AndroidRemoteMessagesDisplayType

Defines if and how remote messages can be displayed on Android.

| Name         | Type   | Value | Description                             |
| ------------ | ------ | ----- | --------------------------------------- |
| AUTOMATIC    | number | 20    | Display remote messages automatically   |
| NONE         | number | 21    | Don't display remote messages           |
| NOTIFICATION | number | 22    | Display remote messages as notification |

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.iOSLogLevel

Defines the level of output of logging messages on iOS.

| Name      | Type   | Value | Description       |
| --------- | ------ | ----- | ----------------- |
| NONE      | number | 50    | Output nothing    |
| INFO      | number | 51    | Output info       |
| WARNING   | number | 52    | Output warning    |
| ERROR     | number | 52    | Output error      |
| HTTP_CALL | number | 52    | Output http calls |
| LOCATION  | number | 52    | Output location   |
| ALL       | number | 52    | Output all        |

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.iOSBackgroundFetchResult

Description of the possible results of a background fetch on iOS.

| Name     | Type   | Value | Description                              |
| -------- | ------ | ----- | ---------------------------------------- |
| NEW_DATA | number | 60    | Background fetch resulted in new data    |
| NO_DATA  | number | 61    | Background fetch resulted in no new data |
| FAILED   | number | 62    | Background fetch failed                  |

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.iOSLocationAuthorisationStatus

Description of the possible status of use of location services on a device.

| Name           | Type   | Value | Description                                     |
| -------------- | ------ | ----- | ----------------------------------------------- |
| UNKNOWN        | number | 70    | Status of use of location services is unknown   |
| REFUSED        | number | 71    | Use of location services is refused             |
| GRANTED_IN_USE | number | 72    | Use of location services is granted when in use |
| GRANTED_ALWAYS | number | 72    | Use of location services is always granted      |

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.iOSLocationAuthorisationType

Defines the level of request for the authorisation of usage of location services on a device.

| Name   | Type   | Value | Description                                               |
| ------ | ------ | ----- | --------------------------------------------------------- |
| IN_USE | number | 80    | Request authorisation when location services are in use   |
| ALWAYS | number | 81    | Always request the authorisation of the location services |

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.EventType

Defines the type of an event.

| Name            | Type   | Value | Description       |
| --------------- | ------ | ----- | ----------------- |
| USER_REGISTER   | number | 90    | User registered   |
| USER_UNREGISTER | number | 91    | User unregistered |
| USER_LOGIN      | number | 92    | User logged in    |
| USER_LOGOUT     | number | 93    | User logged out   |
| CUSTOM          | number | 94    | Custom event      |

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.iOSNotificationButtonType

Defines the type of button for notifications on iOS.

| Name                          | Type   | Value | Description                               |
| ----------------------------- | ------ | ----- | ----------------------------------------- |
| UNKNOWN                       | number | 100   | Unknown button type                       |
| SIMPLE_OPEN_PHONE_CALL        | number | 101   | Simple open phone call button type        |
| OPEN_SMS                      | number | 102   | Open sms button type                      |
| OPEN_MAIL                     | number | 103   | Open mail button type                     |
| OPEN_BROWSER                  | number | 104   | Open browser button type                  |
| OPEN_APPLICATION              | number | 105   | Open application button type              |
| RATE_APPLICATION              | number | 105   | Rate application button type              |
| CUSTOM_ACTION_BROADCAST_EVENT | number | 105   | Custom action broadcast event button type |
| RETURN_TEXT                   | number | 105   | Return text button type                   |
| RETURN_PHOTO                  | number | 105   | Return photo button type                  |
| RETURN_TEXT_AND_PHOTO         | number | 105   | Return text and photo button type         |
| PASSBOOK                      | number | 105   | Passbook button type                      |

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>

#### Selligent.BroadcastEventType

Defines the type of a broadcast event.

| Name                             | Type   | Value                        | Description                                           |
| -------------------------------- | ------ | ---------------------------- | ----------------------------------------------------- |
| BUTTON_CLICKED                   | string | "ButtonClicked"              | A button was clicked                                  |
| RECEIVED_IN_APP_MESSAGE          | string | "ReceivedInAppMessage"       | An in-app message has been received                   |
| WILL_DISPLAY_NOTIFICATION        | string | "WillDisplayNotification"    | A notification will be displayed                      |
| WILL_DISMISS_NOTIFICATION        | string | "WillDismissNotification"    | A notification will be dismissed                      |
| RECEIVED_DEVICE_ID               | string | "ReceivedDeviceId"           | A device id has been received                         |
| Android.RECEIVED_GCM_TOKEN       | string | "ReceivedGCMToken"           | A GCM token has been received (only on Android)       |
| iOS.RECEIVED_REMOTE_NOTIFICATION | string | "ReceivedRemoteNotification" | A remote notification has been received (only on iOS) |

_Notes: `BroadcastEventType.Android.RECEIVED_GCM_TOKEN` is only used on Android and can not be used on iOS. `BroadcastEventType.iOS.RECEIVED_REMOTE_NOTIFICATION` is only used on iOS and can not be used on Android._

<div align="right">
    <b><a href="#api-reference">back to API ToC</a></b>
</div>