chrome.runtime.sendMessage({
  from: 'content',
  subject: 'showPageAction',
})

const formatName = n => (n + 1 < 10 ? ('0' + (n + 1)).slice(-2) : n + 1)

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.from === 'popup' && msg.subject === 'DOMInfo') {
    const lis = document.querySelectorAll('#lessons-list>li.lessons-item')
    const courseName = document.querySelector('.hero-description').innerHTML
    const totalDuration = document.querySelector('.course-box-value').innerHTML
    const coursePaid = document.querySelector(
      '.course-wrap>.course-wrap-side-left>div',
    ).innerHTML

    if (coursePaid === 'Course Paid') {
      response(null)
      return
    }

    const videos = Array.from(lis).map((li, i) => {
      const name = li.querySelector('.lessons-name').innerHTML
      const href = li.querySelector('link[itemprop="url"]').getAttribute('href')
      const time = li
        .querySelector('meta[itemprop="duration"]')
        .getAttribute('content')
      const formattedName = formatName(i) + '. ' + name
      return { name: formattedName, href, time }
    })

    const domInfo = {
      videos,
      courseName,
      totalDuration,
    }

    response(domInfo)
  }
})
