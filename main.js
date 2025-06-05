
const UI=document.getElementsByClassName('mainwindow')[0]
var UILg={
    OK:'Լավ',
    Cancel:'Չեղարկել',
    edit:'Խմբագրել',
    remove:'Հեռացնել',
    save:'Պահպանել Արդյունքը',
    paragraph:'Վեռնագիր',
    saveName:'Անվանեք ձեր ֆայլը',
    payName:'Վճարի Անվանումը և Գումարը',
    editRemove:'Խմբագրել կամ Հեռացնել Էլեմենտը',
    newItem:'Ավելացնել նոր Վճար'
}
var result=document.getElementsByClassName('res')[0]
var addElem=document.getElementsByClassName('addElem')[0]
    addElem.onclick=function(){APP.createElement()}
var addDDate=document.getElementsByClassName('addDate')[0]
    addDDate.onclick=function(){APP.createDate()}
var saveElements=document.getElementsByClassName('saveElem')[0]
    saveElements.onclick=function(){APP.createJSON()}
UI.centerGroup=document.getElementsByClassName('centerBox')[0]
var dataValue=document.getElementsByClassName('loadFile')[0]
dataValue.addEventListener('change', function() {
    var GetFile = new FileReader()
    GetFile.onload=function(){
        var res=JSON.parse(GetFile.result)
        for(x in res){
            if(res[x].cost==='null' && res[x].name==='null'){
                UI.centerGroup.create('div',Room.toHTML({}),{class:'elem'})
            }else{
                if(res[x].cost==='null'){
                    UI.centerGroup.create('h1',Room.toHTML({text:res[x].name,}),{class:'elem2'})
                }else{
                    UI.centerGroup.create('div',Room.toHTML({text:res[x].name,input:res[x].cost,}),{class:'elem'})
                }
            }

        }
        APP.removeElement()
        APP.getResult()

    }
    GetFile.readAsText(this.files[0])
    
})

