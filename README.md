# Push Messages 

![Picture](https://i.imgur.com/HCVL625.png)

Easy to use and edit.
All you have to do is define push icons in getType function - which returns classes added to icon.
Push could be closed by button. This way is more beautiful than simple alert()
It allows to stack messages too.
See sample.

### Display a message
```sh
createPush(type, message)
```

Types are defined in getType function.
Danger/info type by default.
Message is string or html value which is displayed in box.


### Display defined message once until closed
```sh
addLocalPush(type, message, uid)
```

Function above use localStorage. 
uid must be unique string/number defined manually.
This value is needed for identify message in local storage.

If user execute this function in ex. domain/page/1.html 
the push will be available in whole domain pages (if you include push.js to every page)

### Requirements

- jQuery