// Global Spreadsheet Variable
var ss = SpreadsheetApp.getActiveSpreadsheet();

// A function to customise or use as part of something bigger!
function postBlogPost(title, labels, content){
  var postUrl = "https://www.googleapis.com/blogger/v3/blogs/blogId/posts";
  var sheet = ss.getSheetByName('Options');
  var range = sheet.getRange(2,2);
  var blogId = range.getValues();
  postUrl = postUrl.replace("blogId",blogId);
  Logger.log(postUrl);
  var options = {
    method:"post",
    contentType:"application/json",
    headers: { Authorization: "Bearer "+ ScriptApp.getOAuthToken()},
    muteHttpExceptions: true,
    payload: JSON.stringify({
      title: title,
      content: content,
      labels: labels,
      muteHttpOptions: true
    })
  }
  var res = UrlFetchApp.fetch(postUrl, options).getContentText();
  Logger.log(res)
}
