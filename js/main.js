var array_prv = []
var array_prv_name= []
var name_PRV = ["","","","","","","","","","", "Bangkok", "Samut Prakarn", "Nonthaburi", "Pathum Thani", "Phra Nakhon Si Ayudhya", "Ang Thong", "Lopburi", "Singburi", "Chainat", "Saraburi", "Chonburi", "Rayong", "Chanthaburi", "Trat", "Chachoengsao", "Prachinburi", "Nakhon Nayok", "Srakaeo", "","", "Nakhon Ratchasima", "Burirum", "Surin", "Sisaket", "Ubon Ratchathani", "Yasothon", "Chaiyaphum", "Amnaj Charoen", "Bueng Kan", "", "Khon Kaen", "Udon Thani", "Loei", "Nong Khai", "Mahasarakham", "Roi Et", "Kalasin", "Sakon Nakhon", "Nakhon Phanom", "Mukdahan", "Chiang Mai", "Lamphun", "Lampang", "Auttaradit", "Phrae", "Nan", "Phayao", "Chiangrai", "Mae Hong Son", "", "Nakhon Sawan", "Uthai Thani", "Kampaeng Phet", "Tak", "Sukhothai", "Phitsanu Lok", "Phichit", "Phetchabun", "","", "Ratchaburi", "Kanchanaburi", "Suphan Buri", "Nakhon Prathom", "Samut Sakhon", "Samut Songkham", "Phetchaburi", "Prachuap Khilikhan", "","", "Nakhon Si Thammarat", "Krabi", "Phang Nga", "Phuket", "Surat Thani", "Ranong", "Chumphon", "","","", "Songkhla", "Satun", "Trang", "Phatthalung", "Pattani", "Yala", "Narathiwat","","",""]
var arrayconfig = []
var m
var data 
var dataseries = []

function addName() {
    array_prv_name=[]
    for (var index = 0; index < array_prv.length; index++) {
        array_prv_name.push(name_PRV[parseInt(array_prv[index])])
        
    }
    console.log(array_prv_name)
   
}


function chartinit(){
   
    var list_PRV_CODE = array_prv
    var list_name = array_prv_name
    
    Highcharts.chart('container', {

        chart: {
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 80,
            plotBorderWidth: 1
        },
    
    
        title: {
            text: 'Accident'
        },
    
        xAxis: {
            categories: list_name
        },
    
        yAxis: {
            categories: ['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7'],
            title: null
        },
    
        colorAxis: {
            min: 0,
            minColor: '#ffffff',
            maxColor: '#e74c3c'
        },
    
        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 25,
            symbolHeight: 280
        },
    
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> <br><b>' +
                    this.point.value + '</b>  on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
            }
        },
    
        series: [{
            name: 'Accident per Day',
            borderWidth: 1,
            data: dataseries
        }]
    
    });
}

function toggleCheckbox(element)
{   if(element.checked ){
                if(array_prv.length < 10){
                    array_prv.push(element.value)
                }else{
                    element.checked = !element.checked;
                }
                
            }else{
                var i = array_prv.indexOf(element.value);
                 array_prv.splice(i,1)
            }
               
}

function toggleconfig(element)
{   if(element.checked ){
                if(arrayconfig.length < 1){
                    arrayconfig.push(element.value)
                }else{
                    element.checked = !element.checked;
                }
                
            }else{
                var i = arrayconfig.indexOf(element.value);
                arrayconfig.splice(i,1)
            }
            console.log(arrayconfig)
               
}
function query(){
    swal("Wait a Moment");
    data = {
        "dataDay1":[0,0,0,0,0,0,0,0,0,0],
        "dataDay2":[0,0,0,0,0,0,0,0,0,0],
        "dataDay3":[0,0,0,0,0,0,0,0,0,0],
        "dataDay4":[0,0,0,0,0,0,0,0,0,0],
        "dataDay5":[0,0,0,0,0,0,0,0,0,0],
        "dataDay6":[0,0,0,0,0,0,0,0,0,0],
        "dataDay7":[0,0,0,0,0,0,0,0,0,0]
    }
    addName()

    var url = "data.xlsx";
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(e) {
    var arraybuffer = oReq.response;

        /* convert data to binary string */
        var datajson = new Uint8Array(arraybuffer);
        var arr = new Array();
        for(var i = 0; i != datajson.length; ++i) arr[i] = String.fromCharCode(datajson[i]);
        var bstr = arr.join("");

        /* Call XLSX */
        var workbook = XLSX.read(bstr, {type:"binary"});

        /* DO SOMETHING WITH workbook HERE */
        var first_sheet_name = workbook.SheetNames[0];
        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];
        var json = XLSX.utils.sheet_to_json(worksheet,{raw:true});
        

        var isMale = arrayconfig.indexOf("10");
        var isFeMale = arrayconfig.indexOf("11");
        var isBike = arrayconfig.indexOf("21");
        var isCar = arrayconfig.indexOf("20");

 
  function addInDay(index,i){//30-5
    if(json[index].DATE=="30"){
        data.dataDay1[i]++
    }
    if(json[index].DATE=="31"){
        data.dataDay2[i]++
    }
    if(json[index].DATE=="1"){
        data.dataDay3[i]++
    }
    if(json[index].DATE=="2"){
        data.dataDay4[i]++
    }
    if(json[index].DATE=="3"){
        data.dataDay5[i]++
    }
    if(json[index].DATE=="4"){
        data.dataDay6[i]++
    }
    if(json[index].DATE=="5"){
        data.dataDay7[i]++
    }
  }
  for (let index = 0; index < json.length; index++) {
    
    var i = array_prv.indexOf(String(json[index].PRV_CODE)) 
        if(json[index].SEX=="Male" && isMale!= -1 ){
            addInDay(index,i)
        }
        if(json[index].SEX=="Female" && isFeMale!= -1 ){
            addInDay(index,i)
        }
        if(json[index].TYPE=="Motorbike" && isBike!= -1 ){
            addInDay(index,i)
        }
        else {
            if(isCar!= -1)
            addInDay(index,i)
        }
  }
}
oReq.send();
console.log(data)
}

