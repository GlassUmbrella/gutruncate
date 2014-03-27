gutruncate
==========

jQuery plugin to truncate text with a knockout js binding handler.

## Demo
http://glassumbrella.github.io/gutruncate/


## Usage

```javascript
$(".my-long-text").gutruncate();
```

## Advanced Usage

```javascript
$(".my-long-text").gutruncate({
  minLength: 150, //amount of text to show
  tolerance: 20, //amount of tolerance
  readMoreText: "see more", //text of the read more link
  readLessText: "see less", //text of the read less link
  ellipsisText: "...", //what to use to signify the text has been truncated
  blockLevelMore: false, //if false more link will not be place on a new line
  reapply: false //if true gutruncate will be recreated
});
```
