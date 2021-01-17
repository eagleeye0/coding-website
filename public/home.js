// for adding tab in code
console.log("connected");

// for auto resizing textarea field
var autoExpand = function (field) {

  // Reset field height
  field.style.height = 'inherit';

  // Get the computed styles for the element
  var computed = window.getComputedStyle(field);

  // Calculate the height
  var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
               + parseInt(computed.getPropertyValue('padding-top'), 10)
               + field.scrollHeight
               + parseInt(computed.getPropertyValue('padding-bottom'), 10)
               + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

  field.style.height = height + 'px';

};

document.getElementsByClassName("delete-button")[0].addEventListener("click", function(e){
  if(confirm("Are you sure you want to delete this entry?")){
  }
  else{
    console.log("cancelled");
    window.location.replace("/");
  }
});

document.addEventListener('input', function (event) {
  if (event.target.tagName.toLowerCase() !== 'textarea') return;
  autoExpand(event.target);
}, false);

console.log("connected");