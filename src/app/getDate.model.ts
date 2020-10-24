export class GetDate{
  constructor(){}

    public currentDate: Date = new Date();
    public forApi(daysFromToday) {

      const Date = this.currentDate;
      let futureDate = Date.getDate() + daysFromToday;
      Date.setDate(futureDate);
      const Month = ('0' + (Date.getMonth() + 1)).slice(-2);
      const Day = ('0' + Date.getDate() ).slice(-2);
      return [Date.getFullYear(), Month, Day].join('-');
    }

}
