var students = [{
    ra: 122344,
    name:"KAUAN",
    grade: 10
},
{
    ra: 12245,
    name:"lucas",
    grade: 10
},

{
    ra: 23456,
    name:"vitao",
    grade: 3
},
{
    ra: 23456,
    name:"leo",
    grade: 8
} 
]

function generaterow(st) {
    return `<tr>

    <td>${st.ra}</td>
    <td>${st.name}</td>
    <td>${st.grade}</td>

    </tr>`
    
}

window.onload = function(){
    //------MAP--------
    var table = document.getElementById("table_body")

    var studentsMap = students.map(generaterow)


    for(var i=0; i<students.length; i++){
    table.innerHTML += studentsMap[i]
    }
}

//------FILTER------

var studentsFiltered = students.filter(function(estudante) {
    return estudante.grade >= 6.5;
});
var table = document.getElementById("table_body2")

var studentsFilteredMap = studentsFiltered.map(generaterow)


for(var i=0; i<studentsFilteredMap.length; i++){
table.innerHTML += studentsFilteredMap[i]
}
























