
  'use strict';

  // $('.parallax').parallax();


  $(".logout").hide();

  $.getJSON('/user')
    .done((user) => {
      const $helloUser = $('.helloUser');
      const firstName = ('hello ' + user[0].first_name);
      // console.log('user: ', user);
      // console.log('firstName: ',firstName);
      if (user) {
        console.log(firstName);
        $helloUser.text(firstName).append;
        $(".login").hide();
        $(".logout").show();
      } else {
        $(".login").show();
        $(".logout").hide();
      }
    })

    const $logout = $('.logout');

    $logout.click((event) => {
      event.preventDefault();

      const options = {
        dataType: 'json',
        type: 'DELETE',
        url: '/token'
      };

      $.ajax(options)
        .done(() => {
          // console.log('I am Loged Out and I need to refresh this page');
          // window.location.href = '/index.html';
        })
        .fail(() => {
          // Materialize.toast('Unable to log out. Please try again.', 3000);
          window.location.href = '/index.html';
        });
    });

    // function() {
      'use strict';
      // console.log($('#loginForm'));
      $('#loginForm').submit((event) => {
        event.preventDefault();
        // console.log('submit has been triggered');

        const email = $('#email').val().trim();
        const password = $('#password').val();

        if (!email) {
          return Materialize.toast('Email must not be blank', 3000);
        }

        if (!password) {
          return Materialize.toast('Password must not be blank', 3000);
        }

        const options = {
          contentType: 'application/json',
          data: JSON.stringify({ email, password }),
          dataType: 'json',
          type: 'POST',
          url: '/token'
        };

        $.ajax(options)
          .done((user) => {
            // console.log(user.firstName);
            let helloUser = ('hello ' + user.firstName);
            $(".helloUser").text(helloUser);
            // window.location.href = '/index.html';
          })
          .fail(($xhr) => {
            Materialize.toast($xhr.responseText, 3000);
          });
      });

      $('#signUpForm').submit((event) => {
        event.preventDefault();
        // console.log('submit has been triggered');

        const firstName = $('#firstName').val().trim();
        const lastName = $('#lastName').val().trim();
        const email = $('#emailSU').val().trim();
        const password = $('#passwordSU').val();

        if (!firstName) {
          return Materialize.toast('First name must not be blank', 3000);
        }

        if (!lastName) {
          return Materialize.toast('Last name must not be blank', 3000);
        }

        if (!email) {
          return Materialize.toast('Email must not be blank', 3000);
        }

        if (email.indexOf('@') < 0) {
          return Materialize.toast('Email must be valid', 3000);
        }

        if (!password || password.length < 8) {
          return Materialize.toast(
            'Password must be at least 8 characters long',
            3000
          );
        }

        const options = {
          contentType: 'application/json',
          data: JSON.stringify({ firstName, lastName, email, password }),
          dataType: 'json',
          type: 'POST',
          url: '/users'
        };

        $.ajax(options)
          .done(() => {
            window.location.href = '/index.html';
          })
          .fail(($xhr) => {
            Materialize.toast($xhr.responseText, 3000);
          });
      });

      $(document).ready(function(){
        // console.log($('.modal'));
          // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
          $('.modal').modal();
      });

        // $(document).ready(function(){
          $('.collapsible').collapsible();
        // });


//   $.getJSON('/jobs')
//     .done((jobs) => {
//       const $jobs = $('#jobs');
//
//       for (const job of jobs) {
//         const $anchor = $('<a>')
//           .attr({
//             href: `/job.html?id=${job.id}`,
//             'data-delay': '50',
//             'data-tooltip': job.title
//           })
//           .tooltip();
//
//         const $card = $('<div>').addClass('card');
//         const $cardImage = $('<div>').addClass('card-image');
//         const $col = $('<div>').addClass('col s6 m4 l3');
//         const $img = $('<img>').attr({ src: job.coverUrl, alt: job.title });
//
//         $cardImage.append($img);
//         $anchor.append($cardImage);
//         $card.append($anchor);
//         $col.append($card);
//         $jobs.append($col);
//       }
//     })
//     .fail(() => {
//       Materialize.toast('Unable to retrieve jobs', 3000);
//     });
