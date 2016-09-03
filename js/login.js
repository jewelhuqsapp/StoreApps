	
$(document).on('pageinit', '#login', function(){  
        $(document).on('click', '#submit', function() { // catch the form's submit event
            if($('#username').val().length > 0 && $('#password').val().length > 0){
                // Send data to server through the Ajax call
                // action is functionality we want to call and outputJSON is our data
                    $.ajax({url: 'http://www.tylercstore.com/project/scan/login.php',
                        data: {action : 'login', username : $('#username').val(), password: $('#password').val()},
                        type: 'post',                   
                        async: 'true',
                                                dataType: 'json',
                        beforeSend: function() {

                        },
                        complete: function() {
                            // This callback function will trigger on data sent/received complete
                            $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
                        },
                        success: function (result) {
                            if(result.msg=="success") {
								localStorage.setItem('sessionid', result.sessionid);
								localStorage.setItem('store_name', result.store_name);
                                localStorage.removeItem('user_id');
								
								localStorage.setItem('user_id', result.id);
								var user_id = localStorage.getItem('user_id');
								var shopping_item_list = 'itemList'+user_id;

									
                                $.mobile.changePage("#second");                         
                            } else {
                                alert('Logon unsuccessful!'); 
                            }
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
                    });                   
            } else {
                alert('Please fill all necessary fields');
            }           
            return false; // cancel original event to prevent form submitting
        });    
});