$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
       `<div class="message">
          <div class="message__header">
            <div class="message__header__user-name">
              ${message.user_name}
            </div>
            <div class="message__header__time">
              ${message.created_at}
            </div>
          </div>
          <div class="message__content">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      let html =
      `<div class="message">
        <div class="message__header">
          <div class="message__header__user-name">
            ${message.user_name}
          </div>
          <div class="message__header__time">
            ${message.created_at}
          </div>
        </div>
        <div class="message__content">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this)
    let url = $(this).attr('action')
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.send-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.send-btn').prop('disabled', false);
    });
  })
})