//TODO: Fix new overlapping intervals, remove second day selector
//If link = default, do locally
//else do all updates w/ POST and update times using POST response
import './App.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';


let DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let DAYS_INDEX={'sunday':0,'monday':1,'tuesday':2,'wednesday':3,'thursday':4,'friday':5,'saturday':6}
let re = /[a-zA-Z]/g;

function getOverlaps(l1, l2){
  /**
   * Given two sorted arrays of time intervals, return an array of intervals of intersections of the two arrays.
   */
  let p1=0;
  let p2=0;
  let current=[];
  let intervals=[];
  while(p1<l1.length && p2<l2.length){
      current=[];
      if(l1[p1][1]<=l2[p2][0]){
          p1+=1;
          continue;
      }
      if (l2[p2][1]<=l1[p1][0]){
          p2+=1;
          continue;
      }
      if(l1[p1][0]<l2[p2][0]){
          current.push(l2[p2][0]);
      }
      else{
          current.push(l1[p1][0]);
      }
      if(l1[p1][1]<l2[p2][1]){
          current.push(l1[p1][1]);
          p1+=1;
      }
      else{
          current.push(l2[p2][1]);
          p2+=1;
      }
      intervals.push(current)
  }
  return intervals;
}

function timeToStr(minutes){
  /**
   * Given an amount in minutes elapsed since Sunday midnight, returns a string containing day and time.
   */
  let day=Math.floor(minutes/1440);
  minutes%=1440;
  let hour=Math.floor(minutes/60);
  let period;
  if(hour>=12){
      period='P.M.';
  }
  else{
      period='A.M.';
  }
  hour%=12;
  if(hour==0){
      hour=12;
  }
  minutes%=60;
  let minuteStr;
  if(minutes<10){
    minuteStr =  '0'+minutes.toString()
  }
  else{
    minuteStr = minutes.toString()
  }
  return DAYS[day]+' '+hour.toString()+':'+minuteStr+' '+period;
}

function overlappingTimes(allTimes){
  /**
   * Given a Map of times, returns a sorted list containing all overlapping times.
   */
  let overlaps = null;
  for(let arr of allTimes){
      if(overlaps==null){
          overlaps=arr[1]
      }
      else{
          overlaps=getOverlaps(overlaps,arr[1])
      }
  }
  if (overlaps!==null){
    overlaps.sort((a,b) => a);
  }
  return overlaps;
}

function TimeForm({onSubmitFunc}) {
  return (
    <form id='add-time' onSubmit ={onSubmitFunc}>
        <label>Name:
          <input type='text' id='name' name="timeName"/>
        </label>
        <label>
          Day:
          <select id='start-day' name="startDay">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
            </select>
        </label>
        <label>Start time: 
          <input type='text' id='start-time' name="startTimeHour" size="2" />:
          <input type='text' id='start-time' name="startTimeMinute" size="2"/>
          <select id='start-period' name="startPeriod">
            <option value="0">A.M.</option>
            <option value="1">P.M.</option>
          </select>
        </label>
        <label>End time: 
          <input type='text' id='end-time' name="endTimeHour" size="2" />:
          <input type='text' id='end-time' name="endTimeMinute" size="2"/>
          <select id='start-period' name="endPeriod">
            <option value="0">A.M.</option>
            <option value="1">P.M.</option>
          </select>
        </label>
        
        <input type="submit" id = 'add-time-button' value="Add" />
    </form>
  )
}

function GroupTimes({list}) {
  return (
    <div className='groupTimes'>
      <h2>Available times</h2>
      {list ? list.map(time => <p>{timeToStr(time[0])+' - '+timeToStr(time[1])}</p>) : null}
    </div>
  )
}

function Time({timeArr, removeFunc, i, nameToRemove}){
  return  (
    <div>
      <p className = "timeBox">{timeToStr(timeArr[0])+' - '+timeToStr(timeArr[1])}</p>
      <button type="button" className = "timeBox" onClick = {(e) => removeFunc(i, nameToRemove)}>Remove</button>
    </div>
  )
}

