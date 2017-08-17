'use strict';

$('#messagesModal').hide()
$('#glassDoor').hide()

let searchString = '';
let jobs = []
let jobList = []
const getJobs = function(name) {

  $('.progress').css('visibility', 'visible');

  var $xhr = $.getJSON(`http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=${searchString}`);
  $xhr.done(function(data) {
    if ($xhr.status !== 200) {
      return;
    }

    jobList = data.resultItemList;

    const newJobs = [];
    for (const item of jobList) {
      const newItem = {
        url: item.detailUrl,
        title: item.jobTitle,
        company: item.company,
        location: item.location,
        date: item.date
      };
      newJobs.push(newItem);
    }
    jobs = newJobs;
    renderJobs();
    $('.progress').css('visibility', 'hidden');
  });
  searchString = '';
};

$("#getJobs").submit(function(event) {
  event.preventDefault();

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
    let $Br = $('<br/>')
    let $aD = $('<a>').text('(click to view on Dice.com)').attr('class', 'black-text')
    let $tdT = $('<td>')
    let $tdC = $('<td>')
    let $jobCompany = $('<button>').attr('id', 'getJobCompany').text(jobCompany)
    let $aC = $('<a>').text('(click to view Glassdoor Data)').attr('class', 'black-text')
    let $jobLocation = $('<td>').text(jobLocation)
    let $jobDate = $('<td>').text(jobDate)
    $tr = $('<tr>')
    let tBody = $('#jobTableBody')

    // $tdT.append($jobTitle)
    // $tdT.append($Br)
    // $tdT.append($aD)

// ******************************************************************
    $tdT.append($jobTitle)
    $tdT.append($Br)     //*********THIS DOSNT!!!!**************
    $tdT.append($aD)
// ******************************************************************
    $tr.append($tdT)

    $tdC.append($jobCompany)
    $tdC.append($Br)      //*********THIS WORKS!!!!**************
    $tdC.append($aC)
    $tr.append($tdC)

    $tr.append($jobLocation)
    $tr.append($jobDate)
    tBody.append($tr)

    const $divJobFooter = $('<div>').attr('id', 'jobFooter')
    const $backButton = $('<button>').text('Back to Summary').attr('id', 'jobBackToJobs')
    const $favoriteButton = $('<button>').attr({'data-href': job.url, 'id': 'favoriteButton'}).text('Add to Favorites')
    const $divGlassDoor = $('#glassDoor')

    $divJobFooter.append($backButton)
    $divJobFooter.append($favoriteButton)
    jobsTable.append($divJobFooter)
    // jobsTable.append($divGlassDoor)

    $('#job').slideDown('slow')

    $("#jobBackToJobs").click(function(event) {
      event.preventDefault();

      $('#job').slideUp('slow')
      $('#jobs').slideDown('slow')
      $('#glassDoor').slideUp('slow')
    })

    $("#getJobCompany").click(function(event) {
      event.preventDefault();

      $("#glassDoor").empty();

      $('#glassDoor').slideUp('slow')

      const jobCompany = $(event.target).text()

      $.getJSON('/glassdoor/' + jobCompany)
        .done((GDComp) => {

          const company = GDComp[0];

          const renderCompany = function(company) {
            const glassDoor = $('#glassDoor')
            const $table = $('<table>').attr('id', 'glassDoorTable')
            const $tbody = $('<tbody>')
            const $tr = $('<tr>')
            const $tr1 = $('<tr>')
            const $tr2 = $('<tr>')
            // const $tr3 = $('<tr>')
            // const $tr4 = $('<tr>')
            // const $tr5 = $('<tr>')
            // const $tr6 = $('<tr>')
            // const $tr7 = $('<tr>')
            // const $tr8 = $('<tr>')
            // const $tr9 = $('<tr>')
            // const $tr10 = $('<tr>')

            const $aN = $('<a>').text(company.name).attr('href', company.featuredReview.attributionURL).attr('target', '_blank')
            const $bR = $('<br/>')
            const $aNC = $('<a>').text('(click to view on Glassdoor.com)').attr('class', 'black-text')
            const $tdN = $('<td>')
            $tdN.append($aN)
            $tdN.append($bR)
            $tdN.append($aNC)
            $tr1.append($tdN)
            const $img = $('<img>').attr({
              src: company.squareLogo,
              height: "42",
              width: "42"
              })

            const $tdL = $('<td>')
            $tdL.append($img)
            $tr1.append($tdL)
            const $aW = $('<a>').text(company.website).attr('href', ('http://' + company.website)).attr('target', '_blank')
            const $tdW = $('<td>')
            $tdW.append($aW)
            $tr1.append($tdW)
            $tbody.append($tr1)

            const $tdI = $('<td>').text('Industry: ' + company.industry)
            $tr2.append($tdI)
            const $tdS = $('<td>').text('Sector: ' + company.sectorName)
            $tr2.append($tdS)
            const $tdNOR = $('<td>').text('Number of Ratings: ' + company.numberOfRatings)
            $tr2.append($tdNOR)
            $tbody.append($tr2)

            $table.append($tbody)
            glassDoor.append($table)

            const $divGDR = $('<div>').attr({id: 'greenDoorRatings', class: 'col s4'})
            const $tableGDR = $('<table>').attr('class', 'striped')
            const $tableGDRHeader = $('<th>').text('Glassdoor Ratings')
            const $tableGDRBody = $('<tbody>').attr('id', 'tableGDR')
            $tableGDR.append($tableGDRHeader)
            $tableGDR.append($tableGDRBody)
            $divGDR.append($tableGDR)
            const $divFUR = $('<div>').attr({id: 'featuredUserReview', class: 'col s8'})
            const $tableFUR = $('<table>').attr('class', 'striped')
            const $tableFURHeader = $('<th>').text('Glassdoor Featured Review').attr('colspan', '2')  //<td colspan="2">
            const $tableFURBody = $('<tbody>').attr('id', 'tableFUR')
            $tableFUR.append($tableFURHeader)
            $tableFUR.append($tableFURBody)
            $divFUR.append($tableFUR)

            glassDoor.append($divGDR)
            glassDoor.append($divFUR)

            // *****************************************************************
            const greenDoorKeys = [
              "Rating Description:",
              "Overall Rating:",
              "Recommend to Friend Rating:",
              "Work Life Balance Rating:",
              "Work Life Balance Rating:",
              "Culture and Values Rating:",
              "Compensation and Benefits Rating:",
              "Career Opportunities Rating:",
              "Senior Leadership Rating:",
            ]

            const greenDoorVals = [
              "ratingDescription",
              "overallRating",
              "recommendToFriendRating",
              "workLifeBalanceRating",
              "workLifeBalanceRating",
              "cultureAndValuesRating",
              "compensationAndBenefitsRating",
              "careerOpportunitiesRating",
              "seniorLeadershipRating"
            ]

            for (let i=0 ; i<greenDoorKeys.length ; i++) {
              const $row = $('<tr>')
              $row.append($('<td>').text(greenDoorKeys[i]))
              $row.append($('<td>').text(company[greenDoorVals[i]]))
              $tableGDRBody.append($row)
            }

            const companyReview = company.featuredReview

            const greenDoorFRKeys = [
              "Title:",
              "Overall Rating:",
              "Review Date:",
              "Reviewd By:",
              "Location:",
              "Currently Employed at this company:",
              "Pro's:",
              "Con's:"
            ]

            const greenDoorFRVals = [
              "headline",
              "overall",
              "reviewDateTime",
              "jobTitle",
              "location",
              "currentJob",
              "pros",
              "cons"
            ]

            for (let i=0 ; i<greenDoorFRVals.length ; i++) {
              const $row = $('<tr>')
              $row.append($('<td>').text(greenDoorFRKeys[i]))
              // console.log(company.featuredReview);
              // console.log(companyReview[greenDoorFRVals[i]]);
              $row.append($('<td>').text(companyReview[greenDoorFRVals[i]]))
              $tableFURBody.append($row)
            }
          }
          renderCompany(company);
          $('#glassDoor').slideDown('slow')
        })
    })
  })
}

$('html').click((event) => {
  if(event.target.attributes[0].value === 'favoriteButton'){
    var url = event.target.parentNode.parentNode.children[0].children[1].children[0].children[0].children[0].attributes[0].value

        const options = {
          contentType: 'application/json',
          data: JSON.stringify({'url': url}),
          dataType: 'json',
          type: 'POST',
          url: '/favs/addJobInfo'
        };

        $.ajax(options)
          .done(() => {
            window.location.href = '/jobs.html';
          })
          .fail(($xhr) => {
            Materialize.toast($xhr.responseText, 3000);
          });
  }
})



// note line 12 needs to be https