function update(){
        query()
        setTimeout(function(){ 
        m.remove()
        m =  L.map('map').setView([13.943871, 100.503202], 6);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(m);
       
        var list_PRV_CODE = array_prv
        var colorOnMap = ["#c0392b","#c64c40","#e74c3c","#e95d4f","#d35400","#d76519","#e67e22","#e88a38","#f39c12","#f4a529"]
        var sortOrder = [0,0,0,0,0,0,0,0,0,0]
        var dataSum  = [0,0,0,0,0,0,0,0,0,0]
        for(var i=0;i<10;i++){
            for(var j=1;j<8;j++){
                dataSum[i]+=data["dataDay"+ String(j)][i]
            }
        }
        
      console.log(dataSum)

    for(var i=0;i<list_PRV_CODE.length;i++){

        for(var j=1;j<8;j++){
            dataseries.push([i,j-1,data["dataDay"+ String(j)][i]])
           
        }
      
    }

 

        //sort and return order
        var tempSort = []
        for (var j = 0; j < 10; j++) {
            tempSort[j] = dataSum[j]   
        }

        tempSort.sort(function(a, b){return b-a});
        var order = 0
       
        for (var i = 0; i < 10; i++) {
           
            for (var j = 0; j < 10; j++) {
                if(dataSum[j]==tempSort[i])
                    {
                        sortOrder[j] = order
                    }
            }
            order++
        }
   
        chartinit()
            var shpfile = new L.Shapefile('thai.zip', {
                onEachFeature: function(feature, layer) {
                    
                    if (feature.properties) {
                        
                  //name[parseInt(feature.properties.PRV_CODE)]= feature.properties.PRV_NAME_E
                var step = 1;
                  layer.bindPopup(Object.keys(feature.properties).map(function(k){

                    if(k=="PRV_CODE"){
                    var str = "CODE:"+feature.properties.PRV_CODE +"<br>"+ "NAME:"+feature.properties.PRV_NAME_E + "<br>"
                    var i = list_PRV_CODE.indexOf(feature.properties.PRV_CODE)
                    step=0;
                    if(i != -1)
                    {
                        for (let index = 1; index < 8 ; index++) {
                        
                        str += ("Day"+ index + ": ")
                        str += data["dataDay"+ String(index)][i]
                        str += ("<br> ")
                    }
                    str += ("Sum"+ ": ")
                    str + dataSum[sortOrder[i]]
                    str += ("<br> ")
                    return str;
                }
                    else{
                        return str
                    }
                }

            }).join("<br />"), {
                    maxHeight: 200
                });
                    }
                }
                , 
        style: function(feature) {
            switch (feature.properties.PRV_CODE) {
                case list_PRV_CODE[0]: return {color: colorOnMap[sortOrder[0]] ,weight: 2, opacity: 1,dashArray: '3',fillOpacity: 0.7};   
                case list_PRV_CODE[1]: return {color: colorOnMap[sortOrder[1]],weight: 2, opacity: 1,dashArray: '3',fillOpacity: 0.7};   
                case list_PRV_CODE[2]: return {color: colorOnMap[sortOrder[2]],weight: 2, opacity: 1,dashArray: '3',fillOpacity: 0.7};   
                case list_PRV_CODE[3]: return {color: colorOnMap[sortOrder[3]],weight: 2, opacity: 1,dashArray: '3',fillOpacity: 0.7};   
                case list_PRV_CODE[4]: return {color: colorOnMap[sortOrder[4]],weight: 2, opacity: 1, dashArray: '3',fillOpacity: 0.7};   
                case list_PRV_CODE[5]: return {color: colorOnMap[sortOrder[5]],weight: 2, opacity: 1, dashArray: '3',fillOpacity: 0.7};   
                case list_PRV_CODE[6]: return {color: colorOnMap[sortOrder[6]],weight: 2, opacity: 1, dashArray: '3',fillOpacity: 0.7};   
                case list_PRV_CODE[7]: return {color: colorOnMap[sortOrder[7]],weight: 2, opacity: 1, dashArray: '3',fillOpacity: 0.7};   
                case list_PRV_CODE[8]: return {color: colorOnMap[sortOrder[8]],weight: 2, opacity: 1,dashArray: '3',fillOpacity: 0.7};   
                case list_PRV_CODE[9]: return {color: colorOnMap[sortOrder[9]],weight: 2, opacity: 1, dashArray: '3',fillOpacity: 0.7};   
                default:   return {color: "#ecf0f1"};
            }
        }
        }
            );
            shpfile.addTo(m);
            shpfile.once("data:loaded", function() {
                swal({
                    title: "Good job!",
                    text: "finished loaded shapefile!",
                    icon: "success",
                  });
                  
                  console.log("finished loaded shapefile");
                  
            });
          }, 3000);
    }
 
            


function mapinit(){
           
            m =  L.map('map').setView([13.943871, 100.503202], 6);
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(m);
             for (var index = 0; index < name_PRV.length; index++) {
            if(name_PRV[index] != ""){
            var div = document.createElement("div");
            div.setAttribute('class', 'checkbox');
            div.innerHTML="<label><input type=\"checkbox\" onchange=\"toggleCheckbox(this)\" value=\""+ index +"\">"+ name_PRV[index] +"</label>";
            document.getElementById("prv_list").appendChild(div);
        }
            
        }
}


