const setDOMInfo = domInfo => {
  if (!domInfo) {
    Array.from(document.querySelectorAll('.center')).forEach(function(val) {
      val.style.display = 'none'
    })
    const h3 = document.createElement('h3')
    h3.className = 'center'
    h3.innerHTML =
      'This course is Paid by CourseHunters. <button class="btn btn-error">Unlock it using CourseHunters subscription</button>'
    document.body.appendChild(h3)
    return
  }
  const { videos, courseName, totalDuration } = domInfo
  const header = document.querySelector('#header')
  header.innerHTML = courseName
  const totalTime = document.querySelector('#totalTime')
  totalTime.innerHTML = totalDuration
  const ul = document.querySelector('#videos')
  const videosArr = document.querySelector('textarea[name="videos"]')
  const videosData = []
  videos.forEach(video => {
    const a = document.createElement('a')
    a.download = video.name
    a.innerHTML = video.name
    a.href = video.href
    const span = document.createElement('span')
    span.className = 'label'
    span.innerHTML = video.time
    const li = document.createElement('li')
    li.appendChild(a)
    li.appendChild(span)
    ul.appendChild(li)
    videosData.push({
      url: video.href,
      name: video.name,
    })
  })
  videosArr.innerHTML = JSON.stringify(videosData, null, 2)
}

window.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    tabs => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: 'popup', subject: 'DOMInfo' },
        setDOMInfo,
      )
    },
  )
})
