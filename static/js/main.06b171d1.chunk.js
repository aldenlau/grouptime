(this.webpackJsonpgrouptime=this.webpackJsonpgrouptime||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),s=n(6),i=n.n(s),u=(n(13),n(8)),l=n(4),m=n(7),o=(n(14),n(0)),d=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],c={sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6},p=/[a-zA-Z]/g;function v(e,t){for(var n=0,a=0,r=[],s=[];n<e.length&&a<t.length;)r=[],e[n][1]<=t[a][0]?n+=1:t[a][1]<=e[n][0]?a+=1:(e[n][0]<t[a][0]?r.push(t[a][0]):r.push(e[n][0]),e[n][1]<t[a][1]?(r.push(e[n][1]),n+=1):(r.push(t[a][1]),a+=1),s.push(r));return s}function g(e){var t=Math.floor(e/1440);e%=1440;var n,a,r=Math.floor(e/60);return n=r>=12?"P.M.":"A.M.",0==(r%=12)&&(r=12),a=(e%=60)<10?"0"+e.toString():e.toString(),d[t]+" "+r.toString()+":"+a+" "+n}function j(e){var t,n=null,a=Object(m.a)(e);try{for(a.s();!(t=a.n()).done;){var r=t.value;n=null==n?r[1]:v(n,r[1])}}catch(s){a.e(s)}finally{a.f()}return null!==n&&n.sort((function(e,t){return e})),n}function b(e){var t=e.onSubmitFunc;return Object(o.jsxs)("form",{id:"add-time",onSubmit:t,children:[Object(o.jsxs)("label",{children:["Name:",Object(o.jsx)("input",{type:"text",id:"name",name:"timeName"})]}),Object(o.jsxs)("label",{children:["Day:",Object(o.jsxs)("select",{id:"start-day",name:"startDay",children:[Object(o.jsx)("option",{value:"sunday",children:"Sunday"}),Object(o.jsx)("option",{value:"monday",children:"Monday"}),Object(o.jsx)("option",{value:"tuesday",children:"Tuesday"}),Object(o.jsx)("option",{value:"wednesday",children:"Wednesday"}),Object(o.jsx)("option",{value:"thursday",children:"Thursday"}),Object(o.jsx)("option",{value:"friday",children:"Friday"}),Object(o.jsx)("option",{value:"saturday",children:"Saturday"})]})]}),Object(o.jsxs)("label",{children:["Start time:",Object(o.jsx)("input",{type:"text",id:"start-time",name:"startTimeHour",size:"2"}),":",Object(o.jsx)("input",{type:"text",id:"start-time",name:"startTimeMinute",size:"2"}),Object(o.jsxs)("select",{id:"start-period",name:"startPeriod",children:[Object(o.jsx)("option",{value:"0",children:"A.M."}),Object(o.jsx)("option",{value:"1",children:"P.M."})]})]}),Object(o.jsxs)("label",{children:["End time:",Object(o.jsx)("input",{type:"text",id:"end-time",name:"endTimeHour",size:"2"}),":",Object(o.jsx)("input",{type:"text",id:"end-time",name:"endTimeMinute",size:"2"}),Object(o.jsxs)("select",{id:"start-period",name:"endPeriod",children:[Object(o.jsx)("option",{value:"0",children:"A.M."}),Object(o.jsx)("option",{value:"1",children:"P.M."})]})]}),Object(o.jsx)("input",{type:"submit",id:"add-time-button",value:"Add"})]})}function h(e){var t=e.list;return Object(o.jsxs)("div",{className:"groupTimes",children:[Object(o.jsx)("h2",{children:"Available times"}),t?t.map((function(e){return Object(o.jsx)("p",{children:g(e[0])+" - "+g(e[1])})})):null]})}function T(e){var t=e.timeArr,n=e.removeFunc,a=e.i,r=e.nameToRemove;return Object(o.jsxs)("div",{children:[Object(o.jsx)("p",{className:"timeBox",children:g(t[0])+" - "+g(t[1])}),Object(o.jsx)("button",{type:"button",className:"timeBox",onClick:function(e){return n(a,r)},children:"Remove"})]})}function O(e){var t=e.name,n=e.list,a=e.removeFunction;return Object(o.jsxs)("div",{className:"personBox",children:[Object(o.jsx)("p",{children:Object(o.jsx)("b",{children:t})}),n.map((function(e,n){return Object(o.jsx)(T,{timeArr:e,removeFunc:a,i:n,nameToRemove:t})}))]})}function f(e){var t=e.onSubmitFunc;return Object(o.jsxs)("form",{id:"group-id",onSubmit:t,children:[Object(o.jsxs)("label",{children:["ID",Object(o.jsx)("input",{type:"text",id:"id-str",name:"idStr"})]}),Object(o.jsx)("input",{type:"submit",id:"set-group",value:"Submit"})]})}var x=function(){var e=Object(a.useState)(new Map),t=Object(l.a)(e,2),n=t[0],r=t[1],s=Object(a.useState)([]),i=Object(l.a)(s,2),m=(i[0],i[1],Object(a.useState)(null)),d=Object(l.a)(m,2),v=d[0],g=d[1];function T(e,t){null==v?function(e,t){var a=new Map(n);console.log(a.get(t)),a.get(t).splice(e),0==a.get(t).length&&a.delete(t),r(a)}(e,t):function(e,t){fetch("https://grouptime-api.herokuapp.com/rm/"+v+"/"+t+"/"+n.get(t)[e][0].toString()+"/"+n.get(t)[e][1].toString()+"/",{method:"POST"}).then((function(e){return e.json()})).then((function(e){r(new Map(Object.entries(e)))}))}(e,t)}return Object(o.jsxs)("div",{className:"App",children:[Object(o.jsx)(f,{onSubmitFunc:function(e){if(e){if(e.preventDefault(),null==e.target.elements.idStr.value)return;fetch("https://grouptime-api.herokuapp.com/"+e.target.elements.idStr.value).then((function(e){return e.json()})).then((function(t){r(new Map(Object.entries(t))),g(e.target.elements.idStr.value)}))}}}),Object(o.jsx)(b,{onSubmitFunc:function(e){e&&(null==v?function(e){e.preventDefault();var t=1440*c[e.target.elements.startDay.value]+parseInt(e.target.elements.startTimeHour.value)%12*60+720*parseInt(e.target.elements.startPeriod.value)+parseInt(e.target.elements.startTimeMinute.value),a=1440*c[e.target.elements.startDay.value]+parseInt(e.target.elements.endTimeHour.value)%12*60+720*parseInt(e.target.elements.endPeriod.value)+parseInt(e.target.elements.endTimeMinute.value),s=e.target.elements.timeName.value.toString();if(""!=s)if(parseInt(e.target.elements.startTimeHour.value)<1||parseInt(e.target.elements.startTimeHour.value)>12||p.test(e.target.elements.startTimeHour.value)||parseInt(e.target.elements.startTimeHour.value)!=parseFloat(e.target.elements.startTimeHour.value))alert("Start time hour must be an integer between 1 and 12");else if(parseInt(e.target.elements.endTimeHour.value)<1||parseInt(e.target.elements.endTimeHour.value)>12||p.test(e.target.elements.endTimeHour.value)||parseInt(e.target.elements.endTimeHour.value)!=parseFloat(e.target.elements.endTimeHour.value))alert("End time hour must be an integer between 1 and 12");else if(parseInt(e.target.elements.startTimeMinute.value)<0||parseInt(e.target.elements.startTimeMinute.value)>59||p.test(e.target.elements.startTimeMinute.value)||parseInt(e.target.elements.startTimeMinute.value)!=parseFloat(e.target.elements.startTimeMinute.value))alert("Start time minute must be an integer between 0 and 59");else if(parseInt(e.target.elements.endTimeMinute.value)<0||parseInt(e.target.elements.endTimeMinute.value)>59||p.test(e.target.elements.endTimeMinute.value)||parseInt(e.target.elements.endTimeMinute.value)!=parseFloat(e.target.elements.endTimeMinute.value))alert("End time minute must be an integer between 0 and 59");else if(t>=a)alert("Start time must be later than end time");else{e.target.elements.startTimeHour.value="",e.target.elements.startTimeMinute.value="",e.target.elements.endTimeHour.value="",e.target.elements.endTimeMinute.value="",e.target.elements.timeName.value="";var i=new Map(n);i.has(s)?(i.get(s).push([parseInt(t),parseInt(a)]),i.get(s).sort((function(e,t){return e}))):i.set(s,[[parseInt(t),parseInt(a)]]),r(i)}else alert("Name cannot be empty")}(e):function(e){e.preventDefault();var t=1440*c[e.target.elements.startDay.value]+parseInt(e.target.elements.startTimeHour.value)%12*60+720*parseInt(e.target.elements.startPeriod.value)+parseInt(e.target.elements.startTimeMinute.value),n=1440*c[e.target.elements.startDay.value]+parseInt(e.target.elements.endTimeHour.value)%12*60+720*parseInt(e.target.elements.endPeriod.value)+parseInt(e.target.elements.endTimeMinute.value),a=e.target.elements.timeName.value.toString();""!=a?parseInt(e.target.elements.startTimeHour.value)<1||parseInt(e.target.elements.startTimeHour.value)>12||p.test(e.target.elements.startTimeHour.value)||parseInt(e.target.elements.startTimeHour.value)!=parseFloat(e.target.elements.startTimeHour.value)?alert("Start time hour must be an integer between 1 and 12"):parseInt(e.target.elements.endTimeHour.value)<1||parseInt(e.target.elements.endTimeHour.value)>12||p.test(e.target.elements.endTimeHour.value)||parseInt(e.target.elements.endTimeHour.value)!=parseFloat(e.target.elements.endTimeHour.value)?alert("End time hour must be an integer between 1 and 12"):parseInt(e.target.elements.startTimeMinute.value)<0||parseInt(e.target.elements.startTimeMinute.value)>59||p.test(e.target.elements.startTimeMinute.value)||parseInt(e.target.elements.startTimeMinute.value)!=parseFloat(e.target.elements.startTimeMinute.value)?alert("Start time minute must be an integer between 0 and 59"):parseInt(e.target.elements.endTimeMinute.value)<0||parseInt(e.target.elements.endTimeMinute.value)>59||p.test(e.target.elements.endTimeMinute.value)||parseInt(e.target.elements.endTimeMinute.value)!=parseFloat(e.target.elements.endTimeMinute.value)?alert("End time minute must be an integer between 0 and 59"):t>=n?alert("Start time must be later than end time"):(e.target.elements.startTimeHour.value="",e.target.elements.startTimeMinute.value="",e.target.elements.endTimeHour.value="",e.target.elements.endTimeMinute.value="",e.target.elements.timeName.value="",fetch("https://grouptime-api.herokuapp.com/add/"+v+"/"+a+"/"+t.toString()+"/"+n.toString()+"/",{method:"POST"}).then((function(e){return e.json()})).then((function(e){r(new Map(Object.entries(e)))}))):alert("Name cannot be empty")}(e))}}),Object(o.jsx)(h,{list:j(n)}),Object(u.a)(n).map((function(e){return Object(o.jsx)(O,{name:e[0],list:e[1],removeFunction:T})}))]})},y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),s(e),i(e)}))};i.a.render(Object(o.jsx)(r.a.StrictMode,{children:Object(o.jsx)(x,{})}),document.getElementById("root")),y()}},[[16,1,2]]]);
//# sourceMappingURL=main.06b171d1.chunk.js.map