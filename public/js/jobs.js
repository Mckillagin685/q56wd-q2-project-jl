'use strict';

// $('.parallax').parallax();
// console.log('1');

$(".logout").hide();
$('#glassDoor').hide()

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
      window.location.href = '/search.html';
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
      window.location.href = '/search.html';
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
      // console.log(newItem);
      newJobs.push(newItem);
    }
    jobs = newJobs;
    // console.log('jobs = ' + jobs);
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

  searchString = (title + '&city=' + location);

  getJobs(name);
});

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
    // console.log(job);
    // console.log(job.title);
    let $jobTitle = $('<button>').text(job.title).attr('id', job.url)
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
    // console.log(jobUrl);
    let jobTitle = ''
    let jobCompany = ''
    let jobLocation = ''
    let jobDate = ''

    // console.log(jobs.length);

    for (let i = 0; i < jobs.length; i++) {
      // console.log(jobs[i]);
      // console.log(jobs[i].id);

      if (jobs[i].url === jobUrl) {
        jobTitle = jobs[i].title
        // console.log('jobTitle: ' + jobTitle);
        jobCompany = jobs[i].company
        jobLocation = jobs[i].location
        jobDate = jobs[i].date
      }
    }


    const jobsTable = $('#job')
    const $table = $('<table>')
    const $thead = $('<thead>')
    let $tr = $('<tr>')
    const $thTitle = $('<th>').text('Job Title')
    const $thCompany = $('<th>').text('Company')
    const $thLocation = $('<th>').text('Location')
    const $thDate = $('<th>').text('Date Posted')
    const $tbody = $('<tbody>').attr('id', 'jobTableBody')

    $tr.append($thTitle)
    $tr.append($thCompany)
    $tr.append($thLocation)
    $tr.append($thDate)
    $thead.append($tr)
    $table.append($thead)
    $table.append($tbody)
    jobsTable.append($table)

    // console.log(jobTitle);

    let $jobTitle = $('<a>').text(jobTitle).attr({
      href: job.url,
      target: '_blank'
    })
    let $tdT = $('<td>')
    let $tdC = $('<td>')
    let $jobCompany = $('<button>').attr('id', 'getJobCompany').text(jobCompany)
    let $jobLocation = $('<td>').text(jobLocation)
    let $jobDate = $('<td>').text(jobDate)
    $tr = $('<tr>')
    let tBody = $('#jobTableBody')

    $tdT.append($jobTitle)
    $tr.append($tdT)
    $tdC.append($jobCompany)
    $tr.append($tdC)
    $tr.append($jobLocation)
    $tr.append($jobDate)
    tBody.append($tr)

    const $divJobFooter = $('<div>').attr('id', 'jobFooter')
    const $backButton = $('<button>').text('Back to Summary').attr('id', 'jobBackToJobs')
    const $favoriteButton = $('<button>').text('Add to Favorites')
    const $divGlassDoor = $('#glassDoor')

    $divJobFooter.append($backButton)
    $divJobFooter.append($favoriteButton)
    jobsTable.append($divJobFooter)
    jobsTable.append($divGlassDoor)

    $('#job').slideDown('slow')

    $("#jobBackToJobs").click(function(event) {
      event.preventDefault();

      $('#job').slideUp('slow')
      $('#jobs').slideDown('slow')
    })

    $("#getJobCompany").click(function(event) {
      event.preventDefault();
      // glassDoor
      $("#glassDoor").empty();

      $('#glassDoor').slideUp('slow')

      // console.log($(event.target).text());

      const jobCompany = $(event.target).text()

      // alert(jobCompany)

      $.getJSON('/glassdoor/' + jobCompany)
        .done((GDComp) => {
          // console.log(company);

          const company = GDComp[0];

          // const newGreenDoor = {
          //   careerOpportunitiesRating: company[0].careerOpportunitiesRating,
          //   // ceo:{name: "Harold M. Messmer, Jr", title: "Chairman and CEO", numberOfRatings: 141, pctApprove: 72, pctDisapprove: 28, …}
          //   compensationAndBenefitsRating: company[0].compensationAndBenefitsRating,
          //   cultureAndValuesRating: company[0].cultureAndValuesRating,
          //   // exactMatch:true
          //   // featuredReview:{attributionURL: "http://www.glassdoor.com/Reviews/Employee-Review-Robert-Half-Technology-RVW16354980.htm", id: 16354980, currentJob: false, reviewDateTime: "2017-08-14 14:07:14.01", jobTitle: "Employee", …}
          //   id: company[0].id,
          //   industry: company[0].industry,
          //   // industryId:200032
          //   // industryName:"Staffing & Outsourcing"
          //   // isEEP:true
          //   name: company[0].name,
          //   numberOfRatings: company[0].numberOfRatings,
          //   overallRating: company[0].overallRating,
          //   ratingDescription: company[0].ratingDescription,
          //   recommendToFriendRating: company[0].recommendToFriendRating,
          //   // sectorId:10006
          //   sectorName: company[0].sectorName,
          //   seniorLeadershipRating: company[0].seniorLeadershipRating,
          //   squareLogo: company[0].squareLogo,
          //   website: company[0].website,
          //   workLifeBalanceRating: company[0].workLifeBalanceRating
          // };

          // console.log(GDComp);
          // console.log('company: ' + company.name);

          // jobs = newJobs;

          // $('.progress').css('visibility', 'hidden');

          const renderCompany = function(company) {
              // console.log(company);
            const glassDoor = $('#glassDoor')
            const $table = $('<table>').attr('id', 'glassDoorTable')
            const $tbody = $('<tbody>')
            const $tr = $('<tr>')
            const $tr1 = $('<tr>')
            const $tr2 = $('<tr>')
            const $tr3 = $('<tr>')
            const $tr4 = $('<tr>')
            const $tr5 = $('<tr>')
            const $tr6 = $('<tr>')
            const $tr7 = $('<tr>')
            const $tr8 = $('<tr>')
            const $tr9 = $('<tr>')
            const $tr10 = $('<tr>')

            const $tdN = $('<td>').text(company.name)
            $tr1.append($tdN)
            const $img = $('<img>').attr({
              src: company.squareLogo,
              height: "42",
              width: "42"
              })
            // <img src="smiley.gif" alt="Smiley face" height="42" width="42">
            const $tdL = $('<td>')
            $tdL.append($img)
            $tr1.append($tdL)
            const $tdW = $('<td>').text(company.website)
            $tr1.append($tdW)
            $tbody.append($tr1)

            const $tdI = $('<td>').text('Industry: ' + company.industry)
            $tr2.append($tdI)
            const $tdS = $('<td>').text('Sector: ' + company.sectorName)
            $tr2.append($tdS)
            const $tdNOR = $('<td>').text('Number of Ratings: ' + company.numberOfRatings)
            $tr2.append($tdNOR)
            $tbody.append($tr2)

            const $tdRD = $('<td>').text('Rating Description: ' + company.ratingDescription)
            $tr6.append($tdRD)
            $tr6.append($tr)
            $tr6.append($tr)
            $tbody.append($tr6)

            const $tdOR = $('<td>').text('Overall Rating: ' + company.overallRating)
            $tr3.append($tdOR)
            $tr3.append($tr)
            $tr3.append($tr)
            $tbody.append($tr3)

            const $tdRTF = $('<td>').text('Recommend to Friend Rating: ' + company.recommendToFriendRating)
            $tr7.append($tdRTF)
            $tr7.append($tr)
            $tr7.append($tr)
            $tbody.append($tr7)

            const $tdWLC = $('<td>').text('Work Life Balance Rating: ' + company.workLifeBalanceRating)
            $tr4.append($tdWLC)
            $tr4.append($tr)
            $tr4.append($tr)
            $tbody.append($tr4)

            const $tdCAVR = $('<td>').text('Culture and Values Rating: ' + company.cultureAndValuesRating)
            $tr8.append($tdCAVR)
            $tr8.append($tr)
            $tr8.append($tr)
            $tbody.append($tr8)

            const $tdCABR = $('<td>').text('Compensation and Benefits Rating: ' + company.compensationAndBenefitsRating)
            $tr9.append($tdCABR)
            $tr9.append($tr)
            $tr9.append($tr)
            $tbody.append($tr9)

            const $tdCOR = $('<td>').text('Career Opportunities Rating: ' + company.careerOpportunitiesRating)
            $tr10.append($tdCOR)
            $tr10.append($tr)
            $tr10.append($tr)
            $tbody.append($tr10)

            const $tdSLR = $('<td>').text('Senior Leadership Rating: ' + company.seniorLeadershipRating)
            $tr5.append($tdSLR)
            $tr5.append($tr)
            $tr5.append($tr)
            $tbody.append($tr5)

            $table.append($tbody)
            glassDoor.append($table)

            const companyReview = company.featuredReview
            const $divReview = $('<div>').attr('id', 'companyReview')

            const $title = $('<div>').text("Title: " + companyReview.headline).attr('class', 'row')
            $divReview.append($title)
            const $rating = $('<p>').text('Overall Rating: ' + companyReview.overall).attr('class', 'row')
            $divReview.append($rating)
            const $date = $('<p>').text('Review Date: ' + companyReview.reviewDateTime).attr('class', 'row')
            $divReview.append($date)
            const $job = $('<p>').text('Reviewd By: ' + companyReview.jobTitle).attr('class', 'row')
            $divReview.append($job)
            const $location = $('<p>').text('Location: ' + companyReview.location).attr('class', 'row')
            $divReview.append($location)
            const $current = $('<p>').text('Currently Employed at this company: ' + companyReview.currentJob).attr('class', 'row')
            $divReview.append($current)
            const $pro = $('<div>').text("Pro's: " + companyReview.pros).attr('class', 'row')
            $divReview.append($pro)
            const $con = $('<div>').text("Con's: " + companyReview.cons).attr('class', 'row')
            $divReview.append($con)

            glassDoor.append($divReview)

          }

          renderCompany(company);
          $('#glassDoor').slideDown('slow')


        })

    })

  })

}
