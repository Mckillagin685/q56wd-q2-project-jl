'use strict';

// $('.parallax').parallax();
// console.log('1');

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
    data: JSON.stringify({
      email,
      password
    }),
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
    data: JSON.stringify({
      firstName,
      lastName,
      email,
      password
    }),
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

$(document).ready(function() {
  // console.log($('.modal'));
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
});

// $(document).ready(function(){
$('.collapsible').collapsible();
// });

// console.log('2');

// ***********************************************MAIN PAGE

let searchString = '';
let jobs = []
let jobList = []
const getJobs = function(name) {

  $('.progress').css('visibility', 'visible');

  var $xhr = $.getJSON(`http://service.dice.com/api/rest/jobsearch/v1/simple.json?${searchString}`); //text=java&city=New+York,+NY
  // console.log(searchString);
  $xhr.done(function(data) {
    if ($xhr.status !== 200) {
      return;
    }

    // console.log(data);

    jobList = data.resultItemList;

    // console.log(jobList);

    const newJobs = [];
    for (const item of jobList) {
      // console.log(item);
      // console.log(item.detailUrl);
      const newItem = {
        url: item.detailUrl,
        title: item.jobTitle,
        company: item.company,
        location: item.location,
        date: item.date
      };
      console.log(newItem);
      newJobs.push(newItem);
    }
    jobs = newJobs;
    console.log('jobs = ' + jobs);
    renderJobs();
    $('.progress').css('visibility', 'hidden');
  });
  // searchVar = [];
  searchString = '';
};
// console.log('3');
// console.log($("#getJobs"));
$("#getJobs").submit(function(event) {
  event.preventDefault();
  // console.log('Submit was clicked');

  $("#jobs").empty();
  // $("#listings").empty();
  // $("#listings").slideDown("slow");

  var title = $('#title').val();
  var location = $('#location').val();
  // var abv_gt = $('#searchABV_gt').val();
  // var abv_lt = $('#searchABV_lt').val();
  // var ibu_gt = $('#searchIBU_gt').val();
  // var ibu_lt = $('#searchIBU_lt').val();
  // var ebc_gt = $('#searchEBC_gt').val();
  // var ebc_lt = $('#searchEBC_lt').val();
  // var yeast = $('#searchYeast').val();
  // var hops = $('#searchHops').val();
  // var malt = $('#searchMalt').val();
  // var food = $('#searchFood').val();

  // console.log('title: ', title);
  // console.log('location: ', location);

  // if (id) {
  //   searchVar.push('ids=' + id);
  // } if (name) {
  //   searchVar.push('beer_name=' + name);
  // } if (abv_gt) {
  //   searchVar.push('abv_gt=' + abv_gt);
  // } if (abv_lt) {
  //   searchVar.push('abv_lt=' + abv_lt);
  // } if (ibu_gt) {
  //   searchVar.push('ibu_gt=' + ibu_gt);
  // } if (ibu_lt) {
  //   searchVar.push('ibu_lt=' + ibu_lt);
  // } if (ebc_gt) {
  //   searchVar.push('ebc_gt=' + ebc_gt);
  // } if (ebc_lt) {
  //   searchVar.push('ebc_lt=' + ebc_lt);
  // } if (yeast) {
  //   searchVar.push('yeast=' + yeast);
  // } if (hops) {
  //   searchVar.push('hops=' + hops);
  // } if (malt) {
  //   searchVar.push('malt=' + malt);
  // }if (food) {
  //   searchVar.push('food=' + food);
  // }

  searchString = (title + '&city=' + location);

  // console.log('searchVar: ' + searchVar);
  // console.log('searchString: ' + searchString);

  getJobs(name);
});
// console.log('4');
// ********************************************CREATE JOB LIST

const renderJobs = function() {

  const jobsTable = $('#jobs')
  const $table = $('<table>').attr("class", "striped")
  const $thead = $('<thead>')
  let $tr = $('<tr>')
  const $thTitle = $('<th>').text('Job Title')
  const $thCompany = $('<th>').text('Company')
  const $thLocation = $('<th>').text('Location')
  const $thDate = $('<th>').text('Date Posted')
  const $tbody = $('<tbody>').attr("id", "tableBody")

  $tr.append($thTitle)
  $tr.append($thCompany)
  $tr.append($thLocation)
  $tr.append($thDate)
  $thead.append($tr)
  $table.append($thead)
  $table.append($tbody)
  jobsTable.append($table).attr('class', 'getJob')

  let job = {}
  for (job of jobs) {
    console.log(job);
    // console.log(job.title);
    let $jobTitle = $('<button>').text(job.title).attr({
      id: job.url
      // target: '_blank'
    })
    let $td = $('<td>')
    let $jobCompany = $('<td>').text(job.company)
    let $jobLocation = $('<td>').text(job.location)
    let $jobDate = $('<td>').text(job.date)
    let $tr = $('<tr>')
    let tBody = $('#tableBody')

    $td.append($jobTitle)
    $tr.append($td)
    $tr.append($jobCompany)
    $tr.append($jobLocation)
    $tr.append($jobDate)
    tBody.append($tr)

    // console.log(tBody);

    // window.setTimeout(continue, 200);
  }
  $(".getJob").click(function(event) {
    event.preventDefault();
    // console.log('Submit was clicked');

    $("#job").empty();

    $('#jobs').slideUp('slow')

    $('#job').slideUp('slow')

    const jobUrl = event.target.id
    let jobTitle = ''
    let jobCompany = ''
    let jobLocation = ''
    let jobDate = ''

    for (let i=0 ; i<jobs.length ; i++) {
      console.log(jobs[i]);
      if (jobs[i].id === jobUrl) {
        jobTitle = jobs[i].title
        jobCompany = jobs[i].company
        jobLocation = jobs[i].location
        jobDate = jobs[i].date
        }
      }
      console.log(jobTitle);

        const jobsTable = $('#job')
        const $table = $('<table>')
        const $thead = $('<thead>')
        let $tr = $('<tr>')
        const $thTitle = $('<th>').text('Job Title')
        const $thCompany = $('<th>').text('Company')
        const $thLocation = $('<th>').text('Location')
        const $thDate = $('<th>').text('Date Posted')
        const $tbody = $('<tbody>')

        $tr.append($thTitle)
        $tr.append($thCompany)
        $tr.append($thLocation)
        $tr.append($thDate)
        $thead.append($tr)
        $table.append($thead)
        $table.append($tbody)
        jobsTable.append($table).attr('class', 'getJob')

        let $jobTitle = $('<button>').text(jobTitle).attr({
          href: job.url,
          target: '_blank'
        })
        let $td = $('<td>')
        let $jobCompany = $('<td>').text(jobCompany)
        let $jobLocation = $('<td>').text(jobLocation)
        let $jobDate = $('<td>').text(jobDate)
        $tr = $('<tr>')
        let tBody = $('#tableBody')

        $td.append($jobTitle)
        $tr.append($td)
        $tr.append($jobCompany)
        $tr.append($jobLocation)
        $tr.append($jobDate)
        tBody.append($tr)

        $('#job').slideDown('slow')

  })
}
