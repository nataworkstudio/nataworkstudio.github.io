
function Room(){
    var el=document.createElement("div")
    el.classList.add('mainwindow')
    return document.body.appendChild(el)
}

Room.toHTML=function(opt){
    if(opt.dropdownmenu&&opt.dropdownmenu.length>0){
        var str=''
        for(var h=0;h<opt.dropdownmenu.length;h++){
            str+='<option >'+opt.dropdownmenu[h]+'</option>'
        }
    }
    else{
        var str=
            '<option >Normal</option>'+'\n'+
            '<option >Desolve</option>'+'\n'+
            '<option >Darken</option>'+'\n'+
            '<option selected>Multiply</option>'+'\n'+
            '<option >Color Burn</option>'+'\n'+
            '<option >Linear Burn</option>'+'\n'+
            '<option >Darker Color</option>'+'\n'+
            '<option >Lighten</option>'+'\n'+
            '<option >Screen</option>'+'\n'+
            '<option >Color Dodge</option>'+'\n'+
            '<option >Linear Dodge</option>'+'\n'+
            '<option >Lighter Color</option>'+'\n'+
            '<option >Overlay</option>'+'\n'+
            '<option >Soft Light</option>'+'\n'+
            '<option >Hard Light</option>'+'\n'+
            '<option >Vivid Light</option>'+'\n'+
            '<option >Linear Light</option>'+'\n'+
            '<option >Pin Light</option>'+'\n'+
            '<option >Hard Mix</option>'+'\n'+
            '<option >Difference</option>'+'\n'+
            '<option >Exclusion</option>'+'\n'+
            '<option >Hue</option>'+'\n'+
            '<option >Saturation</option>'+'\n'+
            '<option >Color</option>'+'\n'+
            '<option >Luminosity</option>'+'\n'+
            '<option >Subtract</option>'+'\n'+
            '<option >Divide</option>'+'\n'
    }
    var exp=''
    if(opt.text){
        exp+='<p class="text">'+opt.text+'</p>\n'
    }
    if(opt.dropdownmenu){
        exp+=
        '<select data-prop="${opt.prop}" class="dropmenu">'+'\n'+
            ''+str+''+'\n'+
        '</select>'+'\n'
        
    }
    if(opt.hovertext){
        exp+='<p data-prop="'+opt.prop+'" data-prop1="'+opt.prop1+'" data-prop2="'+opt.prop2+'" data-min="'+opt.min+'" data-max="'+opt.max+'" class="hovertext">'+opt.hovertext+'</p>\n'
    }
    if(opt.hovertext2){
        exp+='<p data-prop="'+opt.prop+'" data-prop1="'+opt.prop1+'" data-prop2="'+opt.prop2+'" data-min="'+opt.min+'" data-max="'+opt.max+'" class="hovertext2">'+opt.hovertext2+'</p>\n'
    }
    if(opt.circle){
        exp+=
        '<div data-prop="'+opt.prop+'" data-prop1="'+opt.prop1+'" data-prop2="'+opt.prop2+'" class="circle">'+'\n'+
            '<div class="angle"></div>'+'\n'+
        '</div>'+'\n'
        
    }
    if(opt.colorbar){
        exp+='<div data-prop="'+opt.prop+'" class="colorbar" ></div>'
    }
    if(opt.gradientbar){
        exp+='<div data-prop="'+opt.prop+'" class="gradientbar" ></div>'
    }
    if(opt.checkbox){
        exp+= 
            '<label for="'+opt.id+'" class="boxtext">'+opt.checkbox+'</label>'+'\n'+
            '<input type="checkbox" data-prop="'+opt.prop+'" class="checkbox" id="'+opt.id+'" name="'+opt.id+'" checked>'+'\n'
    }
    if(opt.checkboxes){
        exp+= 
            '<input type="checkbox" data-prop="'+opt.prop+'" class="checkbox" checked>'+'\n'+
            '<input type="checkbox" data-prop="'+opt.prop+'" class="checkbox" checked>'+'\n'+
            '<input type="checkbox" data-prop="'+opt.prop+'" class="checkbox" checked>'+'\n'
        
    }
    if(opt.radio){

    }
    if(opt.text2){
        exp+='<p class="text2">'+opt.text2+'</p>\n'
    }
    if(opt.input){
        exp+='<input type="text" class="edittext" value='+opt.input+' >\n'
    }
    return exp
}

