$(document).on("click", ".replyButton", function() {
  $('.discussionContainer').slideUp(50);
  $(this).closest('.forQuestion').find(".discussionContainer").slideToggle(50);
});
