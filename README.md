gutruncate
==========

jQuery plugin to truncate text with a read more / read less button.


## Usage

```javascript
$(".my-long-text").gutruncate();
```

## Advanced Usage

```javascript
$(".my-long-text").gutruncate({
  length: 150, //amount of text to show
  minTrail: 20, //amount of tolerance
  moreText: "see more", //text of the read more link
  lessText: "see less", //text of the read less link
  ellipsisText: "...", //what to use to signify the text has been truncated
  reapply: false //if true gutruncate will be recreated
});
```
