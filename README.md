gutruncate
==========

jQuery plugin to truncate text with a knockout js binding handler.

## Example

### Truncated
![](http://imgur.com/66J397m.png)
### Expanded
![](http://imgur.com/SnA2CFZ.png)

## jQuery
### Usage

```javascript
$(".my-long-text").gutruncate();
```

### Advanced Usage

```javascript
$(".my-long-text").gutruncate({
  minLength: 50,
  readMoreText: "click me",
});
```

## Knockout.js
### Usage

```html
<p data-bind="gutruncate: myText"></p>
```

### Advanced Usage

```html
<p data-bind="gutruncate: { text: myText, options: { minLength: 10, readMoreText: 'click me' } }"></p>
```

## Settings

* **minLength** - the minimum amount of text to display. *default: 150*
* **tolerance** - the amount of tolerance between the minLength and actual shown characters. *default: 20*
* **readMoreText** - the text to display on the show more link. *default: "more"*
* **readLessText** - the text to display on the show less link. *default: "less"*
* **ellipsisText** - the text to show for the ellipsis. *default: "..."*
* **blockLevelMore** - if true the read more link will be on a new line. *default: true*
* **reapply** - if set to true gutruncate will be deleted and recreated. *default: false*
