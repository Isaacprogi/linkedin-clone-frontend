

export const timeFormatting = (time) => {

     const date1 = new Date(`${time}`)
     const date2 = Date.now()
     const diffTime = Math.abs(date2 - date1)
<<<<<<< HEAD
     if ((diffTime / 1000) > (60 * 60 * 24 * 30* 12)) {
      return (`${Math.ceil(diffTime / (1000 * 60 * 60 * 24 *30*12))} yrs`)
=======
     if ((diffTime / 1000) >= (60 * 60 * 24 * 30* 12)) {
      return (`${Math.ceil(diffTime / (1000 * 60 * 60 * 24 *30))} yrs`)
>>>>>>> a488ee924db19ec1ef80f721e3bef4dd75604856
    }
    
    if ((diffTime / 1000) === (60 * 60 * 24 * 30*12)) {
      return (`${Math.ceil(diffTime / (1000 * 60 * 60 * 24 *30*12))} yr`)
    }

<<<<<<< HEAD
     if ((diffTime / 1000) > (60 * 60 * 24 * 30)) {
      return (`${Math.ceil(diffTime / (1000 * 60 * 60 * 24 *30))} mos`)
=======
     if ((diffTime / 1000) >= (60 * 60 * 24 * 30)) {
      return (`${Math.ceil(diffTime / (1000 * 60 * 60 * 24 *30 * 12))} mos`)
>>>>>>> a488ee924db19ec1ef80f721e3bef4dd75604856
    }
    
    if ((diffTime / 1000) === (60 * 60 * 24 * 30)) {
      return (`${Math.ceil(diffTime / (1000 * 60 * 60 * 24 *30))} mth`)
    }

<<<<<<< HEAD
     if ((diffTime / 1000) > (60 * 60 * 24)) {
=======
     if ((diffTime / 1000) >= (60 * 60 * 24)) {
>>>>>>> a488ee924db19ec1ef80f721e3bef4dd75604856
        return (`${Math.ceil(diffTime / (1000 * 60 * 60 * 24))} days`)
      }
      
      if ((diffTime / 1000) === (60 * 60 * 24)) {
        return (`${Math.ceil(diffTime / (1000 * 60 * 60 * 24))} day`)
      }
      if ((diffTime / 1000) > (60 * 60)) {
        return (`${Math.ceil(diffTime / (1000 * 60 * 60))} hr`)
      }
      if ((diffTime / 1000) === (60 * 60)) {
        return (`${Math.ceil(diffTime / (1000 * 60 * 60))} hrs`)
      }
      if ((diffTime / 1000) > 60) {
        return (`${Math.ceil(diffTime / (1000 * 60))} mins`)
      }
      if ((diffTime / 1000) === 60) {
        return (`${Math.ceil(diffTime / (1000 * 60))} min`)
      }
      if (((diffTime / 1000) > 1)){
        return (`${Math.ceil(diffTime / (1000))} secs `)
      }
      if (((diffTime / 1000) === 1)){
        return (`${Math.ceil(diffTime / (1000))} sec `)
      }
      if (((diffTime / 1000) < 1)){
        return ('now')
      }
      
}