$(document).on("click", ".replyButton", function() {
  console.log('clicked');
  $(this).closest('.forQuestion').find(".discussionContainer").slideToggle(50);
});