function onEvent(e){
    switch(e.type){
        case 'mouseover':if(e.target.rOver instanceof Function)e.target.rOver(); break;
        case 'mouseout':if(e.target.rOut instanceof Function)e.target.rOut(); break;
        case 'mousemove': if(e.button==0){
            e.target.location = String(e.screenX-e.offsetX)+','+String(e.screenY-e.offsetY+e.target.offsetHeight);
            eval(e.target.rMove)
        }
        break;
        case 'mousedown':if(e.button==0){
            // e.target.location = String(e.screenX-e.offsetX)+','+String(e.screenY-e.offsetY+e.target.offsetHeight);
            eval(e.target.rDown)
        }
        break;
        case 'mouseup':if(e.button==0){
            e.target.location = String(e.screenX-e.offsetX)+','+String(e.screenY-e.offsetY+e.target.offsetHeight);
            eval(e.target.rUp)
        }
        break;
        case 'click':if(e.button==0){
            if(e.target.rClick instanceof Function)
                e.target.rClick();
            eval(e.target.rClick)
        }
        break;
        case 'change':eval(e.target.rChange)
        break;
    }// sw
}

Element.prototype.create = function (elementType,inner,ident,style){
    var el = document.createElement(elementType);
    this.appendChild(el);
    el.innerHTML = inner;
    if(!ident) return el
    if(ident.class)
        el.classList.add(ident.class)
    if(ident.id)
        el.setAttribute("id", ident.id);
    if(ident.type)
        el.setAttribute("type", ident.type);
    if(ident.value)
        el.setAttribute("value", ident.value);
    if(ident.objName)
        el.objName=ident.objName;

    switch(elementType){
        case 'img':{
            if(ident.src)
                el.setAttribute("src", ident.src);
            if(ident.alt)
                el.setAttribute("alt", ident.alt);
            if(ident.checked)
                el.checked=ident.checked;
            break
        }
        case 'input':{
            if(ident.type)
                el.setAttribute("type", ident.type);
            break
        }
        case 'select':{
            if(ident.size)
                el.setAttribute("size", ident.size);
            if(ident.multiple)
                el.setAttribute("multiple", ident.multiple);
            if(ident.name)
                el.setAttribute("name", ident.name);
            if(ident.required)
                el.setAttribute("required", ident.required);
            if(ident.form)
                el.setAttribute("form", ident.form);
            if(ident.disabled)
                el.setAttribute("disabled", ident.disabled);
            if(ident.autofocus)
                el.setAttribute("autofocus", ident.autofocus);
            break
        }
        case 'label':{
            if(ident.required)
                el.setAttribute("for", ident.for);
            if(ident.for)
                el.setAttribute("form", ident.form);

            break
        }
        case 'video':{
            if(ident.src)
                el.setAttribute("src", ident.src)
            if(ident.controls)
                el.setAttribute("controls", true)
            if(ident.autoplay)
                el.setAttribute("autoplay", true)
            if(ident.loop)
                el.setAttribute("loop", true)
        }
    }

    
    if(ident.index)
        el.index=ident.index;
    if(ident.ustr)
        el.ustr=ident.ustr;
    if(ident.listener)
        el.listener = ident.listener;
        
    if(style){
        if(style.display)
            el.style.display=style.display;
        if(style.backgroundColor)
            el.style.backgroundColor=style.backgroundColor;
        if(style.color)
            el.style.color=style.color;
    }
    
    if(ident.rClick){
        el.rClick=ident.rClick;
        el.addEventListener ('click',onEvent);
    }
    if(ident.rUp){
        el.rUp=ident.rUp;
        el.addEventListener ('mouseup',onEvent);
    }
    if(ident.rDown){
        el.rDown=ident.rDown;
        el.addEventListener ('mousedown',onEvent);
    }
    if(ident.rOver){
        el.rOver=ident.rOver;
        el.addEventListener ('mouseover',onEvent);
    }
    if(ident.rOut){
        el.rOut=ident.rOut;
        el.addEventListener ('mouseover',onEvent);
    }
    if(ident.rMove){
        el.rMove=ident.rMove;
        el.addEventListener ('mousemove',onEvent);
    }
    if(ident.rChange){
        el.rChange=ident.rChange
        el.addEventListener ('change',onEvent)
    }

    Object.defineProperty(el, "left", {
        get: function(){
            return this.newV;
        },
        set: function(newValue){
            this.newV=newValue;
            this.style.left=newValue;
        }
    });
    Object.defineProperty(el, "top", {
        get: function(){
            return this.newV;
        },
        set: function(newValue){
            this.newV=newValue;
            this.style.top=newValue;
        }
    });
    Object.defineProperty(el, "location", {
        get: function(){
            return this.newV;
        },
        set: function(newValue){
            this.newV=newValue;
            if(newValue instanceof Object){
                this.style.left=newValue.x;
                this.style.top=newValue.y;
            }
            if(newValue instanceof Array){
                this.style.left=newValue[0];
                this.style.top=newValue[1];
            }
        }
    });
    Object.defineProperty(el, "size", {
        get: function(){
            return this.newV;
        },
        set: function(newValue){
            this.newV=newValue;
            if(newValue instanceof Object){
                this.style.width=newValue.width;
                this.style.height=newValue.height;
            }
            if(newValue instanceof Array){
                this.style.width=newValue[0];
                this.style.height=newValue[1];
            }
        }
    });
    return el;
}