function PersonTime({name, list, removeFunction}) {
  return (
    <div className="personBox">
      <p><b>{name}</b></p>
      {list.map((time,index) => <Time timeArr={time} removeFunc = {removeFunction} i={index} nameToRemove = {name}/>)}
    </div>
  )
}
function SetGroup({onSubmitFunc}){
  return (
    <form id='group-id' onSubmit = {onSubmitFunc}>
      <label>
        ID
        <input type='text' id='id-str' name="idStr"/>
      </label>
      <input type="submit" id = 'set-group' value="Submit" />
    </form>
  )
}

function App() {
  const [times, setTimes] = useState(new Map());
  const [overlaps, setOverlaps] = useState([]);
  const [current, setCurrent] = useState(null);
  function submitLocal(event){
    event.preventDefault();
    let startMinutes = 1440*DAYS_INDEX[event.target.elements.startDay.value]+60*(parseInt(event.target.elements.startTimeHour.value)%12)+60*12*parseInt(event.target.elements.startPeriod.value)+parseInt(event.target.elements.startTimeMinute.value);
    let endMinutes = 1440*DAYS_INDEX[event.target.elements.startDay.value]+60*(parseInt(event.target.elements.endTimeHour.value)%12)+60*12*parseInt(event.target.elements.endPeriod.value)+parseInt(event.target.elements.endTimeMinute.value);
    let name = event.target.elements.timeName.value.toString();
    if(name==''){
      alert('Name cannot be empty');
      return
    }
    if (parseInt(event.target.elements.startTimeHour.value)<1 || parseInt(event.target.elements.startTimeHour.value)>12 || re.test(event.target.elements.startTimeHour.value) || parseInt(event.target.elements.startTimeHour.value)!=parseFloat(event.target.elements.startTimeHour.value)){
      alert('Start time hour must be an integer between 1 and 12');
      return
    }
    if (parseInt(event.target.elements.endTimeHour.value)<1 || parseInt(event.target.elements.endTimeHour.value)>12 || re.test(event.target.elements.endTimeHour.value) || parseInt(event.target.elements.endTimeHour.value)!=parseFloat(event.target.elements.endTimeHour.value)){
      alert('End time hour must be an integer between 1 and 12');
      return
    }
    if (parseInt(event.target.elements.startTimeMinute.value)<0 || parseInt(event.target.elements.startTimeMinute.value)>59 || re.test(event.target.elements.startTimeMinute.value) || parseInt(event.target.elements.startTimeMinute.value)!=parseFloat(event.target.elements.startTimeMinute.value)){
      alert('Start time minute must be an integer between 0 and 59');
      return
    }
    if (parseInt(event.target.elements.endTimeMinute.value)<0 || parseInt(event.target.elements.endTimeMinute.value)>59 || re.test(event.target.elements.endTimeMinute.value) || parseInt(event.target.elements.endTimeMinute.value)!=parseFloat(event.target.elements.endTimeMinute.value)){
      alert('End time minute must be an integer between 0 and 59');
      return
    }
    if (startMinutes>=endMinutes){
      alert('Start time must be later than end time');
      return
    }

    event.target.elements.startTimeHour.value='';
    event.target.elements.startTimeMinute.value='';
    event.target.elements.endTimeHour.value='';
    event.target.elements.endTimeMinute.value='';
    event.target.elements.timeName.value='';
    
    let newMap = new Map(times)
    if(newMap.has(name)){
      newMap.get(name).push([parseInt(startMinutes),parseInt(endMinutes)]);
      newMap.get(name).sort((a,b) => a);
    }
    else{
        newMap.set(name,[[parseInt(startMinutes),parseInt(endMinutes)]]);
    }
    setTimes(newMap);
  }
  function submitServer(event){
    event.preventDefault();
    let startMinutes = 1440*DAYS_INDEX[event.target.elements.startDay.value]+60*(parseInt(event.target.elements.startTimeHour.value)%12)+60*12*parseInt(event.target.elements.startPeriod.value)+parseInt(event.target.elements.startTimeMinute.value);
    let endMinutes = 1440*DAYS_INDEX[event.target.elements.startDay.value]+60*(parseInt(event.target.elements.endTimeHour.value)%12)+60*12*parseInt(event.target.elements.endPeriod.value)+parseInt(event.target.elements.endTimeMinute.value);
    let name = event.target.elements.timeName.value.toString();
    if(name==''){
      alert('Name cannot be empty');
      return
    }
    if (parseInt(event.target.elements.startTimeHour.value)<1 || parseInt(event.target.elements.startTimeHour.value)>12 || re.test(event.target.elements.startTimeHour.value) || parseInt(event.target.elements.startTimeHour.value)!=parseFloat(event.target.elements.startTimeHour.value)){
      alert('Start time hour must be an integer between 1 and 12');
      return
    }
    if (parseInt(event.target.elements.endTimeHour.value)<1 || parseInt(event.target.elements.endTimeHour.value)>12 || re.test(event.target.elements.endTimeHour.value) || parseInt(event.target.elements.endTimeHour.value)!=parseFloat(event.target.elements.endTimeHour.value)){
      alert('End time hour must be an integer between 1 and 12');
      return
    }
    if (parseInt(event.target.elements.startTimeMinute.value)<0 || parseInt(event.target.elements.startTimeMinute.value)>59 || re.test(event.target.elements.startTimeMinute.value) || parseInt(event.target.elements.startTimeMinute.value)!=parseFloat(event.target.elements.startTimeMinute.value)){
      alert('Start time minute must be an integer between 0 and 59');
      return
    }
    if (parseInt(event.target.elements.endTimeMinute.value)<0 || parseInt(event.target.elements.endTimeMinute.value)>59 || re.test(event.target.elements.endTimeMinute.value) || parseInt(event.target.elements.endTimeMinute.value)!=parseFloat(event.target.elements.endTimeMinute.value)){
      alert('End time minute must be an integer between 0 and 59');
      return
    }
    if (startMinutes>=endMinutes){
      alert('Start time must be later than end time');
      return
    }

    event.target.elements.startTimeHour.value='';
    event.target.elements.startTimeMinute.value='';
    event.target.elements.endTimeHour.value='';
    event.target.elements.endTimeMinute.value='';
    event.target.elements.timeName.value='';
    
    fetch('/add/'+current+'/'+name+'/'+startMinutes.toString()+'/'+endMinutes.toString()+'/', {
      method: 'POST'
    }).then(
      res => res.json()
    ).then(data => {
      setTimes(new Map(Object.entries(data)));
    })

  }

  function setServer(event){
    if(event){
      event.preventDefault();
      if(event.target.elements.idStr.value==null){
        return
      }
      fetch('/'+event.target.elements.idStr.value
      ).then(
        res => res.json()
      ).then(data => {
        setTimes(new Map(Object.entries(data)));
        setCurrent(event.target.elements.idStr.value);
      })
    }
  }
  function removeLocal(index, name){
    let newMap = new Map(times);
    console.log(newMap.get(name));
    newMap.get(name).splice(index);
    if(newMap.get(name).length==0){
      newMap.delete(name)
    }
    setTimes(newMap);
  }
  function removeServer(index, name){
    fetch('/rm/'+current+'/'+name+'/'+times.get(name)[index][0].toString()+'/'+times.get(name)[index][1].toString()+'/', {
      method: 'POST'
    }).then(
      res => res.json()
    ).then(data => {
      setTimes(new Map(Object.entries(data)));
    })

  }
  function handleSubmit(event){
    if(event){
      if(current==null){
        submitLocal(event);
      }
      else{
        submitServer(event);
      }
    }
  }
  function removeTime(index, name){
    if(current==null){
      removeLocal(index, name);
    }
    else{
      removeServer(index, name);
    }
  }
  return (
    <div className="App">
      <SetGroup onSubmitFunc={setServer} />
      <TimeForm onSubmitFunc={handleSubmit}/>
      <GroupTimes list={overlappingTimes(times)}/>
      {[...times].map(sub => <PersonTime name={sub[0]} list={sub[1]} removeFunction = {removeTime}/>)}
    </div>
  );
}

export default App;
