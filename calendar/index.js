
const data = [
    {
      startTime: "00:00",
      endTime: "01:30",
      color: "#f6be23",
      title: "#TeamDevkode",
    },
    {
      startTime: "3:30",
      endTime: "7:30",
      color: "#f6501e",
      title: "#TeamDevkode",
    },
    {
      startTime: "4:30",
      endTime: "8:30",
      color: "#f6501e",
      title: "#TeamDevkode",
    },
    {
      startTime: "6:30",
      endTime: "9:00",
      color: "#f6501e",
      title: "Demo",
    },
    {
      startTime: "11:00",
      endTime: "13:30",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "12:00",
      endTime: "13:30",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "9:30",
      endTime: "10:30",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "16:00",
      endTime: "17:00",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "15:00",
      endTime: "17:00",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "18:00",
      endTime: "19:00",
      color: "#f6501e",
      title: "#TeamDevkode",
    },
    {
      startTime: "20:30",
      endTime: "22:30",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "20:30",
      endTime: "22:30",
      color: "#029be5",
      title: "#TeamDevkode",
    },
  ];


function getMinutes(time) {
  const times = time.split(":");
  const minutes = Number(times[0]) * 60 + Number(times[1]);
  return minutes;
}


function rederTimeIntervals() {
  for (let i = 0; i < 24; i++) {
    const el = document.createElement('div');
    el.className = 'time-intervals';
    el.style.top = `${i * 5}rem`;
    el.style.height = '5rem';
    el.style.borderBottom = '1px solid black';
    if (i <= 11) {
      el.innerText = `${i}:00 AM`;
    } else {
      el.innerText = `${i}:00 Pm`;
    }
    document.getElementById('calender').appendChild(el);
  }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}

rederTimeIntervals();

function renderMeetings() {
  const updatedData = [...data];
  let zIndex= 101;
  let div = document.getElementById('calender');
  const width = Number(window.getComputedStyle(div).width.split("px")[0]);
  updatedData.forEach((i, index) => {
    i.startTime = getMinutes(i.startTime);
    i.endTime = getMinutes(i.endTime);
    const top = (5 / 60) * i.startTime;
    const height = (i.endTime - i.startTime) * (5 / 60);
    const el = document.createElement('div');
    el.className = 'time-meetings';
    const conflicts = updatedData.filter((m, k) => k < index && m.startTime <= i.startTime && m.endTime > i.startTime);
    el.style.left = `${120 + (conflicts.length === 0 ? 0 : ((width - 120)- ((width - 120) / (conflicts.length + 1))))}px`;
    el.style.zIndex= `${zIndex}`;
    zIndex++;
    el.style.top = `${top}rem`;
    el.style.height = `${height}rem`;
    el.style.backgroundColor = getRandomColor();
    el.style.width = "100%";
    el.innerHTML=`<div style="display:flex;flex-direction:column;"><div style="color:white;">${i.title}</div></div>` 
    document.getElementById('calender').appendChild(el);
  });
}

renderMeetings();