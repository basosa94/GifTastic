
$(document).ready(function() {
    /*Global Variables
    ==============================================================*/
    var topics = ['cats', 'dogs', 'chicken', 'walrus'];
    var stillImg = '';
    var animateImg = '';
    var gifCondition = '';
    var stillUrl = '';
    var animateUrl = '';
  
    // Functions
    var createBtn = function() {
        $('#btn-section').empty();
        for (var i = 0; i < topics.length; i++) {
            var newBtn = $('<button>');
            newBtn.attr('data-name', topics[i]);
            newBtn.attr('class','btn btn-primary gif')
            newBtn.text(topics[i]);
            $('#btn-section').append(newBtn);
        }
    }

//When submit button is clicked .............
$('#submit-btn').on('click', function(event) {
    submit();
});

//When Enter is pressed.....
$(".search").keydown(function(event){
    if(event.keyCode == 13){
        console.log("working");
        submit();
        $('.search').val("");
        return false
    }
});


    var submit = function() {
            event.preventDefault();

            var inputVal = $('#userInput').val();
            topics.push(inputVal);
            createBtn();

            console.log(inputVal);
            console.log(topics);
    }
    var displayGif = function() {
        //Gets the value of the button that is clicked
        var btnVal = $(this).data('name');
        var apiKey = '67IsmI93AjzRiybOS8qyOsf6k216vKeY';
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + btnVal + '&api_key=' + apiKey;
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            //removes images when new btn is clicked
            $('.gifSection').empty();
            let newH1 = $('<h1>');
                newH1.html(btnVal);
                newH1.attr('class', 'text-center');
            $('.gifSection').append(newH1);

            for (var i = 0; i < 10; i++) {
                //Still & Animated Images
                stillImg = response['data'][i]['images']['fixed_height_still']['url'];
                animateImg = response['data'][i]['images']['fixed_height']['url'];
                //rating
                var rating = response['data'][i]['rating'];
                //Assign image element to newImg variable
                var newDiv = $('<div>'); 
                var newP = $('<p>'); 
                var newImg = $('<img>');
                //Give img element stillImg, animated  & src attribute
                newImg.attr('data-still', stillImg);
                newImg.attr('data-animate', animateImg);
                newImg.attr('src', animateImg);
                newImg.attr('data-type', 'animate');
                newImg.addClass('gifImage');
                //Give p element the rating texts
                newP.html('Giphy Rating: ' + rating);
                $(newP).appendTo(newDiv)
                $(newImg).appendTo(newDiv);
                $('.gifSection').append(newDiv); 
            }
        });
    }
    var gifAnimate = function() {
        //sets gifCondition to either still or animate
        gifCondition = $(this).data('type');
        stillUrl = $(this).data('still');
        animateUrl = $(this).data('animate');
        if (gifCondition === 'animate') {
            //Change src to still
            $(this).attr('src', stillUrl);
            //Switch the data-type to still
            $(this).data('type', 'still');
            //Testing
            console.log(gifCondition);
        } else if (gifCondition === 'still') {
            //Changes the gif to an animated image by switching the URL
            $(this).attr('src', animateUrl);
            //Switch the data-type to animate
            $(this).data('type', 'animate');
            //Testing
            console.log(gifCondition);
        }
    }

    /*Main
    ==============================================================*/
    createBtn();
    $(document).on('click', '.gif', displayGif);
    $(document).on('click', '.gifImage', gifAnimate);
});