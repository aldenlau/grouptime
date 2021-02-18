"use strict"
let times=new Map()
let days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

function getOverlaps(l1, l2){
    //Given two sorted arrays of time intervals, return an array of intervals of intersections of the two arrays.
    //Use two pointers
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
function update(){
    let overlaps = null;
    for(let arr of times){
        if(overlaps==null){
            overlaps=arr[1]
        }
        else{
            overlaps=getOverlaps(overlaps,arr[1])
        }
    }
    let overlapNode=document.getElementById('overlap-times');
    while (overlapNode.firstChild){
        overlapNode.removeChild(overlapNode.lastChild);
    }
    overlaps.sort((a,b) => a);
    let textNode;
    let newNode;
    for(let arr of overlaps){
        newNode = document.createElement('p');
        textNode = document.createTextNode('['+timeToStr(arr[0])+' - '+timeToStr(arr[1])+']')
        newNode.append(textNode)
        overlapNode.append(newNode);
    }
}
function timeToStr(minutes){
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
    return days[day]+' '+hour.toString()+':'+minutes.toString()+' '+period;
}
function getTime(){
    let startTime = document.getElementById('start-time').value;
    let endTime = document.getElementById('end-time').value;
    document.getElementById('start-time').value='';
    document.getElementById('end-time').value='';
}
function addTime(){
    //first add time to set
    let name = document.getElementById('name').value;
    let startTime = document.getElementById('start-time').value;
    let endTime = document.getElementById('end-time').value;
    document.getElementById('name').value='';
    document.getElementById('start-time').value='';
    document.getElementById('end-time').value='';

    if(times.has(name)){
        times.get(name).push([parseInt(startTime),parseInt(endTime)]);
        times.get(name).sort((a,b) => a);
    }
    else{
        times.set(name,[[parseInt(startTime),parseInt(endTime)]]);
    }
    update();
}
document.getElementById('add-time-button').addEventListener('click',addTime);
/*
Testing
let a=[[1,3],[5,9],[10,18]];
let b=[[2,4],[5,11],[14,19]];
let c=[[1,5],[6,10],[13,17]];
let d=[a,b,c]
for(let arr of getOverlaps(a,b)){
    console.log(arr[0].toString()+' '+arr[1].toString());
}
let e=d[0]
for(let arr of d.slice(1)){
    e=getOverlaps(e,arr)
}
console.log(e)
*/