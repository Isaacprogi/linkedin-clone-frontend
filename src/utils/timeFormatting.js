export const timeFormatting = (time) => {

    //  const date1 = new Date(`${time}`)
      const date = (time instanceof Date) ? time : new Date(time);
      const formatter = new Intl.RelativeTimeFormat('en');
      const ranges = {
        years: 3600 * 24 * 365,
        months: 3600 * 24 * 30,
        weeks: 3600 * 24 * 7,
        days: 3600 * 24,
        hours: 3600,
        minutes: 60,
        seconds: 1
      };
      const secondsElapsed = (date.getTime() - Date.now()) / 1000;
      for (let key in ranges) {
        if (ranges[key] < Math.abs(secondsElapsed)) {
          const delta = secondsElapsed / ranges[key];
          return formatter.format(Math.round(delta), key);
        }
      }



    //  const date2 = Date.now()
    //  const diffTime = Math.abs(date2 - date1)
    //  if ((diffTime / 1000) > (60 * 60 * 24 * 30* 12)) {
    //   return (`${Math.ceil(diffTime / (1000 * 60 * 60 * 24 *30*12))} yrs`)
    // }
    
    // if ((diffTime / 1000) === (60 * 60 * 24 * 30*12)) {
    //   return (`${Math.ceil(diffTime / (1000 * 60 * 60 * 24 *30*12))} yr`)
    // }

    //  if ((diffTime / 1000) > (60 * 60 * 24 * 30)) {
    //   return (`${Math.ceil(diffTime / (1000 * 60 * 60 * 24 *30))} mths`)
    // }
    
    // if ((diffTime / 1000) === (60 * 60 * 24 * 30)) {
    //   return (`${Math.ceil(diffTime / (1000 * 60 * 60 * 24 *30))} mth`)
    // }

    //  if ((diffTime / 1000) > (60 * 60 * 24)) {
    //     return (`${Math.ceil(diffTime / (1000 * 60 * 60 * 24))} days`)
    //   }
      
    //   if ((diffTime / 1000) === (60 * 60 * 24)) {
    //     return (`${Math.ceil(diffTime / (1000 * 60 * 60 * 24))} day`)
    //   }
    //   if ((diffTime / 1000) > (60 * 60)) {
    //     return (`${Math.ceil(diffTime / (1000 * 60 * 60))} hr`)
    //   }
    //   if ((diffTime / 1000) === (60 * 60)) {
    //     return (`${Math.ceil(diffTime / (1000 * 60 * 60))} hrs`)
    //   }
    //   if ((diffTime / 1000) > 60) {
    //     return (`${Math.ceil(diffTime / (1000 * 60))} mins`)
    //   }
    //   if ((diffTime / 1000) === 60) {
    //     return (`${Math.ceil(diffTime / (1000 * 60))} min`)
    //   }
    //   if (((diffTime / 1000) > 1)){
    //     return (`${Math.ceil(diffTime / (1000))} secs `)
    //   }
    //   if (((diffTime / 1000) === 1)){
    //     return (`${Math.ceil(diffTime / (1000))} sec `)
    //   }
    //   if (((diffTime / 1000) < 1)){
    //     return ('now')
    //   }
      
}