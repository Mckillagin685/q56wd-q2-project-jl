'use strict';

$('#glassDoor').hide()

let searchString = '';
let jobs = []
let jobList = []
const getJobs = function(name) {

  $('.progress').css('visibility', 'visible');

  var $xhr = $.getJSON(`http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=${searchString}`);
  // console.log(searchString);
  $xhr.done(function(data) {
    if ($xhr.status !== 200) {
      return;
    }

    // console.log(data);

    jobList = data.resultItemList;
    console.log(jobList);

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
  searchString = '';
};
// console.log('3');
// console.log($("#getJobs"));
$("#getJobs").submit(function(event) {
  event.preventDefault();
  // console.log('Submit was clicked');

  $("#jobs").empty();

  var title = $('#title').val();
  var location = $('#location').val();

  searchString = (title + '&city=' + location);

  getJobs(name);
});

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
  jobsTable.append($table)

  for (let job of jobs) {
    // console.log(job);
    console.log(job.url);
    let $jobTitle = $('<button>').text(job.title).attr({id: job.url, class: 'getJob'})
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
  }

  $(".getJob").click(function(event) {
    event.preventDefault();

    $("#job").empty();

    $('#jobs').slideUp('slow')

    $('#job').slideUp('slow')

    console.log(event.target.id);
    const jobUrl = event.target.id
    let jobTitle = ''
    let jobCompany = ''
    let jobLocation = ''
    let jobDate = ''


    for (let i = 0; i < jobs.length; i++) {

      if (jobs[i].url === jobUrl) {
        jobTitle = jobs[i].title
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


    let $jobTitle = $('<a>').text(jobTitle).attr({
      href: jobUrl,
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

      $("#glassDoor").empty();

      $('#glassDoor').slideUp('slow')

      // console.log($(event.target).text());

      const jobCompany = $(event.target).text()

      $.getJSON('/glassdoor/' + jobCompany)
        .done((GDComp) => {
          // console.log(company);

          const company = GDComp[0];

          // console.log(GDComp);

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
