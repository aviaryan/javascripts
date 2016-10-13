
/**
 * Calls the github API and refreshes the markdown preview
 */
function refreshPreview() {
    var api_url = 'https://api.github.com/markdown';
    var printElem = printElem;
    $.ajax({
        type: "POST",
        url: api_url,
        data: JSON.stringify({
            "text": $("#input-markdown").get(0).value,
            "mode": "gfm",
            "context": $("#repo-name").get(0).value
        }),
        async: true,
        process_data: false,
        beforeSend: function (jqXHR, PlainObject) {
            $("#btnSubmit").get(0).textContent = 'Loading..';
        },
        error: function (jqXHR, textStatus, error) {
            console.log(jqXHR, textStatus, error);
        },
        success: function (data) {
            console.log("success!");
            $("#output-html").get(0).innerHTML = data;
        },
        complete: function (jqXHR, textStatus) {
            $("#btnSubmit").get(0).textContent = 'Refresh';
            console.log('Calls remaining ' + jqXHR.getResponseHeader('X-RateLimit-Remaining'));
        }
    });
}

$(document).bind('keydown', 'ctrl+shift+p', function(e){
e.preventDefault();
refreshPreview();
});
$("textarea").bind('keydown', 'ctrl+shift+p', function(e){
e.preventDefault();
refreshPreview();
});