const APP={
    callPrompter:function(name,input,input2,but1,but2){
        var prompter=document.getElementsByClassName('prompter')[0]
        var pName=prompter.children[0]
        var pValue=prompter.children[1]
        var vValue=prompter.children[2]
        var ok=prompter.children[3]
        var cancel=prompter.children[4]
        pName.innerHTML=name
        pValue.value=input
        vValue.value=input2
        if(but1 && but1.name){
            ok.innerHTML=but1.name
        }
        if(but2 && but2.name){
            cancel.innerHTML=but2.name
        }

        ok.onclick=function(){
            prompter.style.display='none'
            pValue.innerHTML=''
            if(but1 && but1.func instanceof Function)
                but1.func()
        }
        cancel.onclick=function(){
            prompter.style.display='none'
            pValue.innerHTML=''
            if(but2 && but2.func instanceof Function)
                but2.func()
        }
        prompter.style.display='block'
        if(input!==undefined){
            pValue.style.display='block'
        }else{
            pValue.style.display='none'
        }
        if(input2!==undefined){
            vValue.style.display='block'
        }else{
            vValue.style.display='none'
        }
        pValue.focus()
        pValue.setSelectionRange(0,0)
        pValue.select()
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
        APP.callPrompter(
            'Ամսաթիվ',
            date,
            undefined,
            {name:'Լավ',func:function(){
                            var dateValue=document.getElementsByClassName('prompter')[0].children[1].value
                            var dateEl=UI.centerGroup.create('h1',Room.toHTML({text:dateValue}),{class:'elem2',rClick:''})
                            APP.removeElement()
                        }},
            {name:'Չեղարկել'}
        )

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
        function funcEdit(){
            var elem=this.target

            var prompter=document.getElementsByClassName('prompter')[0]
            var pName=prompter.children[0]
            var pValue=prompter.children[1]
            var vValue=prompter.children[2]
            var ok=prompter.children[3]
            var cancel=prompter.children[4]
            pName.innerHTML='Ամսաթիվ'
            pValue.value=this.target.innerHTML
            ok.innerHTML='Լավ'
            cancel.innerHTML='Չեղարկել'
            ok.onclick=function(){
                elem.innerHTML=pValue.value
                if(elem.parentElement.className==='elem'){
                    elem.parentElement.children[1].value=vValue.value
                }
                prompter.style.display='none'
            }
            cancel.onclick=function(){
                prompter.style.display='none'
            }
            pValue.style.display='block'
            prompter.style.display='block'
            if(elem.parentElement.className=='elem'){
                pName.innerHTML='Վճարի Անվանումը և Գումարը'
                vValue.value=elem.parentElement.children[1].value
                vValue.style.display='block'
            }

        }
        function funcRemove(){
            var node=this.target.parentElement
            node.parentNode.removeChild(node)
            APP.getResult()
        }
        var pp=document.getElementsByClassName('elem')
        for(var h=0;h<pp.length;h++){
            pp[h].onclick=function(e){
                if(e.target instanceof HTMLParagraphElement){
                    APP.callPrompter(
                        'Ձևափոխել կամ Հեռացնել Էլեմենտը',
                        undefined,
                        undefined,
                        {target:e.target,name:'Խմբագրել',func:funcEdit},
                        {target:e.target,name:'Հեռացնել',func:funcRemove}
                    )
                }
            }
        }
        var pp2=document.getElementsByClassName('elem2')
        for(var h=0;h<pp2.length;h++){
            pp2[h].onclick=function(e){
                if(e.target instanceof HTMLParagraphElement){
                    APP.callPrompter(
                        'Ձևափոխել կամ Հեռացնել Էլեմենտը',
                        undefined,
                        undefined,
                        {target:e.target,name:'Խմբագրել',func:funcEdit},
                        {target:e.target,name:'Հեռացնել',func:funcRemove}
                    )
                }
            }
        }
    },
    createJSON:function(){
        var result=[]
        var pp=UI.centerGroup.children
        for(var h=0;h<pp.length;h++){
            if(pp[h] instanceof HTMLDivElement){
                if(pp[h].children.length<1){
                    result[h]={name:'null',cost:'null'}
                }else{
                    result[h]={name:pp[h].children[0].textContent,cost:pp[h].children[1].value}
                }
            }else{
                result[h]={name:pp[h].textContent,cost:'null'}
            }
        }
        var curRes=JSON.stringify(result)
        if(window.navigator && window.navigator.msSaveOrOpenBlob){
            var myresult=curRes
        }else{
            var myresult=''
        }
        APP.callPrompter(
            UILg.saveName,
            myresult,
            undefined,
            {name:UILg.OK,func:saveResFunc},
            {name:UILg.Cancel}
        )
        function saveResFunc(){
            var prompter=document.getElementsByClassName('prompter')[0]
            var pValue=prompter.children[1]
            var anun=pValue.value
            anun+=".json"
            // var input0=UI.create('input','text',{class:'clipboard'})
            // input0.value=curRes
            // input0.setSelectionRange(0, 99999); // For mobile devices
            // // Copy the text inside the text field
            // navigator.clipboard.writeText(input0.value)
            var blob=new Blob([curRes], {type: "text/plain"})
            if(window.navigator && window.navigator.msSaveOrOpenBlob){
                window.navigator.msSaveBlob(blob,anun)
            }else{
                var a = document.createElement("a")
                a.href = window.URL.createObjectURL(blob)
                a.download = anun
                a.click()
            }
        }

    },
    createElement:function(){
        APP.callPrompter('Վճարի Անվանումը և Գումարը','','',{name:'Լավ',func:get_elementValue},{name:'Չեղարկել'})
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

function havEr(koxm){
    return koxm/2*Math.sqrt((koxm*koxm)-((koxm/2)*(koxm/2)))
}