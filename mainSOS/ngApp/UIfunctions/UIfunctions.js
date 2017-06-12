$(function(){
  $('#dropDownMenu').click(function(){
    console.log("clicked menu")
    $('#dropDownContents').slideToggle(500)
  })
})

//  $(function(){                   //SHOULD THIS BE MOVED TO A CONTROLLER?
// .$('.replyButton').click(function(){
//   console.log("HELOOOOOOOOOOOOOOOOOOADSKSDFHODHJO:JWECOHJOIEWCOIEDDD")
//   $(this).parent('.answers').find('.discussionContainer').slideToggle(500)
//   //$('.discussionContainer').slideToggle(500)
// })
//  })

$(function(){
  $('.dropdown').click(function(){
    $('#dropDownContents').slideToggle(500)
  })
})
