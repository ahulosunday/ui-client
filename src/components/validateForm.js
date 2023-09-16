 const validateForm = (register)=>{
     var current = 0
     var val, x, y, z, valid = false
         val = document.getElementsByClassName(register)
         x = val[current].getElementsByTagName("input");
            y = val[current].getElementsByTagName("textarea");
            z = val[current].getElementsByTagName("select");
               for (var i = 0; i < z.length; i++) {
          if(z[i].value === ''){
           (z[i].style.borderBlockColor = 'red')
           valid = false
          }
          else{
            (z[i].style.borderBlockColor = '')
            valid = true
          }
          
           }
           for (var i = 0; i < x.length; i++) {
          if(x[i].value === ''){
           (x[i].style.borderBlockColor = 'red')
           valid = false
          }
          else{
            (x[i].style.borderBlockColor = '')
            valid = true
          }
          
           }
             for (var i = 0; i < y.length; i++) {
          if(y[i].value === ''){
           (y[i].style.borderBlockColor = 'red')
           valid = false
          }
          else{
            (y[i].style.borderBlockColor = '')
            valid = true
          }
         
          
           }
           return valid
 }
 export default validateForm