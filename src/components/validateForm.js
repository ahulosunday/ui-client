 const validateForm = (register)=>{
     var current = 0
     var errors ={}
     var val, x, y, z
         val = document.getElementsByClassName(register)
         x = val[current].getElementsByTagName("input");
            y = val[current].getElementsByTagName("textarea");
            z = val[current].getElementsByTagName("select");
               for (var i = 0; i < z.length; i++) {
          if(z[i].value === ''){
           (z[i].style.borderBlockColor = 'red')
           
            errors[z[i].name] = "Required"
          }
          else{
            (z[i].style.borderBlockColor = '')
            
           
          }
          
           }
           for (var i = 0; i < x.length; i++) {
          if(x[i].value === ''){
           (x[i].style.borderBlockColor = 'red')
           
            errors[x[i].name] = "Required"
          }
          else{
            (x[i].style.borderBlockColor = '')
           
             
          }
          
           }
             for (var i = 0; i < y.length; i++) {
          if(y[i].value === ''){
           (y[i].style.borderBlockColor = 'red')
          
           errors[y[i].name] = "Required"
          }
          else{
            (y[i].style.borderBlockColor = '')
           
             
          }
         
          
           }
          
           return Object.entries(errors).length
 }
 export default validateForm