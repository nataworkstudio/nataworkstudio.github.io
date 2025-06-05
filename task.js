const UI=new Room()
var result=UI.create('p','0',{class:'res'})
var addElem=UI.create('button','Ավելացնել նոր Վճար',{class:'addElem',rClick:'APP.createElement()'})
var addDDate=UI.create('button','Ստեղծել Ամսաթիվ',{class:'addDate',rClick:'APP.createDate()'})
var saveElements=UI.create('button','Պահպանել Արդյունքը',{class:'saveElem',rClick:'APP.createJSON()'})
UI.centerGroup=UI.create('div','',{class:'centerBox'})
var dataValue=UI.create('input','file',{class:'loadFile',type:'file'})









dataValue.addEventListener('change', function() {
    var GetFile = new FileReader()
    GetFile .onload=function(){
        var res=JSON.parse(GetFile.result)
        for(x in res){
            if(res[x].cost==='null'){
                UI.centerGroup.create('h1',Room.toHTML({text:res[x].name,}),{class:'elem2'})
            }else{
                UI.centerGroup.create('div',Room.toHTML({text:res[x].name,input:res[x].cost,}),{class:'elem'})
            }
        }
        APP.removeElement()
        APP.getResult()
    }
    GetFile.readAsText(this.files[0])
})

const APP={
    callPrompter:function(name,value,runOK,value2){
        var prompter=document.getElementsByClassName('prompter')[0]
        var pName=prompter.children[0]
        var pValue=prompter.children[1]
        var vValue=prompter.children[2]
        var ok=prompter.children[3]
        var cancel=prompter.children[4]
        pName.innerHTML=name
        pValue.value=value
        vValue.value=value2
        pValue.addEventListener("keypress",enterPress)
        function enterPress(event) {
            if (event.keyCode==13) {
                event.preventDefault()
                ok.click()
            }
            this.removeEventListener("keypress", enterPress)
        }
        ok.onclick=function(){
            prompter.style.display='none'
            vValue.style.display='none'
            runOK()
        }
        cancel.onclick=function(){
            prompter.style.display='none'
            vValue.style.display='none'
            pValue.innerHTML=''
            pValue.removeEventListener("keypress", enterPress)
        }
        prompter.style.display='block'
        if(value2!==undefined){
            vValue.style.display='block'
        }
        pValue.focus()
    },
    createDate:function(){
        var amis=[
            'Հունվար',
            'Փետրվար',
            'Մարտ',
            'Ապրիլ',
            'Մայիս',
            'Հունիս',
            'Հուլիս',
            'Օգոստոս',
            'Սեպտեմբեր',
            'Հոկտեմբեր',
            'Նոյեմբեր',
            'Դեկտեմբեր'
        ]
        var myDate=new Date()
        var date=myDate.getDate()+'  '+amis[myDate.getMonth()]+'  '+myDate.getFullYear()
        APP.callPrompter('Ամսաթիվ',date,runDate)
        function runDate(){
            var dateValue=document.getElementsByClassName('prompter')[0].children[1].value
            var dateEl=UI.centerGroup.create('h1',Room.toHTML({text:dateValue}),{class:'elem2',rClick:''})
            APP.removeElement()
        }
    },
    getResult:function(){
        var res=document.getElementsByClassName('elem')
        result.innerHTML='0'
        for(var h=0;h<res.length;h++){
            if(res[h].children[1]!==undefined){
                result.innerHTML=Number(result.innerHTML)+Number(res[h].children[1].value)
            }
        }
    },
    removeElement:function(){
        var pp=document.getElementsByClassName('elem')
        for(var h=0;h<pp.length;h++){
            pp[h].onclick=function(e){
                if(e.target instanceof HTMLParagraphElement){
                    var value=confirm('Are you sure you want to delete this element?',)
                    if(value){
                        e.target.parentElement.remove()
                        APP.getResult()
                    }
                }
            }
        }
        var pp2=document.getElementsByClassName('elem2')
        for(var h=0;h<pp2.length;h++){
            pp2[h].onclick=function(e){
                if(e.target instanceof HTMLParagraphElement){
                    var value=confirm('Are you sure you want to delete this element?',)
                    if(value){
                        e.target.parentElement.remove()
                        APP.getResult()
                    }
                }
            }
        }
    },
    createJSON:function(){
        var result=[]
        var pp=UI.centerGroup.children
        for(var h=0;h<pp.length;h++){
            if(pp[h] instanceof HTMLDivElement){
                result[h]={name:pp[h].children[0].textContent,cost:pp[h].children[1].value}
            }else{
                result[h]={name:pp[h].textContent,cost:'null'}
            }
        }
        var curRes=JSON.stringify(result)
        var a = document.createElement("a")
        a.href = window.URL.createObjectURL(new Blob([curRes], {type: "text/plain"}))
        var anun=prompt("Անվանեք ձեր ֆայլը", "");
        a.download = anun+".json"
        a.click()
    },
    createElement:function(){
        APP.callPrompter('Վճարի Անվանումը և Գումարը','',get_elementValue,'')
        function get_elementValue(){
            var prompter=document.getElementsByClassName('prompter')[0]
            var anun=prompter.children[1].value
            var gumar=prompter.children[2].value
            UI.centerGroup.create('div',Room.toHTML({text:anun,input:gumar,}),{class:'elem'})
            APP.removeElement()
            APP.getResult()
        }
    }
}
